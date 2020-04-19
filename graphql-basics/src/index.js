import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid"
import db from "./db"
// Resolvers (Set of functions)
const resolvers = {
  Query: {
    users (parent, args, { db }, info) {
      if (!args.query) return db.users
      return db.users.filter(u => u.name.toLowerCase().includes(args.query.toLowerCase()))
    },
    posts (parent, args, { db }, info) {
      if (!args.query) return db.posts
      return db.posts.filter(post => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },
    comments (parent, args, { db }, info) {
      if (!args.query) return db.comments
      return db.comments.filter(c => c.text.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()))
    }
  },
  Mutation: {
    createUser (parent, args, { db }, info) {
      const emailTaken = db.users.some(u => u.email === args.data.email)
      if (emailTaken) throw new Error('error.email.taken')

      const user = {
        id: uuidv4(),
        ...args.data
      }
      db.users.unshift(user)
      return user
    },
    createPost (parent, args, { db }, info) {
      const authorExists = db.users.some(user => user.id === args.data.author)
      if (!authorExists) throw new Error('error.author.invalid')

      const post = {
        id: uuidv4(),
        ...args.data
      }
      db.posts.unshift(post)
      return post
    },
    createComment (parent, args, { db }, info) {
      const authorExists = db.users.some(user => user.id === args.data.author)
      const postExists = db.posts.some(post => post.id === args.data.post && post.published)
      if (!authorExists || !postExists) throw new Error('error.author-or-post.invalid')

      const comment = {
        id: uuidv4(),
        ...args.data
      }
      db.comments.push(comment)
      return comment
    },
    deleteUser (parent, args, { db }, info) {
      const userIndex = db.users.findIndex(user => user.id === args.id)
      if (userIndex === -1) throw new Error('error.user.not-found')

      const deletedUser = db.users.splice(userIndex, 1)
      db.posts = db.posts.filter(post => {
        const match = post.author === args.id
        if (match) {
          db.comments = db.comments.filter(comment => comment.post !== post.id)
        }
        return !match
      })

      db.comments = db.comments.filter(comment => comment.author !== args.id)
      return deletedUser[0]
    },
    deletePost (parent, args, { db }, info) {
      const postIndex = db.posts.findIndex(post => post.id === args.id)
      if (postIndex === -1) throw new Error('error.post.not-found')
      const deletedPost = db.posts.splice(postIndex, 1)
      db.comments = db.comments.filter(comment => comment.post !== args.id)
      return deletedPost[0]
    },
    deleteComment (parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(comment => comment.id === args.id)
      if (commentIndex === -1) throw new Error('error.comment.not-found')

      const deletedComment = db.comments.splice(commentIndex, 1)
      return deletedComment[0]
    }
  },
  User: {
    posts (parent, args, { db }, info) {
      return db.posts.filter((post) => post.author === parent.id)
    },
    comments (parent, args, { db }, info) {
      return db.comments.filter(comment => comment.author === parent.id)
    }
  },
  Post: {
    author (parent, args, { db }, info) {
      return db.users.find(user => user.id === parent.author)
    },
    comments (parent, args, { db }, info) {
      return db.comments.filter(comment => comment.post === parent.id)
    }
  },
  Comment: {
    author (parent, args, { db }, info) {
      return db.users.find(user => user.id === parent.author)
    },
    post (parent, args, { db }, info) {
      return db.posts.find(post => post.id === parent.post)
    }
  }
};

// creating server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log("Server is up");
});
