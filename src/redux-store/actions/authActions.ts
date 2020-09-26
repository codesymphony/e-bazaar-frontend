import { createAction } from 'typesafe-actions';

import {
  RegistrationFormData,
  User,
  LoginFormData,
  SignInResponse,
} from '@typings/types';

export const signUpInitiate = createAction(
  '@SIGNUP/INITIATE',
  (data: RegistrationFormData) => ({
    ...data,
  }),
)<RegistrationFormData>();

export const signUpSuccess = createAction('@SIGNUP/SUCCESS', (data: User) => ({
  ...data,
}))<User>();

export const signUpFailure = createAction(
  '@SIGNUP/FAILURE',
  (data: string) => data,
)<string>();

export const signInInitiate = createAction(
  '@SIGNIN/INITIATE',
  (data: LoginFormData) => ({ ...data }),
)<LoginFormData>();

export const signInSuccess = createAction(
  '@SIGNIN/SUCCESS',
  (data: SignInResponse) => ({
    ...data,
  }),
)<SignInResponse>();

export const signInFailure = createAction(
  '@SIGNIN/FAILURE',
  (data: string) => data,
)<string>();
