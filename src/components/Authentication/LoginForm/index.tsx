import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';

import {
  Form,
  Heading,
  SubmitButton,
  SwitchViewText,
  SwitchViewLink,
} from '@components/Authentication/form.styles';
import {
  Input,
  Label,
  InputWrapper,
  ErrorMesssage,
} from '@components/common/styled';
import { LoginFormData, LoginFormFields } from '@typings/types';
import { getErrorMessage } from '@utils/index';
import useLoginState from '@components/custom-hooks/useLoginState';

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required.',
  EMAIL: 'Invalid email address.',
} as const;

const formFields: LoginFormFields = {
  email: {
    label: 'Email',
    type: 'email',
    validationOptions: {
      required: { value: true, message: ERROR_MESSAGES.REQUIRED },
      pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: ERROR_MESSAGES.EMAIL },
    },
  },
  password: {
    label: 'Password',
    type: 'password',
    validationOptions: {
      required: { value: true, message: ERROR_MESSAGES.REQUIRED },
    },
  },
};

const RedirectToRegistration = () => (
  <SwitchViewText>
    Not a member?
    <SwitchViewLink>
      <Link to="/auth/registration">SignUp</Link>
    </SwitchViewLink>
  </SwitchViewText>
);

const LoginForm: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<LoginFormData>();
  const { signInInitiate, signInLoading, signInTokens } = useLoginState();

  React.useEffect(() => {
    if (signInTokens && signInLoading === false) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInLoading, signInTokens]);

  const onSubmit = handleSubmit(formData => {
    signInInitiate(formData);
  });

  return (
    <Form data-testid="login-form" onSubmit={onSubmit} autoComplete="off">
      <div>
        <Heading>Log In</Heading>
        {Object.entries(formFields).map(entry => {
          const [field, FieldConfig] = entry;

          return (
            <InputWrapper key={field}>
              <Input
                id={field}
                name={field}
                data-testid={`${field}Input`}
                placeholder={FieldConfig.label}
                type={FieldConfig.type}
                ref={register(FieldConfig.validationOptions)}
              />
              <Label
                data-testid={`${field}Label`}
                htmlFor={field}
                className="input-label">
                {FieldConfig.label}
              </Label>
              {getErrorMessage(errors, field) && (
                <ErrorMesssage data-testid={`${field}Error`}>
                  {getErrorMessage(errors, field)}
                </ErrorMesssage>
              )}
            </InputWrapper>
          );
        })}
        <RedirectToRegistration />
      </div>
      <SubmitButton data-testid="login-button" disabled={signInLoading}>
        Login
      </SubmitButton>
    </Form>
  );
};

export default LoginForm;
