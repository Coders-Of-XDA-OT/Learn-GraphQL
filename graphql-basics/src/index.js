// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// demo data 
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

const posts = [{
  id: '1',
  title: 'HP 1',
  body: 'Harry Potter 1',
  published: true
}, {
  id: '2',
  title: 'HP 2',
  body: 'Harry Potter 2',
  published: true
}, {
  id: '3',
  title: 'HP 3',
  body: 'Harry Potter 3',
  published: false
},]

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: Boolean): [Post!]!
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
    },
    posts (parent, args, ctx, info) {
      if (args.query !== undefined)
        return posts.filter(p => p.published === args.query)
      else return posts
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
