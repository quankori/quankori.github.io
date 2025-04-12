---
title: MongoDB
---

**Overview**: MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like BSON documents, offering scalability, high availability, and performance for modern applications.

## Scaling

**Scaling**:

- **Sharding**: Distributes data across multiple servers for horizontal scaling.
- **Replica sets**: Ensures high availability with primary-secondary replication.

### Sharding Service

```typescript
// src/scaling/sharding.service.ts (**Sharding**)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { MongoClient } from "mongodb";

@Injectable()
export class ShardingService implements OnModuleInit {
  private client: MongoClient;
  private db;

  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017");
  }

  async onModuleInit() {
    await this.client.connect();
    this.db = this.client.db("mydb");
    // Note: Sharding requires a MongoDB sharded cluster setup externally
    // Example command: await this.db.admin().command({ shardCollection: 'mydb.users', key: { id: 'hashed' } });
    console.log("Connected to MongoDB for sharding");
  }

  async addUser(id: number, name: string): Promise<void> {
    const collection = this.db.collection("users");
    await collection.insertOne({ id, name });
    console.log(`User added with sharding potential: ${id}, ${name}`);
  }
}
```

**Sharding Service Details**:

- **Purpose**: Demonstrates adding data to a MongoDB collection with sharding potential.
- **Explanation**: Initializes a MongoDB client, connects on module init, and `addUser` inserts a document into the `users` collection. Sharding isn’t directly implemented here (requires external cluster setup), but the service assumes a sharded environment, logging the action.
- **Sharding Details**:
  - **Horizontal Scaling**: Data is split across multiple servers (shards) based on a shard key (e.g., hashed `id`).
  - **Setup**: Requires a sharded cluster (e.g., `mongos`, shard servers), not coded but noted in comments.

### Replica Sets Service

```typescript
// src/scaling/replicasets.service.ts (**Replica sets**)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { MongoClient } from "mongodb";

@Injectable()
export class ReplicaSetsService implements OnModuleInit {
  private client: MongoClient;
  private db;

  constructor() {
    // Assumes replica set configured (e.g., mongodb://localhost:27017,localhost:27018)
    this.client = new MongoClient("mongodb://localhost:27017", {
      replicaSet: "rs0",
    });
  }

  async onModuleInit() {
    await this.client.connect();
    this.db = this.client.db("mydb");
    console.log("Connected to MongoDB replica set");
  }

  async writeToPrimary(id: number, name: string): Promise<void> {
    const collection = this.db.collection("users");
    await collection.insertOne(
      { id, name },
      { writeConcern: { w: "majority" } }
    );
    console.log(`Wrote to primary: ${id}, ${name}`);
  }

  async readFromSecondary(id: number): Promise<any> {
    const collection = this.db.collection("users");
    const result = await collection.findOne(
      { id },
      { readPreference: "secondaryPreferred" }
    );
    console.log(`Read from secondary: ${JSON.stringify(result)}`);
    return result;
  }
}
```

**Replica Sets Service Details**:

- **Purpose**: Shows writing to the primary and reading from a secondary in a replica set.
- **Explanation**: Connects to a MongoDB replica set (assumed configured externally), `writeToPrimary` inserts with majority write concern, and `readFromSecondary` reads with secondary preference, logging actions to illustrate high availability.
- **Replica Sets Details**:
  - **High Availability**: Primary handles writes; secondaries replicate for reads and failover.
  - **Replication**: Data syncs asynchronously from primary to secondaries.

---

## Core Features

**Core features**:

- **Schema-less design**: Allows dynamic, flexible data structures without predefined schemas.
- **Document model**: Uses JSON/BSON for data storage, enabling rich structures.
- **Embedded documents & arrays**: Supports nesting data within documents for efficient queries.

### Core Features Service

```typescript
// src/core/features.service.ts (**Core features**)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { MongoClient } from "mongodb";

@Injectable()
export class FeaturesService implements OnModuleInit {
  private client: MongoClient;
  private db;

  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017");
  }

  async onModuleInit() {
    await this.client.connect();
    this.db = this.client.db("mydb");
    console.log("Connected to MongoDB for core features");
  }

  async addFlexibleDocument(id: number, data: any): Promise<void> {
    const collection = this.db.collection("users");
    await collection.insertOne({ id, ...data });
    console.log(`Added flexible document: ${id}, ${JSON.stringify(data)}`);
  }

  async queryEmbeddedData(id: number): Promise<any> {
    const collection = this.db.collection("users");
    const result = await collection.findOne({ id });
    console.log(`Queried embedded data: ${JSON.stringify(result)}`);
    return result;
  }
}
```

