import React from 'react'
import { Link } from 'react-router-dom';
import {
  Avatar,
  Typography,
  IconButton,
  Grid
} from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';


export default function UserProfile({ email, classes }) {

  const { loading, error, data } = useQuery(gql`
    query UserQuery($email: String!) {
      User(email: $email, first:1) {
        _id,
        profilePicture,
        userName,
        biography
      }
    }
    `, {
    variables: { email }
  })
  const avatarStyle = { height: null }
  let user;
  if (loading || error || !data.User || !data.User.length) {
    if (error) {
      console.log(error)
      return (null)
    } else if (loading) {
      user = { loading: true }
    } else {
      user = { notFound: true }
      console.log("user has not been found in db")
      return (null)
    }
  } else {
    user = data.User[0]
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          {
            user.profilePicture
              ? <Avatar alt={user.userName ? user.userName : "n"} src={user.profilePicture} style={avatarStyle} />
              : <Skeleton variant="circle"><Avatar /></Skeleton>

          }
        </Grid>
        <Grid item xs>
          <Typography
            component="h3"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {
              user.userName
                ? user.userName
                : user.loading
                  ? <Skeleton />
                  : "new rider"

            }
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
      <Typography
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
      >
        {
          user.biography
            ? user.biography
            : user.loading
              ? <Skeleton />
              : "Happy to join the askate community 😊"
        }
      </Typography>
    </div>
  )
}
