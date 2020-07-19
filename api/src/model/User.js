import ApolloClient from 'apollo-client'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag';

dotenv.config()

const {
    GRAPHQL_SERVER_HOST: host,
    GRAPHQL_SERVER_PORT: port,
    GRAPHQL_SERVER_PATH: path,
} = process.env

const uri = `http://${host}:${port}${path}`
const client = new ApolloClient({
    link: new HttpLink({ uri, fetch }),
    cache: new InMemoryCache(),
})

const GET_USER_COUNT_QUERY = gql`
query UserQuery($email: String!) {
  User(email: $email) {
    count
  }
}
`

const ADD_NEW_USER = gql`
mutation ($email: String!, $given_name: String, $family_name: String, $profilePicture: String){
    CreateUser(email: $email, given_name: $given_name, family_name: $family_name, profilePicture: $profilePicture, count: 0) {
        email
        count
    }  
}
`

export async function signInDb(user) {
    let json
    try {// find user
        json = await client.query({
            query: GET_USER_COUNT_QUERY,
            variables: { email: user.email },
            fetchPolicy: 'network-only'
        })
    } catch (err) {
        console.log(err)
    }
    if (json.data && json.data.User && json.data.User.length) {
        return json.data.User[0]
    } else {

        try {//create user

            json = await client.mutate({
                mutation: ADD_NEW_USER,
                variables: {
                    email: user.email,
                    given_name: user.given_name,
                    family_name: user.family_name,
                    profilePicture: user.profilePicture
                }
            })

        } catch (err) {
            console.log(err)
        }
        return json.data.CreateUser
    }

}