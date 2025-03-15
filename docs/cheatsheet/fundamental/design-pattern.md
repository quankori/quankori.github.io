---
title: Design Pattern
---

## Design Pattern

**Overview**: Design Patterns provide reusable solutions to common software design problems, enhancing modularity, scalability, and maintainability across various architectural styles and paradigms.

**CQRS**:

- **Core concepts**:
  - **Separation of database**: Splits write (PostgreSQL) and read (snapshot) data stores.
  - **Separation of concerns**: Divides command (write) and query (read) logic.
- **Implementation**:
  - **Commands**: Modify state in PostgreSQL.
  - **Queries**: Retrieve data from snapshot.
  - **Event sourcing integration**: Uses events to update snapshots.

**Saga**:

- **Distributed transactions**: Manages transactions across services.
- **Choreography**: Event-driven coordination using Kafka.
- **Orchestration**: Centralized control with rollback.
- **Compensation transaction**: Reverses actions on failure.

**Backends for frontend**: Tailors backend APIs for frontends via GraphQL.

**Transactional outbox and inbox**:

- **Outbox pattern**: Ensures reliable event publishing with DB transactions.
- **Inbox pattern**: Guarantees idempotent event consumption.

**Fan-out/fan-in**: Distributes tasks (fan-out) and aggregates results (fan-in).

**Shared database anti-pattern**: Avoids single DB across services due to coupling.

**Source Tree**:

