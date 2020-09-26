// declare module package-with-no-typings-file
import { ActionType, StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootAction = ActionType<
    typeof import('../redux-store/actions/index').default
  >;

  export type RootState = StateType<
    typeof import('../redux-store/reducers/index').default
  >;

  interface Types {
    RootAction: RootAction;
  }
}
