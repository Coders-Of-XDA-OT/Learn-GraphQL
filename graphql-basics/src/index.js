import { GraphQLServer } from "graphql-yoga";

// demo data
const users = [{
  id: '1',
  name: 'Dhruv Saxena',
  email: 'dhruv@example.com',
  age: 22,
  posts: ['1', '2'],
  comments: ['101', '104']
}, {
  id: '2',
  name: 'Someone',
  email: 'someone@example.com',
  posts: ['3'],
  comments: ['103']
}, {
  id: '3',
  name: 'Mike',
  email: 'mike@example.com',
  age: 32,
  posts: [],
  comments: ['1102']
}]
const posts = [{
  id: '1',
  title: 'HP 1',
  body: 'Harry Potter 1',
  published: true,
  author: '1',
  comments: ['101', '1102']
}, {
  id: '2',
  title: 'HP 2',
  body: 'Harry Potter 2',
  published: true,
  author: '1',
  comments: ['103']
}, {
  id: '3',
  title: 'Dark Lords',
  body: 'Dark Loards',
  published: false,
  author: '2',
  comments: ['104']
},]
const comments = [{
  id: '101',
  text: 'Hey nice tutorials',
  author: '1',
  post: '1'
}, {
  id: '1102',
  text: 'Good Job',
  author: '3',
  post: '1'
}, {
  id: '103',
  text: 'Graphql become easy',
  author: '2',
  post: '2'
}, {
  id: '104',
  text: 'learning graphql is awesome',
  author: '1',
  post: '3'
}]

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
      if (!args.query) return posts
      return posts.filter(post => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },
    comments (parent, args, ctx, info) {
      if (!args.query) return comments
      return comments.filter(c => c.text.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()))
    }
  },
  User: {
    posts (parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id)
    },
    comments (parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id)
    }
  },
  Post: {
    author (parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    comments (parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id)
    }
  },
  Comment: {
    author (parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    post (parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post)
    }
  }
};

// creating server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is up");
});
