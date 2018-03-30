import { REQ_ERROR, REQ_LOADING, REQ_SUCCESS } from '../actions/types';

export default function requestReducer(
  state = {
    success: false,
    loading: false,
    error: false,
    error_message: '',
    request: {}
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
        request: action.request
      };
    default:
      return state;
  }
}
