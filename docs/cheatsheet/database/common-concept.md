---
title: Common Concepts
---

## Common Concepts

**Overview**: Common Concepts in databases define foundational principles for data organization, consistency, scalability, and performance, applicable across various database types like SQL and NoSQL, guiding design and optimization.

**Data models**:

- **Relational**: Organizes data into tables with rows and columns (e.g., PostgreSQL).
- **NoSQL**: Flexible models like Document (MongoDB), Key-Value (Redis), Column-Family (Cassandra), or Graph (Neo4j).
- **Hybrid**: Combines relational and NoSQL features (e.g., PostgreSQL with JSON).

**Consistency models**:

- **ACID**: Ensures reliable transactions (Atomicity, Consistency, Isolation, Durability) in SQL databases.
- **BASE**: Prioritizes availability and scalability (Basically Available, Soft state, Eventual consistency) in NoSQL.
- **Eventual consistency vs Strong consistency**: Trade-off between immediate consistency (ACID) and delayed consistency (BASE).

**Scaling**:

- **Vertical scaling**: Increases server capacity (e.g., more CPU/RAM).
- **Horizontal scaling**: Adds more servers with techniques like:
  - **Sharding**: Splits data across nodes.
  - **Replication**: Copies data for redundancy and read scaling.
  - **Partitioning**: Divides tables into smaller parts.
- **Load balancing**: Distributes traffic across servers.

**Performance optimization**:

- **Indexing**: Speeds up queries with data structures (e.g., B-Tree).
- **Caching**: Stores frequent data in memory (e.g., Redis).
- **Query optimization**: Improves query efficiency (e.g., EXPLAIN in SQL).
- **Connection pooling**: Reuses database connections for performance.

**Source Tree**:

```
src/
├── data/
│   ├── postgres.service.ts  (Relational - PostgreSQL)
│   ├── mongo.service.ts     (NoSQL Document - MongoDB)
│   ├── redis.service.ts     (Caching - Redis)
└── app.module.ts
```

**Bash Scripts & SQL/NoSQL Commands**:

- **PostgreSQL Setup (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start PostgreSQL with replication
  mkdir -p data/pg
  initdb -D data/pg
  echo "wal_level = replica" >> data/pg/postgresql.conf
  pg_ctl -D data/pg -l data/pg.log start
  createdb mydb
  ```

- **MongoDB Setup (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start MongoDB with sharding
  mongod --port 27017 --dbpath data/mongo --fork --logpath data/mongo.log
  mongo --port 27017 --eval 'sh.enableSharding("mydb")'
  ```

- **Redis Setup (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start Redis with replication
  redis-server --port 6379 --dir data/redis --daemonize yes
  ```

- **SQL/NoSQL Commands**:

  ```sql
  -- PostgreSQL (**Relational**, **ACID**, **Indexing**)
  CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(50));
  CREATE INDEX idx_users_id ON users(id);
  BEGIN;
  INSERT INTO users (name) VALUES ('John');
  COMMIT;

  -- MongoDB (**NoSQL Document**, **BASE**, **Sharding**)
  use mydb
  db.users.insertOne({ id: 1, name: "John" })
  sh.shardCollection("mydb.users", { "id": "hashed" })

  -- Redis (**Caching**, **Eventual consistency**)
  SET user:1 "John"
  EXPIRE user:1 3600  # Cache for 1 hour
  ```

- **NestJS Example**:

  ```typescript
  // src/data/postgres.service.ts (**Relational** & **ACID**)
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
      await this.pool.query(
        "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(50))"
      );
      await this.pool.query(
        "CREATE INDEX IF NOT EXISTS idx_users_id ON users(id)"
      ); // **Indexing**
    }

    async addUser(name: string) {
      const client = await this.pool.connect();
      try {
        await client.query("BEGIN"); // **ACID**
        await client.query("INSERT INTO users (name) VALUES ($1)", [name]);
        await client.query("COMMIT");
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      } finally {
        client.release();
      }
    }

    async getUser(id: number) {
      const result = await this.pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      ); // **Query optimization**
      return result.rows[0];
    }
  }

  // src/data/mongo.service.ts (**NoSQL Document** & **BASE**)
  import { Injectable, OnModuleInit } from "@nestjs/common";
  import { MongoClient } from "mongodb";

  @Injectable()
  export class MongoService implements OnModuleInit {
    private client = new MongoClient("mongodb://localhost:27017");
    private collection;

    async onModuleInit() {
      await this.client.connect();
      this.collection = this.client.db("mydb").collection("users");
      await this.collection.createIndex({ id: 1 }); // **Indexing**
    }

    async addUser(id: number, name: string) {
      await this.collection.insertOne({ id, name }, { writeConcern: { w: 1 } }); // **BASE**
    }

    async getUser(id: number) {
      return this.collection.findOne({ id }); // **Eventual consistency**
    }
  }

  // src/data/redis.service.ts (**Caching**)
  import { Injectable } from "@nestjs/common";
  import { Redis } from "ioredis";

  @Injectable()
  export class RedisService {
    private redis = new Redis({ host: "localhost", port: 6379 });

    async setUser(id: number, name: string) {
      await this.redis.set(`user:${id}`, name, "EX", 3600); // **Caching**
    }

    async getUser(id: number) {
      return this.redis.get(`user:${id}`);
    }
  }

  // src/app.module.ts
  import { Module } from "@nestjs/common";
  import { PostgresService } from "./data/postgres.service";
  import { MongoService } from "./data/mongo.service";
  import { RedisService } from "./data/redis.service";

  @Module({
    providers: [PostgresService, MongoService, RedisService],
  })
  export class AppModule {}

  // src/main.ts
  import { NestFactory } from "@nestjs/core";
  import { AppModule } from "./app.module";
  import { PostgresService } from "./data/postgres.service";
  import { MongoService } from "./data/mongo.service";
  import { RedisService } from "./data/redis.service";

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const postgresService = app.get(PostgresService);
    const mongoService = app.get(MongoService);
    const redisService = app.get(RedisService);

    // PostgreSQL (**Relational**, **ACID**)
    await postgresService.addUser("John");
    console.log(await postgresService.getUser(1));

    // MongoDB (**NoSQL**, **BASE**, **Sharding**)
    await mongoService.addUser(1, "John");
    console.log(await mongoService.getUser(1));

    // Redis (**Caching**, **Eventual consistency**)
    await redisService.setUser(1, "John");
    console.log(await redisService.getUser(1));

    await app.listen(3000);
  }
  bootstrap();
  ```

## Key Differences

- **Data Models**: Relational (structured), NoSQL (flexible), Hybrid (mixed).
- **Consistency Models**: ACID (strict), BASE (relaxed), Eventual vs Strong (trade-offs).
- **Scaling**: Vertical (bigger server), Horizontal (more servers with sharding/replication).
- **Performance Optimization**: Indexing (query speed), Caching (memory), Query Optimization (efficiency), Connection Pooling (resource reuse).
