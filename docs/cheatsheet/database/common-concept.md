---
title: Common Concepts
---

**Overview**: Common Concepts in databases define foundational principles for data organization, consistency, scalability, and performance, applicable across various database types like SQL and NoSQL, guiding design and optimization.

## Data Models

**Data models**:

- **Relational**: Organizes data into tables with rows and columns (e.g., PostgreSQL).
- **NoSQL**: Flexible models like Document (MongoDB), Key-Value (Redis), Column-Family (Cassandra), or Graph (Neo4j).
- **Hybrid**: Combines relational and NoSQL features (e.g., PostgreSQL with JSON).

### Data Models Service

```typescript
// src/datamodels/datamodels.service.ts (**Data models**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { MongoClient } from "mongodb";
import { Redis } from "ioredis";

@Injectable()
export class DataModelsService {
  private pgPool: Pool;
  private mongoClient: MongoClient;
  private redis: Redis;

  constructor() {
    this.pgPool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432,
    });
    this.mongoClient = new MongoClient("mongodb://localhost:27017");
    this.redis = new Redis({ host: "localhost", port: 6379 });
  }

  async saveRelational(id: number, name: string): Promise<void> {
    await this.pgPool.query("INSERT INTO users (id, name) VALUES ($1, $2)", [
      id,
      name,
    ]);
    console.log(`Saved to PostgreSQL (Relational): ${id}, ${name}`);
  }

  async saveNoSQLDocument(id: number, name: string): Promise<void> {
    await this.mongoClient.connect();
    const db = this.mongoClient.db("mydb");
    await db
      .collection("users")
      .insertOne({ id, name, extra: { created: new Date() } });
    console.log(`Saved to MongoDB (NoSQL Document): ${id}, ${name}`);
  }

  async saveNoSQLKeyValue(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
    console.log(`Saved to Redis (NoSQL Key-Value): ${key}, ${value}`);
  }

  async saveHybrid(id: number, name: string, jsonData: any): Promise<void> {
    await this.pgPool.query(
      "INSERT INTO users_json (id, name, data) VALUES ($1, $2, $3)",
      [id, name, JSON.stringify(jsonData)]
    );
    console.log(
      `Saved to PostgreSQL (Hybrid): ${id}, ${name}, ${JSON.stringify(
        jsonData
      )}`
    );
  }
}
```

**Data Models Service Details**:

- **Purpose**: Demonstrates different data models using PostgreSQL (Relational), MongoDB (NoSQL Document), Redis (NoSQL Key-Value), and PostgreSQL with JSON (Hybrid).
- **Explanation**: Initializes connections to each database type. `saveRelational` stores structured data in PostgreSQL tables, `saveNoSQLDocument` adds flexible documents to MongoDB, `saveNoSQLKeyValue` uses Redis for key-value pairs, and `saveHybrid` combines relational and JSON data in PostgreSQL, logging each action.
- **Data Models Details**:
  - **Relational**: PostgreSQL uses tables (e.g., `users` with `id`, `name` columns).
  - **NoSQL**: MongoDB stores documents (e.g., `{ id, name, extra }`), Redis uses key-value pairs.
  - **Hybrid**: PostgreSQL with JSON (e.g., `users_json` with a `data` JSONB column) blends structured and unstructured data.

---

## Consistency Models

**Consistency models**:

- **ACID**: Ensures reliable transactions (Atomicity, Consistency, Isolation, Durability) in SQL databases.
- **BASE**: Prioritizes availability and scalability (Basically Available, Soft state, Eventual consistency) in NoSQL.
- **Eventual consistency vs Strong consistency**: Trade-off between immediate consistency (ACID) and delayed consistency (BASE).

### Consistency Models Service

```typescript
// src/consistency/consistency.service.ts (**Consistency models**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { Redis } from "ioredis";

@Injectable()
export class ConsistencyService {
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

  async acidTransaction(id: number, name: string): Promise<void> {
    const client = await this.pgPool.connect();
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO users (id, name) VALUES ($1, $2)", [
        id,
        name,
      ]);
      await client.query("COMMIT");
      console.log(`ACID transaction completed: ${id}, ${name}`);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }

  async baseOperation(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
    console.log(`BASE operation (eventual consistency): ${key}, ${value}`);
  }
}
```

**Consistency Models Service Details**:

