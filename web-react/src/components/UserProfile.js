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


export default function UserProfile({ userId, classes }) {

  const { loading, error, data } = useQuery(gql`
    query UserQuery($id: ID!) {
      User(id: $id, first:1) {
        _id,
        profilePicture,
        name,
        biography
      }
    }
    `, {
    variables: { id: userId }
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
            user.loading
              ? <Skeleton variant="circle"><Avatar /></Skeleton>
              : <Avatar alt={user.name} src={user.profilePicture} style={avatarStyle} />

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
              user.name
                ? user.name
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
