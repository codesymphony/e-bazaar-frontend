import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

import * as authActions from '@redux/actions/authActions';
import { LoginFormData } from '@typings/types';

const useLoginState = () => {
  const signInLoading = useSelector(
    (state: RootState) => state.auth.signInLoading,
  );
  const signInTokens = useSelector((state: RootState) => state.auth.authTokens);

  const dispatch = useDispatch();

  const signInInitiate = (formData: LoginFormData) => {
    dispatch(authActions.signInInitiate(formData));
  };

  return {
    signInInitiate,
    signInLoading,
    signInTokens,
  };
};

export default useLoginState;
