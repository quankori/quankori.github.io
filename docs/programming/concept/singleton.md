---
title: Singleton Pattern
---
Singleton is one of the five design patterns in the Creational Design Pattern group.

Singleton ensures that only one instance is created and provides a method for accessing that instance at any time and in any part of the program.

Singleton is used when we want to:

- Ensure that only one instance of a class exists.
- Better manage access because there is only one instance.
- Manage the number of instances of a class within a specified limit.
- Because a class that uses Singleton only exists in one instance, it is often used to solve problems that need to access applications such as shared resources, logger, configuration, caching, thread pool, etc.
- Some other design patterns also use Singleton for implementation, such as Abstract Factory, Builder, Prototype, Facade, etc.
- It has been used in some core java classes such as java.lang.Runtime, java.awt.Desktop.

Code example:

```ts
class Singleton {
  private static instance: Singleton;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public someBusinessLogic() {
    // ...
  }
}
```
