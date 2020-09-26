import { ToastOptions } from 'react-toastify';
import { FieldError, NestDataObject } from 'react-hook-form';

export const commonToastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const formatGraphQlErrorMessage = (message: string) =>
  message.replace('GraphQL error: ', '');

export const getErrorMessage = <T extends object>(
  errors: NestDataObject<T, FieldError>,
  field: string,
): string => {
  const errorForField: FieldError = (errors as any)[field] as any;

  return errorForField?.message
    ? ((errorForField.message as any) as string)
    : '';
};

export interface DispatchUpdateFunction<T> {
  (prevState: T): T;
}

export interface ReducerDispatch<T> {
  (update: Partial<T> | DispatchUpdateFunction<T>): void;
}

// eslint-disable-next-line consistent-return
export const enhancedReducer = (state: any, updateArg: any) => {
  if (updateArg.constructor === Function) {
    return { ...state, ...updateArg(state) };
  }

  if (updateArg.constructor === Object) {
    return { ...state, ...updateArg };
  }
};
