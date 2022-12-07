module.exports = {
  sources: [
    {
      name: 'on-running (staging)',
      handler: {
        graphql: {
          endpoint:
            process.env.SOLIDUS_URL || 'https://on:trend@www-staging.on-running.com/graphql',
          operationHeaders: {
            locale: "{context.req.headers['locale']}",
            'x-access-token': "{context.req.headers['x-access-token']}",
            'order-guest-token': "{context.req.headers['order-guest-token']}",
            uuid: "{context.req.headers['uuid']}",
            'session-id': "{context.req.headers['session-id']}",
            'original-url': "{context.req.headers['original-url']}",
            'user-agent': "{context.req.headers['user-agent']}",
          },
        },
      },
    },
    // More sources...
  ],
  additionalTypeDefs: `
    extend type Query {
      gatewayStatus: String!,
    }
  `,
  additionalResolvers: ['../src/gateway-status-resolver.js'],
  merger: 'stitching',
}
