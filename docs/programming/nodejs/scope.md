---
title: Scopes
---

## Global Scope

A variable declared outside any function or block belongs to the global scope. Every script and function can access it.

```js
let globalVar = "I'm globally scoped";

function showGlobalVar() {
  console.log(globalVar); // Accessible here
}

showGlobalVar(); // Outputs: "I'm globally scoped"
```

## Local (or Function) Scope

Variables declared within a function have local scope. They can't be accessed outside that function.

```js
function localFunction() {
  let localVar = "I'm locally scoped";
  console.log(localVar); // Accessible here
}

localFunction(); // Outputs: "I'm locally scoped"
// console.log(localVar); // Error: localVar is not defined
```

## Block Scope (Introduced with ES6)

With the introduction of let and const in ES6, JavaScript gained block-level scoping. This means that variables declared with let or const inside a block (like inside an if statement or a for loop) are only accessible within that block.

```js
if (true) {
  let blockVar = "I'm block-scoped";
  console.log(blockVar); // Accessible here
}

// console.log(blockVar); // Error: blockVar is not defined
```

## Module Scope (With ES6 Modules)

When using ES6 modules, top-level variables (those not exported) have module scope. They're local to the module and aren't accessible in other modules unless explicitly exported.

```js
let moduleVar = "I'm module-scoped";
export function showVar() {
  console.log(moduleVar);
}

// Another file js

import { showVar } from "./moduleA";
showVar(); // Outputs: "I'm module-scoped"
// moduleVar isn't directly accessible here
```

## Lexical Scope (Closures)

Functions in JavaScript form closures. A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). It gives you access to the outer function's scope from an inner function.

```js
function outerFunction() {
  let outerVar = "I'm in the outer function";
  function innerFunction() {
    console.log(outerVar); // Accessible due to lexical scoping
  }
  innerFunction();
}

outerFunction(); // Outputs: "I'm in the outer function"
```
