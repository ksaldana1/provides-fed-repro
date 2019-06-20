const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    echo(input: String!): EchoResponse!
  }

  extend type Kitchen @key(fields: "id") {
    id: ID! @external
  }

  type User @key(fields: "username") {
    username: ID!
    firstName: String!
    kitchen: Kitchen
    lastName: String!
  }

  type EchoResponse {
    message: String!
    query: Query
  }
`;

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers: {
        Query: {
          me: () => {
            return {
              username: 'happy-user',
              firstName: 'Happy',
              lastName: 'User',
              kitchenId: '1',
              kitchenName: 'What is Consistency',
            };
          },
        },
        Mutation: {
          echo: (_, args) => {
            return { message: args.input, query: { __typename: 'Query' } };
          },
        },
        User: {
          kitchen: user => {
            return { id: user.kitchenId };
          },
        },
      },
    },
  ]),
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
