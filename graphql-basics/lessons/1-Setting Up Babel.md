# graphql-basics

## 1.  Settings up babel

- not mandatory (only helps to compile es6/es7 code to es5)

> Installing dependencies

```js
// core dependencies
    npm i -D @babel/cli @babel/core @babel/node
// preset
    npm i -D @babel/preset-env
// plugins
    npm i -D @babel/plugin-proposal-class-properties
    npm i -D @babel/plugin-proposal-object-rest-spread
```

---

> Setting up .babelrc

```json
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread"
    ]
}
```

---

> Setting up Package.json

```json
{
    "scripts": {
        "start": "babel-node src/index.js"
    }
}

```

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
