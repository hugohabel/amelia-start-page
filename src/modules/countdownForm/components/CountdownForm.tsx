// External Dependencies
import { useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import EmojiPicker, { IEmojiData } from 'emoji-picker-react';

// Internal Dependencies
import { CountdownFormat } from '../../../common/types/amelia';
import { useAppDispatch } from '../../../common/contexts/AppState';

// Styles
import styles from './CountdownForm.module.css';
import sharedStyles from '../../../common/styles/Shared.module.css';

/**
 * Countdown Form
 *
 * Form used to create a new countdown.
 *
 * @returns JSX
 */
function CountdownForm() {
  // Component's State
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);

  // Hooks
  const dispatch = useAppDispatch();

  // Handlers

  /* istanbul ignore next */
  const onEmojiClickHandler = (event: any, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject);
    setDisplayEmojiPicker(false);
  };

  const onEmojiPlaceholderClick = () => {
    setDisplayEmojiPicker(true);
  };

  // Form rules and validations (Managed with Formik)
  const formik = useFormik({
    initialValues: {
      eventName: '',
      eventDate: '',
      eventFormat: 'days+hours',
    },
    validationSchema: Yup.object({
      eventName: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .required('Event name is required'),
      eventDate: Yup.string().required('Event date is required'),
    }),
    onSubmit: (values) => {
      dispatch({
        type: 'addNewCountdownEvent',
        event: {
          id: uuidv4(),
          name: values.eventName,
          date: dayjs(values.eventDate).toISOString(),
          format: values.eventFormat as CountdownFormat,
          emoji: chosenEmoji?.emoji || '💡',
        },
      });
      dispatch({
        type: 'setActiveView',
        activeView: null,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className={styles.inputContainer}>
        <div
          data-testid="event-emoji"
          onClick={onEmojiPlaceholderClick}
          className={styles.emojiPlaceholder}>
          {chosenEmoji ? chosenEmoji?.emoji : '💡'}
        </div>
        {/* Event Name + Error Display */}
        <input
          type="text"
          id="eventName"
          name="eventName"
          placeholder="Event name"
          className={styles.eventNameInput}
          onChange={formik.handleChange}
          value={formik.values.eventName}
        />
        {/* End Event Name + Error Display */}
      </div>
      {formik.touched.eventName && formik.errors.eventName ? (
        <div className={`${styles.formError} ${sharedStyles.errorText}`}>
          {formik.errors.eventName}
        </div>
      ) : null}
      {displayEmojiPicker && (
        <EmojiPicker
          pickerStyle={{
            'box-shadow': 'none',
            width: '328px',
            'font-family': 'PT Sans',
            'margin-bottom': '16px',
            background: '#414558',
            color: '#FFFFFF',
            border: '1px solid transparent',
          }}
          onEmojiClick={onEmojiClickHandler}
          disableSearchBar
        />
      )}

      {/* Event Date + Error Display */}
      <input
        type="date"
        id="eventDate"
        name="eventDate"
        placeholder="Event date"
        onChange={formik.handleChange}
        value={formik.values.eventDate}
      />
      {formik.touched.eventDate && formik.errors.eventDate ? (
        <div className={`${styles.formError} ${sharedStyles.errorText}`}>
          {formik.errors.eventDate}
        </div>
      ) : null}
      {/* End Event Date + Error Display */}

      {/* Event Format */}
      <h4 className={styles.subtitle}>How do you want to display the countdown?</h4>
      <RadioGroup
        defaultValue={formik.initialValues.eventFormat}
        value={formik.values.eventFormat.toString()}
        name="eventFormat"
        className={styles.radioGroup}
        onChange={(event) => {
          formik.setFieldValue('eventFormat', event.currentTarget.value);
        }}>
        <FormControlLabel
          value="days+hours"
          control={<Radio style={{ color: '#9580FF' }} />}
          label="Days and Hours"
        />
        <FormControlLabel
          value="days"
          control={<Radio style={{ color: '#9580FF' }} />}
          label="Days"
        />
      </RadioGroup>
      {/* End Event Format */}

      <button type="submit">Submit</button>
    </form>
  );
}

export { CountdownForm };