- **Purpose**: Demonstrates ACID transactions with PostgreSQL and BASE operations with Redis.
- **Explanation**: `acidTransaction` uses a PostgreSQL transaction to ensure Atomicity, Consistency, Isolation, and Durability (ACID), while `baseOperation` performs a simple Redis set operation, relying on eventual consistency (BASE), with logging for visibility.
- **Consistency Models Details**:
  - **ACID**: PostgreSQL ensures reliable writes with transactions (e.g., rollback on failure).
  - **BASE**: Redis prioritizes availability and scalability, with data eventually consistent across nodes.
  - **Eventual vs Strong**: ACID offers strong consistency (immediate); BASE offers eventual (delayed).

---

## Scaling

**Scaling**:

- **Vertical scaling**: Increases server capacity (e.g., more CPU/RAM).
- **Horizontal scaling**: Adds more servers with techniques like:
  - **Sharding**: Splits data across nodes.
  - **Replication**: Copies data for redundancy and read scaling.
  - **Partitioning**: Divides tables into smaller parts.
- **Load balancing**: Distributes traffic across servers.

### Scaling Service

```typescript
// src/scaling/scaling.service.ts (**Scaling**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { MongoClient } from "mongodb";

@Injectable()
export class ScalingService {
  private pgPool: Pool;
  private mongoClient: MongoClient;

  constructor() {
    this.pgPool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432,
    });
    this.mongoClient = new MongoClient("mongodb://localhost:27017");
  }

  async replicateData(id: number, name: string): Promise<void> {
    const client = await this.pgPool.connect();
    try {
      await client.query("INSERT INTO users (id, name) VALUES ($1, $2)", [
        id,
        name,
      ]);
      console.log(
        `Data replicated to PostgreSQL (assumed replica): ${id}, ${name}`
      );
    } finally {
      client.release();
    }
  }

  async shardData(id: number, name: string): Promise<void> {
    await this.mongoClient.connect();
    const db = this.mongoClient.db("mydb");
    await db.collection("users").insertOne({ id, name });
    console.log(`Data sharded to MongoDB (assumed shard): ${id}, ${name}`);
  }
}
```

**Scaling Service Details**:

- **Purpose**: Simulates replication and sharding with PostgreSQL and MongoDB.
- **Explanation**: `replicateData` inserts into PostgreSQL (assuming replication setup externally), `shardData` inserts into MongoDB (assuming sharding setup), logging actions to illustrate scaling techniques.
- **Scaling Details**:
  - **Vertical Scaling**: Not coded; implies upgrading server resources.
  - **Horizontal Scaling**: Replication (PostgreSQL) copies data; Sharding (MongoDB) splits data.
  - **Load Balancing**: Not coded; assumed with external tools like Nginx.

---

## Performance Optimization

**Performance optimization**:

- **Indexing**: Speeds up queries with data structures (e.g., B-Tree).
- **Caching**: Stores frequent data in memory (e.g., Redis).
- **Query optimization**: Improves query efficiency (e.g., EXPLAIN in SQL).
- **Connection pooling**: Reuses database connections for performance.

### Performance Optimization Service

```typescript
// src/performance/performance.service.ts (**Performance optimization**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { Redis } from "ioredis";

@Injectable()
export class PerformanceService {
  private pgPool: Pool;
  private redis: Redis;

  constructor() {
    this.pgPool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432,
      max: 10, // Connection pooling
    });
    this.redis = new Redis({ host: "localhost", port: 6379 });
  }

  async indexedQuery(id: number): Promise<any> {
    const result = await this.pgPool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    console.log(`Indexed query result: ${JSON.stringify(result.rows[0])}`);
    return result.rows[0];
  }

  async cacheData(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, "EX", 3600);
    console.log(`Cached data: ${key}, ${value}`);
  }

  async getCachedData(key: string): Promise<string | null> {
    const value = await this.redis.get(key);
    console.log(`Retrieved cached data: ${key}, ${value}`);
    return value;
  }
}
```

**Performance Optimization Service Details**:

- **Purpose**: Demonstrates indexing, caching, and connection pooling for performance.
- **Explanation**: Initializes a PostgreSQL pool with a max of 10 connections (pooling), `indexedQuery` assumes an index on `id` for fast retrieval, `cacheData` stores data in Redis with a 1-hour TTL, and `getCachedData` retrieves it, logging actions to show optimization benefits.
- **Performance Optimization Details**:
  - **Indexing**: B-Tree on `id` (assumed) speeds up PostgreSQL queries.
  - **Caching**: Redis stores frequent data in memory.
  - **Query Optimization**: Not coded; `EXPLAIN` would analyze query plans.
  - **Connection Pooling**: Reuses connections via `max: 10` in Pool config.
