import x from './index';
import {
  REQ_ERROR,
  REQ_LOADING,
  REQ_SUCCESS,
  REQ_FLUSH,
  REQ_USER_SUCCESS,
  REQ_SUBMIT_HELP_SUCCESS,
  REQ_MSG_LOADING,
  REQ_MSG_SUCCESS
} from './types';
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

export const submitHelpRequest = (id, message) => async (dispatch, getState) => {
  dispatch({ type: REQ_LOADING });

  const { auth: { token } } = await getState();

  try {
    const req = await x.post(
      `/requests/${id}/volunteers`,
      { message },
      {
        headers: { Authorization: token }
      }
    );

    if (req.status === 201) {
      dispatch({ type: REQ_SUBMIT_HELP_SUCCESS });
    } else {
      throw new Error('http_code_error');
    }
  } catch (error) {
    dispatch({
      type: REQ_ERROR,
      error_message: 'Error while submitting help request.'
    });
  }
};

export const fetchUserProposals = id => async (dispatch, getState) => {
  dispatch({ type: REQ_LOADING });
  const { auth: { token } } = await getState();

  try {
    const req = await x.get(`/me/proposals`, {
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

export const fetchVolunteersForRequest = id => async (dispatch, getState) => {
  dispatch({ type: REQ_LOADING });

  const { auth: { token } } = await getState();

  try {
    const req = await x.get(`/requests/${id}/volunteers`, {
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
      error_message: 'Error while retrieving requests.'
    });
  }
};

export const submitVolunteerMessage = (form, volunteerID, dispatchType = 0) => async (dispatch, getState) => {
  dispatch({ type: REQ_MSG_LOADING });

  const { auth: { token } } = await getState();

  try {
    const req = await x.post(
      `/messages`,
      { content: form.content, id: volunteerID },
      {
        headers: { Authorization: token }
      }
    );

    if (req.status === 201) {
      if (!dispatchType) {
        return dispatch(fetchVolunteersForRequest(req.data.request_id)) && dispatch({ type: REQ_MSG_SUCCESS });
      } else {
        return dispatch(fetchMessagesForVolunteer(volunteerID)) && dispatch({ type: REQ_MSG_SUCCESS });
      }
    } else {
      throw new Error('http_code_error');
    }
  } catch (error) {
    dispatch({
      type: REQ_ERROR,
      error_message: 'Error while submitting help request.'
    });
  }
};

export const deleteHelpRequest = id => async (dispatch, getState) => {
  const { auth: { user, token } } = await getState();

  try {
    const req = await x.delete(`/volunteers/${id}`, {
      headers: { Authorization: token }
    });

    if (req.status === 200) {
      dispatch(fetchUserProposals(user.id));
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

export const fulfillRequest = (request, volunteerID = 0, dispatchType) => async (dispatch, getState) => {
  const { auth: { user, token } } = await getState();
  const requestID = request.id;

  if (volunteerID === 0) {
    const volunteer = request.volunteers.filter(volunteer => volunteer.user_id === user.id);
    volunteerID = volunteer[0].id;
  }

  try {
    const req = await x.patch(
      `/requests/${requestID}/volunteers/${volunteerID}`,
      {},
      {
        headers: { Authorization: token }
      }
    );

    if (req.status === 200) {
      if (dispatchType === 1) {
        dispatch(fetchUserProposals(user.id));
      } else {
        dispatch(fetchVolunteersForRequest(requestID));
      }
    } else {
      throw new Error('http_code_error');
    }
  } catch (error) {
    dispatch({
      type: REQ_ERROR,
      error_message: 'Error while updating request'
    });
  }
};

export const resetRequest = requestID => async (dispatch, getState) => {
  const { auth: { user, token } } = await getState();

  try {
    const req = await x.delete(`/requests/${requestID}/reset`, {
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
      error_message: 'Error while republishing request.'
    });
  }
};

export const declineHelpRequest = (requestID, volunteerID) => async (dispatch, getState) => {
  const { auth: { token } } = await getState();

  try {
    const req = await x.patch(
      `/requests/${requestID}/volunteers/${volunteerID}`,
      { type: 'decline' },
      {
        headers: { Authorization: token }
      }
    );

    if (req.status === 200) {
      dispatch(fetchVolunteersForRequest(requestID));
    } else {
      throw new Error('http_code_error');
    }
  } catch (error) {
    dispatch({
      type: REQ_ERROR,
      error_message: 'Error while updating request'
    });
  }
};
export const fetchMessagesForVolunteer = volunteerID => async (dispatch, getState) => {
  dispatch({ type: REQ_LOADING });

  const { auth: { token } } = await getState();

  try {
    const req = await x.get(`/volunteers/${volunteerID}/messages`, {
      headers: { Authorization: token }
    });

    if (req.status === 200) {
      dispatch({ type: REQ_SUCCESS, request: [req.data] });
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
