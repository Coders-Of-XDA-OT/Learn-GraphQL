// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// 5 - Scalar type of graphql (data-type that holds single value)
/* 
  String
  Boolean
  Number
    - Int
    - Float
  ID
*/

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`;

// Resolvers (Set of functions)
const resolvers = {
  Query: {
    title () { return 'Back to the future' },
    price () { return 7.99 },
    releaseYear () { return 1985 },
    rating () { return 8.5 },
    inStock () { return true }
  },
};

// creating server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is up");
});
