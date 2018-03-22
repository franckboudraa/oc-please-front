import * as type from './types';

export const submitRegisterForm = form => async dispatch => {
  dispatch({ type: type.REGISTER_LOADING });

  if (form.email === 'john@doe.com') {
    dispatch({
      type: type.REGISTER_SUCCESS,
      message: 'Welcome on Please! You can login now.'
    });
  } else {
    dispatch({ type: type.REGISTER_ERROR, message: 'Error message!' });
  }
};
