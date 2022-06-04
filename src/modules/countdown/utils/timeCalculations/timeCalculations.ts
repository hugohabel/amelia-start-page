// External Dependencies
import dayjs from 'dayjs';

// Internal Dependencies
import { CountdownFormat } from '../../../../common/types/amelia';
import {
  DAYS_DIFF_TEMPLATE,
  DAYS_HOURS_DIFF_TEMPLATE,
  PAST_DAYS_DIFF_TEMPLATE,
  PAST_DAYS_HOURS_DIFF_TEMPLATE,
} from '../../../../common/constants';

// Types
type TimeDiff = {
  days: string;
  hours: string;
  minutes: string;
};

/**
 * Gets time difference in days, hours, and minutes between now and a given date.
 *
 * @param targetDate string Target date in ISO String format.
 *
 * @returns TimeDiff  Time difference.
 */
export const getDiffUntilDate = function getDiffUntilDate(targetDate: string): TimeDiff {
  if (!dayjs(targetDate).isValid()) {
    // eslint-disable-next-line no-param-reassign
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
    days,
    hours,
    minutes,
  };
};

export const isDateInThePast = function isDateInThePast(timeDiff: TimeDiff) {
  return parseInt(timeDiff.days, 10) < 0;
};

/**
 * Formats a time difference, based on a template.
 *
 * @param timeDiff TimeDiff Time difference (days, hours, minutes)
 * @param format Format Format of the return string.
 *
 * @returns string  Strings with the values interpolated.
 */
export const formatTimeDiff = function formatTimeDiff(
  timeDiff: TimeDiff,
  format: CountdownFormat
): string {
  switch (format) {
    case 'days':
      if (isDateInThePast(timeDiff)) {
        return PAST_DAYS_DIFF_TEMPLATE.replace(
          '%daysToken%',
          Math.abs(parseInt(timeDiff.days, 10)).toString()
        );
      }
      return DAYS_DIFF_TEMPLATE.replace('%daysToken%', timeDiff.days);
    case 'days+hours':
      if (isDateInThePast(timeDiff)) {
        return PAST_DAYS_HOURS_DIFF_TEMPLATE.replace(
          '%daysToken%',
          Math.abs(parseInt(timeDiff.days, 10)).toString()
        ).replace('%hoursToken%', timeDiff.hours);
      }
      return DAYS_HOURS_DIFF_TEMPLATE.replace('%daysToken%', timeDiff.days).replace(
        '%hoursToken%',
        timeDiff.hours
      );
    /* istanbul ignore next */
    default:
      throw new Error(`timeDiff format is not valid - timeDiff: ${timeDiff}`);
  }
};
