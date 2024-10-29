import type { TStoreName } from "@/definitions";
import { dbName, dbVersion } from "@/indexedDBConstants";
import { createObjectStoreIndex, deleteObjectStoreIndex } from "./actions";

let db: IDBDatabase | null = null;
const openRequest = window.indexedDB.open(dbName, dbVersion);

// MAKE_TRANSACTION {{{
function makeTransaction(storeName: TStoreName, mode: IDBTransactionMode) {
  if (!db) return;

  let transaction = db.transaction(storeName, mode);

  transaction.onerror = (err) => {
    console.warn(err);
  };

  return transaction;
}
//}}}
//{{{ INITIALIZE_IDB
export const initializeIDB = (): void => {
  openRequest.onerror = (err) => {
    console.error(`Database error: ${openRequest.error}`, err);
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
        weeksStore = db.createObjectStore("weeksStore", { keyPath: "number" });
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

    // @ts-expect-error might not be imported
    if (typeof WEEK_TEST_DATA !== "undefined") {
      let transaction = makeTransaction("weeksStore", "readwrite");
      if (!transaction) return;
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
    } else {
    }
  };
};
//}}}
