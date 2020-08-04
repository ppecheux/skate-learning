import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import GoogleButton from './components/GoogleButton'
import UserProfileForm from './components/UserProfileForm'
import { TricksPage } from './components/tricksPage/TricksPage'
import { AddTrickPage } from './components/addTrickPage/AddTrickPage'
import { RouteWithId } from './components/RouteWithId'
import TrickPage from './components/trickPage/TrickPage'
import ErrorPage from './components/ErrorPage'

function AppRouter({ classes }) {
  return (
    <Switch classes={classes}>
      <Route exact path="/" component={TricksPage} />
      <RouteWithId exact path="/addTrick" component={AddTrickPage} />
      <Route exact path="/users" component={UserList} />
      <Route
        exact path="/profile/:id"
        classes={classes}
        component={UserProfile} />
      <Route exact path="/login" component={GoogleButton} />
      <Route exact path="/trick/:name" component={TrickPage} />
      <RouteWithId exact path="/editProfile" component={UserProfileForm} />
      <Route render={() => <ErrorPage code="404" message="page not found" />} />
    </Switch>
  )
}

export default AppRouter
