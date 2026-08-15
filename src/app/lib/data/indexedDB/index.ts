import { dbName, dbVersion } from "@/indexedDBConstants";
import { createObjectStoreIndex, deleteObjectStoreIndex } from "./actions";

let db: IDBDatabase | null = null;

let resolveDbReady!: () => void;
let rejectDbReady!: (err: unknown) => void;
export const dbInitialized: Promise<void> = new Promise((resolve, reject) => {
  resolveDbReady = resolve;
  rejectDbReady = reject;
});

// window.indexedDB.open() can throw synchronously instead of just hanging --
// e.g. WebKit sets window.indexedDB to null in some private-browsing /
// Chrome-for-iOS contexts, so calling .open() on it throws a TypeError
// before any IDBOpenDBRequest exists. Program.tsx imports dbInitialized and
// is loaded via next/dynamic with no error handling configured, so letting
// this throw escape module evaluation used to fail the dynamic import
// before Program.tsx ever mounted -- silently rendering nothing instead of
// reaching the route's error.tsx. Guard it so the throw rejects
// dbInitialized instead.
try {
  const openRequest = window.indexedDB.open(dbName, dbVersion);

  // Attach all handlers immediately so they can never miss IDB events.
  openRequest.onerror = (err) => {
    console.error(`Database error: ${openRequest.error}`, err);
    rejectDbReady(err);
  };

  openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    db = openRequest.result;

    let workoutsStore: IDBObjectStore;
    let weeksStore: IDBObjectStore;

    // Upgrade the database if new version
    if (event.newVersion !== event.oldVersion) {
      // If the open request is processing the version change transaction
      console.log(openRequest.transaction?.objectStoreNames);
      if (
        openRequest.transaction &&
        openRequest.transaction.objectStoreNames.length > 0
      ) {
        // use its object stores
        workoutsStore = openRequest.transaction.objectStore("workoutsStore");
        weeksStore = openRequest.transaction.objectStore("weeksStore");
      } else {
        // create new object stores
        workoutsStore = db.createObjectStore("workoutsStore", {
          keyPath: "id",
        });
        weeksStore = db.createObjectStore("weeksStore", {
          keyPath: "number",
        });
      }
    } else {
      // use the database object stores
      workoutsStore = db
        .transaction("workoutsStore")
        .objectStore("workoutsStore");
      weeksStore = db.transaction("weeksStore").objectStore("weeksStore");
    }

    // delete these old indexes if they exist
    deleteObjectStoreIndex(workoutsStore, "training_set_reps");
    deleteObjectStoreIndex(workoutsStore, "day_number");
    deleteObjectStoreIndex(workoutsStore, "lastCompletedDayIDX");

    createObjectStoreIndex(
      workoutsStore,
      "trainingSetRepsIDX",
      "trainingSetReps",
      { unique: false },
    );

    createObjectStoreIndex(workoutsStore, "weekNumberIDX", "weekNumber", {
      unique: false,
    });

    createObjectStoreIndex(workoutsStore, "dayNumberIDX", "dayNumber", {
      unique: false,
    });

    createObjectStoreIndex(
      weeksStore,
      "lastCompletedDayIDX",
      "lastCompletedDay",
      { unique: false },
    );
  };

  openRequest.onsuccess = () => {
    db = openRequest.result;
    resolveDbReady();

    // @ts-expect-error might not be imported
    if (typeof WEEK_TEST_DATA !== "undefined") {
      const transaction = db.transaction("weeksStore", "readwrite");
      transaction.onerror = (err) => {
        console.warn(err);
      };
      transaction.oncomplete = () => console.log("Finished adding data.");
      const store = transaction.objectStore("weeksStore");
      const request = store.getAll();

      request.onerror = (err) => console.warn(err);
      request.onsuccess = () => {
        if (request.result.length === 0) {
          // @ts-expect-error might not be imported
          WEEK_TEST_DATA.forEach((entry) => {
            const request = store.add(entry);
            request.onerror = (err) => console.warn(err);
            request.onsuccess = () => {
              console.log(
                `successfully added week ${entry.number} of test data`,
              );
            };
          });
        }
      };
    }
  };
} catch (err) {
  console.error("Failed to open IndexedDB", err);
  rejectDbReady(err);
}
