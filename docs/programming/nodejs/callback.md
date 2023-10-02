---
title: Callbacks in Node.js
---

## Fundametal

Callback is a fundamental concept in asynchronous programming in Node.js. It allows you to perform non-blocking operations, significantly improving performance for I/O-related tasks. However, due to the potential nesting of callbacks, understanding and managing "callback hell" is essential. Using patterns or new language features ensures that the code remains maintainable and readable.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/7.png)

## Promise

A Promise in JavaScript represents a value that may be available now, in the future, or never. It allows you to write asynchronous code in a more synchronous style. A Promise has three states: Pending, Rejected, and Fulfilled.

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

### Other Promise

Promise.race and Promise.any are both methods of the Promise object in JavaScript, but they serve different purposes and work differently. Similarly, Promise.all and Promise.allSettled are also two different methods for handling multiple Promises. Here's a comparison between them:

- `Promise.race` vs. `Promise.any`:

**Promise.race**: This method takes an array of Promises and returns a new Promise. This Promise is resolved or rejected as soon as one of the Promises in the array is resolved or rejected. The result of Promise.race is the result of the first Promise to complete.

**Promise.any**: This is a new method introduced in ES2021. Promise.any also takes an array of Promises and returns a new Promise. This Promise is resolved as soon as one of the Promises in the array is resolved. However, if all Promises are rejected, this Promise is rejected and returns an error containing an array of errors from the rejected Promises.

- `Promise.all` vs. `Promise.allSettled`:

**Promise.all**: This method takes an array of Promises and returns a new Promise. This Promise is only resolved when all Promises in the array are resolved. The result of Promise.all is an array of results corresponding to the Promises in the original array.

**Promise.allSettled**: This is another method introduced in ES2020. Promise.allSettled also takes an array of Promises and returns a new Promise. This Promise is resolved after all Promises in the array have been resolved or rejected. The result of Promise.allSettled is an array of objects describing the status of each Promise, whether it was resolved or rejected.

*In summary:*

Promise.race and Promise.any deal with handling results from multiple Promises but behave differently when there are rejections.

Promise.all and Promise.allSettled both involve waiting for results from multiple Promises, but Promise.all is rejected if at least one Promise is rejected, while Promise.allSettled returns an array of statuses for all Promises, whether they were resolved or rejected.

## Async/Await

async/await is built on top of promises and provides a cleaner and more readable syntax for handling asynchronous operations. A function declared with the async keyword always returns a promise.

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
