const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Kitchen @key(fields: "id") {
    id: ID! @external
    name: String @external
  }

  type User @key(fields: "username") {
    username: ID!
    firstName: String!
    kitchen: Kitchen @provides(fields: "name")
    lastName: String!
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
        User: {
          kitchen: user => {
            return { id: user.kitchenId, name: user.kitchenName };
          },
        },
      },
    },
  ]),
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
