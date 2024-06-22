---
title: Event Loop
---

## Event Loop in Node.js

The event loop is a fundamental concept in Node.js that allows for asynchronous programming. It enables Node.js to handle many operations concurrently, without having to create multiple threads. Understanding the event loop is crucial for writing efficient and non-blocking code.

## Key Concepts of the Event Loop

1. **Single-Threaded Architecture**
2. **Asynchronous I/O**
3. **Phases of the Event Loop**
4. **Callbacks and Task Queues**
5. **Timers**

### 1. Single-Threaded Architecture

**Definition**:

- Node.js operates on a single-threaded event-driven architecture. This means that it uses a single main thread to execute JavaScript code.

**Implications**:

- Despite being single-threaded, Node.js can handle multiple operations concurrently thanks to the event loop.

### 2. Asynchronous I/O

**Definition**:

- Node.js uses non-blocking asynchronous I/O operations. Instead of waiting for an I/O operation to complete, Node.js uses callbacks to continue execution.

**Example**:

```javascript
const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("Reading file...");
```

In this example, `console.log('Reading file...');` executes before the file reading completes.

### 3. Phases of the Event Loop

The event loop consists of multiple phases, each handling different types of callbacks:

1. **Timers Phase**:

   - Executes callbacks scheduled by `setTimeout` and `setInterval`.

2. **Pending Callbacks Phase**:

   - Executes I/O callbacks deferred to the next loop iteration.

3. **Idle, Prepare Phase**:

   - Internal use, typically ignored by most applications.

4. **Poll Phase**:

   - Retrieves new I/O events, executes I/O-related callbacks.

5. **Check Phase**:

   - Executes callbacks from `setImmediate`.

6. **Close Callbacks Phase**:
   - Executes callbacks related to closed connections, such as `socket.on('close', ...)`.

### 4. Callbacks and Task Queues

**Definition**:

- Callbacks are functions that are executed at a later time. Task queues store these callbacks until they are executed in the appropriate phase of the event loop.

**Example**:

```javascript
setTimeout(() => {
  console.log("Timeout callback");
}, 1000);

setImmediate(() => {
  console.log("Immediate callback");
});

console.log("Main script");
```

The output will be:

```
Main script
Immediate callback
Timeout callback
```

### 5. Timers

**Definition**:

- Timers allow scheduling of functions to be executed after a certain period of time or at regular intervals.

**Functions**:

- `setTimeout`: Schedules a callback to run after a specified delay.
- `setInterval`: Schedules a callback to run repeatedly with a fixed time delay between each call.
- `setImmediate`: Schedules a callback to run immediately after the current event loop phase.

**Example**:

```javascript
setTimeout(() => {
  console.log("Executed after 1000 ms");
}, 1000);

setInterval(() => {
  console.log("Executed every 1000 ms");
}, 1000);

setImmediate(() => {
  console.log("Executed immediately");
});
```

## Event Loop Workflow

Here's a simplified representation of the event loop workflow:

```plaintext
        ┌───────────────────────────┐
    ┌─> │           Timers          │
    │   └─────────────┬─────────────┘
    │   ┌─────────────┴─────────────┐
    ├─> │     Pending Callbacks     │
    │   └─────────────┬─────────────┘
    │   ┌─────────────┴─────────────┐
    ├─> │      Idle, Prepare        │
    │   └─────────────┬─────────────┘
    │   ┌─────────────┴─────────────┐
    ├─> │          Poll             │
    │   └─────────────┬─────────────┘
    │   ┌─────────────┴─────────────┐
    ├─> │          Check            │
    │   └─────────────┬─────────────┘
    │   ┌─────────────┴─────────────┐
    └─> │    Close Callbacks        │
        └───────────────────────────┘
```

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/9.gif)

## Example: Understanding the Event Loop

**Example Code**:

```javascript
const fs = require("fs");

console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

setImmediate(() => {
  console.log("Immediate callback");
});

fs.readFile(__filename, () => {
  console.log("File read callback");
});

console.log("End");
```

**Explanation**:

1. **Synchronous Code Execution**:

   - `console.log('Start');` executes and prints `Start`.
   - `console.log('End');` executes and prints `End`.

2. **Timers and Immediate Callbacks**:

   - `setTimeout(() => { console.log('Timeout callback'); }, 0);` schedules the callback to be executed after the poll phase.
   - `setImmediate(() => { console.log('Immediate callback'); });` schedules the callback to be executed after the poll phase.

3. **File Read Callback**:
   - `fs.readFile(__filename, () => { console.log('File read callback'); });` schedules a callback to be executed when the file read operation completes, which will happen in the poll phase.

**Expected Output**:

```
Start
End
Immediate callback
File read callback
Timeout callback
```

## Summary

- **Event Loop**:

  - Handles asynchronous operations in Node.js using a single-threaded, non-blocking architecture.
  - Manages the execution of callbacks from various sources like timers, I/O operations, and other events.

- **Phases of the Event Loop**:

  1. **Timers**: Executes callbacks from `setTimeout` and `setInterval`.
  2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration.
  3. **Idle, Prepare**: Internal use for system tasks.
  4. **Poll**: Retrieves new I/O events, executes I/O-related callbacks.
  5. **Check**: Executes `setImmediate` callbacks.
  6. **Close Callbacks**: Executes callbacks for closed connections.

- **Asynchronous I/O**:

  - Allows Node.js to perform non-blocking I/O operations, improving efficiency and scalability.

- **Timers**:

  - `setTimeout`, `setInterval`, and `setImmediate` are used for scheduling future execution of code.

- **Callback Execution Order**:
  - `setImmediate` callbacks execute before `setTimeout` callbacks scheduled with a delay of 0 milliseconds.
