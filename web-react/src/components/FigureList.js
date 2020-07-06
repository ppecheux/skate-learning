import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Title from './Title'

const GET_FIGURES_QUERY = gql`
  {
    Figure(first: 10) {
      name,
      aliases
    }
  }
`

export default function Figures() {
  const { loading, error, data } = useQuery(GET_FIGURES_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Figures</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Figure Name</TableCell>
            <TableCell>Aliases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Figure.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.aliases.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
