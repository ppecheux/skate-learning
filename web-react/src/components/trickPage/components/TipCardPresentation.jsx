import React, { useContext } from 'react'
import { Skeleton } from '@material-ui/lab'
import { Avatar, IconButton, Badge, Typography, Grid } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { UserContext } from '../../../UserContext'
import { Link } from 'react-router-dom'
import { VoteHeart } from './VoteHeart'

export default function TipCardPresentation({ tip: { id, text, voters, loading, author } }) {
  const { user } = useContext(UserContext)
  let tipText = (
    <Skeleton>
      <Typography >
        {"x".repeat(250)}
      </Typography>
    </Skeleton>
  )

  if (text) {
    tipText = <Typography >{text}</Typography>
  }

  return (
    <Grid container
      direction="column"
      justify="center"
      alignItems="stretch">
      <Grid item>
        {tipText}
      </Grid>
      <Grid container
        direction="row"
        justify="space-between"
        alignItems="center">
        <Grid item>
          <VoteHeart voters={voters} user={user} id={id} />
        </Grid>
        <Grid item>

          <AuthorSignature author={author} user={user} />
        </Grid>

      </Grid>
    </Grid>
  )
}



function AuthorSignature({ author: { profilePicture, reputation, name, id }, user }) {

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        {
          (user && user.id === id)
          &&
          <IconButton>
            <Edit />
          </IconButton>
        }
        <Link to={"/profile/" + id}>
          <Badge color="secondary" badgeContent={reputation || 0} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>
            <Avatar alt={name} src={profilePicture || "use_alt"} />
          </Badge>
        </Link>
      </Grid>
      <Grid item>
        <Typography>
          {name}
        </Typography>
      </Grid>
    </Grid>
  )
}