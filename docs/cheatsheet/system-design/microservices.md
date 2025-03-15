---
title: Microservices Architecture
---

## Communication Patterns

**Overview**: Communication Patterns in Microservices define how services interact, either synchronously (immediate response) or asynchronously (event-based), enabling loose coupling and scalability.

**Synchronous**: Direct, blocking calls between services (e.g., HTTP/REST).

**Asynchronous**: Non-blocking, event-driven communication (e.g., Kafka, RabbitMQ).

**Source Tree**:

```
src/
├── sync/
│   └── sync.service.ts
├── async/
│   └── kafka.service.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/sync/sync.service.ts (**Synchronous**)
import { Injectable, HttpService } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

@Injectable()
export class SyncService {
  constructor(private httpService: HttpService) {}

  async callSyncService(userId: number) {
    const response = await this.httpService
      .get(`http://localhost:3001/users/${userId}`)
      .toPromise();
    return response.data; // Synchronous REST call
  }
}

// src/async/kafka.service.ts (**Asynchronous**)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });
  private producer: Producer;

  constructor() {
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async emitUserEvent(userId: number, name: string) {
    await this.producer.send({
      topic: "user-events",
      messages: [{ value: JSON.stringify({ userId, name }) }],
    }); // Asynchronous Kafka event
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SyncService } from "./sync/sync.service";
import { KafkaService } from "./async/kafka.service";

@Module({
  imports: [HttpModule],
  providers: [SyncService, KafkaService],
})
export class AppModule {}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SyncService } from "./sync/sync.service";
import { KafkaService } from "./async/kafka.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const syncService = app.get(SyncService);
  const kafkaService = app.get(KafkaService);

  // Synchronous call
  console.log(await syncService.callSyncService(1));

  // Asynchronous event
  await kafkaService.emitUserEvent(1, "John");

  await app.listen(3000);
}
bootstrap();
```

**Note**: Assumes a second service at `localhost:3001` for sync calls and Kafka at `localhost:9092`. Install `kafkajs` via `npm install kafkajs`.

---

## Microservice Resiliency Patterns

**Overview**: Microservice Resiliency Patterns ensure services remain robust and available despite failures, using strategies like circuit breaking, retries, and load management to handle distributed system challenges.

**Circuit breaker pattern**: Stops requests to a failing service to prevent overload.

**Retry pattern**: Reattempts failed operations with delays.

**Timeout pattern**: Limits wait time for responses to avoid hanging.

**Bulkhead pattern**: Isolates failures to prevent cascading effects.

**Fallback pattern**: Provides default responses when services fail.

**Load shedding pattern**: Drops excess requests to maintain stability.

**Service aggregator pattern**: Combines data from multiple services.

**Service discovery pattern**: Dynamically locates services (e.g., Consul, Eureka).

**Gateway routing pattern**: Routes requests through a central gateway.

**Gateway offloading pattern**: Offloads tasks like authentication to a gateway.

**Source Tree**:

```
src/
├── resiliency/
│   ├── circuit-breaker.service.ts
│   ├── retry.service.ts
│   ├── timeout.service.ts
│   ├── bulkhead.service.ts
│   ├── fallback.service.ts
│   ├── load-shedding.service.ts
│   ├── aggregator.service.ts
│   ├── discovery.service.ts
│   └── gateway.service.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/resiliency/circuit-breaker.service.ts (**Circuit breaker pattern**)
import { Injectable } from "@nestjs/common";
import { CircuitBreaker } from "opossum";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class CircuitBreakerService {
  private breaker: CircuitBreaker;

  constructor(private httpService: HttpService) {
    this.breaker = new CircuitBreaker(
      async () => {
        return this.httpService
          .get("http://localhost:3001/users/1")
          .toPromise();
      },
      { timeout: 1000 }
    );
  }

  async getUser() {
    return this.breaker.fire().catch(() => "Service unavailable");
  }
}

