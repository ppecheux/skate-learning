import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../../UserContext'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Formik, Form, Field } from 'formik'
import {
  IconButton,
  Grid,
} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import {
  Save as SaveIcon,
  Title as TitleIcon,
} from '@material-ui/icons'
import * as yup from 'yup'
import CircularProgress from '@material-ui/core/CircularProgress'

export default () => {
  const { user } = useContext(UserContext)
  if (!user.id) {
    return null
  }
  let history = useHistory();

  const { loading, error, data: { Trick: tricks } = {} } = useQuery(gql`
    query TrickQuery {
      Trick {
        name
      }
    }
  `)

  const [
    createTrick,
    { error: cTerror, data: { CreateTrick } = {} },
  ] = useMutation(gql`
    mutation($name: String!) {
      CreateTrick(name: $name) {
        name
      }
    }
  `)

  const [
    addTrickAuthor,
    { error: aTerror, data: { AddTrickAuthor } = {} }
  ] = useMutation(gql`
  mutation AddTrickAuthor($trick: _TrickInput!, $author: _UserInput!) {
  AddTrickAuthor(from: $author, to: $trick) {
    from {
      id
    }
    to {
      name
    }
  }
}
`)

  useEffect(() => {
    let error = aTerror || cTerror
    if (error) {
      console.log(error)
    }
  }, [aTerror, cTerror])

  useEffect(() => {
    if (CreateTrick) {
      console.log(CreateTrick)
      addTrickAuthor({
        variables: {
          trick: {
            name: CreateTrick.name
          },
          author: {
            id: user.id
          }
        }
      })
    }
  }, [CreateTrick, addTrickAuthor, user.id])

  useEffect(() => {
    if (AddTrickAuthor) {
      console.log(AddTrickAuthor)
      history.push('trick/' + encodeURIComponent(AddTrickAuthor.to.name))
    }
  }, [AddTrickAuthor, history])


  if (loading) {
    return <CircularProgress />
  } else if (error) {
    console.log(error)
    return null
  }
  if (tricks) {
    return (
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .max(15)
            .required()
            .notOneOf(
              tricks.map((trick) => trick.name),
              'there is already a page for a trick with this name'
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          values.name && createTrick({
            variables: { name: values.name }
          })
          setSubmitting(false)
        }}
      >
        <Grid container justify="center">
          <Form>
            <label htmlFor="name">
              <TitleIcon />
            </label>
            <Field component={TextField} name="name" type="text" placeholder="new trick name" />
            <IconButton color="primary" type="submit">
              <SaveIcon />
            </IconButton>
          </Form>
        </Grid>
      </Formik>
    )
  }
}
