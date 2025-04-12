---
title: Design Pattern
---

## CQRS

**CQRS**:

- **Core concepts**:
  - **Separation of database**: Splits write (PostgreSQL) and read (snapshot) data stores.
  - **Separation of concerns**: Divides command (write) and query (read) logic.
- **Implementation**:
  - **Commands**: Modify state in PostgreSQL.
  - **Queries**: Retrieve data from snapshot.
  - **Event sourcing integration**: Uses events to update snapshots.

### Command Service

```typescript
// src/cqrs/command.service.ts (**Commands**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { SnapshotService } from "./snapshot.service";

@Injectable()
export class CommandService {
  private pool: Pool;

  constructor(private snapshotService: SnapshotService) {
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432,
    });
  }

  async createUser(id: number, name: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO users (id, name) VALUES ($1, $2)", [
        id,
        name,
      ]);
      await client.query("COMMIT");
      this.snapshotService.updateSnapshot(id, name);
      console.log(`User created in PostgreSQL: ${id}, ${name}`);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
}
```

**Command Service Details**:

- **Purpose**: Handles write operations to a PostgreSQL database with event sourcing integration.
- **Explanation**: Initializes a PostgreSQL connection pool, uses a transaction to insert a user into the `users` table, updates the snapshot via `SnapshotService`, and logs the action. Errors trigger a rollback for consistency.
- **CQRS Details**:
  - **Separation of Database**: Writes to PostgreSQL as the command store.
  - **Commands**: Modifies state with transactional integrity.

### Query Service

```typescript
// src/cqrs/query.service.ts (**Queries**)
import { Injectable } from "@nestjs/common";
import { SnapshotService } from "./snapshot.service";

@Injectable()
export class QueryService {
  constructor(private snapshotService: SnapshotService) {}

  async getUser(id: number): Promise<string> {
    const data = this.snapshotService.getUser(id);
    console.log(`Query from snapshot: ${data}`);
    return data;
  }
}
```

**Query Service Details**:

- **Purpose**: Retrieves data from an in-memory snapshot store.
- **Explanation**: Uses `SnapshotService` to fetch user data by ID from the snapshot, logging and returning the result, keeping read operations separate from the write database.
- **CQRS Details**:
  - **Separation of Concerns**: Queries read from a snapshot, not the write store.
  - **Event Sourcing Integration**: Relies on snapshot updates from events.

### Snapshot Service

```typescript
// src/cqrs/snapshot.service.ts (**Event sourcing integration**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class SnapshotService {
  private snapshot: Map<number, string>;

  constructor() {
    this.snapshot = new Map();
  }

  updateSnapshot(id: number, name: string): void {
    this.snapshot.set(id, name);
    console.log(`Snapshot updated: ${id}, ${name}`);
  }

  getUser(id: number): string {
    return this.snapshot.get(id) || "User not found";
  }
}
```

**Snapshot Service Details**:

- **Purpose**: Manages an in-memory snapshot for read operations.
- **Explanation**: Uses a `Map` to store user data, `updateSnapshot` adds or updates entries (simulating event-driven updates), and `getUser` retrieves data, providing a fallback if not found.
- **CQRS Details**: Acts as the read model, updated via events from commands.

---

## Saga

**Saga**:

- **Distributed transactions**: Manages transactions across services.
- **Choreography**: Event-driven coordination using Kafka.
- **Orchestration**: Centralized control with rollback.
- **Compensation transaction**: Reverses actions on failure.

### Choreography Service

```typescript
// src/saga/choreography.service.ts (**Choreography**)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class ChoreographyService implements OnModuleInit {
  private kafkaClient: ClientKafka;

  constructor() {
    this.kafkaClient = new ClientKafka({
      client: { brokers: ["localhost:9092"] },
      consumer: { groupId: "saga-group" },
    });
  }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async startOrder(orderID: number): Promise<void> {
    await this.kafkaClient
      .emit("order-events", { key: String(orderID), value: "OrderStarted" })
      .toPromise();
    console.log(`Order started, event published: ${orderID}`);
    // Simulate failure and compensation
    await this.kafkaClient
      .emit("order-events", { key: String(orderID), value: "OrderCancelled" })
      .toPromise();
    console.log(`Compensation: Order cancelled: ${orderID}`);
  }
}
```

**Choreography Service Details**:

- **Purpose**: Implements event-driven coordination with Kafka.
- **Explanation**: Initializes a Kafka client, connects on module init, and `startOrder` publishes an "OrderStarted" event, followed by a simulated failure with an "OrderCancelled" compensating event, logged for visibility.
- **Saga Details**:
  - **Choreography**: Kafka events drive coordination across services.
  - **Compensation Transaction**: "OrderCancelled" reverses the initial action.

### Orchestration Service

