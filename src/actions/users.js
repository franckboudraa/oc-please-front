import x from './index';
import { REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from './types';
import { setAuthTokenToLS } from './auth';

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
