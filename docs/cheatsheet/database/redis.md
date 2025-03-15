---
title: Redis
---

## Redis

**Overview**: Redis is an in-memory, NoSQL key-value store known for its high performance, versatile data structures, and support for caching, messaging, and real-time applications, with options for persistence and scaling.

**Core features**:

- **In-memory storage**: Stores data in RAM for ultra-fast access.
- **Data structures**: Supports Strings, Lists, Sets, Hashes, and more.
- **Pub/sub messaging**: Enables real-time publish-subscribe communication.

**Performance**:

- **Read/write performance**: Delivers sub-millisecond latency due to in-memory nature.
- **Persistence options**: RDB (snapshot) and AOF (log) for data durability.
- **Pipelining**: Sends multiple commands in one go to reduce latency.

**Scaling**:

- **Replication**: Master-Slave setup for read scaling and failover.
  - **Asynchronous replication**: Replicates data to slaves asynchronously.
  - **High availability with sentinel**: Uses Sentinel for automatic failover.
- **Sharding**: Distributes data across nodes via Redis Cluster.
  - **Consistent hashing**: Maps keys to nodes consistently.
  - **Slot distribution**: Divides key space into 16,384 slots.

**Consistency**:

- **Eventual consistency**: Achieved with replication across nodes.
- **Strong consistency**: Guaranteed in a single-node setup.

**Design patterns**:

- **Write-through/write-behind**: Updates cache and DB simultaneously or lazily.
- **Cache aside**: Application manages cache, fetching from DB on miss.
- **Rate limiting**: Controls request rates using Redis counters.

**Source Tree**:

```
src/
├── redis/
│   ├── redis.service.ts
│   └── redis.module.ts
└── main.ts
```

**Bash Scripts & Redis CLI Commands**:

- **Setup Master-Slave Replication (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start Redis master
  redis-server --port 6379 --dir data/master --dbfilename master.rdb --daemonize yes

  # Start Redis slave
  redis-server --port 6380 --dir data/slave --dbfilename slave.rdb --slaveof localhost 6379 --daemonize yes

  # Verify replication
  redis-cli -p 6379 info replication
  ```

- **Setup Redis Sentinel (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start Sentinel
  echo "sentinel monitor mymaster 127.0.0.1 6379 2" > sentinel.conf
  redis-sentinel sentinel.conf --port 26379 --daemonize yes
  ```

- **Setup Redis Cluster (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start multiple Redis nodes (simplified)
  for port in 7000 7001 7002; do
    redis-server --port $port --cluster-enabled yes --dir data/cluster$port --daemonize yes
  done

  # Create cluster
  redis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 --cluster-replicas 0
  ```

- **Redis CLI Commands**:

  ```bash
  # **In-memory storage** & **Data structures**
  SET user:1 "John"              # String
  LPUSH mylist "item1" "item2"  # List
  SADD myset "a" "b"            # Set
  HSET user:2 name "Jane" age "30"  # Hash

  # **Pub/sub messaging**
  SUBSCRIBE channel1
  PUBLISH channel1 "Hello"

  # **Persistence options**
  SAVE  # RDB snapshot
  CONFIG SET appendonly yes  # Enable AOF

  # **Pipelining**
  redis-cli --pipe <<EOF
  SET key1 value1
  SET key2 value2
  EOF

  # **Rate limiting**
  INCR rate:ip:127.0.0.1
  EXPIRE rate:ip:127.0.0.1 60  # Reset after 60s
  ```

- **NestJS Example**:

  ```typescript
  // src/redis/redis.service.ts
  import { Injectable, OnModuleInit } from "@nestjs/common";
  import { Redis } from "ioredis";

  @Injectable()
  export class RedisService implements OnModuleInit {
    private redis: Redis;

    constructor() {
      this.redis = new Redis({ host: "localhost", port: 6379 });
    }

    async onModuleInit() {
      // **Replication**: Assumes master-slave setup (slave connects via SLAVEOF)
      // **Sharding**: Assumes Redis Cluster (connect with cluster options if needed)
    }

    // **In-memory storage** & **Data structures**
    async setUser(userId: number, name: string) {
      await this.redis.set(`user:${userId}`, name); // String
      await this.redis.lpush(`user:${userId}:actions`, "login"); // List
      await this.redis.hset(
        `user:${userId}:details`,
        "name",
        name,
        "age",
        "30"
      ); // Hash
    }

    // **Read/write performance**
    async getUser(userId: number) {
      return this.redis.get(`user:${userId}`); // Sub-millisecond latency
    }

    // **Pub/sub messaging**
    async publishMessage(channel: string, message: string) {
      await this.redis.publish(channel, message);
    }

    async subscribeToChannel(channel: string) {
      const subscriber = new Redis({ host: "localhost", port: 6379 });
      subscriber.subscribe(channel);
      subscriber.on("message", (ch, msg) =>
        console.log(`Received: ${msg} on ${ch}`)
      );
    }

    // **Persistence options**
    async enablePersistence() {
      await this.redis.config("SET", "appendonly", "yes"); // Enable AOF
    }

    // **Design patterns**
    async cacheAside(userId: number, fetchFromDb: () => Promise<string>) {
      const cached = await this.redis.get(`user:${userId}`);
      if (cached) return cached; // Cache hit
      const data = await fetchFromDb(); // Cache miss
      await this.redis.set(`user:${userId}`, data, "EX", 3600); // Cache for 1 hour
      return data;
    }

    async rateLimit(ip: string, limit: number, window: number) {
      const key = `rate:${ip}`;
      const count = await this.redis.incr(key);
      if (count === 1) await this.redis.expire(key, window); // Set TTL on first request
      return count <= limit; // True if within limit
    }
  }

  // src/redis/redis.module.ts
  import { Module } from "@nestjs/common";
  import { RedisService } from "./redis.service";

  @Module({
    providers: [RedisService],
    exports: [RedisService],
  })
  export class RedisModule {}

  // src/main.ts
  import { NestFactory } from "@nestjs/core";
  import { Module } from "@nestjs/common";
  import { RedisModule } from "./redis/redis.module";
  import { RedisService } from "./redis/redis.service";

  @Module({
    imports: [RedisModule],
  })
  export class AppModule {}

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const redisService = app.get(RedisService);

    // Set user data (**Core features**)
    await redisService.setUser(1, "John");
    console.log(await redisService.getUser(1)); // **Performance**

    // Pub/Sub (**Core features**)
    await redisService.subscribeToChannel("updates");
    await redisService.publishMessage("updates", "New user added");

    // Cache Aside (**Design patterns**)
    const fetchFromDb = async () => "John from DB";
    console.log(await redisService.cacheAside(1, fetchFromDb));

    // Rate Limiting (**Design patterns**)
    console.log(await redisService.rateLimit("127.0.0.1", 5, 60)); // 5 requests per minute

    await app.listen(3000);
  }
  bootstrap();
  ```

## Key Differences

- **Core Features**: Fast in-memory storage with versatile data types and messaging.
- **Performance**: Sub-millisecond reads/writes, with persistence and pipelining options.
- **Scaling**: Replication for HA, Sharding via Cluster for distribution.
- **Consistency**: Eventual with replication, Strong in single-node mode.
- **Design Patterns**: Supports caching and rate limiting strategies.
