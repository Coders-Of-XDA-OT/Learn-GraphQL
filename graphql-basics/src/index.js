// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    grades: [Int!]!
  }
`;

// Resolvers (Set of functions)
const resolvers = {
  Query: {
    grades (parent, args, ctx, into) {
      return [99, 70, 80, 93, 91]
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
