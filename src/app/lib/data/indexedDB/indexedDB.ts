//import { WEEK_TEST_DATA } from "./testWeekData";
import type {
  TWeek,
} from "@/definitions";

import { makeTransaction } from "@/indexedDBActions";

const dbVersion = 1;
const dbName = "armstrong_pullup_program_db";
let db: IDBDatabase | null = null;
const openRequest = window.indexedDB.open(dbName, dbVersion);


//{{{ initializeIDB
export const initializeIDB = (): void => {

  openRequest.onerror = (err) => {
    console.error(`Database error: ${openRequest.error}`, err);
  };

  openRequest.onupgradeneeded = () => {

    db = openRequest.result;

    if (db.objectStoreNames.contains('workoutsStore')) {
      db.deleteObjectStore('workoutsStore');
    };

    const workoutsStore = db.createObjectStore('workoutsStore', {keyPath: "id"});

    workoutsStore.createIndex("training_set_reps", "trainingSetReps", { unique: false });
    workoutsStore.createIndex("day_number", "dayNumber", { unique: false });

    if (db.objectStoreNames.contains('weeksStore')) {
      db.deleteObjectStore('weeksStore');
    };

    const weeksStore = db.createObjectStore('weeksStore', {keyPath: 'number'});

    weeksStore.createIndex('lastCompletedDayIDX', 'lastCompletedDay', {unique: false});
  }

  openRequest.onsuccess = () => {
    db = openRequest.result;
    console.log("successfully opened the database", db);

    // @ts-expect-error might not be imported
    if (typeof WEEK_TEST_DATA !== 'undefined') {
      let transaction = makeTransaction('weeksStore', 'readwrite');
      if (!transaction) return;
      transaction.oncomplete = () => {
        console.log('Finished adding data.')
      }
      const store = transaction.objectStore('weeksStore');
      const request = store.getAll();

      request.onerror = (err) => console.warn(err);
      request.onsuccess = () => {
        if (request.result.length === 0) {
          // @ts-expect-error might not be imported
          WEEK_TEST_DATA.forEach((entry) => {
            const request = store.add(entry);
            request.onerror = (err) => console.warn(err);
            request.onsuccess = () => {
              console.log(`successfully added week ${entry.number} of test data`)
            }
          })
        }
      }
    } else {

    }

    };

};
//}}}
