// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    greeting(name: String): String!
    add(a: Float!, b: Float!): Float!
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
    me () {
      return {
        id: 's0m3R4nD0mID',
        name: 'Dhruv Saxena',
        email: 'saxenadhruv1927@gmail.com'
      }
    },
    post () {
      return {
        id: '4n07H3rR4nD0mID',
        title: 'The Subtle Art of Not Giving a F*ck',
        body: 'A Counterintuitive approach to living a good life',
        published: true
      }
    },
    greeting(parent, { name }, ctx, info) {
      return !name ? 'Hello' : `Hello ${name}`
    },
    add (parent, {a, b}, ctx, info) {
      return a + b
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
