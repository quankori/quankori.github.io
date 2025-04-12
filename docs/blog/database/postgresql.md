---
title: PostgreSQL
---

## Core Features

**Core features**:

- **Relational model**: Organizes data into tables with rows and columns.
- **Advanced data types**: Supports JSON, Arrays, HStore for flexible storage.
- **Extensibility**: Allows custom functions and extensions (e.g., PostGIS).

### Core Features Service

```typescript
// src/core/corefeatures.service.ts (**Core features**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class CoreFeaturesService {
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

  async saveRelationalData(id: number, name: string): Promise<void> {
    await this.pool.query("INSERT INTO users (id, name) VALUES ($1, $2)", [
      id,
      name,
    ]);
    console.log(`Saved to relational table: ${id}, ${name}`);
  }

  async saveAdvancedData(
    id: number,
    name: string,
    jsonData: any,
    tags: string[]
  ): Promise<void> {
    await this.pool.query(
      "INSERT INTO users_advanced (id, name, json_data, tags) VALUES ($1, $2, $3, $4)",
      [id, name, JSON.stringify(jsonData), tags]
    );
    console.log(
      `Saved with advanced types: ${id}, ${name}, ${JSON.stringify(
        jsonData
      )}, ${tags}`
    );
  }
}
```

**Core Features Service Details**:

- **Purpose**: Demonstrates PostgreSQL’s relational model and advanced data types.
- **Explanation**: Initializes a PostgreSQL connection pool. `saveRelationalData` inserts data into a simple `users` table (relational model), while `saveAdvancedData` uses JSON and array types in a `users_advanced` table, showcasing flexible storage options, with logging for visibility.
- **Core Features Details**:
  - **Relational Model**: Tables like `users` with structured rows/columns (e.g., `id`, `name`).
  - **Advanced Data Types**: JSON for unstructured data (e.g., `json_data`), Arrays for lists (e.g., `tags`), HStore possible but not shown.
  - **Extensibility**: Not coded; PostGIS or custom functions (e.g., `CREATE FUNCTION`) extend capabilities.

---

## Scaling

**Scaling**:

- **Read replication**: Master-Slave setup for read scaling.
  - **Streaming replication**: Physical, real-time data syncing to replicas.
  - **Logical replication**: Replicates specific data changes logically.
- **Partitioning**: Splits large tables for horizontal scaling.
  - **Range partitioning**: Divides by range (e.g., dates).
  - **List partitioning**: Divides by specific values.
  - **Hash partitioning**: Distributes via hash function.

### Scaling Service

```typescript
// src/scaling/scaling.service.ts (**Scaling**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class ScalingService {
  private masterPool: Pool;
  private slavePool: Pool;

  constructor() {
    this.masterPool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432, // Master
    });
    this.slavePool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5433, // Slave (assumed)
    });
  }

  async writeToMaster(id: number, name: string): Promise<void> {
    await this.masterPool.query(
      "INSERT INTO users (id, name) VALUES ($1, $2)",
      [id, name]
    );
    console.log(`Wrote to master: ${id}, ${name}`);
  }

  async readFromSlave(id: number): Promise<any> {
    const result = await this.slavePool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    console.log(`Read from slave: ${JSON.stringify(result.rows[0])}`);
    return result.rows[0];
  }

  async partitionData(
    id: number,
    name: string,
    created: string
  ): Promise<void> {
    await this.masterPool.query(
      "INSERT INTO orders (id, name, created) VALUES ($1, $2, $3)", // Assumes partitioned table
      [id, name, created]
    );
    console.log(`Partitioned data: ${id}, ${name}, ${created}`);
  }
}
```

**Scaling Service Details**:

- **Purpose**: Simulates read replication and partitioning with PostgreSQL.
- **Explanation**: Initializes separate pools for master (port 5432) and slave (port 5433, assumed), `writeToMaster` writes to the master, `readFromSlave` reads from the slave (assuming replication), and `partitionData` inserts into an `orders` table (assumed partitioned externally), logging actions.
- **Scaling Details**:
  - **Read Replication**: Master writes, slaves sync (streaming/logical assumed setup).
  - **Partitioning**: Range (e.g., by `created` date) possible with `PARTITION BY RANGE` (not coded; requires table setup).

---

## Performance Optimization

**Performance optimization**:

- **Indexing**: Speeds queries with B-Tree, GiST, GIN, or BRIN indexes.
- **EXPLAIN/ANALYZE**: Analyzes query plans for optimization.
- **Avoid N+1 problem**: Uses eager loading or joins to reduce queries.
- **Vacuum & autovacuum**: Manages dead rows for garbage collection.
- **Connection pooling**: Optimizes connections with tools like PgBouncer.

### Performance Service

