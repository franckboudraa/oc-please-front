import { REQ_ERROR, REQ_LOADING, REQ_SUCCESS } from '../actions/types';

export default function authReducer(
  state = {
    success: false,
    loading: false,
    error: false,
    error_message: '',
    id: null
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
        id: null
      };
    case REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        error_message: '',
        id: action.id
      };
    default:
      return state;
  }
}
