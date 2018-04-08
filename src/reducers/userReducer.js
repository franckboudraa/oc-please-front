import { USER_SUCCESS, USER_ERROR, USER_LOADING } from '../actions/types';

export default function userReducer(
  state = {
    success: false,
    loading: true,
    error: false,
    user: null
  },
  action
) {
  switch (action.type) {
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        user: null
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        user: null
      };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        user: action.user
      };
    default:
      return state;
  }
}
