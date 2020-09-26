import styled, { css } from 'styled-components';
import { rgba } from 'polished';

interface CalendarContainerProps {
  show: boolean;
}

export const CalendarContainer = styled.div<CalendarContainerProps>`
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem ${({ theme }) => rgba(theme.colors.darkGrey, 0.4)};
  visibility: hidden;

  ${props =>
    props.show &&
    css`
      visibility: visible;
    `}
`;

export const Calendar = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  justify-content: space-between;
  user-select: none;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 3px;
  background-color: #e8e4e3;
  cursor: pointer;
`;

export const DatesWrapper = styled.div`
  user-select: none;
  font-size: 14px;
  display: flex;
`;

export const WeekdayDates = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const WeekdayHeader = styled.div`
  height: 3rem;
  width: 4rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;

export const DateCell = styled.button`
  height: 4rem;
  width: 4rem;
  margin: 2px;
  border-radius: 50%;
  border: 1px solid transparent;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  transition: all 0.3s linear;

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus {
    outline: none;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primaryDark};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.shadyWhite};
    `}
`;

DateCell.defaultProps = {
  disabled: false,
  type: 'button',
};
