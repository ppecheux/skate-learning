import React from "react";
import Box from '@material-ui/core/Box';
import {
    TextField,
} from 'formik-material-ui';
import {
    Button,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PublishIcon from '@material-ui/icons/Publish';
import InfoIcon from '@material-ui/icons/Info';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

export const UserProfileForm = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Formik
                initialValues={{
                    userName: '',
                    biography: '',
                }}
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
                render={({ submitForm, isSubmitting }) => (
                    <Form>
                        <Box margin={1}>

                            <label htmlFor="userName">
                                <PersonIcon />
                            </label>
                            <Field component={TextField} name="userName" type="text" />
                        </Box>
                        <Box margin={1}>

                            <label htmlFor="biography">
                                <InfoIcon />
                            </label>
                            <Field component={TextField} name="biography" type="text" />
                        </Box>
                        <Box margin={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                <PublishIcon />
                            </Button>
                        </Box>
                    </Form>
                )}
            />
        </div>
    );
};
