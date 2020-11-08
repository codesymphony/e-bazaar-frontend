import { Epic } from 'redux-observable';
import { of, from } from 'rxjs';
import { map, switchMap, catchError, filter, delay } from 'rxjs/operators';
import { RootAction, RootState, isActionOf } from 'typesafe-actions';
import { toast } from 'react-toastify';

import * as authActions from '@redux/actions/authActions';
import { client } from '@components/ApolloClient';
import {
  User,
  RegistrationFormData,
  LoginFormData,
  SignInResponse,
} from '@typings/types';
import { createUserMutation } from '@graphql/mutations';
import { loginUserQuery } from '@graphql/queries';
import { commonToastOptions, formatGraphQlErrorMessage } from '@utils/index';

interface CreateUserMutationData {
  signUpUser: User;
}

interface LoginUserQueryData {
  signInUser: SignInResponse;
}

export const signUpEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  // state$,
) =>
  action$.pipe(
    filter(isActionOf(authActions.signUpInitiate)),
    switchMap(action =>
      from(
        client.mutate<CreateUserMutationData, RegistrationFormData>({
          variables: action.payload,
          mutation: createUserMutation,
        }),
      ).pipe(
        map(response => {
          if (response.data?.signUpUser) {
            toast(`Welcome ${response.data.signUpUser.firstName}`, {
              type: 'success',
              ...commonToastOptions,
            });

            return authActions.signUpSuccess(response.data.signUpUser);
          }

          const errorMessage = 'user not created';

          toast(errorMessage, {
            type: 'error',
            ...commonToastOptions,
          });

          return authActions.signUpFailure(errorMessage);
        }),
        delay(5000),
        catchError(error => {
          const formattedError = formatGraphQlErrorMessage(error.message);

          toast(formattedError, {
            type: 'error',
            ...commonToastOptions,
          });

          return of(authActions.signUpFailure(formattedError));
        }),
      ),
    ),
  );

export const loginEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  // state$,
) =>
  action$.pipe(
    filter(isActionOf(authActions.signInInitiate)),
    switchMap(action =>
      from(
        client.query<LoginUserQueryData, LoginFormData>({
          variables: {
            email: action.payload.email,
            password: action.payload.password,
          },
          query: loginUserQuery,
        }),
      ).pipe(
        map(response => {
          if (response.data?.signInUser?.tokens) {
            toast(`Login successful`, {
              type: 'success',
              ...commonToastOptions,
            });
            const {
              idToken,
              accessToken,
              refreshToken,
            } = response.data.signInUser.tokens;

            localStorage.setItem('idToken', JSON.stringify(idToken));
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

            return authActions.signInSuccess(response.data.signInUser);
          }
          const errorMessage = 'Login unsuccessful';

          toast(errorMessage, {
            type: 'error',
            ...commonToastOptions,
          });

          return authActions.signInFailure(errorMessage);
        }),
        delay(5000),
        catchError(error => {
          const formattedError = formatGraphQlErrorMessage(error.message);

          toast(formattedError, {
            type: 'error',
            ...commonToastOptions,
          });

          return of(authActions.signInFailure(formattedError));
        }),
      ),
    ),
  );
