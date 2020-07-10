import React, { Component, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles'
import { GoogleLogin } from 'react-google-login'
import dotenv from 'dotenv'
import { withUserContext } from '../UserContext';

import {
  Paper
} from '@material-ui/core'

import Title from './Title'
console.log(process.env)

dotenv.config()

const {
  REACT_APP_GOOGLE_LOGIN_CLIENT_ID: clientId,
} = process.env
const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  }
})


class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this)

  }

  login(response) {

    if (response.accessToken !== undefined) {
      this.setState({
        isLogined: true,
        accessToken: response.accessToken
      });
    }
  }

  render() {
    console.log(this.props.userProvider.user)
    return (

      <Paper className={this.props.root}>
        <Title>User Profile</Title>
        <pre>{JSON.stringify(this.props.userProvider.user, null, 2)}</pre>

        <GoogleLogin
          clientId={clientId}
          onSuccess={this.login}
          isSignedIn={true}
        />

      </Paper>
    )
  }
}

export default withStyles(styles)(withUserContext(UserProfile))
