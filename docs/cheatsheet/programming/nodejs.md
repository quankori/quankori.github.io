---
title: Node.js
---

## Overview

The **JavaScript Ecosystem (Node.js, JS, TS)** combines **JavaScript** (a dynamic, event-driven language), **Node.js** (a server-side runtime built on V8), and **TypeScript** (a statically typed superset of JS) into a powerful, unified platform. It supports scalable, high-performance applications with a rich ecosystem, leveraging event-driven architecture, asynchronous processing, and type safety for web, server, and real-time use cases.

**Core architecture**:

- **Event-driven model**: Manages tasks via an event loop and non-blocking I/O.
- **V8 engine**: Executes JS with JIT compilation and garbage collection.
- **Type system**: Adds static typing and advanced features with TypeScript.
- **Language features**: Includes dynamic typing, prototypes, and ES6+ enhancements.

**Performance optimization**:

- **Asynchronous programming**: Uses callbacks, promises, and async/await.
- **Concurrency**: Employs worker threads, clustering, and streams in Node.js.
- **Memory management**: Optimizes memory usage across JS, TS, and Node.js.
- **Build optimization**: Enhances builds with minification and TypeScript compilation.

**Scaling**:

- **Horizontal scaling**: Scales Node.js apps with load balancers and microservices.
- **Vertical scaling**: Tunes Node.js event loop and memory.
- **Caching**: Leverages in-memory and distributed caching solutions.

**Ecosystem & tools**:

- **Package management**: Manages dependencies with npm, Yarn, or pnpm.
- **Frameworks/libraries**: Includes React, NestJS, and Express.js.
- **Testing**: Uses Jest, Mocha, and Supertest for quality assurance.
- **Debugging & profiling**: Offers DevTools, Node Inspector, and TS debugging.
- **Deployment**: Supports static hosting, Docker, and serverless platforms.

**Design patterns**:

- **Module pattern**: Encapsulates code in JS/TS modules.
- **Middleware pattern**: Chains handlers in Node.js frameworks.
- **Factory pattern**: Creates objects dynamically in JS/TS.
- **Event emitter pattern**: Manages events in Node.js.

**Use cases**:

- **Web applications**: Builds client-side apps with JS/TS.
- **Real-time apps**: Uses Node.js for WebSocket-based solutions.
- **Server-side APIs**: Creates REST/GraphQL APIs with Node.js/TS.
- **Cross-platform development**: Extends to mobile with React Native.

**Source Tree**:

```
src/
├── core/
│   └── event.service.ts
├── perf/
│   ├── async.service.ts
│   ├── worker.service.ts
│   ├── stream.service.ts
├── scale/
│   └── redis.service.ts
├── patterns/
│   └── middleware.service.ts
└── app.module.ts
```

**Bash Scripts & Commands**:

- **Setup Redis for Caching (Bash Script)**:

  ```bash
  #!/bin/bash
  redis-server --port 6379 --dir data/redis --daemonize yes
  ```

- **Setup Nginx for Load Balancing (Bash Script)**:

  ```bash
  #!/bin/bash
  sudo apt-get install nginx
  echo "upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
  }
  server {
    listen 80;
    location / {
      proxy_pass http://backend;
    }
  }" > /etc/nginx/sites-available/myapp
  ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl restart nginx
  ```

- **Node.js Commands**:

  ```bash
  # Run with TypeScript
  ts-node src/main.ts

  # Build TS to JS
  tsc

  # Run with Inspector
  node --inspect dist/main.js
  ```

**NestJS Example**:

