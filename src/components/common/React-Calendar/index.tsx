import React from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import {
  CalendarContainer,
  Calendar,
  Header,
  IconWrapper,
  DatesWrapper,
  WeekdayDates,
  WeekdayHeader,
  DateCell,
} from './styles';
import { generateCalendarDates } from './utils';

import { CalendarDates } from '@typings/types';
import { enhancedReducer, ReducerDispatch } from '@utils/index';

dayjs.extend(localeData);

interface CalendarState {
  selectedDate: dayjs.Dayjs;
  weekdays: string[];
  calendarDates?: CalendarDates;
}

interface CalendarProps {
  show?: boolean;
  selectedDate?: dayjs.Dayjs;
  onDateChange(timestamp: number): void;
}

const initialState: CalendarState = {
  selectedDate: dayjs(),
  weekdays: dayjs.weekdaysShort(),
};

const renderDateCells = (
  weekday: string,
  calendarDates: CalendarDates,
  selectedDate: dayjs.Dayjs,
  onDateChange: (timestamp: number) => void,
) => {
  const datesArray = calendarDates[weekday];

  return datesArray.map(calendarDate => {
    const isSelected =
      calendarDate.date.startOf('day').valueOf() ===
      selectedDate.startOf('day').valueOf();

    return (
      <DateCell
        className={isSelected ? 'active' : ''}
        disabled={!calendarDate.active}
        onClick={() => onDateChange(calendarDate.date.valueOf())}>
        {calendarDate.date.date()}
      </DateCell>
    );
  });
};

const ReactCalendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateChange,
  show = true,
}) => {
  const [state, updateState]: [
    CalendarState,
    ReducerDispatch<CalendarState>,
  ] = React.useReducer(enhancedReducer, initialState);

  // const navigatePreviousMonth = React.useCallback(() => {
  //   updateState({
  //     selectedDate: moment(state.selectedDate).subtract(1, 'month'),
  //   });
  // }, [state.selectedDate]);

  const navigatePreviousMonth = React.useCallback(() => {
    updateState(prevState => {
      return {
        ...prevState,
        selectedDate: dayjs(prevState.selectedDate).subtract(1, 'month'),
      };
    });
  }, []);

  const navigateNextMonth = React.useCallback(() => {
    updateState({
      selectedDate: dayjs(state.selectedDate).add(1, 'month'),
    });
  }, [state.selectedDate]);

  const handleDateChange = React.useCallback(
    (timestamp: number) => {
      onDateChange(timestamp);

      updateState({ selectedDate: dayjs(timestamp) });
    },
    [onDateChange],
  );

  React.useEffect(() => {
    if (selectedDate) {
      updateState({ selectedDate });
    }
  }, [selectedDate]);

  React.useEffect(() => {
    const calendarDates = generateCalendarDates(state.selectedDate);

    updateState({
      calendarDates,
    });
  }, [state.selectedDate]);

  return (
    <CalendarContainer show={show}>
      <Calendar>
        <Header>
          <IconWrapper onClick={navigatePreviousMonth}>
            <MdArrowBack />
          </IconWrapper>
          <div>{state.selectedDate.format('MMMM, YYYY')}</div>
          <IconWrapper onClick={navigateNextMonth}>
            <MdArrowForward />
          </IconWrapper>
        </Header>
        <DatesWrapper>
          {state.weekdays.map(weekday => (
            <WeekdayDates>
              <WeekdayHeader>{weekday}</WeekdayHeader>
              {state.calendarDates
                ? renderDateCells(
                    weekday,
                    state.calendarDates,
                    state.selectedDate,
                    handleDateChange,
                  )
                : null}
            </WeekdayDates>
          ))}
        </DatesWrapper>
      </Calendar>
    </CalendarContainer>
  );
};

export default ReactCalendar;
