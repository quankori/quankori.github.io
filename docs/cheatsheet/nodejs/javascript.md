---
title: JavaScript CheatSheet
---

### Scope

#### Global Scope

```js
// Global variable
var globalVar = "I am global";
let globalLet = "I am also global";
const globalConst = "I am a global constant";

function displayGlobal() {
  console.log(globalVar);
  console.log(globalLet);
  console.log(globalConst);
}

displayGlobal();
console.log(globalVar);
console.log(globalLet);
console.log(globalConst);

// Output:
// I am global
// I am also global
// I am a global constant
// I am global
// I am also global
// I am a global constant

var globalVar = "var variable";
let globalLet = "let variable";

console.log(window.globalVar); // Accessible
console.log(window.globalLet); // Undefined
```

#### Function Scope

```js
function outerFunction() {
  var functionVar = "I am inside a function";
  let functionLet = "I am also inside a function";
  const functionConst = "I am a function constant";

  console.log(functionVar);
  console.log(functionLet);
  console.log(functionConst);
}

outerFunction();

// Trying to access function-scoped variables outside the function
console.log(functionVar); // ReferenceError
console.log(functionLet); // ReferenceError
console.log(functionConst); // ReferenceError

// Output:
// I am inside a function
// I am also inside a function
// I am a function constant
// ReferenceError: functionVar is not defined
```

#### Block Scope

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(`var loop: ${i}`), 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(`let loop: ${j}`), 100);
}

// Output:
// var loop: 3
// var loop: 3
// var loop: 3
// let loop: 0
// let loop: 1
// let loop: 2
```

#### Lexical Scope

JavaScript uses lexical scope (also known as static scope), meaning the accessibility of variables is determined by their physical location in the code during writing, not during execution.

```js
let outer = "I am outside!";

function outerFunction() {
  let inner = "I am inside!";

  function innerFunction() {
    console.log(outer); // Accessible due to lexical scope
    console.log(inner); // Accessible due to lexical scope
  }

  innerFunction();
}

outerFunction();

// Output:
// I am outside!
// I am inside!
```

#### Hoisting

Hoisting is JavaScript's default behavior of moving declarations to the top of their containing scope before code execution. This applies to var, let, const, and functions.

- var declarations are hoisted and initialized with undefined.
- let and const are hoisted but not initialized, resulting in a Temporal Dead Zone (TDZ) until their declaration is evaluated.
- Function declarations are hoisted, allowing them to be called before their definition.
- Function expressions are not hoisted.

```js
console.log(hoistedVar); // Outputs: undefined
var hoistedVar = "I am hoisted!";
console.log(hoistedVar); // Outputs: I am hoisted!

// Output:
// undefined
// I am hoisted!
```

```js
hoistedFunction(); // Outputs: I am a hoisted function!

function hoistedFunction() {
  console.log("I am a hoisted function!");
}

// Output:
// I am a hoisted function!
```

```js
hoistedFunctionExpr(); // TypeError: hoistedFunctionExpr is not a function

var hoistedFunctionExpr = function () {
  console.log("I am a function expression!");
};

// Output:
// TypeError: hoistedFunctionExpr is not a function
```

#### Closures

A closure is a function that remembers and accesses variables from outside its own scope, even after the outer function has finished executing.

```js
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(`Count: ${count}`);
  }

  return inner;
}

const counter = outer();
counter(); // Count: 1
counter(); // Count: 2
```

#### Scope Chain

The scope chain determines the order in which variable lookups are performed. When a variable is not found in the current scope, JavaScript looks up in the outer scopes until it reaches the global scope.

```js
let globalVar = 'Global';

function firstFunction() {
  let firstVar = 'First';

  function secondFunction() {
    let secondVar = 'Second';

    console.log(globalVar); // Found in global scope
    console.log(firstVar);  // Found in firstFunction scope
    console.log(secondVar); // Found in secondFunction scope
  }

  secondFunction();
}

firstFunction();

// Output:
// Global
// First
// Second
```

Example: Chained Function Calls with Scope Chain

```js
function a() {
  const aVar = 'Variable in a';
  
  return {
    b: function() {
      const bVar = 'Variable in b';
      
      return {
        c: function() {
          const cVar = 'Variable in c';
          console.log(aVar); // Accessible from a's scope
          console.log(bVar); // Accessible from b's scope
          console.log(cVar); // Accessible from c's own scope
        }
      }
    }
  }
}

a().b().c();

// Output:
// Variable in a
// Variable in b
// Variable in c
```
