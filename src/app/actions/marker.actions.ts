import { createAction, props } from '@ngrx/store';
import { IMarker, IMarkers } from 'src/app/models/i-marker';

export const addMarker = createAction('[MARKER] Add', props<{ marker: IMarker }>());
export const removeMarker = createAction('[MARKER] Remove', props<{ id: number }>());
export const removeAllMarkers = createAction('[MARKERS] Remove All');

export const getMarkers = createAction('[MARKERS] Get from payload', props<{ markers: IMarkers }>());
export const dbGetMarkers = createAction('[MARKERS] Get from IndexedDB');
export const markersSaved = createAction('[MARKERS] Saved to IndexedDB');
