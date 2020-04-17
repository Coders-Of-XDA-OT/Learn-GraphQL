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
        helloWorld: String!
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;

// Resolvers (Set of functions)
const resolvers = {
  Query: {
    helloWorld() {
      return "Hello World";
    },
    id () {
      return 'b31bbq3'
    },
    name () {
      return 'Dhruv Saxena'
    },
    age () {
      return 22
    },
    employed () {
      return true
    },
    gpa () {
      // returns float or null
      return 3.6
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
