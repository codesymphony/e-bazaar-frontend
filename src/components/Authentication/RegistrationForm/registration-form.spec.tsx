import React from 'react';
import {
  RenderResult,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import RegistrationForm from './index';

import useRegistrationState from '@components/custom-hooks/useRegistrationState';
import { render } from '@tests/testUtils';
import { RegistrationFormData } from '@typings/types';

// mock for the third party module
jest.mock('../../custom-hooks/useRegistrationState.tsx');

// eslint-disable-next-line import/no-duplicates
describe('Registration Form', () => {
  let renderResult: RenderResult;
  // prepare a mock mock for the signUpInitiate for the useRegistrationState hook
  const signUpInitiateMock = jest.fn();

  // prepare a mock for returned result of useRegistrationState hook
  const useRegistrationStateMock = () => ({
    signUpInitiate: signUpInitiateMock,
    signUpLoading: false,
  });

  beforeEach(() => {
    // mock the module using the prepared mocks above
    (useRegistrationState as any).mockImplementation(useRegistrationStateMock);
    renderResult = render(<RegistrationForm />);
  });

  afterEach(() => {
    // reset the data on calls property of mocks and
    // reset the implementation and returned values
    jest.resetAllMocks();

    cleanup();
  });

  it('should render registration form successfully', () => {
    const { getByTestId } = renderResult;
    const registrationForm = getByTestId('registration-form');

    // expect the element to be rendered in the DOM rendered by render
    expect(registrationForm).toBeInTheDocument();
  });

  it('should display error messages for required fields', async () => {
    const { getByTestId } = renderResult;

    // wait for async DOM event to complete before
    // expecting tests on DOM elements
    await waitFor(() => {
      fireEvent.click(getByTestId('register-button'));
    });

    expect(getByTestId('firstNameError').innerHTML).toContain('required');
    expect(getByTestId('lastNameError').innerHTML).toContain('required');
    expect(getByTestId('emailError').innerHTML).toContain('required');
    expect(getByTestId('passwordError').innerHTML).toContain('required');
  });

  it('should display error message for invalid email', async () => {
    const { getByTestId } = renderResult;

    // wait for async DOM event to complete before
    // expecting tests on DOM elements
    await waitFor(() => {
      fireEvent.input(getByTestId('emailInput'), {
        target: {
          value: 'test',
        },
      });

      fireEvent.click(getByTestId('register-button'));
    });

    expect(getByTestId('emailError').innerHTML).toContain('invalid email');
  });

  it('should dispatch action for sign up initiate with form data', async () => {
    const { getByTestId } = renderResult;

    const formData: RegistrationFormData = {
      firstName: 'Aditya',
      lastName: 'Loshali',
      email: 'aditya.loshali@gmail.com',
      password: 'Password@1',
    };

    await waitFor(() => {
      fireEvent.input(getByTestId('firstNameInput'), {
        target: {
          value: formData.firstName,
        },
      });
    });

    await waitFor(() => {
      fireEvent.input(getByTestId('lastNameInput'), {
        target: {
          value: formData.lastName,
        },
      });
    });

    await waitFor(() => {
      fireEvent.input(getByTestId('emailInput'), {
        target: {
          value: formData.email,
        },
      });
    });

    await waitFor(() => {
      fireEvent.input(getByTestId('passwordInput'), {
        target: {
          value: formData.password,
        },
      });
    });

    await waitFor(() => {
      fireEvent.click(getByTestId('register-button'));
    });

    expect(signUpInitiateMock).toHaveBeenCalledWith(formData);
    expect(true).toBeTruthy();
  });
});
