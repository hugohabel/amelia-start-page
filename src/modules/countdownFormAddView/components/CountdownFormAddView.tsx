// External Dependencies
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

// Internal Dependencies
import { useAppDispatch } from '../../../common/contexts/AppState';
import CountdownForm from '../../countdownForm/components/CountdownForm';

// Styles
import styles from './CountdownFormAddView.module.css';

function CountdownFormAddView() {
  const dispatch = useAppDispatch();

  // Handler Functions
  function handleGoBackClick() {
    dispatch({
      type: 'setActiveView',
      activeView: null,
    });
  }

  return (
    <>
      {/* Go Back */}
      <div data-testid="go-back" className={styles.backContainer} onClick={handleGoBackClick}>
        <ArrowBackOutlinedIcon fontSize="small" />
        <span>Go Back</span>
      </div>
      {/* End Go Back */}

      {/* Title */}
      <h2 className={styles.title}>New countdown</h2>
      <p className={styles.subtitle}>Add the details for your countdown widget</p>
      {/* End Title */}

      {/* Countdown Form */}
      <CountdownForm />
      {/* End Countdown Form */}
    </>
  );
}

export default CountdownFormAddView;
