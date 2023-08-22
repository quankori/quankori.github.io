---
title: Process and Thread
---

## Concept

**Process**: It is an independent unit that contains a program being executed and its resources. Each process has its own address space, and one process cannot directly access the address space of another process (unless using IPC mechanisms).

IPC stands for Inter-Process Communication. It is a set of methods for different processes to communicate with each other. IPC is used in both single and multi-system environments, allowing processes to share data, signals, or messages in a coordinated and safe manner.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/2.png)

**Thread**: It is the smallest unit of code being executed. A process can contain multiple threads. All threads within the same process share the address space of that process, making data sharing among threads easier. However, this also brings synchronization challenges.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/6.png)

## Child Processes:

In Node.js, when you want to execute a system command, you can use the `child_process` module. This module allows you to run system commands, manage child processes, and communicate with them, when you wish to execute a system command or need to isolate logic in an entirely separate process.

```js
const { exec } = require("child_process");

exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`Output: ${stdout}`);
  console.error(`Errors: ${stderr}`);
});
```

```js
const { fork } = require("child_process");

const child = fork("./child-script.js");

child.on("message", (msg) => {
  console.log("Message from child:", msg);
});

child.send({ hello: "world" });
```

In file `child-script.js`

```js
process.on("message", (msg) => {
  console.log("Message from parent:", msg);
  process.send({ msg: "Hello from child!" });
});
```

When you create a child process, you are launching an entirely new system process. In a Unix environment, this is often done using the fork() command.

fork(): It is a system command used to create a copy of the current process. This command returns twice: once for the original (parent) process and once for the child process. In Node.js, fork() helps create a new Node.js child process and establishes an IPC communication channel between them.

spawn() and exec(): Both of these methods create a child process, but they differ in terms of communication and output management. spawn() returns a stream and is suitable for handling applications with large amounts of data. exec() returns the entire output as a string when the child process ends.

IPC (Inter-Process Communication) is a mechanism that allows two (or more) processes to communicate and share data with each other.

## Worker Threads:

Starting from Node.js 10.5.0, a new module called `worker_threads` was introduced. It provides a means to create threads, making parallel computation easier in the Node.js environment, when you need to boost computational performance by leveraging unused CPU cores and you want to keep all logic within the same process.

```js
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  // This is the main thread

  const worker = new Worker(__filename); // Start a new worker with this file

  worker.on("message", (msg) => {
    console.log("Message from worker:", msg);
  });

  worker.postMessage("Hello Worker!");
} else {
  // This is the worker thread

  parentPort.on("message", (msg) => {
    console.log("Message from main thread:", msg);
    parentPort.postMessage("Hello Main Thread!");
  });
}
```

Node.js runs on a single thread by default, using the event loop to handle asynchronous operations. However, some tasks, especially computational tasks, can block the event loop, reducing performance.

That's where worker_threads come in:

- When you create a Worker, a new thread is spawned, running parallel to the main thread.
- Each worker has its own event loop and context, meaning they operate independently and do not share state.
- Workers can communicate with the main thread and with each other using a message-passing mechanism.
- Objects like ArrayBuffer can be shared between threads, but sharing data among threads requires caution to avoid issues like race conditions.

In general, "child processes" are suitable when you need complete separation or when running tasks independent of Node.js. Meanwhile, "worker threads" are beneficial when you want to utilize all the cores on a CPU without having to launch multiple instances of Node.js.

## Cluster mode

Cluster mode is a feature in Node.js that allows you to create multiple child processes to run the same Node.js application on a computer or network. Each child process can run on a separate CPU or core, so it can take advantage of the power of CPUs or cores in the system.

In Cluster mode, the master process is responsible for creating and managing the worker processes. The master process shares TCP and UDP connections with the worker processes, allowing them to share network connections and process requests concurrently. When a request is received, the master process distributes the request to one of the available worker processes.

```js
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this example, it's an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("Hello from Node.js!");
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

Explanation:

1. We first check if the current process is the master process using cluster.isMaster. The master process is responsible for forking child processes (workers).
2. If it's the master process, we fork as many workers as there are CPU cores using cluster.fork().
3. We set up an event listener on the master process to listen for the exit event. This event is emitted when a worker process dies.
4. If it's not the master (meaning it's a worker process), we set up an HTTP server that listens on port 8000 and responds with "Hello from Node.js!".
