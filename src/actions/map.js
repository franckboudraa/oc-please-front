import x from './index';
import { MAP_SET_LOCATION, MAP_ERROR, MAP_SET_MARKERS } from './types';

const GMAP_KEY = process.env.REACT_APP_GMAP_KEY;

export const getUserLocation = () => async dispatch => {
  try {
    const { data: { location } } = await x.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GMAP_KEY}`);

    dispatch({ type: MAP_SET_LOCATION, location });
  } catch (err) {
    // to do
  }
};

export const getUnfulfilledRequests = box => async (dispatch, getState) => {
  const { token } = await getState().auth;
  try {
    const req = await x.post(
      '/requests/within',
      {
        params: { box }
      },
      { headers: { Authorization: token } }
    );
    dispatch({ type: MAP_SET_MARKERS, markers: req.data });
  } catch (error) {
    dispatch({ type: MAP_ERROR });
  }
};
