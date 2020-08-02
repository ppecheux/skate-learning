import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Typography, CircularProgress } from '@material-ui/core'
import AddTipToTrick from './components/AddTipToTrick'
import AddTrickNameForm from '../addTrickPage/components/AddTrickNameForm'
import { Alert, AlertTitle } from '@material-ui/lab';

export default function TrickPage({ match: { params: { name } } }) {
  const { error, loading, data: { Trick: tricks } = {} } = useQuery(gql`
  query Trick($name: String!){
  Trick(name:$name, first:1){
    author{
      userName
    },
    tips{
      text
    }
  }
}
  `, {
    variables: { name }
  })

  const titletrick = <Typography variant='h1'>{name}</Typography>

  if (!tricks) {
    if (loading) {
      return (
        <>
          {titletrick}
          <CircularProgress />
        </>
      )
    } else if (error) {
      console.log(error)
      return titletrick
    }
  } else {
    return (


      tricks.length ?
        <>
          {titletrick}
          <AddTipToTrick />
        </>
        :
        <>
          <Alert severity="warning">
            <AlertTitle>{name} not found</AlertTitle>
  this trick is not on the website but you can add it
</Alert>
          <AddTrickNameForm />
        </>
    )

  }
}