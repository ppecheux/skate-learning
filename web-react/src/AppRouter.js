import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import GoogleButton from './components/GoogleButton'
import UserProfileForm from './components/UserProfileForm'
import { TricksPage } from './components/tricksPage/TricksPage'
import { AddTrickPage } from './components/addTrickPage/AddTrickPage'
import { RouteWithEmail } from './components/RouteWithEmail'
import TrickPage from './components/trickPage/TrickPage'

function AppRouter({ classes }) {
  return (
    <Switch classes={classes}>
      <Route exact path="/" component={TricksPage} />
      <RouteWithEmail exact path="/addTrick" component={AddTrickPage} />
      <Route exact path="/users" component={UserList} />
      <RouteWithEmail
        exact path="/profile"
        classes={classes}
        component={UserProfile} />
      <Route exact path="/login" component={GoogleButton} />
      <Route exact path="/trick/:name" component={TrickPage} />
      <RouteWithEmail exact path="/editProfile" component={UserProfileForm} />
    </Switch>
  )
}

export default AppRouter
