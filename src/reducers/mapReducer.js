import { MAP_SET_LOCATION } from '../actions/types';

export default function authReducer(
  state = {
    center: null,
    zoom: 11
  },
  action
) {
  switch (action.type) {
    case MAP_SET_LOCATION:
      return {
        ...state,
        center: action.location
      };
    default:
      return state;
  }
}
