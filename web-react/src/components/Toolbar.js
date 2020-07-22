import React from 'react'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import Cookies from 'universal-cookie';
import { Toolbar, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx'
import { decode } from 'jsonwebtoken'
import ProfilePictureMenu from './ProfilePictureMenu'

import {
  Menu as MenuIcon,
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
      User(email: $email) {
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

export function TopToolbar(props) {
  const classes = props.classes
  const handleDrawerOpen = props.handleDrawerOpen
  const open = props.open
  const token = cookies.get('accessToken')
  return (
    <Toolbar className={classes.toolbar}>

      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        className={clsx(
          classes.menuButton,
          open && classes.menuButtonHidden
        )}
      >
        <MenuIcon />
      </IconButton>
      <img
        className={classes.appBarImage}
        src="img/grandstack.png"
        alt="GRANDstack logo"
      />
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
      >
        Start learning skateboard
    </Typography>
      {
        token ? <ProfilePictureOrLogin classes={classes} token={token} /> : loginPicture
      }
    </Toolbar>

  )
}
