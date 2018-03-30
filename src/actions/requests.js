import x from './index';
import { REQ_ERROR, REQ_LOADING, REQ_SUCCESS } from './types';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export const submitRequest = form => async (dispatch, getState) => {
  dispatch({ type: REQ_LOADING });
  const { auth: { token } } = await getState();

  try {
    const geocoded = await geocodeByAddress(form.address);
    const coords = await getLatLng(geocoded[0]);

    try {
      const req = await x.post(
        '/requests',
        { form, coords },
        {
          headers: { Authorization: token }
        }
      );
      if (req.status === 200) {
        dispatch({ type: REQ_SUCCESS });
      } else {
        throw new Error('http_code_error');
      }
    } catch (error) {
      dispatch({
        type: REQ_ERROR,
        error_message:
          'An error occured while submitting the form. Please try again.'
      });
    }
  } catch (error) {
    dispatch({
      type: REQ_ERROR,
      error_message: 'Address invalid. Please enter a valid address.'
    });
  }
};
