# graphql-basics

## 2.  ES6 Import/Export Statements

> Export Statement

- Types of Exports
  - Named Export
  - Default Exports

```js
    // named exports
    const add = (a, b) => a + b
    export { add }
    // named exports can be multiple in a single file

    // default export
    const random = (min, max) => Math.floor(Math.random() * max) + min
    // default export can be only one per file.
    // we have two ways of exporting as default
    export default random // first way
    export { random as default } // second way

    // We can export named and defaults in single file as well.
    export { add, random as default }
    // add is named export and random is default export
```

> Import Statements

- Types of Imports
  - Named Imports
  - Default Imports

```js
    // named import
    import { add } from './dir_path/filename'
    // named import must be exact same name as they are exported

    // default imports
    import Random from './dir_path/filename'
    // we can use any name for default exported variables

    // using both named and default imports
    import Random, { add } from './dir_path/filename'
    // Random being default import and add being named import
```

> Challenge

- Create a module named ```math.js```
- Create a file named ```index.js```
- Create ```add```, ```substract```, ```multiply``` and ```divide``` functions which takes values as parameters
- Export all the functions as named exports, except add. Export add function as default
- Import them in ```index.js``` and use them.

```js
<!-- usage -->

    // add
    console.log('add', add(5, 10))                  // output: 15
    // substract
    console.log('substract', substract(5, 10))      // output: -5
    // multiply
    console.log('multiply', multiply(5, 10))        // output: 50
    // divide
    console.log('divide', divide(5, 10))            // output: 0.5
```
