---
title: Functions
---

## Fucntion Declaration

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

```js
const handleClick = function (event) {
  console.log("Button clicked:", event.target);
};
button.addEventListener("click", handleClick);
```

## Arrow Functions

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
```

## Immediately Invoked Function Expression (IIFE)


```js
(function () {
  let privateVariable = "I'm private";
  console.log(privateVariable);
})();
```

## Generator Functions

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

```js
async function fetchUserData(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
}
```

## Named & Anonymous Functions

```js
setTimeout(function () {
  console.log("Executed after 2 seconds");
}, 2000);
```

## Pure Functions

```js
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
```

## First-Class Functions

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

TypeScript supports function overloading, where multiple function types are declared for the same function. The implementation must be compatible with all overloaded types.

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

Higher-Order Functions (HOF) are a fundamental concept in functional programming. A Higher-Order Function is any function that takes one or more functions as arguments, returns a function, or both.

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

### this

In JavaScript, the this keyword is a special variable that provides a way to access the context in which the code is currently executing. The value of `this` depends on how the code is called and can change during execution.

```js
const person = {
  name: "Alice",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};

person.greet(); // Hello, Alice
```

```js
function testFunc() {
  console.log(this); // 'this' thường sẽ là `window` trong trình duyệt, `global` trong Node.js
}
```

### call, apply, bind

`call` to function and update it

```js
function greet(arg1, arg2) {
  console.log(arg1 + " " + this.name + " " + arg2);
}

const person = { name: "Alice" };

greet.call(person, "Hello,", "How are you?"); // Hello, Alice How are you?
```

```js
function showDetails(age, country) {
  console.log(`Name: ${this.name}, Age: ${age}, Country: ${country}`);
}

const person = { name: "Alice" };

showDetails.call(person, 30, "USA"); // Output: "Name: Alice, Age: 30, Country: USA"
```

`apply` is similar to call, but instead of passing arguments individually, you pass an array of arguments.

```js
function greet(arg1, arg2) {
  console.log(arg1 + " " + this.name + " " + arg2);
}

const person = { name: "Alice" };

greet.apply(person, ["Hello,", "How are you?"]); // Hello, Alice How are you?
```

The `bind` method creates a new function that, when called, has its this keyword set to the provided value. Essentially, it binds a function to an object.

```js
function greet() {
  console.log("Hello, " + this.name);
}

const person = { name: "Alice" };
const boundGreet = greet.bind(person);

boundGreet(); // Hello, Alice
```

Both `call` and `apply` immediately invoke the function, while `bind` does not call the function immediately but instead creates a new function with the specified `this` value and fixed arguments to be called later.

All three methods are useful when you need to set the value of `this` in a function or when you want to reuse a function with specific arguments and context.

## Class

In both JavaScript and TypeScript, a class is a blueprint for creating objects with shared properties and methods. A class encapsulates data for an object and provides a way to manipulate that data. They support inheritance, which is a fundamental aspect of object-oriented programming.

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

## Getter and setter

**Getter**: A getter method is used to retrieve the value of a property. You can name the getter method the same as the property you want to access.

**Setter**: A setter method is used to assign a value to a property. Similar to a getter, you can name the setter method the same as the property you want to assign.

```ts
class Person {
  constructor(private _firstName: string, private _lastName: string) {}

  get fullName(): string {
    return this._firstName + " " + this._lastName;
  }

  set fullName(name: string) {
    const parts = name.split(" ");
    this._firstName = parts[0];
    this._lastName = parts[1];
  }
}
```

## Hoisting JavaScript

In JavaScript, "hoisting" is a concept describing how variable and function declarations are moved (hoisted) to the top of their containing scope during compilation before the code is actually executed. This means you can use a variable or call a function before they are declared.

However, it's essential to note that only variable and function declarations are hoisted, not variable assignments. Here's an example illustrating hoisting:

```js
console.log(x); // Kết quả: undefined
var x = 5;

hoistedFunction(); // Kết quả: "Hello, hoisting!"
function hoistedFunction() {
  console.log("Hello, hoisting!");
}
```

Trong ví dụ trên:

1. Variable x is declared with var, and when we attempt to print the value of x before assigning it, the returned value is undefined. This happens because the declaration var x is hoisted to the top of its scope, but the assignment to x has not yet been executed.

2. The hoistedFunction is declared after it's called. However, the function is still hoisted to the top of its scope, allowing us to call the function before it's declared in the code.

However, with variable declarations using let and const, hoisting still occurs, but they won't be immediately assigned values. They will be in a "temporal dead zone" until they reach the code where they are assigned values.

To avoid confusion and errors in your code, always declare variables and functions before using them, even when hoisting might occur.

## Currying

Currying is a programming technique in JavaScript (and other languages) that allows you to transform a function that takes multiple arguments into a chain of functions, each of which takes one argument. This enables you to pass arguments one step at a time rather than all at once.

In other words, currying turns a function of the form `f(x, y)` into a chain of functions like `f(x)(y)`.

Here's an example illustrating currying in JavaScript:

```js
// Hàm gốc có nhiều đối số
function add(x, y) {
  return x + y;
}

// Currying hàm add
function curryAdd(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = curryAdd(5);
console.log(add5(3)); // Kết quả: 8
```

```js
var add = function (a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
};
console.log(add(2)(3)(4)); //output 9
console.log(add(3)(4)(5)); //output 12
```
