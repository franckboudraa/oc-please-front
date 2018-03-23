import axios from 'axios';
import { REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from './types';
import { setAuthTokenToLS } from './auth';

var x = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});

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
