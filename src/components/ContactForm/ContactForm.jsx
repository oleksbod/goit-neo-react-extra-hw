import { useId } from 'react';
import css from './ContactForm.module.css';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  number: Yup.string()
    .min(3, 'Number must be at least 3 characters long')
    .max(50, 'Number cannot exceed 50 characters')
    .required('Number is required')
});

const initialValues = {
  name: '',
  number: ''
};

function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
        toast.success('Contact added!');
      })
      .catch((err) => {
        toast.error('Add contact failed!');
        console.log(err);
      });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={ContactSchema} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formControl}>
          <label htmlFor={nameFieldId}>Name</label>

          <Field className={css.formInput} type="text" name="name" id={nameFieldId} />

          <ErrorMessage className={css.formError} name="name" component="span" />
        </div>

        <div className={css.formControl}>
          <label htmlFor={numberFieldId}>Number</label>

          <Field className={css.formInput} type="text" name="number" id={numberFieldId} />

          <ErrorMessage className={css.formError} name="number" component="span" />
        </div>

        <Button variant="contained" color="primary" type="submit" className={css.submitBtn}>
          Add contact
        </Button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
