import x from './index';
import { MAP_SET_LOCATION } from './types';

const GMAP_KEY = process.env.REACT_APP_GMAP_KEY;

export const getUserLocation = () => async dispatch => {
  try {
    const { data: { location } } = await x.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${GMAP_KEY}`
    );
    dispatch({ type: MAP_SET_LOCATION, location });
  } catch (err) {
    console.log(err);
  }
};
