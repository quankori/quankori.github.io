---
title: Callbacks in Node.js
---

## Concept

Callbacks are fundamental to asynchronous programming in Node.js. They allow for non-blocking operations, which can greatly improve performance for I/O-bound tasks. However, due to potential callback nesting, it's essential to be aware of and manage callback hell, using patterns or newer language features to ensure maintainable and readable code.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/7.png)

## Promise

A Promise in JavaScript represents a value which might be available now, or in the future, or never. It allows you to write asynchronous code in a more synchronous fashion. It has three states:

**Pending**: The initial state; the promise is neither fulfilled nor rejected.

**Fulfilled**: The operation completed successfully.

**Rejected**: The operation failed.

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 2000);
});

myPromise.then((result) => {
  console.log(result); // "Promise resolved"
});
```

## Async/Await

async/await is built on top of promises and provides a more readable and clean syntax for dealing with asynchronous operations. A function declared with the async keyword will always return a promise.

**async**: This keyword is used to declare an asynchronous function.

**await**: This keyword can only be used inside an async function and is used to pause the execution of the async function until the promise is resolved or rejected.

```js
async function fetchData() {
  let response = await fetch("https://api.example.com/data");
  let data = await response.json();
  console.log(data);
}
fetchData();
```
