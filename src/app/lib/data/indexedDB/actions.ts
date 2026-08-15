import type { TDayComplete, TWeek, TStoreName } from "@/definitions";
import { dbName } from "@/indexedDBConstants";

let db: IDBDatabase | null = null;

/**
 * Creates an index in the provided object store if it does not exist
 */
export function createObjectStoreIndex(
  objectStore: IDBObjectStore,
  indexName: string,
  keyPath: string,
  options: { unique: boolean },
): void {
  if (!objectStore.indexNames.contains(indexName)) {
    objectStore.createIndex(indexName, keyPath, options);
  }
}

/**
 * Deletes the provided index from the provided object store if it exists
 */
export function deleteObjectStoreIndex(
  objectStore: IDBObjectStore,
  indexName: string,
): void {
  if (objectStore.indexNames.contains(indexName)) {
    objectStore.deleteIndex(indexName);
  }
}

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

// SAFE_OPEN {{{
// Memoized so every caller shares one connection instead of each of the 14
// functions below opening (and closing) its own. A per-call open/close was
// the pre-existing pattern, but round-tripping every call through an extra
// .then() tick to reach it introduced a race on the shared `db` variable
// when two calls landed close together (e.g. Program.tsx and
// PastWorkouts.tsx both reading on page load) -- whichever call's onsuccess
// fired last would silently steal `db` out from under the other's
// in-flight transaction. A single long-lived connection removes the race
// entirely and avoids paying IndexedDB's open/close overhead on every call.
let dbConnection: Promise<IDBDatabase> | null = null;

/**
 * Guards against a synchronous throw from indexedDB.open() -- e.g. WebKit
 * can set window.indexedDB to null in some private-browsing / Chrome-for-iOS
 * contexts, so calling .open() on it throws a TypeError before any
 * IDBOpenDBRequest exists -- as well as the request's own onerror/onblocked
 * events. Always resolves or rejects; never leaves a caller's promise
 * hanging forever the way an unguarded open() with no onerror handler did.
 */
function safeOpenDb(): Promise<IDBDatabase> {
  if (dbConnection) return dbConnection;

  dbConnection = new Promise((resolve, reject) => {
    let open: IDBOpenDBRequest;
    try {
      open = indexedDB.open(dbName);
    } catch (err) {
      dbConnection = null;
      reject(err);
      return;
    }
    open.onerror = () => {
      dbConnection = null;
      reject(open.error);
    };
    open.onblocked = () => {
      dbConnection = null;
      reject(new Error("IndexedDB open request blocked"));
    };
    open.onsuccess = () => {
      db = open.result;
      // If the connection is unexpectedly closed later (e.g. the browser
      // reclaims it), drop the memo so the next call reopens instead of
      // reusing a dead connection forever.
      db.onclose = () => {
        dbConnection = null;
      };
      resolve(db);
    };
  });

  return dbConnection;
}
//}}}

// ADD_NEW_WEEK {{{
export function addNewWeek(weekNumber: number): Promise<void> {
  const weekData: TWeek = {
    number: weekNumber,
    lastCompletedDay: 0,
    completedDays: [],
  };

  return safeOpenDb().then(
    () =>
      new Promise<void>((resolve, reject) => {
        const transaction = makeTransaction("weeksStore", "readwrite");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        let store = transaction.objectStore("weeksStore");
        let request = store.add(weekData);

        request.onerror = (err) => reject(err);

        transaction.oncomplete = () => {
          resolve();
        };
      }),
  );
}
//}}}

