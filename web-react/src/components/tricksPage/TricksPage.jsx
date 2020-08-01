import React, { useContext } from 'react'
import AddTrickNameForm from "../addTrickPage/components/AddTrickNameForm";
import { useQuery } from '@apollo/react-hooks'
import TrickCard from './components/TrickCard'
import { ListItem, List } from '@material-ui/core'
import gql from 'graphql-tag';
import { UserContext } from "../../UserContext";

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
        <AddTrickNameForm />
      </>
    )
  }
}

function TricksList({ loadingTricks, tricks, progress, loadingCircularProgress }) {
  let items = null
  const { user } = useContext(UserContext)
  if (loadingTricks) {
    tricks = [...Array(10).keys()]
    items = tricks.map(trick => <ListItem key={trick}><TrickCard loadingTricks /></ListItem>)
  } else if (tricks) {
    const names = new Set(tricks.map(trick => trick.name))
    items = [...names].map(name => <ListItem key={name}>
      <TrickCard
        name={name}
        loadingCircularProgress={loadingCircularProgress}
        email={user.email}
        progress={progress} />
    </ListItem>)
  }
  return (
    <List>
      {items}
    </List>

  )
}
