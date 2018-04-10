import { HOME_STATS_LOADING, HOME_STATS_SUCCESS, HOME_STATS_ERROR } from '../actions/types';

export default function authReducer(
  state = {
    error: false,
    loading: false,
    success: false,
    stats: {
      requests_unfulfilled: 0,
      requests_fulfilled: 0,
      user_count: 0
    }
  },
  action
) {
  switch (action.type) {
    case HOME_STATS_LOADING:
      return {
        ...state,
        success: false,
        loading: true
      };
    case HOME_STATS_ERROR:
      return {
        ...state,
        success: false,
        error: true
      };
    case HOME_STATS_SUCCESS:
      return {
        ...state,
        success: true,
        stats: action.stats
      };
    default:
      return state;
  }
}
