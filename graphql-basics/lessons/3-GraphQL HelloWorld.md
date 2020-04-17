# graphql-basics

## 3. Setting up graphql server with helloWorld

> Installing packages

```js
// graphql-yoga package
    npm i graphql-yoga
// devDependencies
    npm i -D nodemon
```

> Setting up scripts - `npm run dev`

```json
{
  "scripts": {
    "start": "babel-node src/index.js",
    "dev": "nodemon --exec npm start"
  }
}
```

> Creating queries and resolvers

```js
// import GraphQLServer
import { GraphQLServer } from "graphql-yoga";
```

- Queries ( Schema )

```js
type Query {
  helloWorld: String!
}
```

- Resolvers ( Functions )

```js
{
  Query: {
    helloWorld () {
      return 'Hello World'
    }
  }
}
```

- Creating Server

```js
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is up");
});
```

---

> index.js

```js
// Import graphql-yoga module
import { GraphQLServer } from "graphql-yoga";

// Type Definitions (Schema)
const typeDefs = `
    type Query {
        helloWorld: String!
    }
`;

// Resolvers (Set of functions)
const resolvers = {
  Query: {
    // name for the function should be exact same as defined in type Query
    helloWorld() {
      return "Hello World";
    },
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

> Challenge

- Create new type defination for name
- Add function for name that returns normal string
- Test your work
