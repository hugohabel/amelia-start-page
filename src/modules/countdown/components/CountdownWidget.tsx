// Internal Dependencies
import { CountdownFormat } from '../../../common/types/amelia';
import {
  getDiffUntilDate,
  formatTimeDiff,
  isDateInThePast,
} from '../utils/timeCalculations/timeCalculations';
import { log } from '../../../common/utils/logs/logs';

// Styles
import styles from './CountdownWidget.module.css';
import sharedStyles from '../../../common/styles/Shared.module.css';

// Interfaces + Types
interface ICountdownWidgetProps {
  eventName: string;
  eventDate: string;
  eventFormat: CountdownFormat;
  eventEmoji: string;
}

/**
 * Countdown Widget
 *
 * @param params ICountdownWidgetProps
 * @returns JSX
 */
function CountdownWidget({ eventDate, eventName, eventFormat, eventEmoji }: ICountdownWidgetProps) {
  let isEventInThePast = false;
  let formattedOutput = '';

  try {
    const timeDiff = getDiffUntilDate(eventDate);
    isEventInThePast = isDateInThePast(timeDiff);
    formattedOutput = formatTimeDiff(timeDiff, eventFormat);
  } catch (err: any) {
    log({
      level: 'error',
      message: err.message,
      data: `eventDate: ${eventDate} - eventFormat: ${eventFormat}`,
      file: 'CountdownWidget.ts',
      location: 'CountdownWidget',
    });
  }

  return (
    <div className={styles.countdownWidget}>
      <h3>{`${eventEmoji} ${eventName}`}</h3>
      <p className={styles.separatorWord}>{!isEventInThePast && `in`}</p>
      <h2 className={sharedStyles.mainText}>{formattedOutput}</h2>
    </div>
  );
}

export { CountdownWidget };
