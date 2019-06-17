import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GmapService } from '../services/gmap.service';
import * as MarkerActions from 'src/app/actions/marker.actions';

@Injectable()
export class MarkerEffects {

  loadMarkers$ = createEffect(() => this.actions$.pipe(
    ofType(MarkerActions.DB_GET_MARKERS),
    mergeMap(() => this.gmapService.iDBGetMarkers()
      .pipe(
        map(markers =>
          new MarkerActions.GetMarkers(markers)
        ),
        catchError(() => EMPTY)
    ))
  )
  );

  saveMarkers$ = createEffect(() => this.actions$.pipe(
    ofType(MarkerActions.ADD_MARKER, MarkerActions.REMOVE_MARKER, MarkerActions.REMOVE_ALL_MARKERS),
    mergeMap(
      () => this.gmapService.iDBPutMarkers().pipe(
        map(() =>
          new MarkerActions.MarkersSaved()
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
