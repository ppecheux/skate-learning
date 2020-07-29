import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import { decode } from 'jsonwebtoken'

const cookies = new Cookies();

export const RouteWithEmail = ({ component: Component, ...rest }) => {
    const token = cookies.get('accessToken')
    let email = null

    if (!token) {
        console.log("no token found")
    } else {
        const user = decode(token);
        if (!user || !user.userEmail) {
            console.log("userEmail not in token")
        } else {
            email = user.userEmail
        }
    }

    return (
        <Route
            {...rest}
            render={props =>
                email ? (
                    <Component {...{ ...props, email }} />
                ) : (
                        <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
                    )
            }
        />
    );
}