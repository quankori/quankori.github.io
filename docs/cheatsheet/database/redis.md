---
title: Redis
---

## Core Features

**Core features**:

- **In-memory storage**: Stores data in RAM for ultra-fast access.
- **Data structures**: Supports Strings, Lists, Sets, Hashes, and more.
- **Pub/sub messaging**: Enables real-time publish-subscribe communication.

### In-Memory Storage Service

```typescript
// src/core/inmemory.service.ts (**In-memory storage**)
import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class InMemoryService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({ host: "localhost", port: 6379 });
  }

  async setData(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
    console.log(`Stored in-memory: ${key} -> ${value}`);
  }

  async getData(key: string): Promise<string | null> {
    const value = await this.redis.get(key);
    console.log(`Retrieved from memory: ${key} -> ${value}`);
    return value;
  }
}
```

**In-Memory Storage Service Details**:

- **Purpose**: Demonstrates Redis as an in-memory store for fast key-value access.
- **Explanation**: Initializes a Redis client connected to `localhost:6379`, `setData` stores a string value in RAM, and `getData` retrieves it, showcasing ultra-fast access due to in-memory storage.
- **In-Memory Storage Details**: Data resides in RAM, providing sub-millisecond access times, ideal for caching or transient data.

### Data Structures Service

```typescript
// src/core/datastructures.service.ts (**Data structures**)
import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class DataStructuresService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({ host: "localhost", port: 6379 });
  }

  async useList(key: string, value: string): Promise<void> {
    await this.redis.lpush(key, value);
    console.log(`Added to list ${key}: ${value}`);
  }

  async useSet(key: string, value: string): Promise<void> {
    await this.redis.sadd(key, value);
    console.log(`Added to set ${key}: ${value}`);
  }
}
```

**Data Structures Service Details**:

- **Purpose**: Shows Redis’s support for advanced data structures like Lists and Sets.
- **Explanation**: Initializes a Redis client, `useList` adds an item to a list using `lpush`, and `useSet` adds an item to a set using `sadd`, demonstrating Redis’s versatility beyond simple key-value pairs.
- **Data Structures Details**: Supports Strings, Lists (e.g., queues), Sets (e.g., unique items), Hashes (e.g., key-value maps), and more, enabling complex data manipulation.

### Pub/Sub Service

```typescript
// src/core/pubsub.service.ts (**Pub/sub messaging**)
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class PubSubService implements OnModuleInit {
  private publisher: Redis;
  private subscriber: Redis;

  constructor() {
    this.publisher = new Redis({ host: "localhost", port: 6379 });
    this.subscriber = new Redis({ host: "localhost", port: 6379 });
  }

  async onModuleInit() {
    this.subscriber.subscribe("channel");
    this.subscriber.on("message", (channel, message) => {
      console.log(`Received on ${channel}: ${message}`);
    });
  }

  async publish(channel: string, message: string): Promise<void> {
    await this.publisher.publish(channel, message);
    console.log(`Published to ${channel}: ${message}`);
  }
}
```

**Pub/Sub Service Details**:

- **Purpose**: Implements real-time publish-subscribe messaging with Redis.
- **Explanation**: Initializes separate Redis clients for publishing and subscribing, subscribes to a channel on init, logs received messages, and `publish` sends messages to the channel, enabling real-time communication.
- **Pub/Sub Details**: Allows publishers to send messages to channels, with subscribers receiving them instantly, useful for notifications or live updates.

---

## Performance

**Performance**:

- **Read/write performance**: Delivers sub-millisecond latency due to in-memory nature.
- **Persistence options**: RDB (snapshot) and AOF (log) for data durability.
- **Pipelining**: Sends multiple commands in one go to reduce latency.

### Performance Service

```typescript
// src/performance/performance.service.ts (**Read/write performance, Pipelining**)
import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class PerformanceService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({ host: "localhost", port: 6379 });
  }

  async fastReadWrite(key: string, value: string): Promise<string> {
    await this.redis.set(key, value);
    const result = await this.redis.get(key);
    console.log(`Fast read/write: ${key} -> ${result}`);
    return result;
  }

  async pipelineOperations(keys: string[]): Promise<string[]> {
    const pipeline = this.redis.pipeline();
    keys.forEach((key) => pipeline.set(key, `Value-${key}`));
    keys.forEach((key) => pipeline.get(key));
    const results = await pipeline.exec();
    console.log(
      "Pipelined results:",
      results.map((r) => r[1])
    );
    return results.map((r) => r[1] as string);
  }
}
```

**Performance Service Details**:

- **Purpose**: Demonstrates Redis’s sub-millisecond latency and pipelining for performance.
- **Explanation**: `fastReadWrite` performs a quick set and get operation, leveraging in-memory speed, while `pipelineOperations` batches multiple set/get commands into a single pipeline, reducing network round-trips and logging results.
- **Performance Details**:
  - **Read/Write Performance**: Sub-millisecond latency due to RAM storage.
  - **Persistence Options**: RDB snapshots or AOF logs (not coded; configured in Redis settings).
  - **Pipelining**: Groups commands for efficiency (e.g., multiple ops in one trip).

---

## Scaling

**Scaling**:

- **Replication**: Master-Slave setup for read scaling and failover.
  - **Asynchronous replication**: Replicates data to slaves asynchronously.
  - **High availability with sentinel**: Uses Sentinel for automatic failover.
