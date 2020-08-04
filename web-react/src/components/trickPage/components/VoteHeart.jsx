import React, { useState } from 'react'
import { IconButton, Badge } from '@material-ui/core'
import { FavoriteBorder, Favorite, FavoriteTwoTone } from '@material-ui/icons'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import gql from 'graphql-tag'


export function VoteHeart({ voters, user, id }) {
  let history = useHistory()
  const [voteCount, setVoteCount] = useState(voters.length || 0)
  const [voted, setVoted] = useState(voters && user.id ? voters.filter(voter => voter.id === user.id).length : false)

  let [
    addTipVoters,
    { error: aerror, loading: aloading }
  ] = useMutation(gql`
        mutation AddTipVoters($user: _UserInput!,$tip: _TipInput!){
          AddTipVoters(from:$user, to:$tip){
            from{
              id
            }
            to{
              id
            }
          }
        }
        `, {
    onCompleted() {
      setVoteCount(voteCount + 1)
      setVoted(true)
    }
  }
  )

  let [
    removeTipVoters,
    { error: rerror, loading: rloading }
  ] = useMutation(gql`
      mutation RemoveTipVoters($user: _UserInput!,$tip: _TipInput!){
        RemoveTipVoters(from:$user, to:$tip){
        from{
          id
        }
        to{
          id
        }
      }
      }
      `, {
    onCompleted() {
      setVoteCount(voteCount - 1)
      setVoted(false)
    }
  })

  function vote() {
    if (user.id) {

      const variables = {
        user: {
          id: user.id
        },
        tip: {
          id
        }
      }
      if (voted) {
        removeTipVoters({ variables })
      } else {
        addTipVoters({ variables })
      }
    } else {
      localStorage.setItem('referrer', window.location.pathname)
      history.push('/login')
    }
  }

  if (aerror || rerror) {
    console.log(aerror || rerror)
  }

  return (
    <IconButton onClick={vote} >
      <Badge badgeContent={voteCount}>
        {
          (aloading || rloading)
            ? <FavoriteTwoTone />
            : voted
              ? <Favorite />
              : <FavoriteBorder />
        }
      </Badge>
    </IconButton>
  )
}