---
title: Event-Driven Architecture
---

## Event-Driven Architecture

**Overview**: Event-Driven Architecture designs systems to react to events—discrete occurrences that trigger actions—enabling asynchronous, decoupled communication between components, ideal for scalability and responsiveness.

**Events**: Occurrences that trigger actions or updates in the system.

**Event handlers**: Logic that processes events and performs tasks.

**Event notification**: Simple event broadcasting to notify components without state persistence.

**Source Tree**:

```
src/
├── events/
│   └── user.events.ts
├── handlers/
│   └── user.handler.ts
├── services/
│   └── kafka.service.ts
└── app.module.ts
```

**NestJS Example (with Kafka)**:

```typescript
// src/events/user.events.ts (**Events**)
export class UserCreatedEvent {
  constructor(public userId: number, public name: string) {}
}

// src/handlers/user.handler.ts (**Event handlers**)
import { Injectable } from "@nestjs/common";
import { UserCreatedEvent } from "../events/user.events";

@Injectable()
export class UserHandler {
  handleUserCreated(event: UserCreatedEvent) {
    console.log(`User ${event.name} (ID: ${event.userId}) created`);
  }
}

// src/services/kafka.service.ts (**Event notification**)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, Consumer } from "kafkajs";
import { UserCreatedEvent } from "../events/user.events";
import { UserHandler } from "../handlers/user.handler";

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });
  private producer: Producer;
  private consumer: Consumer;

  constructor(private userHandler: UserHandler) {
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "user-group" });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: "user-events",
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const event = JSON.parse(message.value.toString()) as UserCreatedEvent;
        this.userHandler.handleUserCreated(event);
      },
    });
  }

  async emitUserCreated(userId: number, name: string) {
    const event = new UserCreatedEvent(userId, name);
    await this.producer.send({
      topic: "user-events",
      messages: [{ value: JSON.stringify(event) }],
    });
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { KafkaService } from "./services/kafka.service";
import { UserHandler } from "./handlers/user.handler";

@Module({
  providers: [KafkaService, UserHandler],
})
export class AppModule {}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { KafkaService } from "./services/kafka.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaService = app.get(KafkaService);

  // Emit event to Kafka
  await kafkaService.emitUserCreated(1, "John");

  await app.listen(3000);
}
bootstrap();
```

**Note**: Requires Kafka running locally (`localhost:9092`). Install `kafkajs` via `npm install kafkajs`.

---

## Event Sourcing

**Overview**: Event Sourcing persists the state of an application as a sequence of events rather than a single snapshot, allowing reconstruction of state by replaying events, enhancing auditability and flexibility.

**Event sourcing**: Stores all changes as events to rebuild state.

**Event store**: Repository for persisting event sequences.

**State reconstruction**: Rebuilds current state by replaying events.

**Source Tree**:

```
src/
├── domain/
│   └── user.entity.ts
├── events/
│   └── user.events.ts
├── store/
│   └── event.store.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/domain/user.entity.ts (**State reconstruction**)
export class User {
  constructor(public id: number, public name: string = "") {}

  applyEvent(event: UserCreatedEvent | UserUpdatedEvent) {
    if (event instanceof UserCreatedEvent) this.name = event.name;
    if (event instanceof UserUpdatedEvent) this.name = event.newName;
  }
}

// src/events/user.events.ts (**Event sourcing**)
export class UserCreatedEvent {
  constructor(public userId: number, public name: string) {}
}

export class UserUpdatedEvent {
  constructor(public userId: number, public newName: string) {}
}

// src/store/event.store.ts (**Event store**)
import { Injectable } from "@nestjs/common";
import { UserCreatedEvent, UserUpdatedEvent } from "../events/user.events";

@Injectable()
export class EventStore {
  private events: (UserCreatedEvent | UserUpdatedEvent)[] = [];

  saveEvent(event: UserCreatedEvent | UserUpdatedEvent) {
    this.events.push(event);
  }

  getEventsForUser(userId: number) {
    return this.events.filter((e) => e.userId === userId);
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { EventStore } from "./store/event.store";

@Module({
  providers: [EventStore],
})
export class AppModule {}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EventStore } from "./store/event.store";
import { UserCreatedEvent, UserUpdatedEvent } from "./events/user.events";
import { User } from "./domain/user.entity";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const eventStore = app.get(EventStore);

  // Store events
  eventStore.saveEvent(new UserCreatedEvent(1, "John"));
  eventStore.saveEvent(new UserUpdatedEvent(1, "Jane"));

  // Reconstruct state
  const user = new User(1);
  const events = eventStore.getEventsForUser(1);
  events.forEach((event) => user.applyEvent(event));
  console.log(user.name); // Outputs: Jane

  await app.listen(3000);
}
bootstrap();
```

