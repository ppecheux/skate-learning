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
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';

const cookies = new Cookies();
const token = cookies.get('accessToken')

function UserProfileGrid({ user, classes }) {

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
    variables: { email: user.userEmail }
  })
  const avatarStyle = { height: null }
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
