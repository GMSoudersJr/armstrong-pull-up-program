const dbVersion = 1;
export const dbName = "armstrong_pullup_program_db";
export const openRequest = window.indexedDB.open(dbName, dbVersion);
