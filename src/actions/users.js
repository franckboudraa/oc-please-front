import x from './index';
import {
  AUTH_LOADING,
  AUTH_ERROR,
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  USER_LOADING,
  USER_ERROR,
  USER_SUCCESS
} from './types';
import { setAuthTokenToLS, checkAuthFromToken } from './auth';

export const submitRegisterForm = form => async dispatch => {
  dispatch({ type: REGISTER_LOADING });
  try {
    const req = await x.post('/users', form);
    req.status === 200 && dispatch(setAuthTokenToLS(req.data.token)) && dispatch({ type: REGISTER_SUCCESS });
  } catch (err) {
    dispatch({ type: REGISTER_ERROR });
  }
};

export const submitIdentity = (id, token, url) => async dispatch => {
  dispatch({ type: AUTH_LOADING });
  try {
    const req = await x.patch(
      `/users/${id}`,
      { identity: url },
      {
        headers: { Authorization: token }
      }
    );
    req.status === 200 && dispatch(checkAuthFromToken(token));
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const getUserProfile = id => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  try {
    const { auth: { token } } = getState();

    const req = await x(`/users/${id}`, {
      headers: { Authorization: token }
    });

    req.status === 200 && dispatch({ type: USER_SUCCESS, user: req.data });
  } catch (err) {
    dispatch({ type: USER_ERROR });
  }
};
