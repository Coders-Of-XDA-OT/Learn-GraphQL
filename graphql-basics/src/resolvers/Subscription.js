const Subscription = {
  comment: {
    subscribe(parent, { postId }, ctx, info) {
      const { db, pubsub } = ctx;
      const postExists = db.posts.find(post => post.id === postId && post.published)
      if (!postExists) throw new Error('error.post.invalid')

      return pubsub.asyncIterator(`comments-${postId}`)
    },
  },
};

export { Subscription as default };
