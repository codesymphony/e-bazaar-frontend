import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { CalendarDates, CalendarDate } from '@typings/types';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const generateCalendarDates = (
  dateContext: dayjs.Dayjs = dayjs(),
): CalendarDates => {
  const calendarDates: CalendarDates = {};

  const startOfMonth = dayjs(dateContext).startOf('month');
  const endOfMonth = dayjs(dateContext).endOf('month');
  const monthWeekStart = dayjs(startOfMonth).startOf('week');
  const monthWeekEnd = dayjs(endOfMonth).endOf('week');

  let momentPointer = monthWeekStart;

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

    momentPointer = momentPointer.add(1, 'day');
  }

  return calendarDates;
};
