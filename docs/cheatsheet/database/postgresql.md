---
title: PostgreSQL
---

## PostgreSQL

**Overview**: PostgreSQL is a powerful, open-source relational database system known for its robust feature set, ACID compliance, extensibility, and scalability, suitable for enterprise and complex applications.

**Core features**:

- **Relational model**: Organizes data into tables with rows and columns.
- **Advanced data types**: Supports JSON, Arrays, HStore for flexible storage.
- **Extensibility**: Allows custom functions and extensions (e.g., PostGIS).

**Scaling**:

- **Read replication**: Master-Slave setup for read scaling.
  - **Streaming replication**: Physical, real-time data syncing to replicas.
  - **Logical replication**: Replicates specific data changes logically.
- **Partitioning**: Splits large tables for horizontal scaling.
  - **Range partitioning**: Divides by range (e.g., dates).
  - **List partitioning**: Divides by specific values.
  - **Hash partitioning**: Distributes via hash function.

**Performance optimization**:

- **Indexing**: Speeds queries with B-Tree, GiST, GIN, or BRIN indexes.
- **EXPLAIN/ANALYZE**: Analyzes query plans for optimization.
- **Avoid N+1 problem**: Uses eager loading or joins to reduce queries.
- **Vacuum & autovacuum**: Manages dead rows for garbage collection.
- **Connection pooling**: Optimizes connections with tools like PgBouncer.

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

**Design patterns**:

- **Normalized design**: Follows 1NF, 2NF, 3NF for data integrity.
- **Denormalization**: Trades normalization for performance.
- **Materialized views**: Pre-computes query results for speed.

**Source Tree**:

```
src/
├── postgres/
│   ├── postgres.service.ts
│   └── postgres.module.ts
└── main.ts
```

**Bash Scripts & SQL Commands**:

- **Setup Streaming Replication (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start master
  mkdir -p data/master
  initdb -D data/master
  echo "wal_level = replica" >> data/master/postgresql.conf
  echo "host replication all 127.0.0.1/32 trust" >> data/master/pg_hba.conf
  pg_ctl -D data/master -l data/master.log start

  # Start replica
  mkdir -p data/replica
  pg_basebackup -h 127.0.0.1 -D data/replica -U postgres -R
  pg_ctl -D data/replica -l data/replica.log start
  ```

- **Setup PgBouncer (Bash Script)**:

  ```bash
  #!/bin/bash
  # Install PgBouncer (Ubuntu example)
  sudo apt-get install pgbouncer
  echo "[databases]" > /etc/pgbouncer/pgbouncer.ini
  echo "mydb = host=localhost port=5432 dbname=mydb" >> /etc/pgbouncer/pgbouncer.ini
  echo "pool_mode = session" >> /etc/pgbouncer/pgbouncer.ini
  pgbouncer -d /etc/pgbouncer/pgbouncer.ini
  ```

- **PostgreSQL SQL Commands**:

  ```sql
  -- **Relational model**: Create table
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    info JSONB, -- **Advanced data types**
    tags TEXT[]
  );

  -- **Indexing**: B-Tree index
  CREATE INDEX idx_users_id ON users(id);

  -- **Partitioning**: Range partitioning
  CREATE TABLE orders (
    id SERIAL,
    order_date DATE
  ) PARTITION BY RANGE (order_date);
  CREATE TABLE orders_2023 PARTITION OF orders FOR VALUES FROM ('2023-01-01') TO ('2023-12-31');

  -- **ACID transactions**: Transaction with Serializable isolation
  BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
  INSERT INTO users (name, info) VALUES ('John', '{"age": 30}');
  COMMIT;

  -- **EXPLAIN/ANALYZE**: Query plan
  EXPLAIN ANALYZE SELECT * FROM users WHERE id = 1;

  -- **Materialized views**: Pre-computed view
  CREATE MATERIALIZED VIEW user_summary AS
  SELECT name, COUNT(*) as count FROM users GROUP BY name;
  REFRESH MATERIALIZED VIEW user_summary;

  -- **Row-level locks**: Lock a row
  SELECT * FROM users WHERE id = 1 FOR UPDATE;
  ```

- **NestJS Example**:

  ```typescript
  // src/postgres/postgres.service.ts
  import { Injectable, OnModuleInit } from "@nestjs/common";
  import { Pool } from "pg";

  @Injectable()
  export class PostgresService implements OnModuleInit {
    private pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432,
      max: 10, // **Connection pooling**
    });

    async onModuleInit() {
      // **Indexing**
      await this.pool.query(
        "CREATE INDEX IF NOT EXISTS idx_users_id ON users(id)"
      );
    }

    // **Relational model** & **ACID transactions**
    async addUser(name: string, info: any) {
      const client = await this.pool.connect();
      try {
        await client.query("BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ");
        await client.query(
          "INSERT INTO users (name, info, tags) VALUES ($1, $2, $3)",
          [name, JSON.stringify(info), ["dev", "tech"]] // **Advanced data types**
        );
        await client.query("COMMIT");
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      } finally {
        client.release();
      }
    }

    // **Avoid N+1 problem** with Joins
    async getUserWithOrders(userId: number) {
      const result = await this.pool.query(
        "SELECT u.*, o.id AS order_id FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.id = $1",
        [userId]
      );
      return result.rows;
    }

    // **Performance optimization**: EXPLAIN
    async analyzeQuery() {
      const result = await this.pool.query(
        "EXPLAIN SELECT * FROM users WHERE id = 1"
      );
      return result.rows;
    }
  }

  // src/postgres/postgres.module.ts
  import { Module } from "@nestjs/common";
  import { PostgresService } from "./postgres.service";

  @Module({
    providers: [PostgresService],
    exports: [PostgresService],
  })
  export class PostgresModule {}

  // src/main.ts
  import { NestFactory } from "@nestjs/core";
  import { Module } from "@nestjs/common";
  import { PostgresModule } from "./postgres/postgres.module";
  import { PostgresService } from "./postgres/postgres.service";

  @Module({
    imports: [PostgresModule],
  })
  export class AppModule {}

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const postgresService = app.get(PostgresService);

    // Add user (**Core features** & **Transactional integrity**)
    await postgresService.addUser("John", { age: 30 });

    // Get user with orders (**Performance optimization**)
    console.log(await postgresService.getUserWithOrders(1));

    // Analyze query (**Performance optimization**)
    console.log(await postgresService.analyzeQuery());

    await app.listen(3000);
  }
  bootstrap();
  ```

## Key Differences

- **Core Features**: Relational with advanced types and extensibility.
- **Scaling**: Replication for reads, partitioning for horizontal growth.
- **Performance Optimization**: Indexes, query analysis, and pooling for efficiency.
- **Transactional Integrity**: ACID with flexible isolation and locking.
- **Design Patterns**: Normalization for integrity, denormalization/views for speed.
