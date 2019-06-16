import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  defaultLatitude = 56.9547;
  defaultLongitude = 24.1144;

  public mainMenuContents = [
    {
      shortName: 'Map',
      longName: 'Clickable Google Map'
    },
    {
      shortName: 'Marker List',
      longName: 'Map Marker Coordinate List'
    },
  ];

  constructor() { }
}
