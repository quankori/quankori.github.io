---
title: Monolithic Architecture
---

## Monolithic Architecture

**Overview**: Monolithic Architecture combines all components—UI, business logic, and data access—into a single, tightly coupled application deployed as one unit, ideal for simplicity but less scalable as complexity grows.

**Components**: Includes all functionality (UI, logic, data) in a single codebase.

**Source Tree**:

```
src/
├── main.ts
├── user.controller.ts
└── user.service.ts
```

**NestJS Example**:

```typescript
// src/user.service.ts (**Components**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  getUsers() {
    return ["John", "Jane"]; // Simulate data access
  }
}

// src/user.controller.ts (**Components**)
import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getUsers(); // UI + Logic + Data
  }
}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

---

## Modular Monolithic Architecture

**Overview**: Modular Monolithic Architecture enhances the monolith by organizing code into modules based on features or domains, still deployed as a single unit but with better structure.

**Modules**: Separates functionality into distinct, reusable units within the monolith.

**Source Tree**:

```
src/
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
└── main.ts
```

**NestJS Example**:

```typescript
// src/users/users.service.ts (**Modules**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  getUsers() {
    return ["John", "Jane"];
  }
}

// src/users/users.controller.ts (**Modules**)
import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getUsers();
  }
}

// src/users/users.module.ts (**Modules**)
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [UsersModule],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

---

## Layered (N-Layer) Architecture

**Overview**: Layered Architecture divides the application into logical layers, each with a specific role, promoting separation of concerns with a top-down dependency flow, typically within a single app.

**Presentation layer**: Handles UI and user interaction.

**Business logic layer**: Contains core application logic and rules.

**Data access layer**: Manages database operations.

**Source Tree**:

```
src/
├── presentation/
│   └── user.controller.ts
├── business/
│   └── user.service.ts
├── data/
│   └── user.repository.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/data/user.repository.ts (**Data access layer**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  getUsers() {
    return ["John", "Jane"]; // Simulate DB access
  }
}

// src/business/user.service.ts (**Business logic layer**)
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../data/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  getUsers() {
    return this.userRepo.getUsers(); // Business logic
  }
}

// src/presentation/user.controller.ts (**Presentation layer**)
import { Controller, Get } from "@nestjs/common";
import { UserService } from "../business/user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getUsers(); // UI layer
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { UserController } from "./presentation/user.controller";
import { UserService } from "./business/user.service";
import { UserRepository } from "./data/user.repository";

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

---

## Three-Tier Architecture

**Overview**: Three-Tier Architecture separates the application into three physical or logical tiers—presentation, application, and data—designed for scalability and deployment flexibility across servers.

**Presentation tier**: Client-facing layer (e.g., browser or app).

**Application tier**: Processes business logic and coordinates tasks.

**Data tier**: Stores and retrieves data (e.g., database).

**Source Tree**:

```
src/
├── presentation/
│   └── user.controller.ts
├── application/
│   └── user.service.ts
├── data/
│   ├── user.entity.ts
│   └── user.repository.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/data/user.entity.ts (**Data tier** - Simulated DB)
export class User {
  constructor(public id: number, public name: string) {}
}

// src/data/user.repository.ts (**Data tier**)
import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UserRepository {
  private users: User[] = [new User(1, "John"), new User(2, "Jane")];

  findAll(): User[] {
    return this.users; // Simulate DB query
  }
}

// src/application/user.service.ts (**Application tier**)
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../data/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  getUsers() {
    return this.userRepo.findAll(); // Logic processing
  }
}

// src/presentation/user.controller.ts (**Presentation tier**)
import { Controller, Get } from "@nestjs/common";
import { UserService } from "../application/user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getUsers(); // API response
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { UserController } from "./presentation/user.controller";
import { UserService } from "./application/user.service";
import { UserRepository } from "./data/user.repository";

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

---

## Key Differences

- Monolithic: Everything in one unit, simple but rigid.
- Modular Monolithic: Still one unit, but split into modules for better organization.
- Layered (N-Layer): Logical separation into layers, top-down flow, single app.
- Three-Tier: Physical/logical separation into tiers, scalable across servers.
