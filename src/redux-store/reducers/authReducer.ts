import { RootAction, getType } from 'typesafe-actions';

import * as authActions from '@redux/actions/authActions';
import { AuthState } from '@typings/types';

const initialState: AuthState = {
  signUpUser: null,
  signUpLoading: false,
  signUpError: '',
  signUpSuccess: false,

  signInUser: null,
  authTokens: null,
  signInLoading: false,
  signInError: '',
};

export default function authentication(
  state: AuthState = initialState,
  action: RootAction,
): AuthState {
  switch (action.type) {
    case getType(authActions.signUpInitiate):
      return {
        ...state,
        signUpLoading: true,
        signUpError: '',
      };

    case getType(authActions.signUpSuccess):
      return {
        ...state,
        signUpUser: action.payload,
        signUpLoading: false,
        signUpSuccess: true,
      };

    case getType(authActions.signUpFailure):
      return {
        ...state,
        signUpError: action.payload,
        signUpLoading: false,
      };

    case getType(authActions.signInInitiate):
      return {
        ...state,
        signInLoading: true,
        signInError: '',
      };

    case getType(authActions.signInSuccess):
      return {
        ...state,
        authTokens: action.payload.tokens,
        signInUser: action.payload.user,
        signInLoading: false,
      };

    case getType(authActions.signInFailure):
      return {
        ...state,
        signInError: action.payload,
        signInLoading: false,
      };

    default:
      return state;
  }
}
