// External Dependencies
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

// Internal Dependencies
import { useAppDispatch } from '../../../common/contexts/AppState';

// Styles
import styles from './CountdownForm.module.css';

function CountdownForm() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      eventName: '',
      eventDate: '',
    },
    validationSchema: Yup.object({
      eventName: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .required('Event name is required'),
      eventDate: Yup.string()
        .required('Event date is required')
    }),
    onSubmit: values => {
      dispatch({
        type: 'addNewCountdownEvent',
        event: {
          id: uuidv4(),
          name: values.eventName,
          date: dayjs(values.eventDate).toISOString(),
          background: ''
        }
      });
      dispatch({
        type: 'setActiveView',
        activeView: null
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete="off">

        { /* Event Name + Error Display */ }
        <input 
          type="text" 
          id="eventName"
          name="eventName"
          placeholder="Event name"
          onChange={formik.handleChange}
          value={formik.values.eventName}
        />
        {formik.touched.eventName && formik.errors.eventName ? (
          <div className={styles.formError}>{formik.errors.eventName}</div>
        ) : null}
        { /* End Event Name + Error Display */ }

        { /* Event Date + Error Display */ }
        <input 
          type="date" 
          id="eventDate"
          name="eventDate"
          placeholder="Event date"
          onChange={formik.handleChange}
          value={formik.values.eventDate}
        />
        {formik.touched.eventDate && formik.errors.eventDate ? (
          <div className={styles.formError}>{formik.errors.eventDate}</div>
        ) : null}
        { /* End Event Date + Error Display */ }
        
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CountdownForm;