// src/resiliency/retry.service.ts (**Retry pattern**)
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class RetryService {
  constructor(private httpService: HttpService) {}

  async getUserWithRetry() {
    for (let i = 0; i < 3; i++) {
      try {
        return await this.httpService
          .get("http://localhost:3001/users/1")
          .toPromise();
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Retry after 1s
      }
    }
    throw new Error("All retries failed");
  }
}

// src/resiliency/timeout.service.ts (**Timeout pattern**)
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class TimeoutService {
  constructor(private httpService: HttpService) {}

  async getUserWithTimeout() {
    return Promise.race([
      this.httpService.get("http://localhost:3001/users/1").toPromise(),
      new Promise((_, reject) => setTimeout(() => reject("Timeout"), 2000)),
    ]);
  }
}

// src/resiliency/bulkhead.service.ts (**Bulkhead pattern**)
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class BulkheadService {
  private queue: Promise<any>[] = [];

  constructor(private httpService: HttpService) {}

  async getUserWithBulkhead() {
    if (this.queue.length < 5) {
      // Limit to 5 concurrent requests
      const request = this.httpService
        .get("http://localhost:3001/users/1")
        .toPromise();
      this.queue.push(request);
      const result = await request;
      this.queue = this.queue.filter((q) => q !== request);
      return result;
    }
    throw new Error("Bulkhead limit reached");
  }
}

// src/resiliency/fallback.service.ts (**Fallback pattern**)
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class FallbackService {
  constructor(private httpService: HttpService) {}

  async getUserWithFallback() {
    try {
      return await this.httpService
        .get("http://localhost:3001/users/1")
        .toPromise();
    } catch {
      return { id: 1, name: "Default User" }; // Fallback response
    }
  }
}

// src/resiliency/load-shedding.service.ts (**Load shedding pattern**)
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class LoadSheddingService {
  private load = 0;

  constructor(private httpService: HttpService) {}

  async getUserWithLoadShedding() {
    if (this.load < 10) {
      // Shed load if > 10 requests
      this.load++;
      const result = await this.httpService
        .get("http://localhost:3001/users/1")
        .toPromise();
      this.load--;
      return result;
    }
    throw new Error("Load shed");
  }
}

// src/resiliency/aggregator.service.ts (**Service aggregator pattern**)
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AggregatorService {
  constructor(private httpService: HttpService) {}

  async aggregateUserData(userId: number) {
    const user = await this.httpService
      .get(`http://localhost:3001/users/${userId}`)
      .toPromise();
    const orders = await this.httpService
      .get(`http://localhost:3002/orders/${userId}`)
      .toPromise();
    return { user: user.data, orders: orders.data };
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CircuitBreakerService } from "./resiliency/circuit-breaker.service";
import { RetryService } from "./resiliency/retry.service";
import { TimeoutService } from "./resiliency/timeout.service";
import { BulkheadService } from "./resiliency/bulkhead.service";
import { FallbackService } from "./resiliency/fallback.service";
import { LoadSheddingService } from "./resiliency/load-shedding.service";
import { AggregatorService } from "./resiliency/aggregator.service";

@Module({
  imports: [HttpModule],
  providers: [
    CircuitBreakerService,
    RetryService,
    TimeoutService,
    BulkheadService,
    FallbackService,
    LoadSheddingService,
    AggregatorService,
  ],
})
export class AppModule {}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CircuitBreakerService } from "./resiliency/circuit-breaker.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const circuitBreaker = app.get(CircuitBreakerService);

  console.log(await circuitBreaker.getUser()); // Example: Circuit Breaker

  await app.listen(3000);
}
bootstrap();
```

**Notes**:

- Install `opossum` for Circuit Breaker: `npm install opossum`.
- Assumes external services at `localhost:3001` and `3002` for aggregation.

---

## Key Differences

- **Communication Patterns**:
  - Synchronous: Blocking, immediate response (REST).
  - Asynchronous: Non-blocking, event-driven (Kafka).
- **Resiliency Patterns**: Enhance fault tolerance with strategies like circuit breaking, retries, and load management.
