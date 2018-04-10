import x from './index';
import { HOME_STATS_LOADING, HOME_STATS_SUCCESS, HOME_STATS_ERROR } from './types';

export const getHomeStats = () => async dispatch => {
  dispatch({ type: HOME_STATS_LOADING });
  try {
    const req = await x('/homestats');

    req.status === 200 && dispatch({ type: HOME_STATS_SUCCESS, stats: req.data });
  } catch (err) {
    dispatch({ type: HOME_STATS_ERROR });
  }
};
