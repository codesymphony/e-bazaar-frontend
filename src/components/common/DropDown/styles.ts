import styled, { css } from 'styled-components';

export const DropDownWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const OptionsWrapper = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s;
  z-index: 1;

  ${({ show }) =>
    show &&
    css`
      visibility: visible;
      opacity: 1;
    `}

  & .simplebar-scrollbar::before {
    background-color: ${({ theme }) => theme.colors.white};
  }

  & .simplebar-scrollbar.simplebar-visible::before {
    transition: opacity 0.5s ease-in;
    opacity: 0;
  }

  & .simplebar-track {
    transition: background-color 0.3s ease-in;
  }

  &:hover .simplebar-scrollbar.simplebar-visible::before {
    opacity: 0.9;
  }

  &:hover .simplebar-track {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const Option = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  }
`;
