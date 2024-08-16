//import { WEEK_TEST_DATA } from "./testWeekData";
import type {
  TDayComplete,
  TWeek,
  TStoreName,
} from "../definitions";

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
              console.log(`successfully added a week ${entry.number} of test data`)
            }
          })
        }
      }
    } else {

    }

    };

};
// }}}

export const allWeeksComplete = async (): Promise<boolean> => {
  const open = indexedDB.open(dbName);

  return new Promise<boolean>((resolve, reject) => {

    open.onsuccess = () => {
      db = open.result;
      let transaction = makeTransaction('weeksStore', 'readonly');
      if (!transaction) return;

      const objectStore = transaction.objectStore('weeksStore');
      //const request = objectStore.getAll();

      const allWeeksRequest = objectStore.count();
      allWeeksRequest.onerror = () => reject(allWeeksRequest.error);
      allWeeksRequest.onsuccess = () => {
        console.log("all weeks count", allWeeksRequest.result);
      }

      let range = IDBKeyRange.only(5);
      const lastCompletedDayIDX = objectStore.index('lastCompletedDayIDX');
      const completeWeeksRequest = lastCompletedDayIDX.count(range);
      completeWeeksRequest.onerror = () => reject(completeWeeksRequest.error);
      completeWeeksRequest.onsuccess = () => {
        console.log("completed weeks count", completeWeeksRequest.result);
      }

      transaction.oncomplete = () => {
        console.log("Are the weeks equal", allWeeksRequest.result === completeWeeksRequest.result);
        resolve(allWeeksRequest.result === completeWeeksRequest.result);
        db?.close();
      }

    }

  });

}

export function getIncompleteWeek(): Promise<TWeek[]> {
  const open = indexedDB.open(dbName);
  return new Promise<TWeek[]>((resolve, reject) => {

    open.onsuccess = () => {
      db = open.result;
      let transaction = makeTransaction('weeksStore', 'readonly');
      if (!transaction) return;

      const objectStore = transaction.objectStore('weeksStore');
      //const request = objectStore.getAll();

      let range = IDBKeyRange.upperBound(5, true);
      let index = objectStore.index('lastCompletedDayIDX');

      let request = index.getAll(range);
      request.onerror = () => reject(request.error);

      request.onsuccess = () => resolve(request.result);

      transaction.oncomplete = () => db?.close();

    }

  });

}

function addNewWeek(weekNumber: number) {
  const weekData: TWeek = {
    number: weekNumber,
    lastCompletedDay: 0,
  };

  const open = indexedDB.open(dbName);
  open.onsuccess = () => {
    db = open.result;
    const transaction = makeTransaction('weeksStore', 'readwrite');
    if (!transaction) return;

    let store = transaction.objectStore('weeksStore');
    let request = store.add(weekData);

    request.onerror = (err) => {
      console.warn('error initializing the first week', err)
    }

    request.onsuccess = () => {
      console.log('successfully added a week')
    }

    transaction.oncomplete = () => {
      console.log("successfully added a week")
      db?.close();
    }
  }
};

function makeTransaction(storeName: TStoreName, mode: IDBTransactionMode) {
  if(!db) return;

  let transaction = db.transaction(storeName, mode);

  transaction.onerror = (err) => {
    console.warn(err);
  }

  return transaction;
}

export const addCompletedDay = (storeName: TStoreName, payload: TDayComplete) => {
  const open = indexedDB.open(dbName);
  open.onsuccess = () => {
    db = open.result;
    if ([db.objectStoreNames].find((storeName) => storeName === storeName)) {
      const transaction = makeTransaction(storeName, 'readwrite');

      if (!transaction) return;

      const objectStore = transaction.objectStore(storeName);
      const serialized = JSON.parse(JSON.stringify(payload));
      const request = objectStore.add(serialized);

      request.onerror = (err) => console.warn(err)

      transaction.oncomplete = () => {
        console.log("successfully added a day")
        db?.close();
      }
    }
  }
};

export const getWeekNumber = (): Promise<number> => {
  const open = indexedDB.open(dbName);
  return new Promise<number>((resolve, reject) => {

    open.onsuccess = () => {
      db = open.result;
      let transaction = makeTransaction('weeksStore', 'readonly');
      if (!transaction) return;

      const objectStore = transaction.objectStore('weeksStore');
      const request = objectStore.getAllKeys();

      request.onerror = () => reject(request.error);

      request.onsuccess = () => resolve(Number(request.result.at(-1)));

      transaction.oncomplete = () => db?.close();

    }

  });
};

export const getCurrentDay = (): Promise<number> => {
  const open = indexedDB.open(dbName);
  return new Promise<number>((resolve, reject) => {

    open.onsuccess = () => {
      db = open.result;
      let transaction = makeTransaction('weeksStore', 'readonly');
      if (!transaction) return;

      const objectStore = transaction.objectStore('weeksStore');
      const request = objectStore.getAllKeys();

      request.onerror = () => reject(request.error);

      request.onsuccess = () => resolve(Number(request.result.at(-1)));

      transaction.oncomplete = () => db?.close();

    }

  });

}

export const updateWeek = () => {

};

export const addWeek = (storeName: TStoreName, payload: TWeek) => {
  const open = indexedDB.open(dbName);
  open.onsuccess = () => {
    db = open.result;
    if ([db.objectStoreNames].find((storeName) => storeName === storeName)) {
      const transaction = makeTransaction(storeName, 'readwrite');

      if (!transaction) return;

      const objectStore = transaction.objectStore(storeName);
      const serialized = JSON.parse(JSON.stringify(payload));
      const request = objectStore.add(serialized);

      request.onerror = (err) => console.warn(err);

      transaction.oncomplete = () => {
        console.log("successfully added a week");
        db?.close();
      }
    }
  }

};

