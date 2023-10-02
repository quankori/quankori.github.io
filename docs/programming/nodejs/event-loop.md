---
title: Event Loop
---

## Fundamental

In Node.js, the event loop is a fundamental concept that plays a crucial role in managing asynchronous operations. The event loop is responsible for handling non-blocking I/O operations, timers, and callbacks in an efficient manner, allowing Node.js to handle a large number of concurrent connections without blocking the execution of other code.

Here's a high-level overview of how the event loop works in Node.js:

**Event Loop**: The event loop is a continuous process that keeps running in the background of a Node.js application. It constantly checks whether there are any pending events or callbacks in the queue.

**Callback Queue**: When asynchronous operations are performed, such as reading from a file, making a network request, or setting a timer, the associated callback functions are placed in a callback queue. These callbacks are executed once the main thread is free, and the event loop checks the callback queue.

**Macro Queue (Task Queue)**: This is where the callback functions related to I/O operations, timers, and some other asynchronous tasks are queued. The event loop checks the macro queue after it has finished executing the current task in the callback queue. Tasks in the macro queue have a slightly higher priority than those in the micro queue.

**Micro Queue (Microtask Queue)**: The micro queue is a queue that contains microtasks. Microtasks are usually callback functions that are meant to be executed immediately after the current operation in the event loop is completed. Microtasks have a higher priority than the tasks in the macro queue. Promises and certain API functions (e.g., process.nextTick) are typically executed as microtasks.

Here's a simplified order of execution in the event loop:

- The event loop starts.
- It checks the callback queue for pending callbacks.
- If there are callbacks in the callback queue, they are executed one by one.
- After each callback is executed, the event loop checks the micro queue for microtasks.
- If there are microtasks in the micro queue, they are executed immediately, without returning to the callback queue.
- The event loop repeats this process, checking the callback queue, then the micro queue, until there are no more pending tasks.
  
This event-driven, non-blocking architecture is what allows Node.js to efficiently handle a large number of concurrent connections and perform asynchronous operations while maintaining high performance. Understanding how the event loop works is essential for writing efficient and scalable Node.js applications.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/9.gif)



