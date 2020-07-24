
import React from "react";
import { Switch, Route } from "react-router-dom";
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import Dashboard from './components/Dashboard'
import GoogleBtn from './components/GoogleBtn'

function AppRouter({ classes }) {
    return (
        <Switch classes={classes}>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/businesses" component={UserProfile} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/profile" render={(classes) => <UserProfile classes={classes} />} />
            <Route exact path="/login" component={GoogleBtn} />
        </Switch>
    );
}

export default AppRouter;