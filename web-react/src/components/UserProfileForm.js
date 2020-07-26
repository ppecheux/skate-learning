import React from "react";
import ReactDOM from "react-dom";
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import PublishIcon from '@material-ui/icons/Publish';
import InfoIcon from '@material-ui/icons/Info';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import TextField from "@material-ui/core/TextField";
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
                <label htmlFor="userName">
                    <PersonIcon />
                </label>
                <TextField name="userName" type="text" />
                <ErrorMessage name="userName" />
                <label htmlFor="biography">
                    <InfoIcon />
                </label>
                <TextField name="biography" type="text" />
                <ErrorMessage name="biography" />
                <button type="submit">
                    <PublishIcon />
                </button>
            </Form>
        </Formik>
    );
};
