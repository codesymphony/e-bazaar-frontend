import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

import * as authActions from '@redux/actions/authActions';
import { RegistrationFormData } from '@typings/types';

const useRegistrationState = () => {
  const signUpLoading = useSelector(
    (state: RootState) => state.auth.signUpLoading,
  );

  const signUpUser = useSelector((state: RootState) => state.auth.signUpUser);

  const dispatch = useDispatch();

  const signUpInitiate = (formData: RegistrationFormData) => {
    dispatch(authActions.signUpInitiate(formData));
  };

  return {
    signUpInitiate,
    signUpLoading,
    signUpUser,
  };
};

export default useRegistrationState;
