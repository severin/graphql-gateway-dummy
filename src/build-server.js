const { ApolloServer } = require('apollo-server-express')
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core')
const express = require('express')
const http = require('http')

const SERVER_HOST = '0.0.0.0'
const SERVER_PORT = 4000
const SERVER_PATH = '/'

const app = express()
const httpServer = http.createServer(app)

// Some express middlewares...
// app.use(...)

async function buildServer(schema, options = { plugins: [] }) {
  const apolloServer = new ApolloServer({
    schema,
    context: async (context) => {
      const traceMetadata = {}
      // Fetching some tracing data...

      return {
        ...context,
        traceMetadata,
      }
    },
    plugins: options.plugins,
    debug: process.env.LOG_LEVEL == 'debug',
  })

  return apolloServer
}

async function startServer(schema) {
  const plugins = [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageGraphQLPlayground,
    // Some more plugins...
  ]

  const apolloServer = await buildServer(schema, { plugins })

  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: SERVER_PATH,
  })

  httpServer.listen({ host: SERVER_HOST, port: SERVER_PORT })

  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 Server ready at http://${SERVER_HOST}:${SERVER_PORT}${SERVER_PATH}`)
  }

  return apolloServer
}

module.exports = {
  buildServer,
  startServer,
}
