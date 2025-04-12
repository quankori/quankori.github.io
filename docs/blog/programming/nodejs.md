---
title: Node.js
---

## Core Architecture

**Core architecture**:

- **Event-driven model**: Manages tasks through an event loop and non-blocking I/O.
  - **Event loop**: Orchestrates asynchronous operations across distinct phases.
  - **Single-threaded non-blocking I/O**: Executes tasks without waiting for I/O completion.
  - **Libuv**: Provides a thread pool for I/O operations (e.g., file system, network).
- **V8 engine**: Executes JavaScript code with high performance.
  - **JavaScript runtime**: Runs JS outside the browser environment.
  - **JIT compilation**: Compiles JS to machine code at runtime.
  - **Garbage collection**: Manages memory using mark-and-sweep.
- **Module system**: Organizes code into reusable units.
  - **CommonJS**: Uses `require` and `module.exports` for module loading.
  - **ES modules**: Supports `import`/`export` syntax (ESM).
  - **Dynamic imports**: Loads modules asynchronously at runtime.

## Event Loop Service

- **How it works**: The event loop is Node.js's mechanism for handling asynchronous operations in a single-threaded environment. It continuously processes a queue of tasks in distinct phases, leveraging callbacks to avoid blocking the main thread.
- **Phases**:

1. **Timers**: Executes callbacks scheduled by `setTimeout` or `setInterval` once their delay expires. Example: `setTimeout(() => console.log('Done'), 1000)` runs after 1 second.
2. **Pending Callbacks**: Executes I/O callbacks deferred from previous cycles, such as TCP error handling or unresolved promises from prior operations.
3. **Poll**: Retrieves new I/O events (e.g., file reads, network requests) and executes their associated callbacks. This is the phase where most I/O work happens.
4. **Check**: Executes `setImmediate` callbacks, which run immediately after the Poll phase completes, bypassing timers.
5. **Close**: Handles close events, such as when a socket or file stream is closed (e.g., `socket.on('close', ...)`).
6. **Idle/Prepare**: Internal phases used by Node.js for housekeeping tasks, not directly accessible to developers.

- **Execution**: The loop iterates through these phases in order, processing pending tasks. If no tasks remain (no timers, I/O, or callbacks), it exits, ending the Node.js process.

```typescript
// src/core/event-loop.service.ts (**Event-driven model**)
import { EventEmitter } from "events";

export class EventLoopService {
  private emitter: EventEmitter;

  constructor() {
    // Line 1: Initialize EventEmitter to handle events
    this.emitter = new EventEmitter();
    // Line 2: Set a reasonable limit to prevent memory leaks from too many listeners
    this.emitter.setMaxListeners(20);
    // Line 3: Log initialization for debugging purposes
    console.log("EventLoopService initialized");
  }

  // Trigger an event asynchronously
  async triggerEvent(event: string, data: any): Promise<void> {
    // Line 1: Emit the event to all registered listeners
    this.emitter.emit(event, data);
    // Line 2: Log the event triggering action with data for traceability
    console.log(`Event ${event} triggered with data:`, data);
  }

  // Register a listener for an event
  listen(event: string, callback: (data: any) => void): void {
    // Line 1: Register the callback as a listener for the specified event
    this.emitter.on(event, callback);
    // Line 2: Log the listener registration to confirm setup
    console.log(`Listener registered for event: ${event}`);
  }
}
```

## V8 Service

- **JavaScript Runtime**: Provides an environment to run JS outside browsers, leveraging V8’s capabilities for server-side execution.
- **JIT Compilation**:
- **Process**: Parses JS → Optimizes (e.g., inlines functions) → Compiles to machine code → Executes.
- **Benefit**: Improves performance by avoiding repeated interpretation.
- **Garbage Collection**:
- **How it runs**: Uses a mark-and-sweep algorithm:

1. **Mark**: Identifies reachable objects from the root (e.g., global scope, stack).
2. **Sweep**: Reclaims memory from unreachable objects.

- **When it runs**: Triggered automatically when heap memory is low or manually with `global.gc()` (if `--expose-gc` is enabled).
- **Common Issues**:
- **Memory Leaks**: Unreleased references (e.g., unremoved event listeners: `emitter.on('event', ...)` without `off`).
- **Stop-the-World**: Major GC pauses execution, causing latency spikes (e.g., during large heap cleanup).
- **Over-allocation**: Excessive allocations (e.g., huge arrays) trigger frequent GC, degrading performance.

