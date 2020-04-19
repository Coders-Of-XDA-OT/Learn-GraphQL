const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) return db.users;
    return db.users.filter((u) =>
      u.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },
  posts(parent, args, { db }, info) {
    if (!args.query) return db.posts;
    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  comments(parent, args, { db }, info) {
    if (!args.query) return db.comments;
    return db.comments.filter((c) =>
      c.text.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
    );
  },
};

export { Query as default }