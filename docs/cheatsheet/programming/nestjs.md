---
title: Nest.js
---

## NestJS

**Overview**: NestJS is a progressive, TypeScript-based framework for building scalable, server-side applications on Node.js, leveraging a modular architecture, dependency injection, and a rich ecosystem for enterprise-grade solutions.

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

**Performance optimization**:

- **Asynchronous processing**: Leverages Node.js async capabilities.
  - **Async/await**: Simplifies asynchronous code.
  - **Promises**: Manages async operations.
  - **RxJS observables**: Handles reactive streams.
- **Dependency injection**: Optimizes service resolution.
  - **Scoped providers**: Controls instance lifecycles.
  - **Lazy loading**: Delays module initialization.
- **Caching**: Improves response times.
  - **In-memory cache**: Stores data locally.
  - **Redis integration**: Scales caching externally.
- **Request optimization**: Enhances API performance.
  - **Compression**: Reduces response size.
  - **Rate limiting**: Prevents overload.
  - **Response caching**: Reuses frequent responses.

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

**Ecosystem & tools**:

- **CLI**: Streamlines development workflows.
  - **Project generation**: Creates boilerplate code.
  - **Build & serve**: Compiles and runs apps.
  - **Schematics**: Generates components.
- **Libraries**: Extends core functionality.
  - **@nestjs/core**: Framework foundation.
  - **@nestjs/microservices**: Microservice support.
  - **@nestjs/graphql**: GraphQL integration.
- **Testing**: Ensures code reliability.
  - **Jest**: Default testing framework.
  - **Supertest**: API testing utility.
  - **Unit/integration tests**: Validates components.
- **Debugging & profiling**: Analyzes runtime behavior.
  - **Node inspector**: Debugs with Node.js.
  - **VS Code debugger**: TypeScript debugging.
  - **Clinic.js**: Profiles performance.
- **Deployment**: Runs applications in production.
  - **PM2**: Manages processes.
  - **Docker**: Containerizes apps.
  - **Serverless**: Deploys to AWS Lambda.

**Design patterns**:

- **Dependency injection**: Manages service dependencies.
- **Middleware pattern**: Chains request handlers.
- **Module pattern**: Encapsulates functionality.
- **Decorator pattern**: Enhances classes with metadata.

**Use cases**:

- **RESTful APIs**: Builds scalable HTTP APIs.
- **Microservices**: Implements distributed systems.
- **GraphQL APIs**: Offers flexible querying.
- **Real-time apps**: Uses WebSockets for live updates.

**Source Tree**:

```
src/
├── core/
│   └── module.service.ts
├── perf/
│   ├── async.service.ts
│   ├── cache.service.ts
├── scale/
│   ├── micro.service.ts
├── tools/
│   └── test.service.ts
├── patterns/
│   └── middleware.ts
└── app.module.ts
```

**Bash Scripts & NestJS Commands**:

- **Setup Redis for Caching (Bash Script)**:

  ```bash
  #!/bin/bash
  redis-server --port 6379 --dir data/redis --daemonize yes
  ```

- **Setup Docker for Deployment (Bash Script)**:

  ```bash
  #!/bin/bash
  # Build NestJS app
  npm run build
  # Create Dockerfile
  echo "FROM node:18
  WORKDIR /app
  COPY dist/ .
  COPY package*.json ./
  RUN npm install --production
  CMD [\"node\", \"main.js\"]" > Dockerfile
  docker build -t nestjs-app .
  docker run -p 3000:3000 nestjs-app
  ```

- **NestJS Commands**:

  ```bash
  # Generate new project
  nest new myapp

  # Run with debugging
  nest start --debug

  # Run tests
  npm run test
  ```

**NestJS Example**:

```typescript
// src/core/module.service.ts (**Module system**)
import { Injectable } from "@nestjs/common";

@Injectable() // **Providers**
export class ModuleService {
  getData(): string {
    return "Module Data";
  }
}

// src/perf/async.service.ts (**Asynchronous processing**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class AsyncService {
  async fetchData(id: number): Promise<string> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(`Data ${id}`), 1000)
    ); // **Async/await**
  }
}

// src/perf/cache.service.ts (**Caching**)
import { Injectable, CacheInterceptor } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";

@Injectable()
@UseInterceptors(CacheInterceptor) // **Response caching**
export class CacheService {
  async getCachedData(key: string): Promise<string> {
    return `Cached ${key}`; // Simulated with Redis in practice
  }
}

// src/scale/micro.service.ts (**Microservices**)
import { Injectable } from "@nestjs/common";
import { ClientKafka, Transport } from "@nestjs/microservices";

@Injectable()
export class MicroService {
  private kafkaClient = new ClientKafka({
    client: { brokers: ["localhost:9092"] },
    consumer: { groupId: "micro-group" },
  });

  async sendEvent(event: string, data: any) {
    await this.kafkaClient
      .emit("micro_topic", { key: event, value: data })
      .toPromise();
    console.log("Event sent:", event, data);
  }
}

// src/patterns/middleware.ts (**Middleware pattern**)
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware executed");
    next();
  }
}

// src/app.module.ts
import { Module, MiddlewareConsumer } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import { ModuleService } from "./core/module.service";
import { AsyncService } from "./perf/async.service";
import { CacheService } from "./perf/cache.service";
import { MicroService } from "./scale/micro.service";
import { Middleware } from "./patterns/middleware";

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: "localhost",
      port: 6379,
      ttl: 3600,
    }),
  ],
  providers: [
    ModuleService,
    AsyncService,
    CacheService,
    MicroService,
    Middleware,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes("*");
  }
}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ModuleService } from "./core/module.service";
import { AsyncService } from "./perf/async.service";
import { CacheService } from "./perf/cache.service";
import { MicroService } from "./scale/micro.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const moduleService = app.get(ModuleService);
  const asyncService = app.get(AsyncService);
  const cacheService = app.get(CacheService);
  const microService = app.get(MicroService);

  // **Module system**
  console.log(moduleService.getData());

  // **Asynchronous processing**
  console.log(await asyncService.fetchData(1));

  // **Caching**
  console.log(await cacheService.getCachedData("key"));

  // **Microservices**
  await microService.sendEvent("test_event", { id: 1 });

  await app.listen(3000);
}
bootstrap();
```

## Key Differences

- **Core Architecture**: Modular with TypeScript and middleware focus.
- **Performance Optimization**: Async, DI, and caching for efficiency.
- **Scaling**: Microservices and distributed tools for growth.
- **Ecosystem & Tools**: CLI-driven with robust libraries and testing.
- **Design Patterns**: DI, middleware, and decorators for structure.
- **Use Cases**: APIs, microservices, GraphQL, and real-time apps.
