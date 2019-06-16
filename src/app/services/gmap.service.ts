import { Injectable } from '@angular/core';
import { IMarker } from '../models/i-marker';
import { IndexedDbService } from './indexed-db.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GmapService {
  dbName = 'mapApp';
  store = 'main';
  version = 1;
  db: any;

  public mapMarkers: IMarker[] = [];

  constructor(public indexedDbService: IndexedDbService) { }

  public iDBGetMarkers() {
    return from(this.initIDB().then(() => this.indexedDbService.readFromStore(this.db, this.store, 'markers'))).pipe(
      map((obj: any) => obj.value)
    );
  }




  addMarker(latitude: number, longitude: number, label: string) {
    this.mapMarkers = this.mapMarkers || [];
    this.mapMarkers.push({ latitude, longitude, label });
    this.writeMarkersToIDB();
  }

  clearMarker(position: number) {
    if (Array.isArray(this.mapMarkers)) {
      this.mapMarkers.splice(position, 1);
    }
    this.writeMarkersToIDB();
    return this.mapMarkers;
  }

  clearAllMarkers() {
    this.mapMarkers = [];
    this.writeMarkersToIDB();
    return this.mapMarkers;
  }

  public async readMarkersFromIDB() {
    await this.initIDB();
    return this.indexedDbService.readFromStore(this.db, this.store, 'markers');
  }

  public async writeMarkersToIDB() {
    await this.initIDB();
    this.indexedDbService.writeToStore(this.db, this.store, { entity_id: 'markers', value: this.mapMarkers });
  }

  private async initIDB() {
    if (!this.db) {
      this.db = await this.indexedDbService.openIndexedDB(this.dbName, this.version, (oEvent) => {
        const oObjectStore = oEvent.currentTarget.result.createObjectStore(this.store, {
          keyPath: 'entity_id',
        });
        oObjectStore.createIndex('entity_id', 'entity_id', { unique: true });
        oObjectStore.transaction.oncomplete = this.initIDB.bind(this);
      });
    }
  }

}
