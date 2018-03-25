import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import mapReducer from './mapReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  map: mapReducer
});
