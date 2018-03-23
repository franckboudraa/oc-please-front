import axios from 'axios';
import { REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from './types';

const API_URL = process.env.REACT_APP_API_URL;

export const submitRegisterForm = form => async dispatch => {
  dispatch({ type: REGISTER_LOADING });
  try {
    const req = await axios.post(`${API_URL}/users`, form);
    dispatch({
      type: REGISTER_SUCCESS,
      message: 'Welcome on Please! You can login now.'
    });
  } catch (err) {
    dispatch({ type: REGISTER_ERROR, message: 'Error message!' });
  }
};
