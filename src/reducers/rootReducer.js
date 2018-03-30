import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import mapReducer from './mapReducer';
import requestReducer from './requestReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  map: mapReducer,
  requests: requestReducer
});
