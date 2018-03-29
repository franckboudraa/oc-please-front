import x from './index';
import {
  AUTH_LOADING,
  AUTH_ERROR,
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS
} from './types';
import { setAuthTokenToLS, checkAuthFromToken } from './auth';

export const submitRegisterForm = form => async dispatch => {
  dispatch({ type: REGISTER_LOADING });
  try {
    const req = await x.post('/users', form);
    req.status === 200 &&
      dispatch(setAuthTokenToLS(req.data.token)) &&
      dispatch({ type: REGISTER_SUCCESS });
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
