import {
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS
} from '../actions/types';

export default function registerReducer(
  state = { success: false, loading: false, error: false, message: '' },
  action
) {
  switch (action.type) {
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        message: action.message
      };
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        message: ''
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        message: action.message
      };
    default:
      return state;
  }
}
