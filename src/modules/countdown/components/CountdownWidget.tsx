// Internal Dependencies
import { CountdownFormat } from '../../../common/types/amelia';
import { getDiffUntilDate, formatTimeDiff } from '../utils/timeCalculations/timeCalculations';

// Styles
import styles from './CountdownWidget.module.css';
import sharedStyles from '../../../common/styles/Shared.module.css';

// Interfaces + Types
interface ICountdownWidgetProps {
  eventName: string;
  eventDate: string;
  eventFormat: CountdownFormat;
}

/**
 * Countdown Widget
 *
 * @param params ICountdownWidgetProps
 * @returns JSX
 */
function CountdownWidget({ eventDate, eventName, eventFormat }: ICountdownWidgetProps) {
  let formattedOutput = '';

  try {
    const timeDiff = getDiffUntilDate(eventDate);
    formattedOutput = formatTimeDiff(timeDiff, eventFormat);
  } catch (err) {
    // logError(err.message);
  }

  return (
    <div className={styles.countdownWidget}>
      <h3>{eventName}</h3>
      <p className={styles.separatorWord}>in</p>
      <h2 className={sharedStyles.mainText}>{formattedOutput}</h2>
    </div>
  );
}

export { CountdownWidget };
