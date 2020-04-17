# graphql-basics

## 5. Custom datatypes

> Creating queries and resolvers

- Queries ( Schema )

```js
  type Query {
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
```

- Resolvers ( Functions )

```js
{
  Query: {
    me () {
      return {
        id: 's0m3R4nD0mID',
        name: 'Dhruv Saxena',
        email: 'saxenadhruv1927@gmail.com'
      }
    }
  },
}
```

---

> index.js

```js
// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Schema)
const typeDefs = `
"# root query"
    type Query {
        me: User!
    }

"# creating new custom type user"
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
`;

// Resolvers (Set of functions)
const resolvers = {
  Query: {
    me () {
      return {
        id: 's0m3R4nD0mID',
        name: 'Dhruv Saxena',
        email: 'saxenadhruv1927@gmail.com'
      }
    }
  },
};

// creating server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is up");
});

```

---

> Project Structure

```js
+ graphql-basics
|
|___ + node_modules
|___ + src
|    |___ index.js
|___ .babelrc
|___ package.lock.json
|___ package.json

```
