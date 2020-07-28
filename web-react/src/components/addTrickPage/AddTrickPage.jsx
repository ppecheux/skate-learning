import * as React from 'react';
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag';

import { Formik, Form, Field } from 'formik';
import {
    Typography,
    IconButton,
    Grid,
    Box,
    makeStyles
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import {
    Save as SaveIcon,
    Title as TitleIcon,
    Assignment as AssignmentIcon,
    AttachFile as AttachFileIcon,
} from '@material-ui/icons';
import * as Yup from 'yup';


export const AddTrickPage = (props) => {
    const [getExistingTrick, { loading, error, data }] = useLazyQuery(gql`
query TrickQuery($name: String!) {
Trick(name: $name){
    name
}
}
`)
    return (
        <Formik
            initialValues={{
                userName: '',
                biography: '',
            }}
            validationSchema={Yup.object({
                mediaLink: Yup.string()
                    .url()
                    .required(),
                tip: Yup.string()
                    .max(500)
                    .required(),
                name: Yup.string()
                    .max(15)
                    .required()

            })}
            onSubmit={(values, { setSubmitting }) => {
                alert(JSON.stringify(values));
            }}
        >

            <Grid container justify="center">
                <Form>
                    <Box>
                        <label htmlFor="name">
                            <TitleIcon />
                        </label>
                        <Field component={TextField} name="name" type="text" />
                    </Box>
                    <Box>
                        <label htmlFor="mediaLink">
                            <AttachFileIcon />
                        </label>
                        <Field component={TextField} name="mediaLink" type="text" />
                    </Box>
                    <Grid container alignItems="center" justify="center">
                        <Grid item>
                            <label htmlFor="tip">
                                <AssignmentIcon />
                            </label>
                        </Grid>
                        <Grid item>
                            <Field component={TextField} name="tip" type="text" multiline={true} rows="3" variant="outlined" margin="normal" />
                        </Grid>
                    </Grid>
                    <Box>
                        <IconButton color="primary" type="submit">
                            <SaveIcon />
                        </IconButton>
                    </Box>
                </Form>
            </Grid>
        </Formik>
    )
}