- **Sharding**: Distributes data across nodes via Redis Cluster.
  - **Consistent hashing**: Maps keys to nodes consistently.
  - **Slot distribution**: Divides key space into 16,384 slots.

### Replication Service

```typescript
// src/scaling/replication.service.ts (**Replication**)
import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class ReplicationService {
  private master: Redis;
  private slave: Redis;

  constructor() {
    this.master = new Redis({ host: "localhost", port: 6379 }); // Master
    this.slave = new Redis({ host: "localhost", port: 6380 }); // Slave (assumed)
  }

  async writeToMaster(key: string, value: string): Promise<void> {
    await this.master.set(key, value);
    console.log(`Wrote to master: ${key} -> ${value}`);
  }

  async readFromSlave(key: string): Promise<string | null> {
    const value = await this.slave.get(key);
    console.log(`Read from slave: ${key} -> ${value}`);
    return value;
  }
}
```

**Replication Service Details**:

- **Purpose**: Simulates a Master-Slave replication setup for scaling reads.
- **Explanation**: Initializes Redis clients for master (port 6379) and slave (port 6380, assumed), `writeToMaster` sets data on the master, and `readFromSlave` retrieves it from the slave, demonstrating read scaling (assuming replication is configured externally).
- **Replication Details**:
  - **Master-Slave**: Master writes, slaves replicate for read scaling.
  - **Asynchronous Replication**: Slaves sync asynchronously (Redis default).
  - **Sentinel**: Not coded but manages failover (e.g., `redis-sentinel`).

### Sharding Service (Conceptual - No Direct NestJS Code)

- **Purpose**: Distributes data across Redis Cluster nodes.
- **Explanation**: Redis Cluster shards data using consistent hashing and 16,384 slots, managed by Redis itself (not directly coded in NestJS; requires cluster setup). A client like `ioredis` with cluster support would connect to multiple nodes (e.g., `new Redis.Cluster([{ host: 'localhost', port: 7000 }])`).
- **Sharding Details**:
  - **Consistent Hashing**: Maps keys to nodes consistently (e.g., CRC16 hash).
  - **Slot Distribution**: Key space split into 16,384 slots across nodes.
- **No Code Needed**: Requires Redis Cluster configuration, not NestJS-specific.

---

## Consistency

**Consistency**:

- **Eventual consistency**: Achieved with replication across nodes.
- **Strong consistency**: Guaranteed in a single-node setup.

### Consistency Service

```typescript
// src/consistency/consistency.service.ts (**Consistency**)
import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class ConsistencyService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({ host: "localhost", port: 6379 });
  }

  async setWithStrongConsistency(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
    const result = await this.redis.get(key);
    console.log(`Strong consistency: ${key} -> ${result}`);
  }
}
```

**Consistency Service Details**:

- **Purpose**: Demonstrates strong consistency in a single-node setup.
- **Explanation**: `setWithStrongConsistency` sets a value and immediately retrieves it, ensuring the read reflects the write due to single-node operation, logging the result.
- **Consistency Details**:
  - **Eventual Consistency**: With replication, slaves may lag (not shown here).
  - **Strong Consistency**: Single node ensures immediate consistency.

---

## Design Patterns

**Design patterns**:

- **Write-through/write-behind**: Updates cache and DB simultaneously or lazily.
- **Cache aside**: Application manages cache, fetching from DB on miss.
- **Rate limiting**: Controls request rates using Redis counters.

### Design Patterns Service

```typescript
// src/patterns/designpatterns.service.ts (**Design patterns**)
import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import { Pool } from "pg";

@Injectable()
export class DesignPatternsService {
  private redis: Redis;
  private db: Pool;

  constructor() {
    this.redis = new Redis({ host: "localhost", port: 6379 });
    this.db = new Pool({
      user: "postgres",
      host: "localhost",
      database: "mydb",
      password: "password",
      port: 5432,
    });
  }

  async writeThrough(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
    await this.db.query(
      "INSERT INTO cache (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2",
      [key, value]
    );
    console.log(`Write-through: ${key} -> ${value}`);
  }

  async cacheAside(key: string): Promise<string> {
    let value = await this.redis.get(key);
    if (!value) {
      const result = await this.db.query(
        "SELECT value FROM cache WHERE key = $1",
        [key]
      );
      value = result.rows.length > 0 ? result.rows[0].value : "default";
      await this.redis.set(key, value);
    }
    console.log(`Cache aside: ${key} -> ${value}`);
    return value;
  }

  async rateLimit(ip: string, limit: number, window: number): Promise<boolean> {
    const key = `rate:${ip}`;
    const count = await this.redis.incr(key);
    if (count === 1) await this.redis.expire(key, window);
    const allowed = count <= limit;
    console.log(`Rate limit check for ${ip}: ${allowed} (count: ${count})`);
    return allowed;
  }
}
```

**Design Patterns Service Details**:

- **Purpose**: Implements write-through, cache aside, and rate limiting patterns with Redis and PostgreSQL.
- **Explanation**: `writeThrough` updates both Redis and PostgreSQL simultaneously, `cacheAside` checks Redis first and falls back to PostgreSQL if missed (updating cache), and `rateLimit` uses Redis counters to limit requests within a time window, logging actions for visibility.
- **Design Patterns Details**:
  - **Write-through**: Syncs cache (Redis) and DB (PostgreSQL) immediately.
  - **Cache Aside**: App manages cache, fetching from DB on miss.
  - **Rate Limiting**: Uses Redis `INCR` and `EXPIRE` for request control.
