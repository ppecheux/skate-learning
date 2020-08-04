import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
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
import { UserContext } from '../UserContext'

export default function UserProfile({ match: { params: { id } } }) {
  const { user: currentUser } = useContext(UserContext)
  let history = useHistory()
  const { loading, error, data } = useQuery(gql`
    query UserQuery($id: ID!) {
      User(id: $id, first:1) {
        id,
        profilePicture,
        name,
        biography
      }
    }
    `, {
    variables: { id }
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
      console.log("user has not been found in db")
      history.push("/profile/" + currentUser.id)
    }
  } else {
    user = data.User[0]
  }

  if (!user) {
    history.push("/error/404 User not found");
    return null
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          {
            user.loading
              ? <Skeleton variant="circle"><Avatar /></Skeleton>
              : <Avatar alt={user.name.toUpperCase()} src={user.profilePicture || "useAlt"} style={avatarStyle} />

          }
        </Grid>
        <Grid item xs>
          <Typography
            variant="h4"
            color="inherit"
            noWrap
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
        {
          (currentUser.id === id)
          &&
          <Grid item xs>
            <Link to="/editProfile">
              <IconButton
                aria-label="edit profile"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <EditIcon />
              </IconButton>
            </Link>
          </Grid>
        }
      </Grid>
      <Typography
        color="inherit"
        noWrap
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
