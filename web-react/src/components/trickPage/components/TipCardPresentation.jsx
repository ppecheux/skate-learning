import React, { useContext, useState } from 'react'
import { Skeleton } from '@material-ui/lab'
import { Avatar, IconButton, Badge, Typography, Grid } from '@material-ui/core'
import { Edit, FavoriteBorder, Favorite } from '@material-ui/icons'
import { UserContext } from '../../../UserContext'
import { Link } from 'react-router-dom'

export default function TipCardPresentation({ tip, voters, loading, author: { _id, profilePicture, reputation, name } }) {
  const { user } = useContext(UserContext)

  let authorPicture = <Skeleton variant="circle"><Avatar /></Skeleton>
  let tipText = (
    <Skeleton>
      <Typography >
        {"x".repeat(250)}
      </Typography>
    </Skeleton>
  )

  if (_id) {
    authorPicture = (_id === user._id)
      ?
      <IconButton>
        <Edit />
      </IconButton>
      :
      <AuthorSignature profilePicture={profilePicture} reputation={reputation} name={name} />
  }

  if (tip) {
    tipText = <Typography >{tip}</Typography>
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
          <VoteHeart voters={voters} user={user} />

        </Grid>
        <Grid item>

          {authorPicture}
        </Grid>

      </Grid>
    </Grid>
  )
}

function VoteHeart({ voters, user }) {
  const [voteCount, setVoteCount] = useState(voters.length || 0)
  const [voted, setVoted] = useState(voters ? voters.filter(voter => voter === user._id).length : false)

  function handleClick() {
    setVoted(!voted)
    if (voted) {
      setVoteCount(voteCount + 1)
      //mutation for the add relation 
    } else {
      setVoteCount(voteCount - 1)
      //mutation for the remove relation 
    }

  }

  return (
    <IconButton onClick={handleClick} >
      <Badge badgeContent={voteCount}>
        {voted ? <Favorite /> : <FavoriteBorder />}
      </Badge>
    </IconButton>
  )
}

function AuthorSignature({ profilePicture, reputation, name }) {
  return (
    <Grid container >
      <Grid item>

        <Link>
          <Badge color="secondary" badgeContent={reputation || 0} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>
            <Avatar src={profilePicture} alt={name} />
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