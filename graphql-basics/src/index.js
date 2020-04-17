// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// demo user data 
const users = [{
  id: '1',
  name: 'Dhruv Saxena',
  email: 'dhruv@example.com',
  age: 22
}, {
  id: '2',
  name: 'SomAeone',
  email: 'someone@example.com'
}, {
  id: '3',
  name: 'Mike',
  email: 'mike@example.com',
  age: 32
}]

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!  
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }

`;

// Resolvers (Set of functions)
const resolvers = {
  Query: {
    users (parent, args, ctx, info) {
      if (!args.query) return users
      return users.filter(u => u.name.toLowerCase().includes(args.query.toLowerCase()))
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
