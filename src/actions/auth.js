import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_SET_TOKEN
} from './types';

var x = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});

export const checkAuthFromToken = token => async (dispatch, getState) => {
  const { auth } = await getState();
  dispatch({ type: AUTH_LOADING });
  try {
    const { data } = await x('users/current', {
      headers: { Authorization: auth.token }
    });
    dispatch({
      type: AUTH_SUCCESS,
      user: data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const getTokenThenAuthenticate = () => async dispatch => {
  const token = await localStorage.getItem('token');

  token &&
    dispatch({ type: AUTH_SET_TOKEN, token }) &&
    dispatch(checkAuthFromToken(token));
};

export const setAuthToken = token => async dispatch => {
  localStorage.setItem('token', token);
};
