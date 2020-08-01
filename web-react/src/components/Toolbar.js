import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { Toolbar, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ProfilePictureMenu from './ProfilePictureMenu'

import {
  FormatListBulleted as FormatListBulletedIcon,
} from '@material-ui/icons'


const loginPicture =
  <Link to="/login">
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      color="inherit"
    >
      <AccountCircle style={{ color: "white" }} />
    </IconButton>
  </Link>


function ProfilePictureOrLogin({ classes, email }) {

  const { loading, error, data } = useQuery(gql`
    query UserQuery($email: String!) {
      User(email: $email, first:1) {
        profilePicture,
        given_name
      }
    }
    `, {
    variables: { email }
  })

  if (loading || error || !data.User || !data.User.length) {
    if (error) {
      console.log(error)
    }
    return (
      loginPicture
    )
  } else {
    return (
      <ProfilePictureMenu classes={classes} user={data.User[0]} />

    )
  }

}

export function TopToolbar({ classes }) {
  const { user } = useContext(UserContext)

  return (
    <Toolbar className={classes.toolbar}>
      <Link to="/">
        <IconButton
          aria-label="trick list"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <FormatListBulletedIcon style={{ color: "white" }} />
        </IconButton>
      </Link>
      {
        user.email ? <ProfilePictureOrLogin classes={classes} email={user.email} /> : loginPicture
      }
    </Toolbar>

  )
}