```
src/
├── cqrs/
│   ├── commands/
│   │   └── create-user.command.ts
│   ├── queries/
│   │   └── get-user.query.ts
│   ├── snapshot.service.ts
├── saga/
│   ├── choreography.saga.ts
│   ├── orchestration.saga.ts
│   ├── kafka.service.ts
├── bff/
│   ├── graphql.module.ts
│   ├── user.resolver.ts
├── outbox-inbox/
│   ├── outbox.service.ts
│   ├── inbox.service.ts
├── fan/
│   └── fan.service.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/cqrs/commands/create-user.command.ts (**Commands**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { SnapshotService } from "../snapshot.service";

@Injectable()
export class CreateUserCommand {
  private pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mydb",
    password: "password",
    port: 5432,
  });

  constructor(private snapshotService: SnapshotService) {}

  async execute(id: number, name: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO users (id, name) VALUES ($1, $2)", [
        id,
        name,
      ]);
      await client.query("COMMIT");
      this.snapshotService.updateSnapshot(id, name); // Update read snapshot
      console.log(`User ${id} created in PostgreSQL`);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
}

// src/cqrs/snapshot.service.ts (**Event sourcing integration**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class SnapshotService {
  private users: { id: number; name: string }[] = [];

  updateSnapshot(id: number, name: string) {
    const existing = this.users.find((u) => u.id === id);
    if (existing) {
      existing.name = name;
    } else {
      this.users.push({ id, name });
    }
  }

  getUser(id: number) {
    return this.users.find((u) => u.id === id);
  }
}

// src/cqrs/queries/get-user.query.ts (**Queries**)
import { Injectable } from "@nestjs/common";
import { SnapshotService } from "../snapshot.service";

@Injectable()
export class GetUserQuery {
  constructor(private snapshotService: SnapshotService) {}

  async execute(id: number): Promise<{ id: number; name: string } | undefined> {
    const user = this.snapshotService.getUser(id);
    console.log(`Query: User ${id} from snapshot:`, user);
    return user;
  }
}

// src/saga/kafka.service.ts (Kafka Setup for Choreography)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, Consumer } from "kafkajs";

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "saga-group" });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: "order-events",
      fromBeginning: true,
    });
  }

  async emitEvent(event: { type: string; orderId: number }) {
    await this.producer.send({
      topic: "order-events",
      messages: [{ value: JSON.stringify(event) }],
    });
  }

  async subscribe(callback: (event: any) => void) {
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const event = JSON.parse(message.value.toString());
        callback(event);
      },
    });
  }
}

// src/saga/choreography.saga.ts (**Choreography**)
import { Injectable } from "@nestjs/common";
import { KafkaService } from "./kafka.service";

@Injectable()
export class ChoreographySaga {
  constructor(private kafkaService: KafkaService) {
    this.kafkaService.subscribe(async (event) => {
      if (event.type === "OrderStarted") {
        console.log(`[Choreography] Processing order ${event.orderId}`);
        try {
          // Simulate payment failure
          throw new Error("Payment failed");
        } catch (e) {
          // **Compensation transaction**
          await this.kafkaService.emitEvent({
            type: "OrderCancelled",
            orderId: event.orderId,
          });
          console.log(
            `[Choreography] Compensating: Cancel order ${event.orderId}`
          );
        }
      }
    });
  }

  async startOrder(orderId: number) {
    await this.kafkaService.emitEvent({ type: "OrderStarted", orderId });
  }
}

// src/saga/orchestration.saga.ts (**Orchestration**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrchestrationSaga {
  async processOrder(orderId: number) {
    const steps: { action: string; rollback?: () => void }[] = [
      {
        action: "Create order",
        rollback: () => console.log(`Rollback: Cancel order ${orderId}`),
      },
      {
        action: "Process payment",
        rollback: () => console.log(`Rollback: Refund payment ${orderId}`),
      },
    ];

    console.log(`[Orchestration] Order ${orderId} started`);
    for (const step of steps) {
      try {
        console.log(`[Orchestration] ${step.action}`);
        if (step.action === "Process payment")
          throw new Error("Payment failed");
      } catch (e) {
        // **Compensation transaction**
        steps
          .slice(0, steps.indexOf(step) + 1)
          .reverse()
          .forEach((s) => s.rollback && s.rollback());
        throw e;
      }
    }
  }
}

// src/bff/graphql.module.ts (**Backends for frontend** - GraphQL)
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
    }),
  ],
  providers: [UserResolver],
})
export class BffModule {}

// src/bff/user.resolver.ts
import { Resolver, Query, Args } from "@nestjs/graphql";

@Resolver("User")
export class UserResolver {
  @Query(() => String)
  async user(@Args("id") id: number) {
    return JSON.stringify({ id, name: "John" }); // Same for mobile/web
  }
}

// src/outbox-inbox/outbox.service.ts (**Outbox pattern**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class OutboxService {
  private pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mydb",
    password: "password",
    port: 5432,
  });

  async publishEvent(event: { type: string; data: any }) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        "INSERT INTO outbox (event_type, payload) VALUES ($1, $2)",
        [event.type, JSON.stringify(event.data)]
      );
      await client.query("COMMIT");
      console.log("Event published to outbox:", event);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
}

// src/outbox-inbox/inbox.service.ts (**Inbox pattern**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class InboxService {
  private processedEvents: Set<string> = new Set();

  async processEvent(eventId: string, event: { type: string; data: any }) {
    if (this.processedEvents.has(eventId)) {
      console.log(`Event ${eventId} already processed (idempotent)`);
      return;
    }
    console.log(`Processing event ${eventId}:`, event);
    this.processedEvents.add(eventId);
  }
}

// src/fan/fan.service.ts (**Fan-out/fan-in**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class FanService {
  async processTasks(tasks: number[]) {
    // Fan-out: Distribute tasks
    const promises = tasks.map(async (task) => {
      console.log(`Processing task ${task}`);
      return task * 2;
    });

    // Fan-in: Aggregate results
    const results = await Promise.all(promises);
    console.log("Aggregated results:", results);
    return results.reduce((sum, val) => sum + val, 0);
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { CreateUserCommand } from "./cqrs/commands/create-user.command";
import { GetUserQuery } from "./cqrs/queries/get-user.query";
import { SnapshotService } from "./cqrs/snapshot.service";
import { ChoreographySaga } from "./saga/choreography.saga";
import { OrchestrationSaga } from "./saga/orchestration.saga";
import { KafkaService } from "./saga/kafka.service";
import { BffModule } from "./bff/graphql.module";
import { OutboxService } from "./outbox-inbox/outbox.service";
import { InboxService } from "./outbox-inbox/inbox.service";
import { FanService } from "./fan/fan.service";

@Module({
  imports: [BffModule],
  providers: [
    CreateUserCommand,
    GetUserQuery,
    SnapshotService,
    ChoreographySaga,
    OrchestrationSaga,
    KafkaService,
    OutboxService,
    InboxService,
    FanService,
  ],
})
export class AppModule {}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CreateUserCommand } from "./cqrs/commands/create-user.command";
import { GetUserQuery } from "./cqrs/queries/get-user.query";
import { ChoreographySaga } from "./saga/choreography.saga";
import { OrchestrationSaga } from "./saga/orchestration.saga";
import { OutboxService } from "./outbox-inbox/outbox.service";
import { InboxService } from "./outbox-inbox/inbox.service";
import { FanService } from "./fan/fan.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const commandService = app.get(CreateUserCommand);
  const queryService = app.get(GetUserQuery);
  const choreographySaga = app.get(ChoreographySaga);
  const orchestrationSaga = app.get(OrchestrationSaga);
  const outboxService = app.get(OutboxService);
  const inboxService = app.get(InboxService);
  const fanService = app.get(FanService);

  // CQRS
  await commandService.execute(1, "John"); // Write to PostgreSQL
  console.log(await queryService.execute(1)); // Read from snapshot

  // Saga
  await choreographySaga.startOrder(1); // Kafka-based Choreography
  try {
    await orchestrationSaga.processOrder(2); // Orchestration
  } catch (e) {
    console.log(e.message);
  }

  // Outbox & Inbox
  await outboxService.publishEvent({ type: "UserCreated", data: { id: 1 } });
  await inboxService.processEvent("event-1", {
    type: "UserCreated",
    data: { id: 1 },
  });
  await inboxService.processEvent("event-1", {
    type: "UserCreated",
    data: { id: 1 },
  }); // Idempotent

  // Fan-Out/Fan-In
  await fanService.processTasks([1, 2, 3]);

  await app.listen(3000);
}
bootstrap();
```

## Key Differences

- **CQRS**: Separates writes (PostgreSQL) and reads (snapshot) with NestJS.
- **Saga**: Choreography (Kafka) vs Orchestration with compensation in NestJS.
- **BFF**: GraphQL serves all frontends in NestJS.
- **Outbox/Inbox**: Reliable, idempotent event handling in NestJS.
- **Fan-Out/Fan-In**: Task distribution and aggregation in NestJS.
