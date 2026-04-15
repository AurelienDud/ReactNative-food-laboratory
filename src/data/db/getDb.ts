import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';

let _dbPromise: Promise<SQLiteDatabase> | null = null;

export async function getDb(): Promise<SQLiteDatabase> {
  if (!_dbPromise) {
    _dbPromise = openDatabaseAsync('myapp.db');
  }
  return _dbPromise;
}