---
title: Modules
---

## CommonJS

This is a module system used in Node.js. It is synchronous and primarily designed for server environments.

```js
// greet.js
module.exports = function () {
  console.log("Hello, World!");
};

// app.js
const greet = require("./greet");
greet();
```

## Namespace

Namespaces are a specific way in TypeScript to organize code, using the namespace keyword. While namespaces can help avoid naming collisions, they have become less common with the advent of ES Modules.

```ts
namespace MyNamespace {
  export function greet() {
    console.log("Hello from namespace!");
  }
}
```

## External Modules (ES Modules)

The module system was introduced in ES6 (ES2015) for JavaScript. It has become the standard for client-side modules and is currently also supported in Node.js.

```ts
// module.ts
export function greet() {
  console.log("Hello from module!");
}

// main.ts
import { greet } from "./module";
greet();
```

## Export

**Named Export**: In JavaScript ES6, named exports are used to export multiple things from a module by adding the export keyword to their declarations. The exported things are distinguished by their names. Then, we import the things we want to use by surrounding them with curly braces { }. The name of the imported module must match the name of the exported module.

```js
//-------util.js------
export function addTwoNumbers(x, y) {
  return x + y;
}
export let students = ["wisdom", "bill", "fred", "grim"];
```

**Default Export**: In JavaScript ES6, only one default export is allowed per file. The default export can be a function, class, or object.

```js
//----myFunction.js ----
export default function () {
  alert("Hello Default Export");
}
```

## Import

```js
import * as util from "util";

console.log(util.addTwoNumbers(2, 13));
console.log(util.students);
```

The syntax here is quite simple, it looks like this: `import * as name from "module-name"`

Additionally, you can use the "as" alias to rename it if you're not familiar with the module's name or depending on your project. If you have a module exported like this:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export { sayHi, sayBye }; // a list of exported variables
```

```js
// main.js
import { sayHi as hi, sayBye as bye } from "./say.js";

hi("John"); // Hello, John!
bye("John"); // Bye, John!
```
