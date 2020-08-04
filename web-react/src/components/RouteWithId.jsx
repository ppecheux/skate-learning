import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { decode } from 'jsonwebtoken'

const cookies = new Cookies()

export const RouteWithId = ({ component: Component, ...rest }) => {
  const token = cookies.get('accessToken')
  let userId = null

  if (!token) {
    console.log('no token found')
  } else {
    const user = decode(token)
    if (!user || !user.userId) {
      console.log('userId not in token')
    } else {
      userId = user.userId
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        userId ? (
          <Component {...{ ...rest, ...props, userId }} />
        ) : (
            <Redirect
              to={{ pathname: '/login', state: { referer: props.location } }}
            />
          )
      }
    />
  )
}
