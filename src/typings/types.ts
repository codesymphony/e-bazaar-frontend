import { ValidationOptions } from 'react-hook-form';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignInResponse {
  tokens: Tokens;
  user: User;
}

export interface AuthState {
  signUpUser: null | User;
  signUpLoading: boolean;
  signUpError: string;
  signUpSuccess: boolean;

  signInUser: null | User;
  authTokens: null | Tokens;
  signInLoading: boolean;
  signInError: string;
}

export interface FieldConfig {
  label: string;
  type?: 'text' | 'email' | 'password';
  options?: string[];
  validationOptions: ValidationOptions;
}

export interface FormFields {
  [key: string]: FieldConfig;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobileNumber: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export type RegistrationFormFields = Record<
  keyof RegistrationFormData,
  FieldConfig
>;

export type LoginFormFields = Record<keyof LoginFormData, FieldConfig>;
