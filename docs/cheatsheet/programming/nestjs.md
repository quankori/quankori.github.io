---
title: Nest.js
---

## Core Architecture

**Core architecture**:

- **Module system**: Organizes code into reusable, encapsulated units.
  - **Modules**: Groups related functionality.
  - **Controllers**: Handles HTTP requests and routing.
  - **Providers**: Supplies injectable services and logic.
- **Middleware pipeline**: Processes requests and responses.
  - **Request/response handling**: Manages HTTP lifecycle.
  - **Guards & interceptors**: Controls access and transforms data.
  - **Pipes**: Validates and transforms input data.
- **TypeScript integration**: Enhances development with type safety.
  - **Decorators**: Simplifies configuration and metadata.
  - **Static typing**: Ensures robust code.
  - **Interfaces**: Defines contracts for services.

### Module Service

```typescript
// src/core/module.service.ts (**Module system**)
import { Injectable, Scope } from "@nestjs/common";

// Define an interface for type safety (**Interfaces**)
interface DataProvider {
  getData(): string;
}

@Injectable({ scope: Scope.DEFAULT }) // Singleton scope: one instance app-wide
export class ModuleService implements DataProvider {
  // Line 1: Define a private property for internal state
  private message: string;

  constructor() {
    // Line 2: Initialize the message property
    this.message = "Module Service Initialized";
    // Line 3: Log initialization for debugging
    console.log(this.message);
  }

  // Line 4: Implement the getData method from the interface
  getData(): string {
    // Line 5: Return a simple string response
    return "Hello from Module Service";
  }
}

// **Module System Details**:
// - **Modules**: Encapsulate related controllers, providers, and imports (e.g., `@Module` decorator).
// - **Controllers**: Define routes using decorators like `@Get`, `@Post` (e.g., `@Controller('users')`).
// - **Providers**: Injectable services or utilities, registered with `@Injectable()`, supporting dependency injection.
```

### Middleware Pipeline Service

- **Request/Response Handling**: Executes middleware, guards, interceptors, and pipes in sequence.
- **Guards**: Restrict access (e.g., authentication via `@UseGuards(AuthGuard)`).
- **Interceptors**: Modify requests/responses (e.g., logging with `@UseInterceptors`).
- **Pipes**: Validate/transform data (e.g., `@UsePipes(ValidationPipe)` ensures type safety).

```typescript
// src/core/middleware-pipeline.service.ts (**Middleware pipeline**)
import {
  Injectable,
  NestMiddleware,
  Scope,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Body,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthGuard } from "@nestjs/passport";
import { LoggingInterceptor } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST }) // Request scope: new instance per HTTP request
@UseGuards(AuthGuard("jwt")) // **Guards**: Controls access (e.g., JWT authentication)
@UseInterceptors(LoggingInterceptor) // **Interceptors**: Transforms requests/responses
export class MiddlewarePipelineService implements NestMiddleware {
  // Line 1: Define middleware method
  use(req: Request, res: Response, next: NextFunction): void {
    // Line 2: Log request details
    console.log(`Request to ${req.path} received`);
    // Line 3: Proceed to next middleware or handler
    next();
  }

  // Example method with pipe validation
  @UsePipes(new ValidationPipe({ transform: true })) // **Pipes**: Validates/transforms input
  processInput(@Body() data: { id: number }): string {
    // Line 1: Access validated/transformed data
    console.log("Processed input:", data.id);
    // Line 2: Return response
    return `Data ID: ${data.id}`;
  }
}
```

### TypeScript Integration Service

- **Decorators**: Metadata annotations (e.g., `@Injectable()`, `@Get()`) simplify configuration.
- **Static Typing**: Ensures type safety (e.g., `User` interface prevents runtime errors).
- **Interfaces**: Define contracts for objects, enhancing code predictability.

