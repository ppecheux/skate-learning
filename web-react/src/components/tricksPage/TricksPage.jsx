import React from 'react'
import AddTrickCard from "./components/AddTrickCard";
import { useQuery } from '@apollo/react-hooks'
import TrickCard from './components/TrickCard'
import { ListItem, List } from '@material-ui/core'
import gql from 'graphql-tag';

export function TricksPage() {
  const { loading: loadTricks, error: errorTricks, data: { Trick: tricks } = {} } = useQuery(gql`
query TrickQuery{
  Trick{
    name
  }
}
    `)
  if (errorTricks) {
    console.log(errorTricks)
    return (null)
  } else {

    return (
      <>
        <TricksList
          loadTricks={loadTricks}
          tricks={tricks}
        />
        <AddTrickCard />
      </>
    )
  }
}

function TricksList({ loadingTricks, tricks, email, progress, loadingCircularProgress }) {
  let items = null
  if (loadingTricks) {
    tricks = [...Array(10).keys()]
    items = tricks.map(trick => <ListItem key={trick}><TrickCard loadingTricks /></ListItem>)
  } else if (tricks) {
    items = tricks.map(trick => <ListItem key={trick.name}>
      <TrickCard
        name={trick.name}
        loadingCircularProgress={loadingCircularProgress}
        email={email}
        progress={progress} />
    </ListItem>)
  }
  return (
    <List>
      {items}
    </List>

  )
}
