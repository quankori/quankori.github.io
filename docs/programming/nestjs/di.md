---
title: Dependency Injection (DI)
---

Dependency Injection (DI) is a design pattern in which an object receives its dependencies from outside rather than creating them internally. It promotes the principle of inversion of control, where the control of creating and managing dependencies is shifted outside the class. This makes systems more modular, more testable, and often cleaner in terms of separation of concerns.

NestJS, a progressive Node.js framework for building scalable server-side applications, uses Dependency Injection heavily as one of its core features, inspired by Angular's DI system.

Here's how Dependency Injection works in NestJS:

**Providers**: In NestJS, a provider is something that can be injected into the constructors of other classes. Providers can be plain values, classes, factory functions, and more.

**Modules**: Each module in NestJS can declare which components (controllers, providers, etc.) belong to it. When a module needs a provider, it'll look in its own module and in imported modules to find it.

**Injectors**: NestJS has a built-in DI container that handles the instantiation and lifecycle of the objects (or "providers").

**Decorators**: NestJS uses decorators like @Inject() to manually specify a custom provider token for a provider.

Let's say we have a simple UserService that fetches user data:

```ts
@Injectable()
export class UserService {
  getUsers() {
    // ... fetch user data
  }
}
```

This service is marked with the @Injectable() decorator, which makes it a provider that can be managed by the NestJS DI system.

Now, if you want to use this service in a controller, instead of creating an instance of UserService manually, you'd do:

```ts
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getUsers();
  }
}
```

Here, the UserController asks for the UserService to be injected. The NestJS DI container takes care of creating an instance of UserService and providing it to the UserController.

Benefits in NestJS:

**Testability**: With DI, it's easy to replace a real service with a mock version for testing.

**Modularity**: DI encourages more modular design by promoting separation of concerns.

**Reusability**: Providers (like services) can be easily reused across different parts of the application.

**Lifecycles**: NestJS can manage the lifecycle of providers, instantiating them lazily or as singletons, depending on your needs.

In summary, Dependency Injection is a core concept in NestJS, greatly aiding in the creation of scalable, maintainable, and testable applications.
