import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import Box from '@material-ui/core/Box';
import {
    TextField,
} from 'formik-material-ui';
import {
    Button,
} from '@material-ui/core';
import {
    Person as PersonIcon,
    Save as SaveIcon,
    Info as InfoIcon
} from '@material-ui/icons'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';

export default ({ email }) => {
    let history = useHistory();

    const [updateUser,
        { error: mutationError, data: mutationData }] = useMutation(gql`
    mutation ($email: String!, $userName: String!, $biography: String){
        UpdateUser(email: $email, userName: $userName, biography: $biography) {
            _id,
            email,
            userName,
            biography
        }  
    }
    `);

    useEffect(() => {
        if (mutationData) {
            history.push('/profile');
        } else if (mutationError) {
            console.log(mutationError)
        }
    }, [mutationData, mutationError, history])

    const { loading, error, data } = useQuery(gql`
    query UserQuery($email: String!) {
      User(email: $email, first:1) {
        userName,
        biography,
        email
      }
    }
    `, {
        variables: { email: email }
    })

    let user;
    if (loading || error || !data.User || !data.User.length) {
        if (error) {
            console.log(error)
            return (null)
        } else if (loading) {
            user = { loading: true }
            return <CircularProgress />
        } else {
            user = { notFound: true }
            console.log("user has not been found in db")
            return (null)
        }
    } else {
        user = data.User[0]
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Formik
                initialValues={{
                    userName: user.userName ? user.userName : '',
                    biography: user.biography ? user.biography : '',
                }}
                validationSchema={Yup.object({
                    userName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    biography: Yup.string()
                        .max(120, 'Must be 120 characters or less'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    updateUser({
                        variables: {
                            email: user.email,
                            userName: values.userName,
                            biography: values.biography,
                        }
                    });
                    setSubmitting(false)
                }}
            >
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
                            type="submit"
                        >
                            <SaveIcon />
                        </Button>
                    </Box>
                </Form>
            </Formik>
        </div>
    );
};