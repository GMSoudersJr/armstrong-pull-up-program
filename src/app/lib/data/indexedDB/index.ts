import type { TStoreName } from "@/definitions";
import { dbName, dbVersion } from "@/indexedDBConstants";

let db: IDBDatabase | null = null;
const openRequest = window.indexedDB.open(dbName, dbVersion);

// MAKE_TRANSACTION {{{
export function makeTransaction(
  storeName: TStoreName,
  mode: IDBTransactionMode,
) {
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

  openRequest.onupgradeneeded = () => {
    db = openRequest.result;

    if (db.objectStoreNames.contains("workoutsStore")) {
      db.deleteObjectStore("workoutsStore");
    }

    const workoutsStore = db.createObjectStore("workoutsStore", {
      keyPath: "id",
    });

    workoutsStore.createIndex("training_set_reps", "trainingSetReps", {
      unique: false,
    });
    workoutsStore.createIndex("day_number", "dayNumber", { unique: false });

    if (db.objectStoreNames.contains("weeksStore")) {
      db.deleteObjectStore("weeksStore");
    }

    const weeksStore = db.createObjectStore("weeksStore", {
      keyPath: "number",
    });

    weeksStore.createIndex("lastCompletedDayIDX", "lastCompletedDay", {
      unique: false,
    });
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
