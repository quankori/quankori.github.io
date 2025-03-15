---
title: Design Principle
---

## Principle Design

**Overview**: Principle Design encompasses foundational strategies and guidelines for software architecture, emphasizing simplicity, flexibility, scalability, and maintainability, guiding developers in building robust systems.

**Monolithic first strategy**: Starts with a single, unified app before evolving to distributed systems.

**Polyglot persistence**: Uses multiple database types for different needs (e.g., SQL, NoSQL).

**Core development principles**:

- **SOLID**: Five principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) for clean code.
- **DRY**: Avoids code duplication (Don’t Repeat Yourself).
- **KISS**: Keeps designs simple (Keep It Simple, Stupid).
- **YAGNI**: Avoids unnecessary features (You Aren’t Gonna Need It).
- **GRASP**: Assigns responsibilities effectively (General Responsibility Assignment Software Patterns).

**Inversion of control (IoC)**:

- **Dependency injection**: Passes dependencies to objects rather than creating them internally.
- **IoC containers**: Manages dependency injection automatically (e.g., NestJS DI).
- **Service locator**: Retrieves dependencies from a central registry.

**CAP theorem**:

- **Consistency**: Ensures all nodes see the same data at the same time.
- **Availability**: Guarantees a response even during failures.
- **Partition tolerance**: Handles network partitions gracefully.
- **Trade-offs**: Balances CAP properties (e.g., CA, CP, AP systems).

**Scalability principles**:

- **Horizontal vs vertical scaling**: Adds servers (horizontal) or upgrades hardware (vertical).
- **Load balancing**: Distributes traffic across servers (e.g., Nginx).
- **Caching strategies**: Improves performance with in-memory storage (e.g., Redis).

**Source Tree**:

```
src/
├── principles/
│   ├── user.service.ts       (SOLID, DI)
│   ├── polyglot.service.ts   (Polyglot Persistence)
│   ├── redis.service.ts      (Caching)
└── app.module.ts
```

**Bash Scripts & Commands**:

- **Setup Redis for Caching (Bash Script)**:

  ```bash
  #!/bin/bash
  # Start Redis
  redis-server --port 6379 --dir data/redis --daemonize yes
  ```

- **Setup Nginx for Load Balancing (Bash Script)**:

  ```bash
  #!/bin/bash
  # Install Nginx (Ubuntu example)
  sudo apt-get install nginx
  echo "upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
  }
  server {
    listen 80;
    location / {
      proxy_pass http://backend;
    }
  }" > /etc/nginx/sites-available/myapp
  ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl restart nginx
  ```

- **PostgreSQL Command (for Polyglot)**:

  ```sql
  CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(50));
  INSERT INTO users (name) VALUES ('John');
  ```

- **MongoDB Command (for Polyglot)**:

  ```javascript
  db.users.insertOne({ id: 1, name: "John" });
  ```

- **NestJS Example**:

  ```typescript
  // src/principles/user.service.ts (**SOLID**, **Dependency injection**)
  import { Injectable } from "@nestjs/common";

  // Interface for **Interface Segregation**
  export interface UserRepository {
    getUser(id: number): Promise<any>;
  }

  @Injectable()
  export class UserService {
    constructor(private repo: UserRepository) {} // **Dependency Injection**

    // **Single Responsibility**: Only handles user logic
    async getUser(id: number) {
      return this.repo.getUser(id);
    }
  }

  @Injectable()
  export class MockUserRepository implements UserRepository {
    async getUser(id: number) {
      return { id, name: "John" }; // Mock data
    }
  }

  // src/principles/polyglot.service.ts (**Polyglot persistence**)
  import { Injectable } from "@nestjs/common";
  import { Pool } from "pg";
  import { MongoClient } from "mongodb";

  @Injectable()
  export class PolyglotService {
    private pgPool = new Pool({
      user: "postgres",
      database: "mydb",
      password: "password",
      port: 5432,
    });
    private mongoClient = new MongoClient("mongodb://localhost:27017");

    async getFromPostgres(id: number) {
      const result = await this.pgPool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );
      return result.rows[0]; // **Relational**
    }

    async getFromMongo(id: number) {
      const db = this.mongoClient.db("mydb");
      return db.collection("users").findOne({ id }); // **NoSQL Document**
    }
  }

  // src/principles/redis.service.ts (**Caching strategies**)
  import { Injectable } from "@nestjs/common";
  import { Redis } from "ioredis";

  @Injectable()
  export class RedisService {
    private redis = new Redis({ host: "localhost", port: 6379 });

    async cacheUser(id: number, data: string) {
      await this.redis.set(`user:${id}`, data, "EX", 3600); // **Caching**
    }

    async getCachedUser(id: number) {
      return this.redis.get(`user:${id}`);
    }
  }

  // src/app.module.ts
  import { Module } from "@nestjs/common";
  import { UserService, MockUserRepository } from "./principles/user.service";
  import { PolyglotService } from "./principles/polyglot.service";
  import { RedisService } from "./principles/redis.service";

  @Module({
    providers: [
      UserService,
      { provide: "UserRepository", useClass: MockUserRepository }, // **IoC Container**
      PolyglotService,
      RedisService,
    ],
  })
  export class AppModule {}

  // src/main.ts
  import { NestFactory } from "@nestjs/core";
  import { AppModule } from "./app.module";
  import { UserService } from "./principles/user.service";
  import { PolyglotService } from "./principles/polyglot.service";
  import { RedisService } from "./principles/redis.service";

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const userService = app.get(UserService);
    const polyglotService = app.get(PolyglotService);
    const redisService = app.get(RedisService);

    // **Monolithic first strategy**: Simple app structure
    console.log(await userService.getUser(1)); // **SOLID**, **DI**

    // **Polyglot persistence**
    console.log(await polyglotService.getFromPostgres(1));
    console.log(await polyglotService.getFromMongo(1));

    // **Caching strategies** & **Horizontal scaling** (with load balancing assumed)
    await redisService.cacheUser(1, "John");
    console.log(await redisService.getCachedUser(1));

    await app.listen(3000);
  }
  bootstrap();
  ```

## Key Differences

- **Monolithic First**: Starts simple, evolves later.
- **Polyglot Persistence**: Uses diverse DBs for specific needs.
- **Core Principles**: Guides clean, simple, and efficient code.
- **IoC**: Inverts dependency control for flexibility.
- **CAP Theorem**: Balances consistency, availability, and partition tolerance.
- **Scalability Principles**: Enhances system growth and performance.
