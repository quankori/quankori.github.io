---
title: Process and Thread
---


## Child Processes:

In Node.js, when you want to execute a system command, you can use the child_process module. This module allows you to run system commands, manage `child processes`, and communicate with them when you need to execute a system command or separate logic into a completely separate process.

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

When you create a child process, you are launching an entirely new system process. In the Unix environment, this is often done using the fork() system call.

**fork()**: This is a system call used to create a duplicate of the current process. It returns twice: once for the parent process (father) and once for the child process. In Node.js, fork() is used to create a new child process of Node.js and establishes an IPC (Inter-Process Communication) channel between them.

**spawn() and exec()**: Both of these methods create a child process, but they differ in terms of communication and handling output. spawn() returns a stream and is suitable for handling applications with large amounts of data. exec() returns the entire output as a string when the child process exits.

IPC (Inter-Process Communication) is a mechanism that allows two (or more) processes to communicate and share data with each other.

## Worker Threads:

Starting from Node.js version 10.5.0, a new module called `worker_threads` was introduced. It provides a way to create threads, making it easier to perform parallel computations in the Node.js environment when you need to boost computational performance by utilizing unused CPU cores and want to keep all the logic within the same process.

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

Node.js by default runs on a single thread, utilizing an event loop to handle asynchronous operations. However, some tasks, especially computational tasks, can block the event loop, leading to decreased performance.

This is where worker_threads come into play:

- When you create a Worker, a new thread is spawned, running in parallel with the main thread.
- Each worker has its own event loop and context, meaning they operate independently and don't share state.
- Workers can communicate with the main thread and each other using a message-passing mechanism.
- Objects like ArrayBuffer can be shared between threads, but sharing data between threads requires caution to avoid issues like race conditions.
  
In summary, "child processes" are suitable when you need complete isolation or want to run independent tasks alongside Node.js. On the other hand, "worker threads" are useful when you want to harness all the CPU cores without the need to start multiple instances of Node.js
## Cluster mode

Cluster mode is a feature in Node.js that allows you to create multiple child processes to run the same Node.js application on a single machine or across a network. Each child process can run on a separate CPU or core, effectively harnessing the power of the CPUs or cores in the system.

In cluster mode, the main process (master process) is responsible for creating and managing the child processes (worker processes). The main process shares TCP and UDP connections with the child processes, enabling them to share network connections and handle concurrent requests. When a request is received, the main process distributes that request to one of the available child processes.

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

1. First, we check if the current process is the main process (master process) by using cluster.isMaster. The main process is responsible for creating child processes (workers).

2. If it's the main process, we create as many child processes (workers) as there are CPU cores using cluster.fork().

3. We set up an event listener on the main process to listen for the 'exit' event. This event is triggered when a child process dies.

4. If it's not the main process (meaning it's a child process), we set up an HTTP server listening on port 8000 and respond with the string "Hello from Node.js!".

Here, we use cluster to create multiple child processes running the same application, taking advantage of the power of multiple CPU cores. When a child process exits or is killed, the main process can create a new child process to ensure that there are always child processes ready to handle requests.
