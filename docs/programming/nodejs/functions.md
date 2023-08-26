---
title: Functions
---

## Regular Functions

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

Đóng gói module trong các mã JavaScript cũ hơn để ngăn tràn lan không gian toàn cục.

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

## Named vs. Anonymous Functions

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

TypeScript hỗ trợ quá tải hàm (function overloading), nơi mà nhiều kiểu hàm được khai báo cho cùng một hàm. Cài đặt phải tương thích với tất cả các kiểu quá tải.

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

Hàm Bậc Cao (High Order Functions - HOF) là một khái niệm cơ bản trong lập trình hàm. Một Hàm Bậc Cao là bất kỳ hàm nào nhận một hoặc nhiều hàm làm đối số, trả về một hàm, hoặc cả hai.

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

Trong JavaScript, giá trị của this được xác định bằng cách gọi một hàm, không phải là nơi mà hàm được định nghĩa. Điều này có thể gây hiểu nhầm, đặc biệt đối với những người đến từ các ngôn ngữ lập trình khác.

```js
const person = {
  name: "Alice",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};

person.greet(); // Hello, Alice
```

Phương thức `call` cho phép bạn gọi một hàm với giá trị this và các đối số cung cấp một cách riêng lẻ.

```js
function greet(arg1, arg2) {
  console.log(arg1 + " " + this.name + " " + arg2);
}

const person = { name: "Alice" };

greet.call(person, "Hello,", "How are you?"); // Hello, Alice How are you?
```

Phương thức `apply` tương tự như call, nhưng bạn truyền các đối số dưới dạng một mảng.

```js
function greet(arg1, arg2) {
  console.log(arg1 + " " + this.name + " " + arg2);
}

const person = { name: "Alice" };

greet.apply(person, ["Hello,", "How are you?"]); // Hello, Alice How are you?
```

Phương thức `bind` tạo ra một hàm mới mà khi gọi, từ khóa this được thiết lập với giá trị đã cung cấp. Thực chất, nó liên kết một hàm với một đối tượng.

```js
function greet() {
  console.log("Hello, " + this.name);
}

const person = { name: "Alice" };
const boundGreet = greet.bind(person);

boundGreet(); // Hello, Alice
```

## Class

Cả trong JavaScript và TypeScript, một lớp (class) là một bản thiết kế để tạo ra các đối tượng có các thuộc tính và phương thức chung. Lớp đóng gói dữ liệu cho một đối tượng và cung cấp cách thức để thao tác với dữ liệu đó. Chúng hỗ trợ tính kế thừa, một trong các khía cạnh cơ bản của lập trình hướng đối tượng.

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
