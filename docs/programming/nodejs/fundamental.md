---
title: Node.js Fundamental
---

## Structure

- V8 is used for interpreting and executing JavaScript code.
- Libuv is used for accessing the file system and certain aspects of concurrency.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/3.PNG)

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/4.PNG)


## Single-threaded vs Multi-threaded

### 1. Concurrency Model:

**Node.js (Single-threaded)**: Based on the event-driven model, non-blocking I/O, suitable for I/O-related tasks. CPU-bound tasks may face challenges unless using worker threads or clustering.

**Other Languages (Multi-threaded)**: Languages like Java or C# use multi-threading, suitable for both I/O and CPU-related tasks. However, they present their own challenges.

### 2. Memory Consumption:

**Node.js**: Typically lower due to not requiring many threads per connection. However, it's important to ensure the event loop is not blocked to maintain performance.

**Multi-threaded Languages**: May have larger sizes as each thread maintains its own stack but can efficiently distribute CPU-related tasks.

### 3. Complexity:

**Node.js**: Generally simpler in terms of concurrency management. In most situations, there's no need to manage thread synchronization. The main concern is avoiding blocking the event loop.

**Multi-threaded Languages**: Can be complex due to explicit thread management, thread synchronization issues, and potential deadlock risks.

### 4. Scalability:

**Node.js**: Scales horizontally by adding multiple instances. This can be achieved through tools like the cluster module or container orchestration utilities.

**Multi-threaded Languages**: Can scale both vertically (adding threads) and horizontally (adding machines).

Node.js can indeed work in a multi-threaded manner with the "worker_threads" module. However, its primary design is single-threaded. Implementing multiple threads in Node.js poses typical challenges of multi-threaded programming in other languages.

## Side Effects

Side effects refer to any observable changes in a system caused by the execution of a function, excluding the value that the function returns. These changes can be anything from altering global variables, making network requests, manipulating the DOM, writing to files, or printing to the console, among many others.

Side effects are not always bad and are often necessary (for example, we need side effects to update the user interface or store data in a database). However, functions with side effects are typically harder to test, debug, and reason about compared to pure functions that have no side effects.

```ts
let counter: number = 0;
function increment(): void {
  counter++; // This is a side effect as it modifies an external variable.
}
```

## State Mutation

State mutation refers to the act of directly modifying or altering the state of a data structure. In languages like JavaScript and TypeScript, objects and arrays are often mutable by default, meaning that their properties and elements can be modified directly after they are created.

Changing the state can lead to unpredictable behavior, especially in large applications or when using certain programming paradigms like functional programming. This is why libraries like Redux emphasize the importance of treating state as immutable and making changes through copies instead of directly modifying it.

```ts
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice",
  age: 25,
};

user.age = 26; // This is a state mutation.
```
