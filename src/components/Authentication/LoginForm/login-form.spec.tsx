import React from 'react';
import {
  RenderResult,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import LoginForm from './index';

import { render } from '@tests/testUtils';
import useLoginState from '@components/custom-hooks/useLoginState';
import { LoginFormData } from '@typings/types';

jest.mock('../../custom-hooks/useLoginState.tsx');

describe('Login Form', () => {
  let renderResult: RenderResult;

  const signInInitiateMock = jest.fn();

  const useLoginStateMock = () => ({
    signInInitiate: signInInitiateMock,
    signInLoading: false,
  });

  beforeEach(() => {
    // mock the module using the prepared mocks above
    (useLoginState as any).mockImplementation(useLoginStateMock);
    renderResult = render(<LoginForm />);
  });

  afterEach(() => {
    jest.resetAllMocks();

    cleanup();
  });

  it('should render login form successfully', () => {
    const { getByTestId } = renderResult;
    const loginForm = getByTestId('login-form');

    // expect the element to be rendered in the DOM rendered by render
    expect(loginForm).toBeInTheDocument();
  });

  it('should display error messages for required fields', async () => {
    const { getByTestId } = renderResult;

    await waitFor(() => {
      fireEvent.click(getByTestId('login-button'));
    });

    expect(getByTestId('emailError').innerHTML).toContain('required');
    expect(getByTestId('passwordError').innerHTML).toContain('required');
  });

  it('should display error message for invalid email', async () => {
    const { getByTestId } = renderResult;

    await waitFor(() => {
      fireEvent.input(getByTestId('emailInput'), {
        target: {
          value: 'test',
        },
      });

      fireEvent.click(getByTestId('login-button'));
    });

    expect(getByTestId('emailError').innerHTML).toContain('invalid email');
  });

  it('should dispatch action for sign in initiate with form data', async () => {
    const { getByTestId } = renderResult;

    const formData: LoginFormData = {
      email: 'randeepkaur0145@gmail.com',
      password: 'Randeep8$',
    };

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
      fireEvent.click(getByTestId('login-button'));
    });

    expect(signInInitiateMock).toHaveBeenCalledWith(formData);
    expect(true).toBeTruthy();
  });
});
