import { MAP_SET_LOCATION, MAP_ERROR, MAP_SET_MARKERS } from '../actions/types';

export default function authReducer(
  state = {
    center: null,
    zoom: 11,
    error: false,
    markers: []
  },
  action
) {
  switch (action.type) {
    case MAP_SET_LOCATION:
      return {
        ...state,
        center: action.location
      };
    case MAP_ERROR:
      return {
        ...state,
        error: true
      };
    case MAP_SET_MARKERS:
      return {
        ...state,
        markers: [...action.markers]
      };
    default:
      return state;
  }
}