```typescript
// src/core/event.service.ts (**Event-driven model**)
import { Injectable } from "@nestjs/common";
import { EventEmitter } from "events";

@Injectable()
export class EventService {
  private emitter = new EventEmitter();

  async triggerEvent(event: string, data: any) {
    this.emitter.emit(event, data); // **Event loop**
    console.log("Event triggered:", event, data);
  }

  listen(event: string, callback: (data: any) => void) {
    this.emitter.on(event, callback); // **Event emitter pattern**
  }
}

// src/perf/async.service.ts (**Asynchronous programming**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class AsyncService {
  async fetchData(id: number): Promise<string> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(`Data ${id}`), 1000)
    ); // **Promises**
  }

  async getData(id: number): Promise<string> {
    return await this.fetchData(id); // **Async/await**
  }
}

// src/perf/worker.service.ts (**Worker threads**)
import { Injectable } from "@nestjs/common";
import { Worker } from "worker_threads";

@Injectable()
export class WorkerService {
  async computeHeavyTask(data: number): Promise<number> {
    return new Promise((resolve) => {
      const worker = new Worker(
        `
        const { parentPort } = require('worker_threads');
        parentPort.postMessage(${data} * 2);
      `,
        { eval: true }
      );
      worker.on("message", resolve);
    });
  }
}

// src/perf/stream.service.ts (**Streams**)
import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs";

@Injectable()
export class StreamService {
  async streamFile(filePath: string) {
    const stream = createReadStream(filePath); // **Readable**
    stream.pipe(process.stdout); // **Piping**
    stream.on("data", (chunk) => console.log("Chunk:", chunk.length));
  }
}

// src/scale/redis.service.ts (**Caching**)
import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {
  private redis = new Redis({ host: "localhost", port: 6379 });

  async cacheData(key: string, value: string) {
    await this.redis.set(key, value, "EX", 3600); // **In-memory caching**
  }

  async getCachedData(key: string) {
    return this.redis.get(key);
  }
}

// src/patterns/middleware.service.ts (**Middleware pattern**)
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class MiddlewareService implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware executed");
    next();
  }
}

// src/app.module.ts
import { Module, MiddlewareConsumer } from "@nestjs/common";
import { EventService } from "./core/event.service";
import { AsyncService } from "./perf/async.service";
import { WorkerService } from "./perf/worker.service";
import { StreamService } from "./perf/stream.service";
import { RedisService } from "./scale/redis.service";
import { MiddlewareService } from "./patterns/middleware.service";

@Module({
  providers: [
    EventService,
    AsyncService,
    WorkerService,
    StreamService,
    RedisService,
    MiddlewareService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareService).forRoutes("*");
  }
}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EventService } from "./core/event.service";
import { AsyncService } from "./perf/async.service";
import { WorkerService } from "./perf/worker.service";
import { StreamService } from "./perf/stream.service";
import { RedisService } from "./scale/redis.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const eventService = app.get(EventService);
  const asyncService = app.get(AsyncService);
  const workerService = app.get(WorkerService);
  const streamService = app.get(StreamService);
  const redisService = app.get(RedisService);

  // **Event-driven model**
  eventService.listen("test", (data) => console.log("Received:", data));
  await eventService.triggerEvent("test", { id: 1 });

  // **Asynchronous programming**
  console.log(await asyncService.getData(1));

  // **Worker threads**
  console.log(await workerService.computeHeavyTask(10));

  // **Streams**
  await streamService.streamFile("example.txt");

  // **Caching**
  await redisService.cacheData("key", "value");
  console.log(await redisService.getCachedData("key"));

  await app.listen(3000);
}
bootstrap();
```

## Key Differences

- **Core Architecture**: Combines JS’s event-driven nature, Node.js’s runtime, and TS’s type safety.
- **Performance Optimization**: Leverages async, concurrency, and build tools across all three.
- **Scaling**: Node.js drives horizontal scaling, enhanced by TS’s structure.
- **Ecosystem & Tools**: Unified package management and frameworks for JS/TS/Node.js.
- **Design Patterns**: Shared patterns like middleware and modules, with TS adding type-safe variants.
- **Use Cases**: Spans web, server, real-time, and cross-platform with a cohesive stack.
