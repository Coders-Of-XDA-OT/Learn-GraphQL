// static data for now
const users = [
  {
    id: "1",
    name: "Dhruv Saxena",
    email: "dhruv@example.com",
    age: 22,
  },
  {
    id: "2",
    name: "Someone",
    email: "someone@example.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
    age: 32,
  },
];
const posts = [
  {
    id: "1",
    title: "HP 1",
    body: "Harry Potter 1",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "HP 2",
    body: "Harry Potter 2",
    published: true,
    author: "1",
  },
  {
    id: "3",
    title: "Dark Lords",
    body: "Dark Loards",
    published: false,
    author: "2",
  },
];
const comments = [
  {
    id: "101",
    text: "Hey nice tutorials",
    author: "1",
    post: "1",
  },
  {
    id: "102",
    text: "Good Job",
    author: "3",
    post: "1",
  },
  {
    id: "103",
    text: "Graphql become easy",
    author: "2",
    post: "2",
  },
  {
    id: "104",
    text: "learning graphql is awesome",
    author: "2",
    post: "3",
  },
];

const db = {
    users,
    posts,
    comments
}

export { db as default }