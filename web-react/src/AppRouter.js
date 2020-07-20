
import React, { useState, useMemo } from "react";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import Dashboard from './components/Dashboard'
import GoogleBtn from './components/GoogleBtn'

function AppRouter() {
    const [user, setUser] = useState(null);

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (


        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/businesses" component={UserProfile} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/login" component={GoogleBtn} />

        </Switch>

    );
}

export default AppRouter;