// GET_OVERALL_PROGESS {{{
export function getOverallProgess(): Promise<TDayComplete[]> {
  const storeName: TStoreName = "workoutsStore";

  return safeOpenDb().then(
    () =>
      new Promise<TDayComplete[]>((resolve, reject) => {
        let transaction = makeTransaction(storeName, "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }
        const objectStore = transaction.objectStore(storeName);
        const getAllWorkoutsRequest = objectStore.getAll();
        getAllWorkoutsRequest.onerror = () =>
          reject(getAllWorkoutsRequest.error);

        transaction.oncomplete = () => {
          resolve(getAllWorkoutsRequest.result);
        };
      }),
  );
}
// }}}

// GET_WEEKLY_PROGESS {{{
export function getWeeklyProgress(): Promise<TWeek[]> {
  const storeName: TStoreName = "weeksStore";

  return safeOpenDb().then(
    () =>
      new Promise<TWeek[]>((resolve, reject) => {
        let transaction = makeTransaction(storeName, "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }
        const objectStore = transaction.objectStore(storeName);
        const getAllWeeklyData = objectStore.getAll();
        getAllWeeklyData.onerror = () => reject(getAllWeeklyData.error);

        transaction.oncomplete = () => {
          resolve(getAllWeeklyData.result);
        };
      }),
  );
}
// }}}

// GET_WORKOUTS_BY_WEEK_NUMBER {{{
export function getWorkoutsbyWeekNumber(
  weekNumber: number,
): Promise<TDayComplete[]> {
  const storeName: TStoreName = "workoutsStore";

  return safeOpenDb().then(
    () =>
      new Promise<TDayComplete[]>((resolve, reject) => {
        let transaction = makeTransaction(storeName, "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore(storeName);
        let index = objectStore.index("weekNumberIDX");

        const request = index.getAll(weekNumber);

        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => {
          resolve(request.result);
        };
      }),
  );
}
//}}}

// GET_WORKOUT_BY_ID {{{
export function getWorkoutById(id: string): Promise<TDayComplete[]> {
  const storeName: TStoreName = "workoutsStore";

  return safeOpenDb().then(
    () =>
      new Promise<TDayComplete[]>((resolve, reject) => {
        let transaction = makeTransaction(storeName, "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore(storeName);

        const request = objectStore.get(id);

        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => {
          resolve([request.result]);
        };
      }),
  );
}
//}}}

// GET_WEEK_DATA {{{
export function getWeekDataForWeekNumber(weekNumber: number): Promise<TWeek> {
  const storeName: TStoreName = "weeksStore";

  return safeOpenDb().then(
    () =>
      new Promise<TWeek>((resolve, reject) => {
        let transaction = makeTransaction(storeName, "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore(storeName);

        const request = objectStore.get(weekNumber);

        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => {
          resolve(request.result);
        };
      }),
  );
}
//}}}

// UPDATE_WEEK {{{
export function updateThisWeekWithWorkoutNumber(
  week: TWeek,
  workoutDayNumber: number,
): Promise<void> {
  const storeName: TStoreName = "weeksStore";
  const updatedWeekData: TWeek = {
    number: week.number,
    completedDays: [...week.completedDays, workoutDayNumber],
    lastCompletedDay: workoutDayNumber,
  };

  return safeOpenDb().then(
    () =>
      new Promise<void>((resolve, reject) => {
        const transaction = makeTransaction(storeName, "readwrite");

        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore(storeName);
        const serialized = JSON.parse(JSON.stringify(updatedWeekData));
        const request = objectStore.put(serialized);

        request.onerror = (err) => reject(err);

        transaction.oncomplete = () => {
          resolve();
        };
      }),
  );
}
//}}}

// ADD_COMPLETED_DAY {{{
export const addCompletedDayToWorkoutsStore = (
  payload: TDayComplete,
): Promise<boolean> => {
  const storeName: TStoreName = "workoutsStore";

  return safeOpenDb().then(
    () =>
      new Promise<boolean>((resolve, reject) => {
        const transaction = makeTransaction(storeName, "readwrite");

        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore(storeName);
        const serialized = JSON.parse(JSON.stringify(payload));
        const request = objectStore.put(serialized);

        request.onerror = (err) => reject(err);

        request.onsuccess = () => resolve(true);
      }),
  );
};
//}}}

// GET_CURRENT_WEEK_NUMBER {{{
export const getCurrentWeekNumber = (): Promise<number> => {
  return safeOpenDb().then(
    () =>
      new Promise<number>((resolve, reject) => {
        let transaction = makeTransaction("weeksStore", "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore("weeksStore");
        const request = objectStore.getAllKeys();

        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => {
          if (request.result.length === 0) resolve(0);

          resolve(Number(request.result.at(-1)));
        };
      }),
  );
};
//}}}

// GET_WORKOUTS_BY_DAY_NUMBER {{{
export function getWorkoutsByDayNumber(
  dayNumber: number,
): Promise<TDayComplete[]> {
  const storeName: TStoreName = "workoutsStore";
  return safeOpenDb().then(
    () =>
      new Promise<TDayComplete[]>((resolve, reject) => {
        let transaction = makeTransaction(storeName, "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore(storeName);

        let index = objectStore.index("dayNumberIDX");

        let request = index.getAll(dayNumber);
        request.onerror = () => reject(request.error);

        request.onsuccess = () => resolve(request.result);
      }),
  );
}
//}}}

// GET_INCOMPLETE_WEEK {{{
export function getIncompleteWeek(): Promise<TWeek[]> {
  return safeOpenDb().then(
    () =>
      new Promise<TWeek[]>((resolve, reject) => {
        let transaction = makeTransaction("weeksStore", "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore("weeksStore");
        //const request = objectStore.getAll();

        let range = IDBKeyRange.upperBound(5, true);
        let index = objectStore.index("lastCompletedDayIDX");

        let request = index.getAll(range);
        request.onerror = () => reject(request.error);

        request.onsuccess = () => resolve(request.result);
      }),
  );
}
//}}}

// SHOULD_START_NEW_WEEK? {{{
export const shouldStartNewWeek = async (): Promise<boolean> => {
  return safeOpenDb().then(
    () =>
      new Promise<boolean>((resolve, reject) => {
        let transaction = makeTransaction("weeksStore", "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore("weeksStore");
        //const request = objectStore.getAll();

        const allWeeksRequest = objectStore.count();
        allWeeksRequest.onerror = () => reject(allWeeksRequest.error);

        let range = IDBKeyRange.only(5);
        const lastCompletedDayIDX = objectStore.index("lastCompletedDayIDX");
        const completeWeeksRequest = lastCompletedDayIDX.count(range);
        completeWeeksRequest.onerror = () => reject(completeWeeksRequest.error);

        transaction.oncomplete = () => {
          resolve(allWeeksRequest.result === completeWeeksRequest.result);
        };
      }),
  );
};
//}}}

// CLEAR_ALL_DATA {{{
export const clearAllData = (): Promise<void> => {
  return safeOpenDb().then(
    () =>
      new Promise<void>((resolve, reject) => {
        if (!db) {
          reject(new Error("DB not ready"));
          return;
        }
        const transaction = db.transaction(
          ["workoutsStore", "weeksStore"],
          "readwrite",
        );
        transaction.onerror = () => reject(transaction.error);
        transaction.objectStore("workoutsStore").clear();
        transaction.objectStore("weeksStore").clear();
        transaction.oncomplete = () => {
          resolve();
        };
      }),
  );
};
//}}}

// GET_LAST_COMPLETED_DAY {{{
export const getLastCompletedDay = (): Promise<number> => {
  const storeName: TStoreName = "weeksStore";

  return safeOpenDb().then(
    () =>
      new Promise<number>((resolve, reject) => {
        let transaction = makeTransaction(storeName, "readonly");
        if (!transaction) {
          reject(new Error("DB not ready"));
          return;
        }

        const objectStore = transaction.objectStore(storeName);

        let range = IDBKeyRange.upperBound(4, false);
        const lastCompletedDayIDX = objectStore.index("lastCompletedDayIDX");
        const lastCompletedDayRequest: IDBRequest<TWeek[]> =
          lastCompletedDayIDX.getAll(range);

        lastCompletedDayRequest.onerror = () =>
          reject(lastCompletedDayRequest.error);

        if (!lastCompletedDayRequest) return;
        transaction.oncomplete = () => {
          if (
            lastCompletedDayRequest.result === undefined ||
            lastCompletedDayRequest.result.length === 0
          ) {
            resolve(0);
          } else {
            resolve(lastCompletedDayRequest.result[0].lastCompletedDay);
          }
        };
      }),
  );
};
//}}}
