const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  type Query {
    kitchen: Kitchen
  }

  type Kitchen @key(fields: "id") {
    id: ID!
    name: String!
  }
`;

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers: {
        Query: {},
      },
    },
  ]),
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const users = [
  {
    id: '1',
    name: 'Ada Lovelace',
    birthDate: '1815-12-10',
    username: '@ada',
  },
  {
    id: '2',
    name: 'Alan Turing',
    birthDate: '1912-06-23',
    username: '@complete',
  },
];
