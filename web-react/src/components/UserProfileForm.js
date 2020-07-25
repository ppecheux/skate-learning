import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const UserProfileForm = () => {
    return (
        <Formik
            initialValues={{ userName: '', biography: '' }}
            validationSchema={Yup.object({
                userName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                biography: Yup.string()
                    .max(120, 'Must be 120 characters or less'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            <Form>
                <label htmlFor="userName">userName</label>
                <Field name="userName" type="text" />
                <ErrorMessage name="userName" />
                <label htmlFor="biography">Biograhy</label>
                <Field name="biography" type="text" />
                <ErrorMessage name="biography" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};
