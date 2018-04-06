import x from './index';
import { REQ_ERROR, REQ_LOADING, REQ_SUCCESS, REQ_FLUSH, REQ_USER_SUCCESS } from './types';
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
        { ...form, lat: coords.lat, lng: coords.lng },
        {
          headers: { Authorization: token }
        }
      );
      if (req.status === 200) {
        dispatch({ type: REQ_SUCCESS, request: { id: req.data.id } });
      } else {
        throw new Error('http_code_error');
      }
    } catch (error) {
      dispatch({
        type: REQ_ERROR,
        error_message: 'An error occured while submitting the form. Please try again.'
      });
    }
  } catch (error) {
    dispatch({
      type: REQ_ERROR,
      error_message: 'Address invalid. Please enter a valid address.'
    });
  }
};

export const fetchRequest = id => async (dispatch, getState) => {
  dispatch({ type: REQ_LOADING });
  const { auth: { token } } = await getState();

  try {
    const req = await x.get(`/requests/${id}`, {
      headers: { Authorization: token }
    });
    if (req.status === 200) {
      dispatch({ type: REQ_SUCCESS, request: req.data });
    } else {
      throw new Error('http_code_error');
    }
  } catch (error) {
    dispatch({
      type: REQ_ERROR,
      error_message: 'Error while retrieving request.'
    });
  }
};

export const flushRequests = () => async dispatch => {
  console.log('flush!');
  dispatch({ type: REQ_FLUSH });
};

export const fetchUserRequests = id => async (dispatch, getState) => {
  dispatch({ type: REQ_LOADING });
  const { auth: { token } } = await getState();

  try {
    const req = await x.get(`/users/${id}/requests`, {
      headers: { Authorization: token }
    });

    if (req.status === 200) {
      dispatch({ type: REQ_USER_SUCCESS, requests: req.data });
    } else {
      throw new Error('http_code_error');
    }
  } catch (error) {
    dispatch({
      type: REQ_ERROR,
      error_message: 'Error while retrieving requests.'
    });
  }
};

export const deleteRequest = id => async (dispatch, getState) => {
  const { auth: { user, token } } = await getState();

  try {
    const req = await x.delete(`/requests/${id}`, {
      headers: { Authorization: token }
    });

    if (req.status === 200) {
      dispatch(fetchUserRequests(user.id));
    } else {
      throw new Error('http_code_error');
    }
  } catch (error) {
    dispatch({
      type: REQ_ERROR,
      error_message: 'Error while retrieving requests.'
    });
  }
};
