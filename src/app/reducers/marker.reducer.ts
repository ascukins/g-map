import * as MarkerActions from 'src/app/actions/marker.actions';
import { IMarkers } from 'src/app/models/i-marker';

export function reducer(state: IMarkers = [], action: any) { ///////////////////// TODO FIX TYPE ANY !!!!!!!!!!!!!!!!!!!!!!!!
  switch (action.type) {
    case MarkerActions.getMarkers.type:
      return action.markers.slice();

    case MarkerActions.addMarker.type:
      return [...state, action.marker];

    case MarkerActions.removeMarker.type:
      const newState = state.slice();
      newState.splice(action.id, 1);
      return newState;

    case MarkerActions.removeAllMarkers.type:
      return [];

    default:
      return state;
  }
}
