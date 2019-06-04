const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  extend type Query {
    kitchen(id: ID!): Kitchen
  }

  type Kitchen @key(fields: "id") {
    id: ID!
    name: String
    food: [Food]
  }

  type Food {
    id: ID!
    name: String!
  }
`;

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers: {
        Query: {
          kitchen: args => {
            return kitchens[args.id];
          },
        },
        Kitchen: {
          __resolveReference: kitchen => {
            return kitchens[kitchen.id];
          },
        },
      },
    },
  ]),
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const kitchens = [
  {
    id: '1',
    name: 'Kitchen 1',
    food: [{ id: '1', name: 'Cereal' }],
  },
  {
    id: '2',
    name: 'Kitchen 2',
    food: [{ id: '2', name: 'Apple' }],
  },
];
