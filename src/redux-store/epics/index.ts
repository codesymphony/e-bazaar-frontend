import { combineEpics } from 'redux-observable';

import { signUpEpic, loginEpic } from './authEpic';

export default combineEpics(signUpEpic, loginEpic);