```typescript
// src/core/typescript.service.ts (**TypeScript integration**)
import { Injectable, Scope } from "@nestjs/common";

// Define a TypeScript interface (**Interfaces**)
interface User {
  id: number;
  name: string;
}

@Injectable({ scope: Scope.DEFAULT }) // Singleton scope
export class TypeScriptService {
  // Line 1: Define a method with static typing (**Static typing**)
  getUser(user: User): string {
    // Line 2: Access typed properties
    const result = `User: ${user.name} (ID: ${user.id})`;
    // Line 3: Log result
    console.log(result);
    // Line 4: Return the result
    return result;
  }

  // Line 5: Example with decorator (**Decorators**)
  @Log("User fetched") // Custom decorator (simulated)
  fetchUser(id: number): User {
    // Line 6: Return a typed object
    return { id, name: "John Doe" };
  }
}

// Simulated decorator for logging
function Log(message: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`${message} at ${key}`);
      return original.apply(this, args);
    };
  };
}
```

## Performance Optimization

**Performance optimization**:

- **Asynchronous processing**: Leverages Node.js async capabilities.
  - **Async/await**: Simplifies asynchronous code.
  - **Promises**: Manages async operations.
  - **RxJS observables**: Handles reactive streams.
- **Dependency injection**: Optimizes service resolution.
  - **Scoped providers**: Controls instance lifecycles (singleton, transient, request).
  - **Lazy loading**: Delays module initialization.
- **Caching**: Improves response times.
  - **In-memory cache**: Stores data locally.
  - **Redis integration**: Scales caching externally.
- **Request optimization**: Enhances API performance.
  - **Compression**: Reduces response size.
  - **Rate limiting**: Prevents overload.
  - **Response caching**: Reuses frequent responses.

### Async Processing Service

```typescript
// src/perf/async.service.ts (**Asynchronous processing**)
import { Injectable, Scope } from "@nestjs/common";
import { Observable, of } from "rxjs";

@Injectable({ scope: Scope.TRANSIENT }) // Transient scope: new instance per injection
export class AsyncService {
  // Promise-based async method
  fetchWithPromise(id: number): Promise<string> {
    // Line 1: Return a new Promise
    return new Promise((resolve) => {
      // Line 2: Simulate async delay with setTimeout
      setTimeout(() => {
        // Line 3: Resolve with data
        resolve(`Promise Data ${id}`);
        // Line 4: Log resolution
        console.log("Promise resolved:", `Promise Data ${id}`);
      }, 1000);
    });
  }

  // Async/await wrapper
  async fetchData(id: number): Promise<string> {
    // Line 1: Await the Promise-based method
    const data = await this.fetchWithPromise(id);
    // Line 2: Log result
    console.log("Async/await completed:", data);
    // Line 3: Return data
    return data;
  }

  // RxJS Observable method
  fetchWithObservable(id: number): Observable<string> {
    // Line 1: Create an Observable from a value
    const observable = of(`Observable Data ${id}`);
    // Line 2: Log Observable creation
    console.log("Observable created for ID:", id);
    // Line 3: Return the Observable
    return observable;
  }
}
```

### Dependency Injection Service

**Scoped Providers**:

- **DEFAULT**: Singleton, one instance app-wide.
- **TRANSIENT**: New instance per injection.
- **REQUEST**: New instance per request.

```typescript
// src/perf/di.service.ts (**Dependency injection**)
import { Injectable, Scope, Module } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST }) // Request scope: new instance per HTTP request
export class DIService {
  // Line 1: Define a counter to track instance lifecycle
  private requestCount: number;

  constructor() {
    // Line 2: Initialize counter
    this.requestCount = 0;
    // Line 3: Log instance creation
    console.log("DIService instance created");
  }

  // Line 4: Method to increment and return counter
  getRequestCount(): number {
    // Line 5: Increment counter
    this.requestCount++;
    // Line 6: Log current count
    console.log("Request count:", this.requestCount);
    // Line 7: Return count
    return this.requestCount;
  }
}
```

### Cache Service

