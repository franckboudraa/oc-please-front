import {
  REQ_ERROR,
  REQ_LOADING,
  REQ_SUCCESS,
  REQ_FLUSH,
  REQ_USER_SUCCESS,
  REQ_SUBMIT_HELP_SUCCESS,
  REQ_MSG_LOADING,
  REQ_MSG_SUCCESS
} from '../actions/types';

const defaultState = {
  success: false,
  loading: false,
  error: false,
  error_message: '',
  request: {},
  requests: [],
  flush: false,
  submitHelp: false,
  msg: {
    loading: false
  }
};

export default function requestReducer(state = defaultState, action) {
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
        ...defaultState,
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
    case REQ_SUBMIT_HELP_SUCCESS:
      return {
        ...state,
        submitHelp: true
      };
    case REQ_MSG_LOADING:
      return {
        ...state,
        msg: { ...state.msg, loading: true }
      };
    case REQ_MSG_SUCCESS:
      return {
        ...state,
        msg: { ...state.msg, loading: false }
      };
    default:
      return state;
  }
}
