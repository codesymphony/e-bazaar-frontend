import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

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
import useRegistrationState from '@components/custom-hooks/useRegistrationState';
import { RegistrationFormData, RegistrationFormFields } from '@typings/types';
import { getErrorMessage } from '@utils/index';

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required.',
  EMAIL: 'Invalid email address.',
  MOBILE_NO: 'Length should be 10.',
} as const;

const formFields: RegistrationFormFields = {
  firstName: {
    label: 'First Name',
    type: 'text',
    validationOptions: {
      required: { value: true, message: ERROR_MESSAGES.REQUIRED },
    },
  },
  lastName: {
    label: 'Last Name',
    type: 'text',
    validationOptions: {
      required: { value: true, message: ERROR_MESSAGES.REQUIRED },
    },
  },
  email: {
    label: 'Email',
    type: 'text',
    validationOptions: {
      required: { value: true, message: ERROR_MESSAGES.REQUIRED },
      pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: ERROR_MESSAGES.EMAIL },
    },
  },
  gender: {
    label: 'Gender',
    type: 'text',
    validationOptions: {
      required: { value: true, message: ERROR_MESSAGES.REQUIRED },
    },
  },
  mobileNumber: {
    label: 'Mobile Number',
    type: 'text',
    validationOptions: {
      required: { value: true, message: ERROR_MESSAGES.REQUIRED },
      minLength: { value: 10, message: ERROR_MESSAGES.MOBILE_NO },
      maxLength: { value: 10, message: ERROR_MESSAGES.MOBILE_NO },
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

const RedirectToLogin = () => (
  <SwitchViewText>
    Already a member?
    <SwitchViewLink>
      <Link to="/auth/login">SignIn</Link>
    </SwitchViewLink>
  </SwitchViewText>
);

const RegistrationForm: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<RegistrationFormData>();
  const { signUpInitiate, signUpLoading, signUpUser } = useRegistrationState();

  useEffect(() => {
    if (signUpUser && signUpLoading === false) {
      history.push('/auth/confirm-user');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpLoading, signUpUser]);

  const onSubmit = handleSubmit(formData => {
    signUpInitiate(formData);
  });

  return (
    <Form
      data-testid="registration-form"
      onSubmit={onSubmit}
      autoComplete="off">
      <div>
        <Heading>Register</Heading>
        <SimpleBar style={{ maxHeight: '50vh' }}>
          {Object.entries(formFields).map(entry => {
            const [field, fieldConfig] = entry;

            return (
              <InputWrapper key={field}>
                <Input
                  id={field}
                  name={field}
                  data-testid={`${field}Input`}
                  placeholder={fieldConfig.label}
                  type={fieldConfig.type}
                  autoComplete={
                    fieldConfig.type === 'password' ? 'new-password' : 'nope'
                  }
                  ref={register(fieldConfig.validationOptions)}
                />
                <Label
                  data-testid={`${field}Label`}
                  htmlFor={field}
                  className="input-label">
                  {fieldConfig.label}
                </Label>
                {getErrorMessage(errors, field) && (
                  <ErrorMesssage data-testid={`${field}Error`}>
                    {getErrorMessage(errors, field)}
                  </ErrorMesssage>
                )}
              </InputWrapper>
            );
          })}
        </SimpleBar>
        <RedirectToLogin />
      </div>
      <SubmitButton disabled={signUpLoading} data-testid="register-button">
        Register
      </SubmitButton>
    </Form>
  );
};

export default RegistrationForm;
