---
title: Nest.js CheatSheet
---

### Lazy-loading Module

```ts
@Controller()
export class AppController {
  constructor(private readonly lazyModuleLoader: LazyModuleLoader) {}

  @Get()
  async getLazyReport(): Promise<string> {
    console.time();
    const moduleRef = await this.lazyModuleLoader.load(() => ReportsModule);
    const reportsService = moduleRef.get(ReportsService);
    console.timeEnd();
    return reportsService.getReport();
  }
}
```

### Accessing IoC container

Access the Inversion of Control (IoC) container to retrieve instances of providers dynamically using ModuleRef.

```ts
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { UsersService } from "./users/users.service";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    const usersService = this.moduleRef.get<UsersService>(UsersService, {
      strict: false,
    });
    usersService.findAll();
  }
}
```

### Reflector

Reflector is used to access metadata set by decorators, commonly utilized in guards, interceptors, and decorators.

```ts
// roles.decorator.ts
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
```

```ts
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    console.log("RolesGuard:", roles);
    return roles ? roles.includes("admin") : true;
  }
}
```

```ts
// users.controller.ts
import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "./roles.guard";

@Controller("users")
@UseGuards(RolesGuard)
export class UsersController {
  @Get()
  @Roles("admin")
  findAll() {
    return "This action returns all users";
  }
}
```

### Composition with Mixins

Mixins allow for composing classes with reusable functionality, enhancing modularity and code reuse.

```ts
// logger.mixin.ts
export function LoggerMixin<T extends new (...args: any[]) => {}>(Base: T) {
  return class extends Base {
    log(message: string) {
      console.log(`LoggerMixin: ${message}`);
    }
  };
}
```

```ts
// users.service.ts
import { Injectable } from "@nestjs/common";
import { LoggerMixin } from "./logger.mixin";

@Injectable()
export class UsersServiceBase {
  findAll() {
    return ["User1", "User2"];
  }
}

@Injectable()
export class UsersService extends LoggerMixin(UsersServiceBase) {
  findAll() {
    const users = super.findAll();
    this.log(`Fetched ${users.length} users`);
    return users;
  }
}
```

```ts
// users.controller.ts
import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

###

```bash
npm install opossum
```

```ts
// src/common/interceptors/circuit-breaker.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Observable, from, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import * as CircuitBreaker from "opossum";
import { ExternalService } from "../../external/external.service";

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private breaker: CircuitBreaker;

  constructor(private externalService: ExternalService) {
    // Configure the circuit breaker
    this.breaker = new CircuitBreaker(this.externalService.fetchData, {
      timeout: 3000, // If function takes longer than 3 seconds, trigger a failure
      errorThresholdPercentage: 50, // Percentage of failures before opening the circuit
      resetTimeout: 5000, // Time to wait before trying again after the circuit is opened
    });

    // Event listeners for circuit breaker state changes
    this.breaker.on("open", () => console.log("Circuit Breaker: OPEN"));
    this.breaker.on("halfOpen", () =>
      console.log("Circuit Breaker: HALF-OPEN")
    );
    this.breaker.on("close", () => console.log("Circuit Breaker: CLOSED"));
    this.breaker.on("fallback", () => console.log("Circuit Breaker: FALLBACK"));
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return from(this.breaker.fire()).pipe(
      switchMap((data) => {
        // Attach external data to the request
        const request = context.switchToHttp().getRequest();
        request.externalData = data;
        return next.handle();
      }),
      catchError((err) => {
        // Handle fallback or throw an exception
        console.log("CircuitBreakerInterceptor: Fallback triggered.");
        return throwError(
          new HttpException(
            "Service unavailable. Please try again later.",
            HttpStatus.SERVICE_UNAVAILABLE
          )
        );
      })
    );
  }
}
```
