
import React from "react";
import { Switch, Route } from "react-router-dom";
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import GoogleBtn from './components/GoogleBtn'
import UserProfileForm from './components/UserProfileForm'
import { TricksPage } from './components/tricksPage/TricksPage'
import { AddTrickPage } from './components/addTrickPage/AddTrickPage'
import { RouteWithEmail } from './components/RouteWithEmail'

function AppRouter({ classes }) {
    return (
        <Switch classes={classes}>
            <Route exact path="/" component={TricksPage} />
            <RouteWithEmail exact path="/addTrick" component={AddTrickPage} />
            <Route exact path="/businesses" component={UserProfile} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/profile" render={(classes) => <UserProfile classes={classes} />} />
            <Route exact path="/login" component={GoogleBtn} />
            <RouteWithEmail exact path="/editProfile" component={UserProfileForm} />
        </Switch>
    );
}

export default AppRouter;