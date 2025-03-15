---
title: Domain-Centric Architectures
---

## Onion Architecture

**Overview**: Onion Architecture organizes an application into concentric layers, with the core domain at the center. Dependencies flow outward, ensuring the business logic remains independent of external systems like databases or UI frameworks.

**Core domain**: Contains entities and business rules, free from external dependencies.

**Application layer**: Manages use cases and coordinates interactions between the core domain and external layers.

**Infrastructure layer**: Handles external concerns like database access or APIs, depending on inner layers.

**Source Tree**:

```
src/
├── domain/
│   └── user.entity.ts
├── application/
│   └── user.service.ts
├── infrastructure/
│   └── user.repository.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/domain/user.entity.ts (**Core domain**)
export class User {
  constructor(public id: number, public name: string) {}
}

// src/application/user.service.ts (**Application layer**)
import { Injectable } from "@nestjs/common";
import { User } from "../domain/user.entity";
import { UserRepository } from "../infrastructure/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUser(id: number): Promise<User> {
    return this.userRepo.findById(id);
  }
}

// src/infrastructure/user.repository.ts (**Infrastructure layer**)
import { Injectable } from "@nestjs/common";
import { User } from "../domain/user.entity";

@Injectable()
export class UserRepository {
  private users = [new User(1, "John")];

  async findById(id: number): Promise<User> {
    return this.users.find((u) => u.id === id);
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { UserService } from "./application/user.service";
import { UserRepository } from "./infrastructure/user.repository";

@Module({
  providers: [UserService, UserRepository],
})
export class AppModule {}
```

---

## Clean Architecture

**Overview**: Clean Architecture structures an app into layers with entities at the core, surrounded by use cases, interface adapters, and frameworks/drivers. It enforces independence of business logic from external tools.

**Entities**: Core business objects encapsulating rules and data.

**Use cases**: Application logic defining how entities are used.

**Interface adapters**: Convert data between use cases and external systems.

**Frameworks/drivers**: External technologies (e.g., DB, UI) interacting through adapters.

**Source Tree**:

```
src/
├── entities/
│   └── user.entity.ts
├── usecases/
│   └── user.usecase.ts
├── adapters/
│   └── user.gateway.ts
├── frameworks/
│   └── user.repository.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/entities/user.entity.ts (**Entities**)
export class User {
  constructor(public id: number, public name: string) {}
}

// src/usecases/user.usecase.ts (**Use cases**)
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserGateway } from "../adapters/user.gateway";

@Injectable()
export class UserUseCase {
  constructor(private gateway: UserGateway) {}

  async getUser(id: number): Promise<User> {
    return this.gateway.findById(id);
  }
}

// src/adapters/user.gateway.ts (**Interface adapters**)
export interface UserGateway {
  findById(id: number): Promise<User>;
}

// src/frameworks/user.repository.ts (**Frameworks/drivers**)
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserGateway } from "../adapters/user.gateway";

@Injectable()
export class UserRepository implements UserGateway {
  private users = [new User(1, "John")];

  async findById(id: number): Promise<User> {
    return this.users.find((u) => u.id === id);
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { UserUseCase } from "./usecases/user.usecase";
import { UserRepository } from "./frameworks/user.repository";

@Module({
  providers: [
    UserUseCase,
    { provide: "UserGateway", useClass: UserRepository },
  ],
})
export class AppModule {}
```

---

## EBI Architecture (Entity-Boundary-Interactor)

**Overview**: EBI Architecture simplifies domain-centric design into three components: entities for business objects, boundaries as interfaces, and interactors for logic, focusing on clear separation.

**Entity**: Core objects holding data and behavior.

**Boundary**: Interfaces specifying how entities are accessed.

**Interactor**: Logic managing interactions with entities via boundaries.

**Source Tree**:

```
src/
├── entities/
│   └── user.entity.ts
├── boundaries/
│   └── user.boundary.ts
├── interactors/
│   └── user.interactor.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/entities/user.entity.ts (**Entity**)
export class User {
  constructor(public id: number, public name: string) {}
}

// src/boundaries/user.boundary.ts (**Boundary**)
export interface UserBoundary {
  findById(id: number): Promise<User>;
}

// src/interactors/user.interactor.ts (**Interactor**)
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserBoundary } from "../boundaries/user.boundary";

@Injectable()
export class UserInteractor {
  constructor(private boundary: UserBoundary) {}

  async getUser(id: number): Promise<User> {
    return this.boundary.findById(id);
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { UserInteractor } from "./interactors/user.interactor";

@Injectable()
export class UserRepository implements UserBoundary {
  private users = [new User(1, "John")];

  async findById(id: number): Promise<User> {
    return this.users.find((u) => u.id === id);
  }
}

@Module({
  providers: [
    UserInteractor,
    { provide: "UserBoundary", useClass: UserRepository },
  ],
})
export class AppModule {}
```

---

## Hexagonal Architecture

**Overview**: Hexagonal Architecture (Ports and Adapters) isolates business logic in the core, using ports to define interactions and adapters to connect to external systems, promoting flexibility.

**Ports**: Interfaces specifying how the core communicates outward.

**Adapters**: Implementations linking ports to external systems.

**Source Tree**:

```
src/
├── domain/
│   └── user.entity.ts
├── ports/
│   └── user.port.ts
├── adapters/
│   └── user.repository.ts
├── application/
│   └── user.service.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/domain/user.entity.ts (Core)
export class User {
  constructor(public id: number, public name: string) {}
}

// src/ports/user.port.ts (**Ports**)
export interface UserPort {
  findById(id: number): Promise<User>;
}

// src/adapters/user.repository.ts (**Adapters**)
import { Injectable } from "@nestjs/common";
import { User } from "../domain/user.entity";
import { UserPort } from "../ports/user.port";

@Injectable()
export class UserRepository implements UserPort {
  private users = [new User(1, "John")];

  async findById(id: number): Promise<User> {
    return this.users.find((u) => u.id === id);
  }
}

// src/application/user.service.ts (Core Logic with Ports)
import { Injectable } from "@nestjs/common";
import { User } from "../domain/user.entity";
import { UserPort } from "../ports/user.port";

@Injectable()
export class UserService {
  constructor(private userPort: UserPort) {}

  async getUser(id: number): Promise<User> {
    return this.userPort.findById(id);
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { UserService } from "./application/user.service";
import { UserRepository } from "./adapters/user.repository";

@Module({
  providers: [UserService, { provide: "UserPort", useClass: UserRepository }],
})
export class AppModule {}
```

---

## Key Differences

- Onion: Layers with core domain at center, outward dependencies.
- Clean: Circular structure with entities at core, explicit adapters.
- EBI: Simplified with entity-boundary-interactor trio.
- Hexagonal: Ports and adapters for flexible external integration.
