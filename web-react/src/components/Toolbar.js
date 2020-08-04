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


function ProfilePictureOrLogin({ classes, id }) {

  const { loading, error, data } = useQuery(gql`
    query UserQuery($id: ID!) {
      User(id: $id, first:1) {
        profilePicture,
        name,
        id
      }
    }
    `, {
    variables: { id }
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
        user.id ? <ProfilePictureOrLogin classes={classes} id={user.id} /> : loginPicture
      }
    </Toolbar>

  )
}
