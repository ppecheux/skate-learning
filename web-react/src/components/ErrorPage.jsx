import React from 'react'
import { Typography } from "@material-ui/core";

export default function ErrorPage({ code, message }) {
  return (
    <>
      <Typography variant='h3'>
        Oops this is an error
    </Typography>
      <Typography variant='h1'>
        {code}
      </Typography>
      <Typography>
        {message}
      </Typography>
    </>
  )
}