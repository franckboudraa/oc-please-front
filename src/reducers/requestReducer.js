import { REQ_ERROR, REQ_LOADING, REQ_SUCCESS, REQ_FLUSH, REQ_USER_SUCCESS } from '../actions/types';

export default function requestReducer(
  state = {
    success: false,
    loading: false,
    error: false,
    error_message: '',
    request: {},
    requests: [],
    flush: false
  },
  action
) {
  switch (action.type) {
    case REQ_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        error_message: action.error_message
      };
    case REQ_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        error_message: '',
        request: null
      };
    case REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        error_message: '',
        request: action.request,
        flush: false
      };
    case REQ_FLUSH:
      return {
        success: false,
        loading: false,
        error: false,
        error_message: '',
        request: {},
        requests: [],
        flush: true
      };
    case REQ_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        error_message: '',
        requests: action.requests,
        flush: false
      };
    default:
      return state;
  }
}
