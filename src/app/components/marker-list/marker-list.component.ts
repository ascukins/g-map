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

  constructor(private store: Store<AppState>, public gmapService: GmapService) {

  }

  ngOnInit() {
    this.store.dispatch(new MarkerActions.DBGetMarkers());
    // this.markers = this.gmapService.mapMarkers;
    // this.gmapService.iDBGetMarkers().subscribe((markers: IMarkers) => {
    //   this.markers = markers;
    //   this.store.dispatch(new MarkerActions.GetMarkers(this.markers));
    // });
  }

  onGetMarkersClick() {
//    this.store.dispatch(new MarkerActions.GetMarkers(this.markers));
    this.store.dispatch(new MarkerActions.DBGetMarkers());
  }

  onClearAllMarkersClick() {
    this.store.dispatch(new MarkerActions.RemoveAllMarkers());
  }

  onClearSelectedMarkersClick() {
    const positions = this.selectedOptions.map(x => x.value);
    positions.sort((b, a) => a - b);
    positions.forEach((p) => this.store.dispatch(new MarkerActions.RemoveMarker(p)));
    this.selectedOptions = [];
  }

  onSelectionChange($event) {
    this.selectedOptions = $event;
  }

}
