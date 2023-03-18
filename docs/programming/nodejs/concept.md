---
title: Node.js Concept
---

## Node.js structure

- V8 is used to interpret and execute Javascript code
- Libuv is used for accessing the filesystem and some aspects of concurrency

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/3.PNG)

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/4.PNG)

## Basic concepts of Node.js

- Node.js is single-threaded but still supports multi-threading, such as child processes and worker threads.

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
