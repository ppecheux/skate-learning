import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Typography, CircularProgress } from '@material-ui/core'
import AddTipToTrick from './components/AddTipToTrick'
import AddTrickNameForm from '../addTrickPage/components/AddTrickNameForm'
import { Alert, AlertTitle } from '@material-ui/lab';
import TipCardPresentation from './components/TipCardPresentation'

export default function TrickPage({ match: { params: { name } } }) {
  const [countCreated, setCountCreated] = useState(0)
  const { error, loading, data: { Trick: tricks } = {}, refetch } = useQuery(gql`
  query Trick($name: String!){
  Trick(name:$name, first:1){
    author{
      name
    },
    tips{
      id
      author{
        reputation
        id
        name
        profilePicture
      }
      text
      voters{
        id
      }
    }
  }
}
  `, {
    variables: { name },
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    if (countCreated) {
      setCountCreated(0)
      refetch()
    }
  }, [refetch, countCreated])

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
          {
            tricks[0].tips
            && tricks[0].tips.map(
              (tip, idx) =>
                <TipCardPresentation
                  key={idx}
                  tip={tip} />
            )}
          <AddTipToTrick
            trickName={name}
            countCreated={countCreated}
            setCountCreated={setCountCreated} />
        </>
        :
        <>
          <Alert severity="warning">
            <AlertTitle>
              {name} not found
              </AlertTitle>
  this trick is not on the website but you can add it
</Alert>
          <AddTrickNameForm />
        </>
    )

  }
}