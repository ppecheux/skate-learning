import React from 'react'
import Cookies from 'universal-cookie'
import { decode } from 'jsonwebtoken'

const cookies = new Cookies()

export default function WithEmail({ component: Component, ...rest }) {
  const token = cookies.get('accessToken')
  let email = null

  if (!token) {
    console.log('no token found')
  } else {
    const user = decode(token)
    if (!user || !user.userEmail) {
      console.log('userEmail not in token')
    } else {
      email = user.userEmail
    }
  }
  return (
    <Component {...{ ...rest, email }} />
  )
}
