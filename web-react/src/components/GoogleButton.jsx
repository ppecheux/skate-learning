import React, { useContext } from 'react'
import { GoogleLogin } from 'react-google-login';
import { UserContext } from '../UserContext';
import Cookies from 'universal-cookie';
import gql from 'graphql-tag';
import { client } from '../index'
import { decode } from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

const cookies = new Cookies();

export default function GoogleButton(props) {
  const { user, setUser } = useContext(UserContext)
  let history = useHistory();

  const login = async (response) => {
    if (response.accessToken !== undefined) {
      const newUser = await client.query({
        query: gql`
                query getSignIn($tokenId: String!){
                    signInGoogle(tokenId: $tokenId){
                        code,
                        success, 
                        message, 
                        accessToken,
                        refreshToken
                    }
                }
                `
        ,
        variables: {
          tokenId: response.getAuthResponse().id_token
        }
      })
      if (newUser.data.signInGoogle.success) {

        cookies.set(
          "refreshToken",
          newUser.data.signInGoogle.refreshToken,
          { expires: new Date(Date.now() + 15 * 60) }
        );
        cookies.set(
          "accessToken",
          newUser.data.signInGoogle.accessToken,
          { expires: new Date(Date.now() + 7 * 24 * 60 * 60) });
        const userToken = decode(newUser.data.signInGoogle.accessToken)
        setUser({ ...user, email: userToken.userEmail })
        const referrer = (props && props.location && props.location.state)
          ? props.location.state.referrer
          : null
        history.push(referrer || '/')
      } else {
        console.log(newUser)
      }
    }
  };

  function onFailure({ error, details }) {
    alert(error + JSON.stringify(details))
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
      buttonText='Login'
      onSuccess={login}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      responseType='code,token'
    />
  )
}
