// External Dependencies
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

// Internal Dependencies
import { useAppDispatch } from '../../../common/contexts/AppState';

// Styles
import styles from './CountdownForm.module.css';

function CountdownForm() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      eventName: '',
    },
    validationSchema: Yup.object({
      eventName: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .required('Event name is required')
    }),
    onSubmit: values => {
      dispatch({
        type: 'addNewCountdownEvent',
        event: {
          id: uuidv4(),
          name: values.eventName,
          date: '2021-08-10T05:00:00.000Z',
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
        
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CountdownForm;