```typescript
// src/performance/performance.service.ts (**Performance optimization**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class PerformanceService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432,
      max: 10, // Connection pooling
    });
  }

  async indexedQuery(id: number): Promise<any> {
    const result = await this.pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    console.log(`Indexed query result: ${JSON.stringify(result.rows[0])}`);
    return result.rows[0];
  }

  async avoidNPlusOne(userId: number): Promise<any> {
    const result = await this.pool.query(
      "SELECT u.id, u.name, o.order_id FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.id = $1",
      [userId]
    );
    console.log(`Eager loaded result: ${JSON.stringify(result.rows)}`);
    return result.rows;
  }
}
```

**Performance Service Details**:

- **Purpose**: Demonstrates indexing and N+1 avoidance with PostgreSQL.
- **Explanation**: Initializes a connection pool with a max of 10 connections, `indexedQuery` assumes an index on `id` for fast retrieval, and `avoidNPlusOne` uses a join to fetch user and order data together, avoiding multiple queries, with logging for visibility.
- **Performance Optimization Details**:
  - **Indexing**: B-Tree on `id` (assumed) speeds queries.
  - **EXPLAIN/ANALYZE**: Not coded; would analyze query plans (e.g., `EXPLAIN SELECT ...`).
  - **Avoid N+1**: Join reduces query count vs. separate fetches.
  - **Vacuum & Autovacuum**: Not coded; PostgreSQL manages dead tuples automatically.
  - **Connection Pooling**: `max: 10` reuses connections.

---

## Transactional Integrity

**Transactional integrity**:

- **ACID transactions**: Ensures reliable data operations.
- **Transaction isolation levels**: Controls visibility of changes.
  - **Read uncommitted**: Allows dirty reads.
  - **Read committed**: Sees committed data only.
  - **Repeatable read**: Prevents non-repeatable reads.
  - **Serializable**: Highest isolation, prevents anomalies.
- **Locking mechanisms**: Manages concurrency.
  - **Row-level locks**: Locks specific rows.
  - **Table-level locks**: Locks entire tables.
  - **Deadlock handling**: Detects and resolves deadlocks.

### Transactional Integrity Service

```typescript
// src/transactional/transactional.service.ts (**Transactional integrity**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class TransactionalService {
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

  async acidTransaction(id: number, name: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE");
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

  async rowLockQuery(id: number): Promise<any> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        "SELECT * FROM users WHERE id = $1 FOR UPDATE",
        [id]
      );
      console.log(`Row locked result: ${JSON.stringify(result.rows[0])}`);
      await client.query("COMMIT");
      return result.rows[0];
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
}
```

**Transactional Integrity Service Details**:

- **Purpose**: Demonstrates ACID transactions and row-level locking.
- **Explanation**: `acidTransaction` uses a serializable transaction to ensure full isolation, inserting data with ACID guarantees, while `rowLockQuery` locks a row with `FOR UPDATE` during a transaction, logging results, with rollback on errors.
- **Transactional Integrity Details**:
  - **ACID**: Ensures Atomicity (all or nothing), Consistency (valid state), Isolation (Serializable here), Durability (committed data persists).
  - **Isolation Levels**: Serializable coded; others (e.g., Read Committed) adjustable via `SET TRANSACTION ISOLATION LEVEL`.
  - **Locking**: Row-level (`FOR UPDATE`); table-level and deadlocks handled by PostgreSQL internally.

---

## Design Patterns

**Design patterns**:

- **Normalized design**: Follows 1NF, 2NF, 3NF for data integrity.
- **Denormalization**: Trades normalization for performance.
- **Materialized views**: Pre-computes query results for speed.

### Design Patterns Service

```typescript
// src/designpatterns/designpatterns.service.ts (**Design patterns**)
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class DesignPatternsService {
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

  async normalizedInsert(
    id: number,
    name: string,
    orderId: number
  ): Promise<void> {
    await this.pool.query("INSERT INTO users (id, name) VALUES ($1, $2)", [
      id,
      name,
    ]);
    await this.pool.query(
      "INSERT INTO orders (order_id, user_id) VALUES ($1, $2)",
      [orderId, id]
    );
    console.log(`Normalized insert: user ${id}, order ${orderId}`);
  }

  async materializedViewQuery(): Promise<any[]> {
    const result = await this.pool.query("SELECT * FROM user_orders_mv");
    console.log(`Materialized view result: ${JSON.stringify(result.rows)}`);
    return result.rows;
  }
}
```

**Design Patterns Service Details**:

- **Purpose**: Demonstrates normalized design and materialized views.
- **Explanation**: `normalizedInsert` inserts into separate `users` and `orders` tables (normalized), `materializedViewQuery` queries a precomputed `user_orders_mv` view (assumed created externally), logging actions. Denormalization not coded but implied as a performance trade-off.
- **Design Patterns Details**:
  - **Normalized Design**: 1NF/2NF/3NF splits data (e.g., `users`, `orders`) for integrity.
  - **Denormalization**: Not shown; combines tables for speed (e.g., single table with redundant data).
  - **Materialized Views**: Precomputed results (e.g., `CREATE MATERIALIZED VIEW user_orders_mv AS ...`) for fast queries.
