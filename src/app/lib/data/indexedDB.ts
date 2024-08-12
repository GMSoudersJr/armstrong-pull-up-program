let db: IDBDatabase | null = null;

const openRequest = window.indexedDB.open("ArmstrongPullupProgramDB", 1);

openRequest.onerror = () => {
  console.log(`Database error: ${openRequest.error}`);
}

openRequest.onsuccess = () => {
  db = openRequest.result;
}

openRequest.onupgradeneeded = () => {
  const db = openRequest.result;

  const objectStore = db.createObjectStore('someName', {})
}