```typescript
// src/core/v8.service.ts (**V8 engine**)
export class V8Service {
  // Simulate V8 execution of JavaScript code
  executeCode(code: string): string {
    // Line 1: Use eval to simulate V8 executing a string of JS code (unsafe in production)
    const result = eval(code);
    // Line 2: Log the result to verify execution
    console.log("V8 executed code:", result);
    // Line 3: Convert result to string and return it
    return String(result);
  }

  // Simulate memory allocation and trigger garbage collection
  triggerGarbageCollection(): void {
    // Line 1: Allocate a large array to simulate memory usage
    const largeArray = new Array(1000000).fill("data");
    // Line 2: Log the allocation to track memory impact
    console.log("Allocated large array of length:", largeArray.length);
    // Line 3: Check if manual GC is enabled (requires --expose-gc flag)
    if (global.gc) {
      // Line 4: Trigger garbage collection explicitly
      global.gc();
      // Line 5: Log the GC action
      console.log("Garbage collection triggered");
    } else {
      // Line 6: Warn if GC is not enabled
      console.log("Run with --expose-gc to enable manual GC");
    }
  }
}
```

## Module Service

```typescript
// src/core/module.service.ts (**Module system**)
export class ModuleService {
  // CommonJS-style method
  commonJsMethod(): string {
    // Line 1: Define a result simulating CommonJS module output
    const result = "CommonJS Result";
    // Line 2: Log the execution for debugging
    console.log("CommonJS method called:", result);
    // Line 3: Return the result
    return result;
  }

  // ES Module-style method with dynamic import
  async esModuleMethod(): Promise<string> {
    // Line 1: Dynamically import the 'os' module
    const os = await import("os");
    // Line 2: Get the hostname using the imported module
    const result = os.hostname();
    // Line 3: Log the result for verification
    console.log("ES Module method called, hostname:", result);
    // Line 4: Return the hostname
    return result;
  }
}
```

---

## Performance Optimization

**Performance optimization**:

- **Asynchronous programming**: Handles I/O operations efficiently.
  - **Callbacks**: Passes functions as arguments for async completion.
  - **Promises**: Provides a structured way to handle async results.
  - **Async/await**: Simplifies promise-based code with synchronous-like syntax.
- **Worker threads**: Offloads CPU-intensive tasks to separate threads.
  - **Multi-threading for CPU-intensive tasks**: Runs heavy computations in parallel.
  - **Thread pool configuration**: Adjusts the number of threads via `UV_THREADPOOL_SIZE`.
- **Clustering**: Scales across multiple CPU cores.
  - **Multi-process scaling**: Forks processes to utilize all cores.
  - **Load balancing with PM2**: Distributes requests across processes.
- **Streams**: Processes data in chunks for efficiency.
  - **Readable/writable/transform**: Defines stream types for data flow.
  - **Backpressure handling**: Manages flow when consumer is slower than producer.
  - **Piping**: Chains streams to simplify data transfer.

## Async Service

```typescript
// src/perf/async.service.ts (**Asynchronous programming**)
export class AsyncService {
  // Callback-based async method
  fetchWithCallback(id: number, callback: (data: string) => void): void {
    // Line 1: Use setTimeout to simulate an asynchronous I/O operation
    setTimeout(() => {
      // Line 2: Generate the data string
      const data = `Callback Data ${id}`;
      // Line 3: Call the provided callback with the result
      callback(data);
      // Line 4: Log the completion for tracking
      console.log("Callback executed:", data);
    }, 1000); // 1-second delay
  }

  // Promise-based async method
  fetchWithPromise(id: number): Promise<string> {
    // Line 1: Create and return a new Promise
    return new Promise((resolve) => {
      // Line 2: Use setTimeout to simulate delay
      setTimeout(() => {
        // Line 3: Generate the data string
        const data = `Promise Data ${id}`;
        // Line 4: Resolve the Promise with the data
        resolve(data);
        // Line 5: Log the resolution for debugging
        console.log("Promise resolved:", data);
      }, 1000); // 1-second delay
    });
  }

  // Async/await wrapper method
  async fetchData(id: number): Promise<string> {
    // Line 1: Await the Promise-based method to get the data
    const data = await this.fetchWithPromise(id);
    // Line 2: Log the result after awaiting
    console.log("Async/await completed:", data);
    // Line 3: Return the data
    return data;
  }
}
```

## Worker Service

