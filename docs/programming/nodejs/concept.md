---
title: Node.js Concept
---

## Node.js structure

- V8 is used to interpret and execute Javascript code
- Libuv is used for accessing the filesystem and some aspects of concurrency

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/3.PNG)

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/4.PNG)

## Node.js Fundamentals

1. **Event Loop & Non-Blocking I/O**: Node.js achieves high concurrency using an event loop paired with non-blocking I/O. While JavaScript code runs on a single thread, many operations, especially I/O, are offloaded, allowing the main thread to process other tasks without waiting. This mechanism makes Node.js efficient for I/O-bound applications.
2. **Worker Threads**: Node.js introduced the "worker_threads" module from version 10.5.0, which provides the ability to run JavaScript in parallel threads, enhancing its capability to handle CPU-bound tasks.

## Single-threaded vs Multi-threaded

### 1. Concurrency Model:

- **Node.js (Single-threaded)**: Relies on an event-driven, non-blocking I/O model, suitable for I/O-bound tasks. CPU-bound tasks can pose a challenge unless using worker threads or clustering.
- **Other Languages (Multi-threaded)**: Languages like Java or C# use multi-threading, which caters efficiently to both I/O-bound and CPU-bound tasks. However, they introduce challenges such as thread synchronization and potential deadlocks.

### 2. Memory Consumption:

- **Node.js**: Typically lower since there's no need for multiple threads per connection. Yet, one must ensure the event loop isn't blocked to maintain performance.
- **Multi-threaded Languages**: Might have a higher footprint as each thread maintains its own stack, but can distribute CPU-bound tasks effectively.

### 3. Complexity:

- **Node.js**: Generally simpler in terms of concurrency management. One doesn't have to manage thread synchronization in most scenarios. The primary concern is to avoid blocking the event loop.
- **Multi-threaded Languages**: Can be complex due to explicit thread management, synchronization issues, and potential deadlocks.

### 4. Scalability:

- **Node.js**: Scales horizontally by adding more instances. Achievable through tools like the cluster module or container orchestration utilities.
- **Multi-threaded Languages**: Can scale both vertically (adding threads) and horizontally (adding machines).

Node.js can indeed operate in a multi-threaded fashion with the "worker_threads" module. However, its primary design is single-threaded. Implementing multiple threads in Node.js brings forth the challenges typical of multi-threaded programming in other languages.

## Event loop

- When an asynchronous request is sent, such as an HTTP request, Node.js does not wait for that request to complete before continuing to execute other requests. Instead, Node.js sends that request to the system and continues to execute other requests. When that request is completed, the system notifies Node.js that the request is complete, and Node.js continues to execute other tasks.

- Tasks in the event loop are queued in different queues, including:

  - Task queue (also known as a callback queue): Contains callback functions called when an asynchronous request ends.

  - Microtask queue: Contains callback functions called when a promise is resolved or rejected.

  - Timers queue: Contains callback functions called when a time or timer (timeout or interval) is activated.

- When the event loop starts, it executes tasks in the microtask queue first, then the task queue, and finally the timers queue.

- When a task is executed, Node.js puts it into an infinite loop to wait for other tasks. While waiting, Node.js continues to execute tasks in the event loop queue.

## process.nextTick() and setImmediate() in Event Loop

In Node.js, both process.nextTick() and setImmediate() are used to schedule the execution of a callback function after the current phase of the event loop completes. However, they operate in different parts of the loop.

### process.nextTick()

**Description**: Schedules a callback to be invoked after the current phase of the event loop completes and before any other I/O operations occur.

**Operation**: The callback is added to a special queue called the "nextTick queue," and will be executed after each phase of the event loop. This means that if you keep adding functions to the "nextTick queue," the event loop can get stuck in the current phase, and other operations (like I/O) may be delayed.

```js
console.log("Start");

process.nextTick(() => {
  console.log("Next Tick");
});

console.log("End");
```

Output

```js
Start
End
Next Tick
```

### setImmediate()

**Description**: Schedules a callback to be executed in the "check" phase of the event loop after I/O events are processed.

**Operation**: The callback is added to a separate queue and will be executed after all I/O events are processed.

```js
console.log("Start");

setImmediate(() => {
  console.log("Immediate");
});

console.log("End");
```

Output

```js
Start;
End;
Immediate;
```

However, the order between Next Tick and Immediate is not guaranteed in every scenario, especially when they're invoked from within an I/O cycle. But if run in a context with no I/O, process.nextTick() will always execute before setImmediate().

In practice, when you need to schedule a function to run after the current stack completes but before any I/O operations, use process.nextTick(). When you want to schedule a function to run after all I/O operations, use setImmediate().

## "==" and "==="

"==" Compares values for equality.

"===" Compares both value and type for equality.

## this, call, apply and bind

## Bitwise Operators

## Side Effects and State Mutation

## Closures
