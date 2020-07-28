import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import Cookies from 'universal-cookie';
import { Toolbar, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { decode } from 'jsonwebtoken'
import ProfilePictureMenu from './ProfilePictureMenu'

import {
  FormatListBulleted as FormatListBulletedIcon,
} from '@material-ui/icons'

const cookies = new Cookies();

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


function ProfilePictureOrLogin({ classes, token }) {
  const user = decode(token);
  const { loading, error, data } = useQuery(gql`
    query UserQuery($email: String!) {
      User(email: $email, first:1) {
        profilePicture,
        given_name
      }
    }
    `, {
    variables: { email: user.userEmail }
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

export function TopToolbar({ classes, open, handleDrawerOpen }) {
  const token = cookies.get('accessToken')
  return (
    <Toolbar className={classes.toolbar}>
      <Link to="/">
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <FormatListBulletedIcon style={{ color: "white" }} />
        </IconButton>
      </Link>
      {
        token ? <ProfilePictureOrLogin classes={classes} token={token} /> : loginPicture
      }
    </Toolbar>

  )
}
