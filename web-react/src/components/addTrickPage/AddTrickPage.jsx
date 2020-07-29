import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
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
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';



export const AddTrickPage = (props) => {
    const { loading, error, data: { Trick: tricks } = {} } = useQuery(gql`
        query TrickQuery {
        Trick{
            name
        }
        }
        `)

    const [createTrick,
        { error: cTerror, loading: cTloading, data: { Trick: createdTricks } = {} }] = useMutation(gql`
    mutation ($name: String!){
  CreateTrick(name: $name){
    name
  }
}`)

    if (loading) {
        return <CircularProgress />
    } else if (error) {
        console.log(error)
        return (null)
    } if (tricks) {
        return (
            <Formik
                initialValues={{
                    userName: '',
                    biography: '',
                }}
                validationSchema={yup.object({
                    mediaLink: yup.string()
                        .url(),
                    tip: yup.string()
                        .max(500)
                        .required(),
                    name: yup.string()
                        .max(15)
                        .required()
                        .notOneOf(tricks.map(trick => trick.name), "there is already a page for a trick with this name")

                })}
                onSubmit={(values, { setSubmitting }) => {
                    createTrick({ name: values.name })
                    //find or add media
                    // add relation with author
                    // add relation with media
                    //redirect
                    setSubmitting(false)
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
}