---
title: Node.js Concept
---

## Node.js structure

- V8 is used to interpret and execute Javascript code
- Libuv is used for accessing the filesystem and some aspects of concurrency

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/3.PNG)

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/4.PNG)

## Single thread in Node.js

# Node.js Single-threaded vs. Multi-threaded in Other Languages

Node.js primarily functions as a single-threaded runtime environment. However, it has features to handle concurrent operations efficiently. Let's dive deeper:

## Node.js Fundamentals:

1. **Event Loop & Non-Blocking I/O**: Node.js achieves high concurrency using an event loop paired with non-blocking I/O. While JavaScript code runs on a single thread, many operations, especially I/O, are offloaded, allowing the main thread to process other tasks without waiting. This mechanism makes Node.js efficient for I/O-bound applications.
2. **Worker Threads**: Node.js introduced the "worker_threads" module from version 10.5.0, which provides the ability to run JavaScript in parallel threads, enhancing its capability to handle CPU-bound tasks.

## Comparison:

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

## Child process

- Allows you to run a new process on the system and interact with it through pipes. Child processes do not share memory or resources with each other, and each child process uses a separate thread. Child processes are useful for tasks that require processing multiple processes, but require interaction between independent processes.

## Worker threads

- Worker threads are a new feature in Node.js 10.5, allowing you to create multiple threads within a single Node.js process. All worker threads share memory and resources with the main thread, but each worker thread runs on a separate thread. Worker threads make it easier to create multithreaded applications in Node.js.

## Event loop

- When an asynchronous request is sent, such as an HTTP request, Node.js does not wait for that request to complete before continuing to execute other requests. Instead, Node.js sends that request to the system and continues to execute other requests. When that request is completed, the system notifies Node.js that the request is complete, and Node.js continues to execute other tasks.

- Tasks in the event loop are queued in different queues, including:

  - Task queue (also known as a callback queue): Contains callback functions called when an asynchronous request ends.

  - Microtask queue: Contains callback functions called when a promise is resolved or rejected.

  - Timers queue: Contains callback functions called when a time or timer (timeout or interval) is activated.

- When the event loop starts, it executes tasks in the microtask queue first, then the task queue, and finally the timers queue.

- When a task is executed, Node.js puts it into an infinite loop to wait for other tasks. While waiting, Node.js continues to execute tasks in the event loop queue.

## Cluster mode

Cluster mode is a feature in Node.js that allows you to create multiple child processes to run the same Node.js application on a computer or network. Each child process can run on a separate CPU or core, so it can take advantage of the power of CPUs or cores in the system.

In Cluster mode, the master process is responsible for creating and managing the worker processes. The master process shares TCP and UDP connections with the worker processes, allowing them to share network connections and process requests concurrently. When a request is received, the master process distributes the request to one of the available worker processes.

## PM2

PM2 (Process Manager 2) is a process management tool for Node.js that provides many useful features for running and managing Node.js applications on a server or in a production environment. PM2 can help manage Node.js processes, restart processes that have crashed, monitor system resources, log events, and much more.

## process.nextTick() và setImmediate()

process.nextTick() and setImmediate() are both methods used for scheduling callbacks. The difference between them is that process.nextTick() is called immediately after the current function ends, while setImmediate() is called after the system has processed all scheduled I/O. Therefore, process.nextTick() may be prioritized in cases where a quick response is necessary and I/O blocking should be avoided.
