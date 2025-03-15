---
title: Design Principle
---

## Monolithic First Strategy

**Monolithic first strategy**: Starts with a single, unified app before evolving to distributed systems.

### Monolithic First Explanation

- **Purpose**: Begins development with a monolithic architecture to simplify initial design and deployment, then refactors into microservices as complexity grows.
- **Explanation**: A monolithic app consolidates all functionality (e.g., UI, business logic, data access) into one codebase and deployment unit. This approach speeds up early development and testing, allowing a team to establish a working system before addressing scalability needs with distributed systems.
- **Details**:
  - **When to Use**: Early-stage projects with unclear boundaries or small teams.
  - **Evolution**: Split into microservices when scaling or team size increases (e.g., using domain-driven design to identify service boundaries).
- **No Code Needed**: Conceptual strategy, implemented via project structure rather than specific code.

---

## Polyglot Persistence

**Polyglot persistence**: Uses multiple database types for different needs (e.g., SQL, NoSQL).

### Polyglot Persistence Service

```typescript
// src/polyglot/polyglot.service.ts (**Polyglot persistence**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { Redis } from "ioredis";

@Injectable()
export class PolyglotService {
  private pgPool: Pool;
  private redis: Redis;

  constructor() {
    this.pgPool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432,
    });
    this.redis = new Redis({ host: "localhost", port: 6379 });
  }

  async saveToSQL(id: number, name: string): Promise<void> {
    await this.pgPool.query("INSERT INTO users (id, name) VALUES ($1, $2)", [
      id,
      name,
    ]);
    console.log(`Saved to PostgreSQL: ${id}, ${name}`);
  }

  async saveToNoSQL(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
    console.log(`Saved to Redis: ${key}, ${value}`);
  }
}
```

**Polyglot Persistence Service Details**:

- **Purpose**: Demonstrates using PostgreSQL (SQL) and Redis (NoSQL) for different persistence needs.
- **Explanation**: Initializes connections to PostgreSQL (for structured data) and Redis (for key-value data), with `saveToSQL` storing user data in a relational table and `saveToNoSQL` caching data in Redis, showing how different DBs serve distinct purposes.
- **Polyglot Persistence Details**:
  - **Multiple DB Types**: SQL for relational data (e.g., user records), NoSQL for fast access (e.g., caching).
  - **Use Case**: PostgreSQL for persistent storage, Redis for session data or caching.

---

## Core Development Principles

**Core development principles**:

- **SOLID**: Five principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) for clean code.
- **DRY**: Avoids code duplication (Don’t Repeat Yourself).
- **KISS**: Keeps designs simple (Keep It Simple, Stupid).
- **YAGNI**: Avoids unnecessary features (You Aren’t Gonna Need It).
- **GRASP**: Assigns responsibilities effectively (General Responsibility Assignment Software Patterns).

---

## Inversion of Control (IoC)

**Inversion of control (IoC)**:

- **Dependency injection**: Passes dependencies to objects rather than creating them internally.
- **IoC containers**: Manages dependency injection automatically (e.g., NestJS DI).
- **Service locator**: Retrieves dependencies from a central registry.

### IoC Service

```typescript
// src/ioc/ioc.service.ts (**Dependency injection, IoC containers**)
import { Injectable } from "@nestjs/common";

interface Logger {
  log(message: string): void;
}

@Injectable()
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`Console: ${message}`);
  }
}

@Injectable()
export class IoCService {
  constructor(private logger: Logger) {} // Dependency injection via IoC container

  performTask(): void {
    this.logger.log("Task performed");
  }
}
```

**IoC Service Details**:

- **Purpose**: Demonstrates dependency injection and IoC container usage in NestJS.
- **Explanation**: `ConsoleLogger` implements a `Logger` interface, and `IoCService` receives it via constructor injection managed by NestJS’s IoC container, allowing `performTask` to use the injected logger without creating it internally.
- **IoC Details**:
  - **Dependency Injection**: `logger` injected rather than instantiated.
  - **IoC Containers**: NestJS automatically resolves and injects dependencies.
  - **Service Locator**: Not shown (less common in NestJS; typically a manual registry pattern).

---

## CAP Theorem

**CAP theorem**:

- **Consistency**: Ensures all nodes see the same data at the same time.
- **Availability**: Guarantees a response even during failures.
- **Partition tolerance**: Handles network partitions gracefully.
- **Trade-offs**: Balances CAP properties (e.g., CA, CP, AP systems).

### CAP Theorem Explanation

- **Purpose**: Defines constraints in distributed systems.
- **Explanation**: CAP theorem states a system can prioritize only two of three properties: Consistency (all nodes have the same data), Availability (always responds), and Partition Tolerance (works despite network splits). For example, a CA system (e.g., RDBMS) sacrifices partition tolerance, while an AP system (e.g., Cassandra) sacrifices consistency for availability during partitions.
- **Details**:
  - **Consistency**: Strong in single-node systems (e.g., PostgreSQL).
  - **Availability**: Prioritized in NoSQL like Redis during partitions.
  - **Partition Tolerance**: Essential for distributed systems (e.g., Kafka).
  - **Trade-offs**: CP (consistency + partition tolerance) or AP (availability + partition tolerance) common in microservices.

---

## Scalability Principles

**Scalability principles**:

- **Horizontal vs vertical scaling**: Adds servers (horizontal) or upgrades hardware (vertical).
- **Load balancing**: Distributes traffic across servers (e.g., Nginx).
- **Caching strategies**: Improves performance with in-memory storage (e.g., Redis).
