const Subscription = {
  comment: {
    subscribe(parent, { postId }, ctx, info) {
      const { db, pubsub } = ctx;
      const postExists = db.posts.find(post => post.id === postId && post.published)
      if (!postExists) throw new Error('error.post.invalid')

      return pubsub.asyncIterator(`comments-${postId}`)
    },
  },
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('post')
    }
  }
};

export { Subscription as default };
