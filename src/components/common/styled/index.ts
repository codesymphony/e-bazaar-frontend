import styled, { css } from 'styled-components';
import { rgba } from 'polished';

interface InputWrapperProps {
  flex?: boolean;
  borderBottom?: boolean;
  marginRight?: boolean;
}

interface Props {
  marginLeft?: boolean;
  marginTop?: boolean;
}

export const Heading = styled.h2<Props>`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 4rem;
  font-weight: 500;

  ${props =>
    props.marginTop === true &&
    css`
      margin-top: 20px;
    `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  padding: 15px 0;
  margin-bottom: 10px;
  flex: 1;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  }

  ${props =>
    props.borderBottom === false &&
    css`
      border-bottom: 0px !important;
    `}
  
  ${props =>
    props.borderBottom === true &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
    `}

  ${props =>
    props.flex === true &&
    css`
      display: flex;
    `}

  ${props =>
    props.marginRight === true &&
    css`
      margin-right: 20px;
    `}
`;
export const Input = styled.input`
  display: block;
  font-size: 1.5rem;
  font-family: inherit;
  color: inherit;
  background-color: ${({ theme }) => rgba(theme.colors.shadyWhite, 0.5)};
  padding: 1.5rem 2rem;
  border-radius: 2px;
  width: 100%;
  border: 1px solid #ebebeb;
  backface-visibility: hidden;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border: 0px solid #ebebeb;
    box-shadow: 0 0.5rem 1rem
      ${({ theme }) => rgba(theme.colors.primaryDark, 0.4)};
    border-bottom: 3px solid ${({ theme }) => theme.colors.primaryDark};
  }

  &:focus:invalid {
    border-bottom: 3px solid ${({ theme }) => theme.colors.primaryLight};
  }

  &:placeholder-shown + .input-label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 2rem;
  margin-top: 0.7rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  transition: transform 0.3s;
`;

export const SelectDropdown = styled.select`
  width: 100%;
  display: block;
  font-size: 1.5rem;
  font-family: inherit;
  color: inherit;
  background-color: ${({ theme }) => rgba(theme.colors.shadyWhite, 0.5)};
  padding: 1.8rem 2rem;
  border-radius: 2px;
  border: 1px solid #ebebeb;
  margin-bottom: 20px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border: 0px solid #ebebeb;
    box-shadow: 0 0.5rem 1rem
      ${({ theme }) => rgba(theme.colors.primaryDark, 0.4)};
    border-bottom: 3px solid ${({ theme }) => theme.colors.primaryDark};
  }

  &:focus:invalid {
    border-bottom: 3px solid ${({ theme }) => theme.colors.primaryLight};
  }

  &:placeholder-shown + .input-label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }
`;

export const Option = styled.option`
  font-size: 1.5rem;
  font-family: inherit;
  color: inherit;
  padding: 15px;
  display: none;

  &:hover {
    outline: none;
  }
`;

export const ErrorMesssage = styled.div`
  color: ${({ theme }) => theme.colors.red};
  /* text-transform: capitalize; */
  font-size: 1.2rem;
  margin-left: 2rem;
  margin-top: 0.7rem;
`;

export const SubmitButton = styled.button<Props>`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.4rem;
  cursor: pointer;
  font-weight: 600;
  border: 0px;
  padding: 10px 20px;
  border-radius: 5px;
  backface-visibility: hidden;
  transition: all 0.3s;

  ${props =>
    props.marginLeft === true &&
    css`
      margin-left: 20px;
    `}

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0.5rem 1rem
      ${({ theme }) => rgba(theme.colors.primaryDark, 0.4)};
  }

  &:focus {
    outline: none;
    transform: translateY(-1px);
    box-shadow: 0 0.3rem 0.6rem
      ${({ theme }) => rgba(theme.colors.primaryDark, 0.4)};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.lightGrey};
  }
`;
