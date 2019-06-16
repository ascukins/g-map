import { Action } from '@ngrx/store';
import * as MarkerActions from 'src/app/actions/marker.actions';
import { IMarker, IMarkers } from 'src/app/models/i-marker';

// Section 1
const initialState: IMarker = {
  latitude: 57,
  longitude: 24,
  label: 'hz',
};

// Section 2
export function reducer(state: IMarkers = [initialState], action: MarkerActions.Actions) {
    // Section 3
  switch (action.type) {
    case MarkerActions.GET_MARKERS:
      return action.payload.slice();

    case MarkerActions.ADD_MARKER:
      return [...state, action.payload];

    case MarkerActions.REMOVE_MARKER:
      const newState = state.slice();
      newState.splice(action.payload,1);
      return newState;

    case MarkerActions.REMOVE_ALL_MARKERS:
      return [];

    default:
      return state;
  }
}
