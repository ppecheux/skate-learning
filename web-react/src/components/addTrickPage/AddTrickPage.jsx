import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Formik, Form, Field } from 'formik'
import {
  Typography,
  IconButton,
  Grid,
  Box,
  makeStyles,
} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import {
  Save as SaveIcon,
  Title as TitleIcon,
  Assignment as AssignmentIcon,
  AttachFile as AttachFileIcon,
} from '@material-ui/icons'
import * as yup from 'yup'
import CircularProgress from '@material-ui/core/CircularProgress'

export const AddTrickPage = ({ userId: id }) => {
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
    { error: cTerror, loading: cTloading, data: { CreateTrick } = {} },
  ] = useMutation(gql`
    mutation($name: String!) {
      CreateTrick(name: $name) {
        name
      }
    }
  `)

  const [
    addTrickAuthor,
    { error: aTerror, loading: aTloading, data: { AddTrickAuthor } = {} }
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
    if (CreateTrick) {
      console.log(CreateTrick)
      addTrickAuthor({
        variables: {
          trick: {
            name: CreateTrick.name
          },
          author: {
            id: id
          }
        }
      })
    }
  }, [CreateTrick, addTrickAuthor, id])

  useEffect(() => {
    if (AddTrickAuthor) {
      console.log(AddTrickAuthor)
      history.push('tricks/' + encodeURIComponent(AddTrickAuthor.to.name))
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
          biography: '',
        }}
        validationSchema={yup.object({
          mediaLink: yup.string().url(),
          tip: yup.string().max(500),
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
                <Field
                  component={TextField}
                  name="tip"
                  type="text"
                  multiline={true}
                  rows="3"
                  variant="outlined"
                  margin="normal"
                />
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
