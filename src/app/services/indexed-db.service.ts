import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  public readFromStore(db: any, store: string, key: string) {
    return new Promise((resolve) => {
      const request = db
        .transaction([store], 'readonly')
        .objectStore(store)
        .get(key);
      request.onerror = () => {
        console.log('IndexedDB access error: ' + request.error);
        resolve();
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  public writeToStore(db: any, store: string, data: object) {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction([store], 'readwrite')
        .objectStore(store)
        .put(data);
      request.onerror = () => {
        console.log('IndexedDB access error: ' + request.error);
        reject();
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  public openIndexedDB(dbName: string, version: number, fnOnUpgradeNeeded: (oEvent: any) => void) {
    const indexedDB = window.indexedDB;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);
      request.onerror = () => {
        console.log('IndexedDB access error: ' + request.error);
        reject();
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onupgradeneeded = fnOnUpgradeNeeded;
    });
  }

}
