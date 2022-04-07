// Internal Dependencies
import { getDiffUntilDate, formatTimeDiff } from '../utils/timeCalculations/timeCalculations';

// Styles
import styles from './CountdownWidget.module.css';

// Interfaces + Types
interface ICountdownWidgetProps {
  eventName: string;
  eventDate: string;
}

function CountdownWidget({ eventDate, eventName }: ICountdownWidgetProps) {
  let formattedOutput = '';

  try {
    const timeDiff = getDiffUntilDate(eventDate);
    formattedOutput = formatTimeDiff(timeDiff, 'days+hours');
  } catch (err) {
    // logError(err.message);
  }

  return (
    <div className={styles.countdownWidget}>
      <h3>{eventName}</h3>
      <p className={styles.separatorWord}>in</p>
      <h2 className={styles.remainingTime}>{formattedOutput}</h2>
    </div>
  );
}

export { CountdownWidget };
