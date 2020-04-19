import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid"
// demo data
let users = [{
  id: '1',
  name: 'Dhruv Saxena',
  email: 'dhruv@example.com',
  age: 22
}, {
  id: '2',
  name: 'Someone',
  email: 'someone@example.com'
}, {
  id: '3',
  name: 'Mike',
  email: 'mike@example.com',
  age: 32
}]
let posts = [{
  id: '1',
  title: 'HP 1',
  body: 'Harry Potter 1',
  published: true,
  author: '1'
}, {
  id: '2',
  title: 'HP 2',
  body: 'Harry Potter 2',
  published: true,
  author: '1'
}, {
  id: '3',
  title: 'Dark Lords',
  body: 'Dark Loards',
  published: false,
  author: '2'
},]
let comments = [{
  id: '101',
  text: 'Hey nice tutorials',
  author: '1',
  post: '1'
}, {
  id: '102',
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
  author: '2',
  post: '3'
}]

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    createComment(data: createCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }
  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }
  input createCommentInput {
    text: String!
    author: ID!
    post: ID!
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
  Mutation: {
    createUser (parent, args, ctx, info) {
      const emailTaken = users.some(u => u.email === args.data.email)
      if (emailTaken) throw new Error('error.email.taken')

      const user = {
        id: uuidv4(),
        ...args.data
      }
      users.unshift(user)
      return user
    },
    createPost (parent, args, ctx, info) {
      const authorExists = users.some(user => user.id === args.data.author)
      if (!authorExists) throw new Error('error.author.invalid')

      const post = {
        id: uuidv4(),
        ...args.data
      }
      posts.unshift(post)
      return post
    },
    createComment (parent, args, ctx, info) {
      const authorExists = users.some(user => user.id === args.data.author)
      const postExists = posts.some(post => post.id === args.data.post && post.published)
      if (!authorExists || !postExists) throw new Error('error.author-or-post.invalid')

      const comment = {
        id: uuidv4(),
        ...args.data
      }
      comments.push(comment)
      return comment
    },
    deleteUser (parent, args, ctx, info) {
      const userIndex = users.findIndex(user => user.id === args.id)
      if (userIndex === -1) throw new Error('error.user.not-found')

      const deletedUser = users.splice(userIndex, 1)
      posts = posts.filter(post => {
        const match = post.author === args.id
        if (match) {
          comments = comments.filter(comment => comment.post !== post.id)
        }
        return !match
      })

      comments = comments.filter(comment => comment.author !== args.id)
      return deletedUser[0]
    },
    deletePost (parent, args, ctx, info) {
      const postIndex = posts.findIndex(post => post.id === args.id)
      if (postIndex === -1) throw new Error('error.post.not-found')
      const deletedPost = posts.splice(postIndex, 1)
      comments = comments.filter(comment => comment.post !== args.id)
      return deletedPost[0]
    },
    deleteComment (parent, args, ctx, info) {
      const commentIndex = comments.findIndex(comment => comment.id === args.id)
      if (commentIndex === -1) throw new Error('error.comment.not-found')

      const deletedComment = comments.splice(commentIndex, 1)
      return deletedComment[0]
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
