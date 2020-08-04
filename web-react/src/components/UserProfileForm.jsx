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

export default ({ userId }) => {
  let history = useHistory();

  const [updateUser,
    { error: mutationError, data: mutationData }] = useMutation(gql`
    mutation ($id: ID!, $name: String!, $biography: String){
        UpdateUser(id: $id, name: $name, biography: $biography) {
            id,
            name,
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
    query UserQuery($id: ID!) {
      User(id: $id, first:1) {
        name,
        biography,
        id
      }
    }
    `, {
    variables: { id: userId }
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
          name: user.name ? user.name : '',
          biography: user.biography ? user.biography : '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          biography: Yup.string()
            .max(120, 'Must be 120 characters or less'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          updateUser({
            variables: {
              id: user.id,
              name: values.name,
              biography: values.biography,
            }
          });
          setSubmitting(false)
        }}
      >
        <Form>
          <Box margin={1}>
            <label htmlFor="name">
              <PersonIcon />
            </label>
            <Field component={TextField} name="name" type="text" />
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