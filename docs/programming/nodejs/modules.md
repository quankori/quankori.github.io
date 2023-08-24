---
title: Modules
---

## CommonJS

This is the module system used in Node.js. It's synchronous and mainly designed for server-side.

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

Namespaces are a TypeScript-specific way to organize code, using the namespace keyword. While namespaces can help prevent naming collisions, they've become less popular with the advent of ES Modules.

```ts
namespace MyNamespace {
  export function greet() {
    console.log("Hello from namespace!");
  }
}
```

## External Modules (ES Modules)

The module system introduced in ES6 (ES2015) for JavaScript. It's become the standard for client-side modules and is now also supported in Node.js.

```ts
// module.ts
export function greet() {
  console.log("Hello from module!");
}

// main.ts
import { greet } from "./module";
greet();
```