---

## Events Processing

**Overview**: Events Processing focuses on handling and transforming events in real-time or batches, enabling responsive systems through stream or batch processing techniques.

**Events processing**: Handles and transforms events as they occur.

**Stream processing**: Real-time event handling (e.g., Kafka, Flink).

**Batch processing**: Processes events in groups periodically.

**Source Tree**:

```
src/
├── events/
│   └── user.events.ts
├── processors/
│   ├── stream.processor.ts
│   ├── batch.processor.ts
│   └── kafka.service.ts
└── app.module.ts
```

**NestJS Example (with Kafka)**:

```typescript
// src/events/user.events.ts (**Events processing**)
export class UserCreatedEvent {
  constructor(
    public userId: number,
    public name: string,
    public timestamp: number
  ) {}
}

// src/processors/kafka.service.ts (Kafka Setup)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, Consumer } from "kafkajs";
import { UserCreatedEvent } from "../events/user.events";
import { StreamProcessor } from "./stream.processor";
import { BatchProcessor } from "./batch.processor";

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });
  private producer: Producer;
  private consumer: Consumer;

  constructor(
    private streamProcessor: StreamProcessor,
    private batchProcessor: BatchProcessor
  ) {
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "user-group" });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: "user-events",
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const event = JSON.parse(message.value.toString()) as UserCreatedEvent;
        this.streamProcessor.processStream(event); // Stream processing
      },
    });
  }

  async emitEvent(event: UserCreatedEvent) {
    await this.producer.send({
      topic: "user-events",
      messages: [{ value: JSON.stringify(event) }],
    });
  }
}

// src/processors/stream.processor.ts (**Stream processing**)
import { Injectable } from "@nestjs/common";
import { UserCreatedEvent } from "../events/user.events";

@Injectable()
export class StreamProcessor {
  processStream(event: UserCreatedEvent) {
    console.log(
      `[Stream] Real-time: User ${event.name} (ID: ${event.userId}) created at ${event.timestamp}`
    );
  }
}

// src/processors/batch.processor.ts (**Batch processing**)
import { Injectable } from "@nestjs/common";
import { UserCreatedEvent } from "../events/user.events";

@Injectable()
export class BatchProcessor {
  private eventBatch: UserCreatedEvent[] = [];

  addToBatch(event: UserCreatedEvent) {
    this.eventBatch.push(event);
    if (this.eventBatch.length >= 3) {
      // Batch size of 3
      this.processBatch();
    }
  }

  processBatch() {
    console.log("[Batch] Processing batch:", this.eventBatch);
    this.eventBatch = []; // Clear batch after processing
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { KafkaService } from "./processors/kafka.service";
import { StreamProcessor } from "./processors/stream.processor";
import { BatchProcessor } from "./processors/batch.processor";

@Module({
  providers: [KafkaService, StreamProcessor, BatchProcessor],
})
export class AppModule {}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { KafkaService } from "./processors/kafka.service";
import { BatchProcessor } from "./processors/batch.processor";
import { UserCreatedEvent } from "./events/user.events";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaService = app.get(KafkaService);
  const batchProcessor = app.get(BatchProcessor);

  // Emit events to Kafka for stream processing
  await kafkaService.emitEvent(new UserCreatedEvent(1, "John", Date.now()));
  await kafkaService.emitEvent(new UserCreatedEvent(2, "Jane", Date.now()));

  // Simulate batch processing
  batchProcessor.addToBatch(new UserCreatedEvent(3, "Alice", Date.now()));
  batchProcessor.addToBatch(new UserCreatedEvent(4, "Bob", Date.now()));
  batchProcessor.addToBatch(new UserCreatedEvent(5, "Charlie", Date.now())); // Triggers batch

  await app.listen(3000);
}
bootstrap();
```

**Note**: Requires Kafka running locally (`localhost:9092`). Install `kafkajs` via `npm install kafkajs`.

---

## Key Differences

- Event-Driven: Reacts to events with handlers or notifications, now using Kafka for realism.
- Event Sourcing: Persists state as events for reconstruction.
- Events Pro
