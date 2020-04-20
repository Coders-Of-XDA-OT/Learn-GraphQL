import { v4 as uuidv4 } from "uuid"
const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((u) => u.email === args.data.email);
    if (emailTaken) throw new Error("error.email.taken");

    const user = {
      id: uuidv4(),
      ...args.data,
    };
    db.users.unshift(user);
    return user;
  },
  createPost(parent, args, { db }, info) {
    const authorExists = db.users.some((user) => user.id === args.data.author);
    if (!authorExists) throw new Error("error.author.invalid");

    const post = {
      id: uuidv4(),
      ...args.data,
    };
    db.posts.unshift(post);
    return post;
  },
  createComment(parent, args, { db, pubsub }, info) {
    const authorExists = db.users.some((user) => user.id === args.data.author);
    const postExists = db.posts.some(
      (post) => post.id === args.data.post && post.published
    );
    if (!authorExists || !postExists)
      throw new Error("error.author-or-post.invalid");

    const comment = {
      id: uuidv4(),
      ...args.data,
    };
    db.comments.push(comment);
    pubsub.publish(`comments-${args.data.post}`, { comment })
    return comment;
  },
  updateUser(parent, args, { db }, info) {
    const user = db.users.find(user => user.id === args.id)
    if(!user) throw new Error('error.user.not-found')

    if(typeof args.data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === args.data.email)

      if(emailTaken) throw new Error('error.email.taken')
      user.email = args.data.email
    }
    
    if(typeof args.data.name === 'string') user.name = args.data.name
    if(typeof args.data.age !== 'undefined') user.age = args.data.age

    return user
  },
  updatePost(parent, args, { db }, info) {
    const post = db.posts.find(post => post.id === args.id)
    if(!post) throw new Error('error.post.not-found')

    if(typeof args.data.title === 'string') post.title = args.data.title
    if(typeof args.data.body === 'string') post.body = args.data.body
    if(typeof args.data.published === 'boolean') post.published = args.data.published
    
    return post
  },
  updateComment(parent, args, { db}, info) {
    const comment = db.comments.find(comment => comment.id === args.id)
    if(!comment) throw new Error('error.comment.not-found')

    if(typeof args.data.text === 'string') comment.text = args.data.text

    return comment
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) throw new Error("error.user.not-found");

    const deletedUser = db.users.splice(userIndex, 1);
    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;
      if (match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });

    db.comments = db.comments.filter((comment) => comment.author !== args.id);
    return deletedUser[0];
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) throw new Error("error.post.not-found");
    const deletedPost = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter((comment) => comment.post !== args.id);
    return deletedPost[0];
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );
    if (commentIndex === -1) throw new Error("error.comment.not-found");

    const deletedComment = db.comments.splice(commentIndex, 1);
    return deletedComment[0];
  },
};

export { Mutation as default }