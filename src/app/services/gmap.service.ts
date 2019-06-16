import { Injectable } from '@angular/core';
import { IMarker } from '../models/i-marker';
import { IndexedDbService } from './indexed-db.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class GmapService {
  dbName = 'mapApp';
  store = 'main';
  version = 1;
  db: any;

  public mapMarkers: IMarker[] = [];

  constructor(public indexedDbService: IndexedDbService, private state: State<AppState>) { }

  public iDBGetMarkers() {
    return from(this.initIDB().then(() => this.indexedDbService.readFromStore(this.db, this.store, 'markers'))).pipe(
      map((obj: any) => obj.value)
    );
  }

  public iDBPutMarkers() {
    return from(
      this.initIDB().then(
        () => this.indexedDbService.writeToStore(this.db, this.store, { entity_id: 'markers', value: this.state.getValue().markers })
      )
    );
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
