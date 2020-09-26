import { combineReducers } from 'redux';

import authReducer from './authReducer';
// eslint-disable-next-line import/named

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
