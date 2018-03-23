import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_SET_TOKEN
} from '../actions/types';

export default function authReducer(
  state = {
    success: false,
    loading: false,
    error: false,
    token: null,
    user: null
  },
  action
) {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        user: null
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        user: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        user: action.user
      };
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
}
