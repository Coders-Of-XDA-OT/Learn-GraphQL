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
  createComment(parent, args, { db }, info) {
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
    return comment;
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