import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GmapService } from 'src/app/services/gmap.service';
import { IMarkers } from 'src/app/models/i-marker';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as MarkerActions from 'src/app/actions/marker.actions';

@Component({
  selector: 'app-marker-list',
  templateUrl: './marker-list.component.html',
  styleUrls: ['./marker-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerListComponent implements OnInit {
  markers$: Observable<IMarkers> = this.store.select('markers');
  markers: IMarkers;
  selectedOptions = [];

  constructor(private store: Store<AppState>, public gmapService: GmapService) { }

  ngOnInit() { }

  onGetMarkersClick() {
    this.store.dispatch(MarkerActions.dbGetMarkers());
  }

  onClearAllMarkersClick() {
    this.store.dispatch(MarkerActions.removeAllMarkers());
  }

  onClearSelectedMarkersClick() {
    const positions = this.selectedOptions.map(x => x.value);
    positions.sort((b, a) => a - b);
    positions.forEach((p) => this.store.dispatch(MarkerActions.removeMarker({ id: p })));
    this.selectedOptions = [];
  }

  onSelectionChange($event) {
    this.selectedOptions = $event;
  }

}
