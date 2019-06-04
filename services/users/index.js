const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  extend type Query {
    user: User
  }
  extend type Kitchen @key(fields: "id") {
    id: ID! @external
    name: String! @external
  }

  type User @key(fields: "username") {
    firstName: String!
    lastName: String!
    roles: [String!]!
    emailAddress: String!
    username: String!
    kitchen: Kitchen @provides(fields: "name")
  }
`;

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
    },
  ]),
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const usernames = [{ id: '1', username: '@ada' }, { id: '2', username: '@complete' }];
const reviews = [
  {
    id: '1',
    authorID: '1',
    product: { upc: '1' },
    body: 'Love it!',
  },
  {
    id: '2',
    authorID: '1',
    product: { upc: '2' },
    body: 'Too expensive.',
  },
  {
    id: '3',
    authorID: '2',
    product: { upc: '3' },
    body: 'Could be better.',
  },
  {
    id: '4',
    authorID: '2',
    product: { upc: '1' },
    body: 'Prefer something else.',
  },
];
