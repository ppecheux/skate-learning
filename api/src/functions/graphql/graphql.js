// This module can be used to serve the GraphQL endpoint
// as a lambda function

const { ApolloServer } = require('apollo-server-lambda')
const { makeAugmentedSchema } = require('neo4j-graphql-js')
const neo4j = require('neo4j-driver')
const { IsAuthenticatedDirective, HasRoleDirective, HasScopeDirective } = require('graphql-auth-directives')
const resolvers = require('../../resolvers')
// This module is copied during the build step
// Be sure to run `npm run build`
const { typeDefs } = require('./graphql-schema')

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  ),
  {
    encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
  }
)

const server = new ApolloServer({
  schema: makeAugmentedSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
    schemaDirectives: {
      isAuthenticated: IsAuthenticatedDirective,
      hasRole: HasRoleDirective,
      hasScope: HasScopeDirective
    },
    config: {
      query: {
        exclude: ['RatingCount'],
      },
      mutation: {
        exclude: ['RatingCount', 'SignInResponse'],
      },
    },
  }),
  context: { driver, neo4jDatabase: process.env.NEO4J_DATABASE },
})

exports.handler = server.createHandler()
