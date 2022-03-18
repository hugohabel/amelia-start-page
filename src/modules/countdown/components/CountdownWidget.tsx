// Internal Dependencies
import { getDiffUntilDate, formatTimeDiff } from '../utils/timeCalculations/timeCalculations';

// Styles
import styles from './CountdownWidget.module.css';

// Types
type Props = {
  isLightText?: boolean;
  eventName: string;
  eventDate: string;
};

function CountdownWidget(props: Props) {
  let formattedOutput = '';

  try {
    const timeDiff = getDiffUntilDate(props.eventDate);
    formattedOutput = formatTimeDiff(timeDiff, 'days+hours');
  } catch (err) {
    //logError(err.message);
  }

  return (
    <div className={styles.lightText}>
      <h3>{props.eventName}</h3>
      <p className={styles.separatorWord}>in</p>
      <h2 className={styles.remainingTime}>{formattedOutput}</h2>
    </div>
  );
}

export default CountdownWidget;