```typescript
// src/perf/worker.service.ts (**Worker threads**)
import { Worker } from "worker_threads";

export class WorkerService {
  // Run CPU-intensive task in a worker thread
  async computeHeavyTask(data: number): Promise<number> {
    // Line 1: Return a new Promise to handle the worker's async result
    return new Promise((resolve, reject) => {
      // Line 2: Create a new Worker with an inline script
      const worker = new Worker(
        `
        const { parentPort } = require('worker_threads');
        const data = ${data};
        let result = data;
        // Line 3: Perform a CPU-intensive loop
        for (let i = 0; i < 1000000; i++) result += i;
        // Line 4: Send the result back to the main thread
        parentPort.postMessage(result);
      `,
        { eval: true }
      );
      // Line 5: Listen for the worker's message with the result
      worker.on("message", (result) => {
        console.log("Worker completed with result:", result);
        resolve(result);
      });
      // Line 6: Handle any errors from the worker
      worker.on("error", (error) => {
        console.error("Worker error:", error);
        reject(error);
      });
    });
  }
}

// **Thread Pool Configuration**:
// - **Default Size**: 4 threads (UV_THREADPOOL_SIZE=4), used for I/O tasks like file reads.
// - **Adjustment**: Set via environment variable, e.g., `export UV_THREADPOOL_SIZE=8`.
// - **Purpose**: Workers use this pool for I/O, but CPU tasks (like above) run in separate threads.
```

## Cluster Service

```typescript
// src/perf/cluster.service.ts (**Clustering**)
import * as cluster from "cluster";
import { cpus } from "os";

export class ClusterService {
  // Start clustering across CPU cores
  startCluster(): void {
    // Line 1: Check if the current process is the master process
    if (cluster.isMaster) {
      // Line 2: Log the master process ID
      console.log(`Master ${process.pid} started`);
      // Line 3: Determine the number of CPU cores available
      const numCPUs = cpus().length;
      // Line 4: Fork a worker process for each CPU core
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      // Line 5: Listen for worker exit events to restart them if needed
      cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} exited`);
        cluster.fork(); // Restart the worker
      });
    } else {
      // Line 6: Log the worker process ID
      console.log(`Worker ${process.pid} started`);
    }
  }
}

// **Load Balancing with PM2**:
// - **Command**: `pm2 start app.js -i max` forks workers based on CPU cores.
// - **Purpose**: Distributes incoming requests across workers for load balancing.
```

## Stream Service

```typescript
// src/perf/stream.service.ts (**Streams**)
import { createReadStream } from "fs";

export class StreamService {
  // Stream a file with detailed handling
  async streamFile(filePath: string): Promise<void> {
    // Line 1: Create a readable stream from the specified file
    const stream = createReadStream(filePath);
    // Line 2: Pipe the stream to stdout as a writable destination
    stream.pipe(process.stdout);
    // Line 3: Handle data events to process chunks as they arrive
    stream.on("data", (chunk: Buffer) => {
      console.log("Received chunk of size:", chunk.length);
    });
    // Line 4: Handle the end event when streaming is complete
    stream.on("end", () => {
      console.log("Stream completed");
    });
    // Line 5: Handle backpressure with the drain event
    stream.on("drain", () => {
      console.log("Backpressure drained, consumer caught up");
    });
    // Line 6: Handle errors such as file not found
    stream.on("error", (err) => {
      console.error("Stream error:", err.message);
    });
    // Line 7: Return a Promise that resolves when streaming ends
    return new Promise((resolve) => stream.on("end", resolve));
  }
}

// **Streams Details**:
// - **Readable**: Source of data (e.g., file read stream).
// - **Writable**: Destination of data (e.g., process.stdout).
// - **Transform**: Modifies data mid-stream (not used here).
// - **Backpressure**: Occurs when the writable destination can't keep up; stream pauses until drained.
```

---

## Scope Details

- **Global Scope**: Variables declared outside any function or module, attached to the `global` object in Node.js. Example: `global.myVar = 1;` - accessible everywhere but risks namespace pollution.
  - **Issue**: Overuse can lead to naming conflicts and unintended side effects.
- **Closure Scope**: Variables captured by nested functions, retaining access even after the outer function completes. Example:
  ```javascript
  function outer() {
    const x = 1;
    return function inner() {
      return x; // `x` is in closure scope
    };
  }
  const fn = outer();
  console.log(fn()); // 1
  ```
  - **Use**: Preserves state in callbacks or async operations.
- **Module Scope**: Variables defined within a module file, private by default unless exported (via `module.exports` or `export`). Example:
  ```javascript
  const secret = "hidden"; // Module scope
  exports.reveal = () => "revealed";
  ```
  - **Benefit**: Encapsulation prevents global pollution.
- **Function Scope**: Variables declared with `var` inside a function, scoped to that function (pre-ES6). Example:
  ```javascript
  function test() {
    var x = 1; // Function scope
    if (true) {
      var y = 2; // Still function scope, not block
    }
    console.log(x, y); // 1, 2
  }
  ```
  - **Issue**: `var` hoisting can cause confusion.
- **Block Scope**: Variables declared with `let` or `const` inside `{}` blocks (ES6+). Example:
  ```javascript
  if (true) {
    let x = 1; // Block scope
    const y = 2; // Block scope
  }
  console.log(x); // ReferenceError: x is not defined
  ```
  - **Benefit**: Prevents leakage outside intended scope.
