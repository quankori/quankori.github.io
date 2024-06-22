---
title: Scopes
---

## Global Scope

A variable declared outside of any function or block belongs to the global scope. Any code and functions can access it.

```js
let globalVar = "I'm globally scoped";

function showGlobalVar() {
  console.log(globalVar); // Accessible here
}

showGlobalVar(); // Outputs: "I'm globally scoped"
```

## Local (or Function) Scope

Variables declared inside a function have local scope. They cannot be accessed outside of that function.

```js
function localFunction() {
  let localVar = "I'm locally scoped";
  console.log(localVar); // Accessible here
}

localFunction(); // Outputs: "I'm locally scoped"
// console.log(localVar); // Error: localVar is not defined
```

## Block Scope (Introduced with ES6)

With the introduction of let and const in ES6, JavaScript adopted block scope. This means variables declared with let or const inside a block (such as within an if statement or for loop) can only be accessed within that block.

```js
if (true) {
  let blockVar = "I'm block-scoped";
  console.log(blockVar); // Accessible here
}

// console.log(blockVar); // Error: blockVar is not defined
```

## Module Scope (With ES6 Modules)

When using ES6 modules, top-level variables (those not exported) have module scope. They are local to the module and cannot be accessed by other modules unless specifically exported.

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

## Lexical Scope

Lexical scope, also known as static scope, is an important concept in programming, especially in languages that interact with functions, such as JavaScript. Lexical scope determines the access rights of variables or functions in source code based on how they are declared and grouped.

When a function is defined within a context (a block or another function), it is created with lexical scope, meaning it can access variables and functions available in the same scope where it was defined, as well as outer enclosing scopes. This depends on how the source code is written and its static structure, not on how the source code is called at runtime.

```js
function outer() {
  const outerVar = "I'm from outer";

  function inner() {
    const innerVar = "I'm from inner";
    console.log(outerVar); 
    console.log(innerVar); 
  }

  inner();
}

outer();
```

An important thing to remember about lexical scope is that it is determined at the time of function definition, not at the time of function invocation. This means that, regardless of where the function is called from, the variables and functions it accesses will still depend on the scope where it was defined.

## Closures

In JavaScript, a closure is a language feature that allows a function to access variables from the context in which the function was created. A closure occurs when a function (called the "inner" function) is defined within another function (called the "outer" function), and the inner function accesses variables of the outer function.

```js
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(`Outer Variable: ${outerVariable}`);
    console.log(`Inner Variable: ${innerVariable}`);
  };
}

const myClosure = outerFunction("outer"); // Tạo một closure

myClosure("inner"); // Sử dụng closure

// Outer Variable: outer
// Inner Variable: inner
```

## Private Scope and Public Scope

**Private Scope**: In private scope, variables and functions can only be accessed and used within the same "scope" or "code block" where they are declared. They cannot be accessed from other scopes, including other code blocks within the same file or module, allowing for easy interaction and sharing of data and functions between different parts of the program.

```js
function Counter() {
  let count = 0;

  this.increment = function () {
    count++;
  };

  this.getCount = function () {
    return count;
  };
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount()); // Output: 1
console.log(counter.count); // Output: undefined 
```

**Public Scope**: In public scope, variables and functions can be accessed from anywhere in the program, including from other modules, ensuring security and preventing unnecessary modifications from external scopes.

```js
let globalVar = 42; 

function printGlobal() {
  console.log(globalVar);
}

printGlobal(); // Output: 42
```
