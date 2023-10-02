---
title: Nest.js Providers
---

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/nestjs/1.png)

## Concept


In NestJS, providers are objects responsible for providing services, functions, or objects to other parts of the application such as controllers, modules, and injectables. Providers are at the core of the dependency injection system in NestJS, allowing other parts of the application to request and use services without needing to know exactly how they are created.

## Standart Providers

In addition to using the @Injectable() decorator, you can also create custom providers using an object literal syntax.

```ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class CatsService {
  findAll() {
    return ["Cat 1", "Cat 2"];
  }
}
```

## Customer Providers

### Value providers: useValue

Use useValue to provide a fixed value for a provider.

```ts
const catsServiceProvider = {
  provide: "CatsService",
  useValue: {
    findAll: () => ["Cat 1", "Cat 2"],
  },
};
```

### Class providers: useClass

Use useValue to provide a class to create instance for provider.

```ts
const catsServiceProvider = {
  provide: "CatsService",
  useClass: CatsService,
};
```

### Factory providers: useFactory

Factory providers allow you to use a function to create an instance of the provider. This enables you to customize the initialization of the provider based on specific logic or configuration.

```ts
import { Module } from "@nestjs/common";
import { Connection, DatabaseService } from "./database.service";

@Module({
  providers: [
    DatabaseService,
    {
      provide: "CONNECTION",
      useFactory: (connection: Connection) => {
        return new DatabaseService(connection);
      },
      inject: [Connection],
    },
  ],
  exports: ["CONNECTION", DatabaseService],
})
export class DatabaseModule {}
```

In this example, `DatabaseService` is a provider, and `CONNECTION` is created by the factory function. The factory function can access and use the Connection to create an instance of DatabaseService.

In this example, `Connection` is another class/provider that is injected into the factory function through `inject: [Connection]`. When NestJS needs to create an instance of the `CONNECTION` provider, it will automatically inject an instance of `Connection` into the factory function.

### Alias providers: useExisting

Alias providers allow you to create an alternative name for an existing provider. This is useful when you want to use a shorter name or change the name of a provider without affecting its usage in other modules.

```ts
import { Module } from "@nestjs/common";
import { ExistingService } from "./existing.service";

@Module({
  providers: [ExistingService],
  exports: [ExistingService],
})
export class AppModule {}
```

```ts
import { Module } from "@nestjs/common";
import { AliasService } from "./alias.service";

@Module({
  providers: [
    {
      provide: "AliasService",
      useExisting: ExistingService,
    },
  ],
})
export class CatsModule {}
```

In this example, the `AliasService` provider is essentially `ExistingService` but with a different name for use in the `CatsModule`.

### Non-service based providers

Non-service based providers can be used to define values that do not require the instantiation of a class provider. They are often used to provide simple values like strings, numbers, or constants.

```ts
import { Module } from "@nestjs/common";

@Module({
  providers: [
    {
      provide: "API_KEY",
      useValue: "your-api-key",
    },
    {
      provide: "MAX_RETRIES",
      useValue: 5,
    },
  ],
})
export class AppModule {}
```


```ts
import { Controller, Get, Inject } from "@nestjs/common";

@Controller("cats")
export class CatsController {
  constructor(
    @Inject("API_KEY") private apiKey: string,
    @Inject("MAX_RETRIES") private maxRetries: number
  ) {}

  @Get()
  getCats() {
    console.log("API Key:", this.apiKey);
    console.log("Max Retries:", this.maxRetries);
    // Your controller logic here
  }
}
```

## Provider scope

Each provider has its own usage scope, including `SINGLETON`, `TRANSIENT`, and `REQUEST`. For example, when a request is sent to the `SINGLETON` scope, it reuses the already-used instance, while `TRANSIENT` and `REQUEST` create new instances.

**Singleton** (Default): Each provider is created only once and shared across all modules and components in the application. This ensures that a single instance of the provider is used for all requests in the application.

```ts
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.DEFAULT })
```

**Transient**: Each request creates a separate instance of the provider. This ensures that each request has an independent instance of the provider without affecting other requests.

```ts
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
```

**Request**: This mechanism creates a separate instance of the provider for each request, but unlike transient, instances of request-scoped providers are shared throughout the processing of a single request. Other requests will have different instances.

```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
```
