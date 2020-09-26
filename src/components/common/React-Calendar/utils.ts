import moment from 'moment';

import { CalendarDates, CalendarDate } from '@typings/types';

export const generateCalendarDates = (
  dateContext: moment.Moment = moment(),
): CalendarDates => {
  const calendarDates: CalendarDates = {};

  const startOfMonth = moment(dateContext).startOf('month');
  const endOfMonth = moment(dateContext).endOf('month');
  const monthWeekStart = moment(startOfMonth).startOf('week');
  const monthWeekEnd = moment(endOfMonth).endOf('week');

  const momentPointer = monthWeekStart.clone();

  while (momentPointer.isSameOrBefore(monthWeekEnd)) {
    const weekday = momentPointer.format('ddd');

    // create a weekday array entry if key not exists
    if (!calendarDates[weekday]) {
      calendarDates[weekday] = [];
    }

    const dateInfo: CalendarDate = {
      date: momentPointer.clone(),
      active:
        momentPointer.isSameOrAfter(startOfMonth) &&
        momentPointer.isSameOrBefore(endOfMonth),
    };

    calendarDates[weekday].push(dateInfo);

    momentPointer.add(1, 'day');
  }

  return calendarDates;
};
