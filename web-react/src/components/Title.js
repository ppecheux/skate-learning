import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default function Title(props) {
  const { loading, error, data } = useQuery(gql`{
    hello
  }
  `)
  if (error) {
    console.log(cookies.get('accessToken'))
    console.log(error)
    return <p>Error</p>
  }
  if (loading) return <p>Loading</p>
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}

    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.node,
}
