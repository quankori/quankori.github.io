---
title: Fundamental CheatSheet
---

### Fundamention

#### Libuv

Libuv is a low-level library that handles asynchronous operations such as I/O, networking, and other system tasks, enabling Node.js to perform non-blocking I/O.

#### Garbage Collection

Automatic memory management that frees up memory no longer in use. Node.js uses the V8 engine to perform garbage collection.

Default Memory Size if Not Set:

```js
// checkHeapSize.js
const v8 = require("v8");

const heapStatistics = v8.getHeapStatistics();
const totalHeapSize = heapStatistics.total_available_size / (1024 * 1024); // Convert to MB

console.log(`Default Total Heap Size: ${totalHeapSize.toFixed(2)} MB`);

// Output:
// Default Total Heap Size: 2097152.00 MB
```

Memory Limits

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // Intentional memory leak
  let bigArray = [];
  for (let i = 0; i < 1e7; i++) {
    bigArray.push(i);
  }
  res.send("Memory Leak!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Output:
// Server running on port 3000
// FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

Resolve

```js
node --max-old-space-size=512 memoryLeak.js
```

#### Non-blocking I/O

```js
const fs = require("fs");

console.log("Start reading file...");
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("File content:", data);
});
console.log("End of script.");

// Output:
// Start reading file...
// End of script.
// File content: Contents of example.txt
```

#### Single Thread

Node.js operates on a single thread but uses asynchronous techniques to handle multiple tasks concurrently.

### Event Loop

#### Workflow

The Event Loop manages the processing of asynchronous tasks, ensuring Node.js remains non-blocking and can handle new events continuously.

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise callback");
});

console.log("End");

// Output:
// Start
// End
// Promise callback
// Timeout callback
```

#### Phase

The Event Loop consists of multiple phases such as timers, pending callbacks, idle/prepare, poll, check, and close callbacks. Each phase handles different types of callbacks.

### Callback

#### Callback Function

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```

#### Callback Hell

```js
login(user, (err, user) => {
  if (err) throw err;
  getUserData(user, (err, data) => {
    if (err) throw err;
    processData(data, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });
});
```

#### Aysnc/Await

```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 1000);
  });
}

async function getData() {
  const data = await fetchData();
  console.log(data);
}

getData();
```

#### Generators Funciton

Generator functions can pause and resume execution, aiding in managing asynchronous flows.

```js
function* generator() {
  const data = yield fetchData();
  console.log(data);
}

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 1000);
  });
}

const gen = generator();
const promise = gen.next().value;
promise.then((data) => {
  gen.next(data);
});
```

### Scaling

#### Cluster

Creates child processes to take advantage of multi-core systems, improving the performance of Node.js applications.

```js
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers for each CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share the same server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("Hello from worker " + process.pid);
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}

// Output:
// Master 12345 is running
// Worker 12346 started
// Worker 12347 started
```

#### Child Process

Runs child processes to perform heavy or independent tasks without blocking the main event loop.

```js
const { exec } = require("child_process");

exec("ls -la", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }
  console.log(`Output:\n${stdout}`);
});

// Output:
// total 64
// drwxr-xr-x  8 user  staff   256 Apr 27 10:00 .
// drwxr-xr-x  4 user  staff    128 Apr 27 09:50 ..
// ...
```

#### Worker Thread

Allows performing CPU-intensive tasks in separate threads, preventing the event loop from being blocked.

```js
const { Worker } = require("worker_threads");

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

runService("Hello, Worker!")
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
```

```js
const { parentPort, workerData } = require("worker_threads");

parentPort.postMessage(`Worker received: ${workerData}`);

// Output:
// Worker received: Hello, Worker!
```