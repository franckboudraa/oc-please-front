import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import mapReducer from './mapReducer';
import requestReducer from './requestReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  map: mapReducer,
  requests: requestReducer,
  user: userReducer
});
