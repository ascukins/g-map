import * as MarkerActions from 'src/app/actions/marker.actions';
import { IMarkers } from 'src/app/models/i-marker';

export function reducer(state: IMarkers = [], action: MarkerActions.Actions) {
  switch (action.type) {
    case MarkerActions.GET_MARKERS:
      return action.payload.slice();

    case MarkerActions.ADD_MARKER:
      return [...state, action.payload];

    case MarkerActions.REMOVE_MARKER:
      const newState = state.slice();
      newState.splice(action.payload, 1);
      return newState;

    case MarkerActions.REMOVE_ALL_MARKERS:
      return [];

    default:
      return state;
  }
}
