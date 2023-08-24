---
title: Functions
---

## Regular Functions

Basic operations in any application. For instance, calculating the total price of items in a shopping cart.

```js
function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item.price;
  }
  return total;
}
```

## Function Expressions

Event handlers in web applications.

```js
const handleClick = function (event) {
  console.log("Button clicked:", event.target);
};
button.addEventListener("click", handleClick);
```

## Arrow Functions

Short callback functions, especially in array methods like map, filter, etc.

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
```

## Immediately Invoked Function Expression (IIFE)

Module encapsulation in older JavaScript codes to prevent polluting the global scope.

```js
(function () {
  let privateVariable = "I'm private";
  console.log(privateVariable);
})();
```

## Generator Functions

Producing values on the fly without storing the entire sequence in memory. For example, generating an infinite Fibonacci sequence.

```js
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}
```

## Async Functions

Fetching data from an API.

```js
async function fetchUserData(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
}
```

## Named vs. Anonymous Functions

One-time operations like setTimeout.

```js
setTimeout(function () {
  console.log("Executed after 2 seconds");
}, 2000);
```

## Pure Functions

Predictable operations in functional programming. Like, getting a user's full name.

```js
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
```

## First-Class Functions

A programming language is said to have First-Class Functions when functions in that language are treated like any other variable

```js
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
const names = users.map(function (user) {
  return user.name;
});
```

## Callback functions

Handling asynchronous operations. For example, reading a file in Node.js.

```js
const fs = require("fs");
fs.readFile("file.txt", "utf8", function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

## Constructor Functions

Creating object instances for Object-Oriented Programming (OOP) in older JS patterns.

```js
function Car(make, model) {
  this.make = make;
  this.model = model;
}
const myCar = new Car("Toyota", "Corolla");
```

## Function Overloading

TypeScript supports function overloading, where multiple function types are declared for the same function. The implementation must be compatible with all overloads.

```ts
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
  if (typeof a === "string" && typeof b === "string") {
    return a.concat(b);
  }
  return a + b;
}
```

## High Order Functions

High Order Functions (HOF) are a fundamental concept in functional programming. A High Order Function is any function which takes one or more functions as arguments, returns a function, or both.

```js
function greet(whom) {
  return function (greeting) {
    console.log(`${greeting}, ${whom}!`);
  };
}

const greetJohn = greet("John");
greetJohn("Hello"); // Outputs: Hello, John!
```

## this, call, apply and bind

In JavaScript, the value of this is determined by how a function is called, not where the function is defined. It can be a source of confusion, especially for those coming from other programming languages.

```js
const person = {
  name: "Alice",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};

person.greet(); // Hello, Alice
```

The call method allows you to call a function with a given this value and arguments provided individually.

```js
function greet(arg1, arg2) {
  console.log(arg1 + " " + this.name + " " + arg2);
}

const person = { name: "Alice" };

greet.call(person, "Hello,", "How are you?"); // Hello, Alice How are you?
```

The apply method is similar to call, but you pass the arguments as an array.

```js
function greet(arg1, arg2) {
  console.log(arg1 + " " + this.name + " " + arg2);
}

const person = { name: "Alice" };

greet.apply(person, ["Hello,", "How are you?"]); // Hello, Alice How are you?
```

The bind method creates a new function that, when called, has its this keyword set to the provided value. It essentially binds a function to an object.

```js
function greet() {
  console.log("Hello, " + this.name);
}

const person = { name: "Alice" };
const boundGreet = greet.bind(person);

boundGreet(); // Hello, Alice
```

## Class

In both JavaScript and TypeScript, a class is a blueprint for creating objects with shared properties and methods. Classes encapsulate data for an object and provide a means to manipulate that data. They support inheritance, one of the fundamental aspects of object-oriented programming.

```ts
class Person {
  private name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public greet(): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }

  private somePrivateMethod(): void {
    // This method can't be called from outside the class.
  }
}

const john = new Person("John", 25);
john.g;
```
