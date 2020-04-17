// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Schema)
const typeDefs = `
"# root query"
  type Query {
    me: User!
  }
  
"# creating new custom type User"
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;

// Resolvers (Set of functions)
const resolvers = {
  Query: {
    me () {
      return {
        id: 's0m3R4nD0mID',
        name: 'Dhruv Saxena',
        email: 'saxenadhruv1927@gmail.com'
      }
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
