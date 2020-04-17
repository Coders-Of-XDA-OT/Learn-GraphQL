// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Schema)
const typeDefs = `
    type Query {
        helloWorld: String!
    }
`;

// Resolvers (Set of functions)
const resolvers = {
  Query: {
    helloWorld() {
      return "Hello World";
    },
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
