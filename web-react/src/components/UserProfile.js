import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid';
import { decode } from 'jsonwebtoken'
import { useQuery } from '@apollo/react-hooks'
import Cookies from 'universal-cookie';
import gql from 'graphql-tag';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';

const cookies = new Cookies();
const token = cookies.get('accessToken')

function UserProfileGrid({ user, classes }) {

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
  const avatarStyle = { height: null }
  let avatar = <Avatar style={avatarStyle}>
    <PersonIcon />
  </Avatar>
  if (loading || error || !data.User || !data.User.length) {
    if (error) {
      console.log(error)
      user = { given_name: "Error" }
    } else if (loading) {
      user = { given_name: "Loading" }
    } else {
      user = { given_name: "no User" }
    }
  } else {
    user = data.User[0]
    avatar = <Avatar alt={user.given_name} src={user.profilePicture} style={avatarStyle} />
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        {avatar}
      </Grid>
      <Grid item xs>
        <Typography
          component="h3"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {user.given_name}
        </Typography>
      </Grid>
      <Grid item xs>
        <Link to="/editProfile">
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <EditIcon />
          </IconButton>
        </Link>
      </Grid>
    </Grid>
  )
}


export default function UserPorfile({ classes }) {
  if (!token) {
    console.log("profile not generated because no token found")
    return (null)
  }
  const user = decode(token);
  if (!user || !user.userEmail) {
    console.log("profile not generated because userEmail not in token")
    return (null)
  }

  return (
    <UserProfileGrid user={user} classes={classes} />
  )
} 
