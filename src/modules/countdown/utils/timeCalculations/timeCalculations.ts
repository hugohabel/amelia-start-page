// External Dependencies
import dayjs from 'dayjs';

// Internal Dependencies
import { DAYS_DIFF_TEMPLATE, DAYS_HOURS_DIFF_TEMPLATE } from '../../../../common/constants';

// Types
type TimeDiff = {
  days: string;
  hours: string;
  minutes: string;
}

type Format = 'days' | 'days+hours';

/**
 * Gets time difference in days, hours, and minutes between now and a given date.
 *
 * @param targetDate string Target date in ISO String format.
 *
 * @returns TimeDiff  Time difference.
 */
export const getDiffUntilDate = function(targetDate: string): TimeDiff {
  if (!dayjs(targetDate).isValid()) {
    targetDate = new Date().toISOString();
  }

  const now = new Date().toISOString();
  const target = dayjs(targetDate);

  // Get difference in milliseconds
  const diff = target.diff(now);

  // Convert difference in milliseconds to days, hours, and minutes
  const [days, daysRest] = (diff / 1000 / 60 / 60 / 24).toString().split('.');
  const [hours, hoursRest] = (parseFloat(`0.${daysRest}`) * 24).toString().split('.');
  const [minutes] = (parseFloat(`0.${hoursRest}`) * 60).toString().split('.');

  return {
    days: days, 
    hours: hours,
    minutes: minutes
  };
}

/**
 * Formats a time difference, based on a template.
 *
 * @param timeDiff TimeDiff Time difference (days, hours, minutes)
 * @param format Format Format of the return string.
 *
 * @returns string  Strings with the values interpolated.
 */
export const formatTimeDiff = function(timeDiff: TimeDiff, format: Format): string {
  switch (format) {
    case 'days':
      return DAYS_DIFF_TEMPLATE.replace('%daysToken%', timeDiff.days);
    case 'days+hours':
      return DAYS_HOURS_DIFF_TEMPLATE.replace('%daysToken%', timeDiff.days).replace('%hoursToken%', timeDiff.hours);
  }
}
