import React from 'react'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import Cookies from 'universal-cookie';
import { Toolbar, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx'
import { decode } from 'jsonwebtoken'

import {
  Menu as MenuIcon,
} from '@material-ui/icons'

const cookies = new Cookies();

const loginPicture = <IconButton
  aria-label="account of current user"
  aria-controls="menu-appbar"
  aria-haspopup="true"
  color="inherit"
>
  <Link to="/login">
    <AccountCircle />
  </Link>
</IconButton>


function ProfilePictureOrLogin(props) {
  const classes = props.classes
  const user = decode(props.token);
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
      <Link to="/profile">
        <Avatar alt={data.User[0].given_name} src={data.User[0].profilePicture} href="/profile" className={classes.orange} />
      </Link>
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
