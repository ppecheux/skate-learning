import React, { useState, useMemo, useEffect } from "react";
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import dotenv from 'dotenv'

import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Cookies from 'universal-cookie';
import { UserContext } from "./UserContext";
import { decode } from "jsonwebtoken";
dotenv.config()
const cookies = new Cookies();
const token = cookies.get('accessToken')


const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export let client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const Main = () => {

  const [user, setUser] = useState({ email: token ? decode(token).userEmail : '', reputation: 0 });

  useEffect(() => {
    const authLink = setContext((_, { headers }) => {
      const token = cookies.get('accessToken')
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
  }, [user])

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={value}>
        <App />
      </UserContext.Provider>
    </ApolloProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()
