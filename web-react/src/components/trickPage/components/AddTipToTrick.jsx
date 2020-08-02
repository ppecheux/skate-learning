import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../../UserContext'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Formik, Form, Field } from 'formik'
import {
  IconButton,
  Grid,
} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import {
  Save,
  Assignment
} from '@material-ui/icons'
import * as yup from 'yup'

export default function AddTipToTrick({ trickName }) {
  const { user } = useContext(UserContext)
  let history = useHistory();

  const [
    createTip,
    { error: cTerror, data: { CreateTip } = {} },
  ] = useMutation(gql`
    mutation($text: String!) {
      CreateTip(text: $text) {
        _id
      }
    }
  `)

  const [
    addTipAuthor,
    { error: aTAerror, data: { AddTipAuthor } = {} }
  ] = useMutation(gql`
  mutation AddTipAuthor($tip: _TipInput!, $author: _UserInput!) {
  AddTipAuthor(from: $author, to: $tip) {
    from {
      email
    }
    to {
      _id
    }
  }
}
`)


  const [
    addTipTrick,
    { error: aTTerror, data: { AddTipTrick } = {} }
  ] = useMutation(gql`
mutation AddTipTrick($trick: _TrickInput!, $tip: _TipInput!) {
  AddTipTrick(from: $tip, to: $trick) {
    from {
      _id
    }
    to {
      name
    }
  }
}
`)

  useEffect(() => {
    let error = aTTerror || cTerror || aTAerror
    if (error) {
      console.log(error)
    }
  }, [aTTerror, cTerror, aTAerror])

  useEffect(() => {
    if (CreateTip) {
      addTipAuthor({
        variables: {
          tip: {
            _id: CreateTip._id
          },
          author: {
            email: user.email
          }
        }
      })
      addTipTrick({
        variables: {
          tip: {
            _id: CreateTip._id
          },
          trick: {
            name: trickName
          }
        }
      })
    }
  }, [CreateTip, addTipTrick, addTipAuthor, user.email, trickName])

  useEffect(() => {
    if (AddTipTrick && AddTipAuthor) {
      console.log(AddTipTrick)
      //refresh tips in trick page
    }
  }, [AddTipTrick, AddTipAuthor, history])

  return (
    user.email
      ?
      <Formik
        initialValues={{
          text: '',
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .max(1000)
            .required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          values.text && createTip({
            variables: { text: values.text }
          })
          setSubmitting(false)
        }}
      >
        <Grid container justify="center">
          <Form>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <label htmlFor="tip">
                  <Assignment />
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
            <IconButton color="primary" type="submit">
              <Save />
            </IconButton>
          </Form>
        </Grid>
      </Formik>
      : null
  )
}

