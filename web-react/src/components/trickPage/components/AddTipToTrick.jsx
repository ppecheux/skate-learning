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

export default function AddTipToTrick({ trickName, countCreated, setCountCreated }) {
  const { user } = useContext(UserContext)
  let history = useHistory();

  const [
    createTip,
    { error: cTerror, data: { CreateTip } = {} },
  ] = useMutation(gql`
    mutation($text: String!) {
      CreateTip(text: $text) {
        id
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
      id
    }
    to {
      id
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
      id
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
            id: CreateTip.id
          },
          author: {
            id: user.id
          }
        }
      })
      addTipTrick({
        variables: {
          tip: {
            id: CreateTip.id
          },
          trick: {
            name: trickName
          }
        }
      })
    }
  }, [CreateTip, addTipTrick, addTipAuthor, user.id, trickName])

  useEffect(() => {
    if (AddTipTrick && AddTipAuthor) {
      console.log(AddTipTrick)
      setCountCreated(countCreated + 1)
    }
  }, [AddTipTrick, AddTipAuthor, history])

  return (
    user.id
      ?
      <Formik
        initialValues={{
          tip: ''
        }}
        validationSchema={yup.object({
          tip: yup
            .string()
            .max(1000)
            .required()
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          values.tip && createTip({
            variables: { text: values.tip }
          })
          setSubmitting(false)
        }}
      >
        <Form>

          <label htmlFor="tip">
            <Assignment />
          </label>

          <Field
            component={TextField}
            name="tip"
            type="text"
            multiline={true}
            rows="3"
            variant="outlined"
            margin="normal"
          />


          <IconButton type="submit">
            <Save />
          </IconButton>
        </Form>
      </Formik>
      : null
  )
}