```typescript
// src/perf/cache.service.ts (**Caching**)
import { Injectable, Scope } from "@nestjs/common";
import { Cache } from "cache-manager";
import * as redisStore from "cache-manager-redis-store";

@Injectable({ scope: Scope.DEFAULT }) // Singleton scope
export class CacheService {
  private cache: Cache;

  constructor() {
    // Line 1: Initialize Redis-based cache
    this.cache = redisStore.create({
      host: "localhost",
      port: 6379,
      ttl: 3600,
    });
    // Line 2: Log cache initialization
    console.log("CacheService initialized with Redis");
  }

  // Line 3: Cache data with key
  async cacheData(key: string, value: string): Promise<void> {
    // Line 4: Set value in cache
    await this.cache.set(key, value);
    // Line 5: Log caching action
    console.log(`Cached ${key}: ${value}`);
  }

  // Line 6: Retrieve cached data
  async getCachedData(key: string): Promise<string | undefined> {
    // Line 7: Get value from cache
    const value = await this.cache.get<string>(key);
    // Line 8: Log retrieval result
    console.log(`Retrieved ${key}: ${value || "not found"}`);
    // Line 9: Return value
    return value;
  }
}
```

### Request Optimization Service

```typescript
// src/perf/request.service.ts (**Request optimization**)
import { Injectable, Scope, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { Response } from 'express';
import * as compression from 'compression';

@Injectable({ scope: Scope.DEFAULT }) // Singleton scope
@UseInterceptors(CacheInterceptor) // **Response caching**
export class RequestService {
  // Line 1: Simulate a compressed response
  compressResponse(res: Response, data: string): void {
    // Line 2: Apply compression middleware (simulated)
    compression()(req: any, res, () => {
      // Line 3: Write compressed response
      res.write(data);
      // Line 4: End response
      res.end();
      // Line 5: Log compression action
      console.log('Response compressed:', data);
    });
  }

  // Line 6: Rate-limited method (conceptual)
  rateLimitedMethod(): string {
    // Line 7: Return a simple response (rate limiting handled by middleware in practice)
    const result = 'Rate-limited response';
    // Line 8: Log response
    console.log(result);
    // Line 9: Return result
    return result;
  }
}
```

---

## Scaling

**Scaling**:

- **Horizontal scaling**: Expands across instances.
  - **Microservices**: Supports TCP, Kafka, RabbitMQ.
  - **Load balancers**: Distributes traffic (e.g., Nginx).
- **Vertical scaling**: Boosts single-instance performance.
  - **Optimize DI resolution**: Reduces overhead.
  - **Thread pool tuning**: Leverages Node.js under the hood.
- **Distributed systems**: Integrates with distributed tools.
  - **Message brokers**: Uses Kafka, RabbitMQ for communication.
  - **Redis for state**: Manages shared state.
  - **Service discovery**: Locates services (e.g., Consul).

### Microservice

```typescript
// src/scale/micro.service.ts (**Microservices**)
import { Injectable, Scope } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable({ scope: Scope.DEFAULT }) // Singleton scope
export class MicroService {
  private kafkaClient: ClientKafka;

  constructor() {
    // Line 1: Initialize Kafka client
    this.kafkaClient = new ClientKafka({
      client: { brokers: ["localhost:9092"] },
      consumer: { groupId: "micro-group" },
    });
    // Line 2: Log initialization
    console.log("Kafka client initialized");
  }

  // Line 3: Connect to Kafka on module init
  async onModuleInit(): Promise<void> {
    // Line 4: Establish connection
    await this.kafkaClient.connect();
    // Line 5: Log connection success
    console.log("Kafka client connected");
  }

  // Line 6: Send event to Kafka topic
  async sendEvent(topic: string, data: any): Promise<void> {
    // Line 7: Emit event to Kafka
    await this.kafkaClient
      .emit(topic, { key: String(data.id), value: data })
      .toPromise();
    // Line 8: Log event sending
    console.log(`Event sent to ${topic}:`, data);
  }
}
```
