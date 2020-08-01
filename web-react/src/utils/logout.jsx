import Cookies from 'universal-cookie';
import React from 'react'
import { Redirect } from 'react-router-dom'

const cookies = new Cookies();
export default function logout(setUser) {
  for (const cookie of ["accessToken", "refreshToken"]) {
    cookies.remove(cookie)
  }
  setUser({ email: '', reputation: 0 });
  return <Redirect to="/" />
}