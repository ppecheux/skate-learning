import React from "react";
import InstagramLogin from 'react-instagram-login';

export default function InstagramAuth() {
  const responseInstagram = (response) => {
    console.log(response);
  }

  return <InstagramLogin
    clientId={process.env.REACT_APP_INSTAGRAM_ID}
    buttonText="Login"
    scope="user_profile,user_media"
    onSuccess={responseInstagram}
    onFailure={responseInstagram}
  />

}