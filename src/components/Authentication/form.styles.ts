import styled from 'styled-components';
import { rgba } from 'polished';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 20px;
`;

export const Heading = styled.div`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 4rem;
  font-weight: 500;
`;

export const SubmitButton = styled.button`
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

export const SwitchViewText = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: 1.5rem;
`;

export const SwitchViewLink = styled.span`
  a {
    cursor: pointer;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.primaryLight};
    text-decoration: none;
    margin-left: 0.8rem;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

SubmitButton.defaultProps = {
  type: 'submit',
};
