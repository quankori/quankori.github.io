---
title: Process and Thread
---

## Node.js Processes and Threads

Node.js is built on a single-threaded, event-driven architecture, which is fundamentally different from traditional multi-threaded platforms like Java. Understanding the differences between processes and threads in Node.js and how they compare to Java's blocking model is essential for grasping Node.js's performance and scalability characteristics.

## Node.js: Single-Threaded Event Loop

### Key Characteristics

1. **Single Thread**:

   - Node.js runs JavaScript code in a single thread. This thread is responsible for executing code, handling asynchronous events, and performing I/O operations.

2. **Event Loop**:

   - Node.js uses an event loop to handle asynchronous operations. The event loop allows Node.js to perform non-blocking I/O operations, even though JavaScript itself is single-threaded.

3. **Non-Blocking I/O**:

   - Node.js offloads I/O operations (e.g., file system access, network requests) to the system's underlying infrastructure, allowing other tasks to proceed while waiting for I/O operations to complete.

4. **Libuv**:
   - Node.js uses the `libuv` library to handle asynchronous I/O operations and the event loop.

### Processes in Node.js

- **Child Processes**:
  - Node.js can create additional processes using the `child_process` module. These child processes can run separate instances of the V8 engine, effectively allowing parallel execution of JavaScript code.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/child-process.jpg)

**Example**:

```javascript
const { spawn } = require("child_process");

const child = spawn("ls", ["-lh", "/usr"]);

child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

child.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
```

- **Worker Threads**:
  - Node.js introduced worker threads in version 10.5.0 to allow parallel execution of JavaScript code within a single process.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/worker-thread.jpg)

**Example**:

```javascript
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (message) => console.log(message));
  worker.postMessage("Hello, worker");
} else {
  parentPort.on("message", (message) => {
    parentPort.postMessage(`Received: ${message}`);
  });
}
```

## Summary

- **Node.js**:

  - **Single-threaded**: Runs JavaScript code in a single thread.
  - **Event Loop**: Manages asynchronous operations.
  - **Non-blocking I/O**: Allows efficient handling of I/O operations.
  - **Child Processes and Worker Threads**: For parallel execution.
