// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    add(numbers: [Float!]!): Float!
  }
`;

// Resolvers (Set of functions)
const resolvers = {
  Query: {
    add (parent, { numbers }, ctx, into) {
      if (numbers.length <= 0) return 0
      return numbers.reduce((total, current) => total += current)
    }
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
