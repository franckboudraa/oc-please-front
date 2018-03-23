import axios from 'axios';
import * as type from './types';

const API_URL = process.env.REACT_APP_API_URL;

export const submitRegisterForm = form => async dispatch => {
  console.log(form);
  dispatch({ type: type.REGISTER_LOADING });
  try {
    const req = await axios.post(`${API_URL}/users`, form);
    console.log(req);
    dispatch({
      type: type.REGISTER_SUCCESS,
      message: 'Welcome on Please! You can login now.'
    });
  } catch (err) {
    dispatch({ type: type.REGISTER_ERROR, message: 'Error message!' });
  }
};
