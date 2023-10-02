---
title: Nest.js Dependency Injection (DI)
---

Dependency Injection (DI) is a design pattern in which an object receives its dependencies from the outside instead of creating them internally. It promotes the principle of inversion of control, where the creation and management of dependencies are shifted outside the class. This makes the system more modular, easier to test, and often cleaner in terms of separating concerns.

NestJS, an advanced Node.js framework for building scalable server-side applications, uses Dependency Injection as one of its core features, inspired by Angular's DI system.

Here's how Dependency Injection works in NestJS:

**Providers**: In NestJS, a provider is something that can be injected into the constructors of other classes. Providers can be simple values, classes, factory functions, and more.

**Modules**: Each module in NestJS can declare components (controllers, providers, etc.) that belong to it. When a module needs a provider, it looks within its own module and in the imported modules to find it.

**Injectors**: NestJS has a built-in DI container to handle the creation and lifecycle of objects (or "providers").

**Decorators**: NestJS uses decorators like @Inject() to manually specify a custom provider token for a provider.

Consider we have a simple UserService that queries user data:

```ts
@Injectable()
export class UserService {
  getUsers() {
    // ... fetch user data
  }
}
```

This service is marked with the @Injectable() decorator, making it a provider managed by NestJS's DI system.

Now, if you want to use this service in a controller, instead of manually creating a UserService instance, you would do the following:

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

Here, UserController requests the UserService to be injected. NestJS's DI injector takes care of creating an instance of UserService and providing it to UserController.

Benefits in NestJS:

**Testability**: With DI, it's easy to replace real services with mock versions for testing.

**Modularity**: DI promotes a more modular design by encouraging the separation of concerns.

**Reusability**: Providers (like services) can be easily reused in different parts of the application.

**Lifecycles**: NestJS can manage the lifecycles of providers, creating them lazily or as singletons, depending on your needs.

In summary, Dependency Injection is a core concept in NestJS that helps create scalable, maintainable, and testable applications.
