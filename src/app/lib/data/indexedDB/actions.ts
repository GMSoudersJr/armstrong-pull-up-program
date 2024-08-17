import type { TDayComplete, TWeek, TStoreName, } from "@/definitions";
import { dbName } from "@/indexedDBConstants";

let db: IDBDatabase | null = null;

// MAKE_TRANSACTION {{{
export function makeTransaction(storeName: TStoreName, mode: IDBTransactionMode) {
  if(!db) return;

  let transaction = db.transaction(storeName, mode);

  transaction.onerror = (err) => {
    console.warn(err);
  }

  return transaction;
}
//}}}
// ADD_NEW_WEEK {{{
export function addNewWeek(weekNumber: number) {
  const weekData: TWeek = {
    number: weekNumber,
    lastCompletedDay: 0,
    completedDays: [],
  };

  const open = indexedDB.open(dbName);
  open.onsuccess = () => {
    db = open.result;
    const transaction = makeTransaction('weeksStore', 'readwrite');
    if (!transaction) return;

    let store = transaction.objectStore('weeksStore');
    let request = store.add(weekData);

    request.onerror = (err) => {
      console.warn('error adding new week', err)
    }

    transaction.oncomplete = () => db?.close();
  }
};
//}}}
// GET_WEEK_DATA {{{
export function getWeekDataForWeekNumber(weekNumber: number): Promise<TWeek> {
  const open = indexedDB.open(dbName);
  const storeName: TStoreName = 'weeksStore';
  return new Promise<TWeek>((resolve, reject) => {

    open.onsuccess = () => {
      db = open.result;
      let transaction = makeTransaction(storeName, 'readonly');
      if (!transaction) return;

      const objectStore = transaction.objectStore(storeName);

      const request = objectStore.get(weekNumber);

      request.onerror = () => reject(request.error);


      transaction.oncomplete = () => {

        resolve(request.result);

        db?.close();
      }

    }

  });

}
//}}}
// UPDATE_WEEK {{{
export function updateThisWeekWithWorkoutNumber(week: TWeek, workoutDayNumber: number) {
  const open = indexedDB.open(dbName);
  const storeName: TStoreName = 'weeksStore';
  const updatedWeekData: TWeek = {
    number: week.number,
    completedDays: [...week.completedDays, workoutDayNumber],
    lastCompletedDay: workoutDayNumber
  }

  open.onsuccess = () => {
    db = open.result;
    if ([db.objectStoreNames].find((storeName) => storeName === storeName)) {
      const transaction = makeTransaction(storeName, 'readwrite');

      if (!transaction) return;

      const objectStore = transaction.objectStore(storeName);
      const serialized = JSON.parse(JSON.stringify(updatedWeekData));
      const request = objectStore.put(serialized);

      request.onerror = (err) => console.warn(err)

      transaction.oncomplete = () => db?.close();
    }
  }
};
//}}}
// ADD_COMPLETED_DAY {{{
export const addCompletedDayToWorkoutsStore = (payload: TDayComplete): void => {
  const open = indexedDB.open(dbName);
  const storeName: TStoreName = 'workoutsStore';
  open.onsuccess = () => {
    db = open.result;
    if ([db.objectStoreNames].find((storeName) => storeName === storeName)) {
      const transaction = makeTransaction(storeName, 'readwrite');

      if (!transaction) return;

      const objectStore = transaction.objectStore(storeName);
      const serialized = JSON.parse(JSON.stringify(payload));
      const request = objectStore.add(serialized);

      request.onerror = (err) => console.warn(err)

      transaction.oncomplete = () => db?.close();
    }
  }
};
//}}}
// GET_CURRENT_WEEK_NUMBER {{{
export const getCurrentWeekNumber = (): Promise<number> => {
  const open = indexedDB.open(dbName);
  return new Promise<number>((resolve, reject) => {

    open.onsuccess = () => {
      db = open.result;
      let transaction = makeTransaction('weeksStore', 'readonly');
      if (!transaction) return;

      const objectStore = transaction.objectStore('weeksStore');
      const request = objectStore.getAllKeys();

      request.onerror = () => reject(request.error);


      transaction.oncomplete = () => {
        if (request.result.length === 0) resolve(0);

        resolve(Number(request.result.at(-1)));

        db?.close();
      }

    }

  });
};
//}}}
// GET_INCOMPLETE_WEEK {{{
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

};
//}}}
// SHOULD_START_NEW_WEEK? {{{
export const shouldStartNewWeek = async (): Promise<boolean> => {
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

      let range = IDBKeyRange.only(5);
      const lastCompletedDayIDX = objectStore.index('lastCompletedDayIDX');
      const completeWeeksRequest = lastCompletedDayIDX.count(range);
      completeWeeksRequest.onerror = () => reject(completeWeeksRequest.error);

      transaction.oncomplete = () => {
        resolve(allWeeksRequest.result === completeWeeksRequest.result);
        db?.close();
      }

    }

  });

};
//}}}
// GET_LAST_COMPLETED_DAY {{{
export const getLastCompletedDay = (): Promise<number> => {
  const open = indexedDB.open(dbName);
  const storeName: TStoreName = 'weeksStore';

  return new Promise<number>((resolve, reject) => {

    open.onsuccess = () => {
      db = open.result;
      let transaction = makeTransaction(storeName, 'readonly');
      if (!transaction) return;

      const objectStore = transaction.objectStore(storeName);

      let range = IDBKeyRange.upperBound(4, false);
      const lastCompletedDayIDX = objectStore.index('lastCompletedDayIDX');
      const lastCompletedDayRequest: IDBRequest<TWeek[]> = lastCompletedDayIDX.getAll(range);


      lastCompletedDayRequest.onerror = () => reject(lastCompletedDayRequest.error);

      if (!lastCompletedDayRequest) return;
      transaction.oncomplete = () => {
        if (lastCompletedDayRequest.result === undefined || lastCompletedDayRequest.result.length === 0) {
          resolve(0);
        } else {
          resolve(lastCompletedDayRequest.result[0].lastCompletedDay);
        }
        db?.close();
      }

    }

  });

};
//}}}
