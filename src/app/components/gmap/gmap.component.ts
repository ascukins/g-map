import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMarkers } from 'src/app/models/i-marker';
import { ConstantsService } from 'src/app/services/constants.service';
import { Store, State } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import * as MarkerActions from 'src/app/actions/marker.actions';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {

  markers$: Observable<IMarkers> = this.store.select('markers');
  markersCache: IMarkers = [];

  constructor(public constantsService: ConstantsService, private store: Store<AppState>, private state: State<AppState>) { }

  ngOnInit() { }

  onMapClick(event) {
    this.store.dispatch(new MarkerActions.AddMarker({
      latitude: event.coords.lat,
      longitude: event.coords.lng,
      label: (this.state.getValue().markers.length + 1).toString(),
    }));
  }

  onMarkMyLocationClick(event) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.store.dispatch(new MarkerActions.AddMarker({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label: 'Me',
        }));
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

}
