import x from './index';
import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_SET_TOKEN,
  AUTH_FLUSH
} from './types';

export const checkAuthFromToken = token => async dispatch => {
  dispatch({ type: AUTH_LOADING });
  try {
    const { data } = await x('users/current', {
      headers: { Authorization: token }
    });
    dispatch({
      type: AUTH_SUCCESS,
      user: data
    });
  } catch ({ error }) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const getTokenFromLSThenAuthenticate = () => async dispatch => {
  const token = await localStorage.getItem('token');

  if (token) {
    dispatch({ type: AUTH_SET_TOKEN, token });
    dispatch(checkAuthFromToken(token));
  } else {
    dispatch({ type: AUTH_FLUSH });
  }
};

export const setAuthTokenToLS = token => async dispatch => {
  localStorage.setItem('token', token);
};

export const login = form => async dispatch => {
  try {
    const { data: { auth_token } } = await x.post('/authenticate', form);
    auth_token &&
      dispatch(setAuthTokenToLS(auth_token)) &&
      dispatch({ type: AUTH_SET_TOKEN, auth_token }) &&
      dispatch(checkAuthFromToken(auth_token));
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: AUTH_FLUSH });
};
