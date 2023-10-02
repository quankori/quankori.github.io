---
title: Object-oriented programming
---

## Inheritance

Reusing a function from another class through inheriting that class.

```ts
class Animal {
  eat(): void {
    console.log("eating...");
  }
}

class Dog extends Animal {
  bark(): void {
    console.log("barking...");
  }
}

class TestInheritance1 {
  public static main(args: string[]): void {
    const d = new Dog();
    d.bark();
    d.eat();
  }
}
```

## Polymorphism

Polymorphism at runtime is the process of invoking an overridden method during program execution. In this process, an overridden method is called through a reference variable of the parent class.

```ts
class Bike {
    run(): void {
        console.log("running");
    }
}

class Splender extends Bike {
    run(): void {
        console.log("running safely with 60km");
    }

    public static main(args: string[]): void {
        const b: Bike = new Splender();
        b.run();
    }
}
```

## Abstraction

Abstraction is the process of hiding the implementation details and showing only the features to the user.

There are two ways to achieve abstraction: using interfaces and abstract classes.

- Abstract

```ts
abstract class BikeAbstract {
    abstract run(): void;
}

class Honda4 extends BikeAbstract {
    run(): void {
        console.log("running safely..");
    }

    public static main(args: string[]): void {
        const obj: BikeAbstract = new Honda4();
        obj.run();
    }
}
```

- Interface

```ts
interface Printable {
    print(): void;
}

class A6 implements Printable {
    print(): void {
        console.log("Hello");
    }

    public static main(args: string[]): void {
        const obj: Printable = new A6();
        obj.print();
    }
}
```

## Encapsulation

You can create a class for either reading or writing by implementing a setter or getter method.

You can control data. For example, if you want to set the value of an ID only when it's greater than 100, you can write logic inside the setter method.

```ts
class Student {
    private name: string;

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
}

class Test {
    public static main(args: string[]): void {
        const s = new Student();
        s.setName("Hai");
        console.log(s.getName());
    }
}
```
