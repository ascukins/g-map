import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GmapService } from '../services/gmap.service';
import * as MarkerActions from 'src/app/actions/marker.actions';

@Injectable()
export class MarkerEffects {

  loadMarkers$ = createEffect(() => this.actions$.pipe(
    ofType(MarkerActions.dbGetMarkers.type),
    mergeMap(() => this.gmapService.iDBGetMarkers()
      .pipe(
        map(markers =>
          MarkerActions.getMarkers({markers})
        ),
        catchError(() => EMPTY)
    ))
  )
  );

  saveMarkers$ = createEffect(() => this.actions$.pipe(
    ofType(MarkerActions.addMarker.type, MarkerActions.removeMarker.type, MarkerActions.removeAllMarkers.type),
    mergeMap(
      () => this.gmapService.iDBPutMarkers().pipe(
        map(() =>
          MarkerActions.markersSaved()
        ),
        catchError(() => EMPTY)
      )
    )
  )
  );

  constructor(
    private actions$: Actions,
    private gmapService: GmapService
  ) {}
}
