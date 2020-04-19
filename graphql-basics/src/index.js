import { GraphQLServer } from "graphql-yoga";

import db from "./db"

import Query from "./resolvers/Query"
import Mutation from "./resolvers/Mutation"
import User from "./resolvers/User"
import Post from "./resolvers/Post"
import Comment from "./resolvers/Comment"

// creating server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});

server.start(() => {
  console.log("Server is up");
});

// > Project Structure

// ```js
// + graphql-basics
// |
// |___ + node_modules
// |___ + src
// |    |___ + resolvers
// |    |      |
// |    |      |___ Mutation.js
// |    |      |___ Query.js
// |    |      |___ Comment.js
// |    |      |___ Post.js
// |    |      |___ User.js
// |    |
// |    |___ index.js
// |    |___ db.js
// |    |___ schema.graphql
// |
// |___ .babelrc
// |___ package.lock.json
// |___ package.json

// ```