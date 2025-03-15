---
title: MongoDB
---

## MongoDB

**Overview**: MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like BSON documents, offering scalability, high availability, and performance for modern applications.

**Scaling**:

- **Sharding**: Distributes data across multiple servers for horizontal scaling.
- **Replica sets**: Ensures high availability with primary-secondary replication.

**Core features**:

- **Schema-less design**: Allows dynamic, flexible data structures without predefined schemas.
- **Document model**: Uses JSON/BSON for data storage, enabling rich structures.
- **Embedded documents & arrays**: Supports nesting data within documents for efficient queries.

**Performance**:

- **Indexing**: Enhances query speed with single, compound, or geospatial indexes.
- **Aggregation pipeline**: Processes and transforms data with a powerful pipeline.
- **Write concern vs read preference**: Balances durability and performance in reads/writes.

**Consistency**:

- **BASE model**: Prioritizes availability and eventual consistency over strict ACID.
- **Tunable consistency**: Adjusts read/write consistency via concern settings.

**Source Tree**:

```
src/
├── mongo/
│   ├── mongo.service.ts
│   └── mongo.module.ts
└── main.ts
```

**Bash Scripts & MongoDB Commands**:

- **Setup Replica Set (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start MongoDB instances for replica set (3 nodes)
  mkdir -p data/rs1 data/rs2 data/rs3
  mongod --replSet rs0 --port 27017 --dbpath data/rs1 --fork --logpath data/rs1.log
  mongod --replSet rs0 --port 27018 --dbpath data/rs2 --fork --logpath data/rs2.log
  mongod --replSet rs0 --port 27019 --dbpath data/rs3 --fork --logpath data/rs3.log

  # Initiate replica set
  mongo --port 27017 --eval 'rs.initiate({
    _id: "rs0",
    members: [
      { _id: 0, host: "localhost:27017" },
      { _id: 1, host: "localhost:27018" },
      { _id: 2, host: "localhost:27019" }
    ]
  })'
  ```

- **Enable Sharding (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start config servers, shard servers, and mongos
  mongod --configsvr --port 27020 --dbpath data/config --fork --logpath data/config.log
  mongod --shardsvr --port 27021 --dbpath data/shard1 --fork --logpath data/shard1.log
  mongos --configdb localhost:27020 --port 27017 --fork --logpath data/mongos.log

  # Enable sharding on database and collection (run in mongo shell)
  mongo --port 27017 <<EOF
  sh.enableSharding("mydb")
  sh.shardCollection("mydb.users", { "userId": "hashed" })
  EOF
  ```

- **MongoDB Shell Commands**:

  ```javascript
  // **Indexing**: Create a compound index
  db.users.createIndex({ userId: 1, name: 1 });

  // **Aggregation pipeline**: Count users by city
  db.users.aggregate([
    { $match: { "address.city": "Hanoi" } },
    { $group: { _id: "$address.city", total: { $sum: 1 } } },
  ]);

  // **Write concern**: Insert with majority write
  db.users.insertOne(
    { userId: 1, name: "John" },
    { writeConcern: { w: "majority" } }
  );

  // **Read preference**: Read from secondary
  db.users.findOne({ userId: 1 }).readPref("secondaryPreferred");
  ```

- **NestJS Example**:

  ```typescript
  // src/mongo/mongo.service.ts
  import { Injectable, OnModuleInit } from "@nestjs/common";
  import { MongoClient, Collection } from "mongodb";

  @Injectable()
  export class MongoService implements OnModuleInit {
    private client: MongoClient;
    private collection: Collection;

    constructor() {
      this.client = new MongoClient("mongodb://localhost:27017");
    }

    async onModuleInit() {
      await this.client.connect();
      const db = this.client.db("mydb");
      this.collection = db.collection("users");

      // **Indexing** (Single)
      await this.collection.createIndex({ userId: 1 });
    }

    // **Replica sets** & **Sharding**: Assumes configured cluster
    async addUser(userId: number, name: string) {
      const doc = {
        userId,
        name,
        address: { city: "Hanoi", zip: "10000" }, // **Embedded documents**
        tags: ["dev", "tech"], // **Arrays**
      };
      await this.collection.insertOne(doc, { writeConcern: { w: "majority" } }); // **Write concern**
    }

    async getUser(userId: number) {
      return this.collection.findOne(
        { userId },
        { readPreference: "secondaryPreferred" } // **Read preference**
      );
    }

    async aggregateUsersByCity() {
      // **Aggregation pipeline**
      return this.collection
        .aggregate([
          { $match: { "address.city": "Hanoi" } },
          { $group: { _id: "$address.city", total: { $sum: 1 } } },
        ])
        .toArray();
    }
  }

  // src/mongo/mongo.module.ts
  import { Module } from "@nestjs/common";
  import { MongoService } from "./mongo.service";

  @Module({
    providers: [MongoService],
    exports: [MongoService],
  })
  export class MongoModule {}

  // src/main.ts
  import { NestFactory } from "@nestjs/core";
  import { Module } from "@nestjs/common";
  import { MongoModule } from "./mongo/mongo.module";
  import { MongoService } from "./mongo/mongo.service";

  @Module({
    imports: [MongoModule],
  })
  export class AppModule {}

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const mongoService = app.get(MongoService);

    // Add user (**Schema-less design**, **Document model**)
    await mongoService.addUser(1, "John");

    // Get user (**Tunable consistency**)
    const user = await mongoService.getUser(1);
    console.log(user);

    // Aggregate users (**Performance**)
    const aggResult = await mongoService.aggregateUsersByCity();
    console.log(aggResult);

    await app.listen(3000);
  }
  bootstrap();
  ```

## Key Differences

- **Scaling**: Sharding for load distribution; Replica Sets for redundancy.
- **Core Features**: Flexible, nested data with no schema constraints.
- **Performance**: Indexes for speed, aggregation for transformation, concerns for tuning.
- **Consistency**: BASE with adjustable read/write consistency.