**Core Features Service Details**:

- **Purpose**: Demonstrates schema-less design and embedded document querying.
- **Explanation**: `addFlexibleDocument` inserts a document with arbitrary fields (schema-less), and `queryEmbeddedData` retrieves it, showcasing MongoDB’s flexibility and support for nested data (e.g., embedded documents or arrays), logged for visibility.
- **Core Features Details**:
  - **Schema-less Design**: No fixed schema; `data` can vary per document.
  - **Document Model**: BSON stores JSON-like structures (e.g., `{ id: 1, details: { age: 30 } }`).
  - **Embedded Documents & Arrays**: Nests data (e.g., `details` or `tags: ['a', 'b']`) for efficient queries.

---

## Performance

**Performance**:

- **Indexing**: Enhances query speed with single, compound, or geospatial indexes.
- **Aggregation pipeline**: Processes and transforms data with a powerful pipeline.
- **Write concern vs read preference**: Balances durability and performance in reads/writes.

### Performance Service

```typescript
// src/performance/performance.service.ts (**Performance**)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { MongoClient } from "mongodb";

@Injectable()
export class PerformanceService implements OnModuleInit {
  private client: MongoClient;
  private db;

  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017");
  }

  async onModuleInit() {
    await this.client.connect();
    this.db = this.client.db("mydb");
    await this.db.collection("users").createIndex({ id: 1 });
    console.log("Connected to MongoDB with index");
  }

  async indexedQuery(id: number): Promise<any> {
    const collection = this.db.collection("users");
    const result = await collection.findOne({ id });
    console.log(`Indexed query result: ${JSON.stringify(result)}`);
    return result;
  }

  async aggregateData(): Promise<any[]> {
    const collection = this.db.collection("users");
    const result = await collection
      .aggregate([
        { $match: { "details.age": { $gt: 25 } } },
        { $group: { _id: "$details.age", count: { $sum: 1 } } },
      ])
      .toArray();
    console.log(`Aggregation result: ${JSON.stringify(result)}`);
    return result;
  }
}
```

**Performance Service Details**:

- **Purpose**: Shows indexing and aggregation for performance optimization.
- **Explanation**: Initializes a MongoDB client, creates an index on `id` during startup, `indexedQuery` uses the index for fast retrieval, and `aggregateData` runs an aggregation pipeline to filter and group data, logging results.
- **Performance Details**:
  - **Indexing**: Single index on `id` speeds up queries (compound/geospatial possible).
  - **Aggregation Pipeline**: Filters (`$match`) and groups (`$group`) data efficiently.
  - **Write Concern vs Read Preference**: Not coded but adjustable (e.g., `{ w: 'majority' }` for durability).

---

## Consistency

**Consistency**:

- **BASE model**: Prioritizes availability and eventual consistency over strict ACID.
- **Tunable consistency**: Adjusts read/write consistency via concern settings.

### Consistency Service

```typescript
// src/consistency/consistency.service.ts (**Consistency**)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { MongoClient } from "mongodb";

@Injectable()
export class ConsistencyService implements OnModuleInit {
  private client: MongoClient;
  private db;

  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017");
  }

  async onModuleInit() {
    await this.client.connect();
    this.db = this.client.db("mydb");
    console.log("Connected to MongoDB for consistency");
  }

  async writeWithTunableConsistency(id: number, name: string): Promise<void> {
    const collection = this.db.collection("users");
    await collection.insertOne(
      { id, name },
      { writeConcern: { w: "majority" } }
    );
    console.log(`Wrote with majority consistency: ${id}, ${name}`);
  }

  async readWithPreference(id: number): Promise<any> {
    const collection = this.db.collection("users");
    const result = await collection.findOne(
      { id },
      { readPreference: "secondaryPreferred" }
    );
    console.log(`Read with secondary preference: ${JSON.stringify(result)}`);
    return result;
  }
}
```

**Consistency Service Details**:

- **Purpose**: Demonstrates tunable consistency with write concern and read preference.
- **Explanation**: `writeWithTunableConsistency` inserts with a 'majority' write concern for durability, `readWithPreference` reads with 'secondaryPreferred' for availability, logging actions to show consistency tuning.
- **Consistency Details**:
  - **BASE Model**: Prioritizes availability and eventual consistency (vs. ACID).
  - **Tunable Consistency**: Write concern (e.g., `w: 'majority'`) ensures durability; read preference (e.g., `secondaryPreferred`) balances freshness and speed.
