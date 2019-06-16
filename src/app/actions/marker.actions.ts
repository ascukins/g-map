import { Action } from '@ngrx/store';
import { IMarker, IMarkers } from 'src/app/models/i-marker';

// Action types
export const ADD_MARKER = '[MARKER] Add';
export const REMOVE_MARKER = '[MARKER] Remove';
export const REMOVE_ALL_MARKERS = '[MARKERS] Remove All';
export const GET_MARKERS = '[MARKERS] Get';
export const DB_GET_MARKERS = '[MARKERS] Get from IndexedDB';

// Actions
export class AddMarker implements Action {
  readonly type = ADD_MARKER;
  constructor(public payload: IMarker) { }
}

export class RemoveMarker implements Action {
  readonly type = REMOVE_MARKER;
  constructor(public payload: number) { }
}

export class RemoveAllMarkers implements Action {
  readonly type = REMOVE_ALL_MARKERS;
  constructor() { }
}

export class GetMarkers implements Action {
  readonly type = GET_MARKERS;
  constructor(public payload: IMarkers) { }
}

export class DBGetMarkers implements Action {
  readonly type = DB_GET_MARKERS;
  constructor() { }
}



export type Actions = AddMarker | RemoveMarker | GetMarkers | RemoveAllMarkers | DBGetMarkers;
