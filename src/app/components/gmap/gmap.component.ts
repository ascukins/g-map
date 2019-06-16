import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GmapService } from 'src/app/services/gmap.service';
import { IMarker } from 'src/app/models/i-marker';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {

  markers: IMarker[] = [];

  constructor(public gmapService: GmapService, public constantsService: ConstantsService) { }

  ngOnInit() {
    this.gmapService.readMarkersFromIDB().then(
      (markersObject: any) => {
        if (markersObject) {
          this.markers = markersObject.value;
        }
        this.markers = this.markers || [];
        this.gmapService.mapMarkers = this.markers;
      }
      ,
      () => {
        this.markers = [];
        this.gmapService.mapMarkers = this.markers;
      }
    );
  }

  onMapClick(event) {
    this.gmapService.addMarker(event.coords.lat, event.coords.lng, (this.markers.length + 1).toString());
  }

  onMarkMyLocationClick(event) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.gmapService.addMarker(position.coords.latitude, position.coords.longitude, 'Me');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  onClearAllMarkersClick() {
    this.gmapService.clearAllMarkers();
  }

}
