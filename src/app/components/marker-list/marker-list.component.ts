import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { GmapService } from 'src/app/services/gmap.service';
import { IMarker } from 'src/app/models/i-marker';

@Component({
  selector: 'app-marker-list',
  templateUrl: './marker-list.component.html',
  styleUrls: ['./marker-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MarkerListComponent implements OnInit {
  markers: IMarker[];
  selectedOptions = [];

  constructor(public gmapService: GmapService, private cdr: ChangeDetectorRef) {
    this.markers = gmapService.mapMarkers;
  }

  ngOnInit() {
  }

  onClearAllMarkersClick() {
    this.markers = this.gmapService.clearAllMarkers();
  }

  onClearSelectedMarkersClick() {
    const positions = this.selectedOptions.map(x => x.value);
    positions.sort((b, a) => a - b);
    positions.forEach((p) => this.gmapService.clearMarker(p));
    this.selectedOptions = [];
  }

  onSelectionChange($event) {
    this.selectedOptions = $event;
  }

}