```typescript
// src/saga/orchestration.service.ts (**Orchestration**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrchestrationService {
  private steps = [
    {
      action: "Create order",
      rollback: (id: number) => console.log(`Rollback: Cancel order ${id}`),
    },
    {
      action: "Process payment",
      rollback: (id: number) => console.log(`Rollback: Refund payment ${id}`),
    },
  ];

  async processOrder(orderID: number): Promise<void> {
    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];
      console.log(`Executing: ${step.action}`);
      if (step.action === "Process payment") {
        for (let j = i; j >= 0; j--) {
          this.steps[j].rollback(orderID);
        }
        throw new Error(`Payment failed for order ${orderID}`);
      }
    }
  }
}
```

**Orchestration Service Details**:

- **Purpose**: Manages a centralized transaction with rollback capabilities.
- **Explanation**: Defines steps with actions and rollback functions, `processOrder` executes them sequentially, simulates a failure at "Process payment," and triggers rollbacks in reverse order, throwing an error to indicate failure.
- **Saga Details**:
  - **Orchestration**: Central control over transaction steps.
  - **Compensation Transaction**: Rollbacks reverse actions on failure.

---

## Backends for Frontend

**Backends for frontend**: Tailors backend APIs for frontends via GraphQL.

### BFF Service

```typescript
// src/bff/bff.service.ts (**Backends for frontend**)
import { Injectable } from "@nestjs/common";
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from "graphql";

@Injectable()
export class BFFService {
  async queryGraphQL(): Promise<string> {
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: "Query",
        fields: {
          user: {
            type: GraphQLString,
            resolve: () => "John Doe",
          },
        },
      }),
    });
    const result = await graphql({ schema, source: "{ user }" });
    return `GraphQL result: ${result.data.user}`;
  }
}
```

**BFF Service Details**:

- **Purpose**: Provides a GraphQL API tailored for frontends.
- **Explanation**: Defines a GraphQL schema with a `user` field resolving to "John Doe," executes a query, and returns the result, offering a flexible API for frontend consumption.
- **BFF Details**: GraphQL enables tailored responses for frontend needs (e.g., mobile, web).

---

## Transactional Outbox and Inbox

**Transactional outbox and inbox**:

- **Outbox pattern**: Ensures reliable event publishing with DB transactions.
- **Inbox pattern**: Guarantees idempotent event consumption.

### Outbox Service

```typescript
// src/outbox/outbox.service.ts (**Outbox pattern**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class OutboxService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432,
    });
  }

  async publishEvent(eventType: string, payload: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        "INSERT INTO outbox (event_type, payload) VALUES ($1, $2)",
        [eventType, payload]
      );
      await client.query("COMMIT");
      console.log(`Event published to outbox: ${eventType}, ${payload}`);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
}
```

**Outbox Service Details**:

- **Purpose**: Ensures reliable event publishing within a database transaction.
- **Explanation**: Initializes a PostgreSQL pool, `publishEvent` starts a transaction, inserts an event into an `outbox` table, and commits it, ensuring atomicity with any related write operation, logging the action.
- **Outbox Details**: Ties event publishing to DB transactions for reliability.

### Inbox Service

```typescript
// src/inbox/inbox.service.ts (**Inbox pattern**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class InboxService {
  private processedEvents: Set<string>;

  constructor() {
    this.processedEvents = new Set();
  }

  processEvent(eventID: string, eventType: string): void {
    if (this.processedEvents.has(eventID)) {
      console.log(`Event already processed (idempotent): ${eventID}`);
      return;
    }
    console.log(`Processing event: ${eventID}, ${eventType}`);
    this.processedEvents.add(eventID);
  }
}
```

**Inbox Service Details**:

- **Purpose**: Ensures idempotent event consumption.
- **Explanation**: Uses a `Set` to track processed event IDs, `processEvent` checks if an event has been processed, skips it if so (idempotency), otherwise processes and logs it, adding the ID to the set.
- **Inbox Details**: Prevents duplicate event processing (e.g., from retries).

---

## Fan-out/Fan-in

**Fan-out/fan-in**: Distributes tasks (fan-out) and aggregates results (fan-in).

### Fan Service

```typescript
// src/fan/fan.service.ts (**Fan-out/fan-in**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class FanService {
  async processTasks(tasks: number[]): Promise<number> {
    const promises = tasks.map(async (task) => {
      console.log(`Processing task: ${task}`);
      return task * 2;
    });
    const results = await Promise.all(promises);
    const sum = results.reduce((acc, val) => acc + val, 0);
    console.log(`Fan-out/fan-in result: ${sum}`);
    return sum;
  }
}
```

**Fan Service Details**:

- **Purpose**: Implements fan-out/fan-in for task distribution and aggregation.
- **Explanation**: `processTasks` maps tasks to async operations (fan-out) that double each value, uses `Promise.all` to await all results, and reduces them to a sum (fan-in), logging the final result.
- **Fan-out/Fan-in Details**: Distributes work across concurrent tasks and aggregates results efficiently.

---

## Shared Database Anti-Pattern

**Shared database anti-pattern**: Avoids single DB across services due to coupling.

- **Purpose**: Highlights the anti-pattern conceptually.
- **Shared Database Anti-Pattern Details**: Using a single DB across microservices leads to tight coupling, schema conflicts, and scaling challenges.
