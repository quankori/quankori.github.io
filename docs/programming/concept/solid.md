---
title: SOLID Principle
---

## S - Single Responsibility Principle

A class should only have one responsibility (It should only be modified for one reason).

```ts
// Student bây giờ chỉ chứa thông tin
public class Student {
  public string Name { get; set;}
  public int Age { get; set;}
}

// Class này chỉ format thông tin hiển thị student
public class Formatter {
  public string FormatStudentText(Student std) {
    return "Name: " + std.Name + ". Age: " + std.Age;
  }

  public string FormatStudentHtml(Student std) {
    return "<span>" + std.Name + " " + std.Age + "</span>";
  }

  public string FormatStudentJson(Student std) {
    return Json.Serialize(std);
  }
}
```

## O - Open/Closed Principle

It is possible to extend a class, but it is not allowed to modify its contents.

```ts
interface Shape {
  public double area();
}
public class Square implements Shape {
  private Point topLeft;
  private double side;
  public double area() {
  return side*side;
  }
}

public class Rectangle implements Shape {
  private Point topLeft;
  private double height;
  private double width;
  public double area() {
    return height * width;
  }
}
```

## L - Liskov’s Substitution Principle

In a program, objects of a subclass can substitute for the superclass without affecting the correctness of the program.

```ts
public class Animal {
    public void makeNoise() {
        System.out.println("making some noise");
    }
}
// class Cat và Dog extend từ class animal
public class Dog extends Animal {
    @Override
    public void makeNoise() {
        System.out.println("gâu gâu");
    }
}
```

## I - Interface Segregation Principle

Instead of using one large interface, we should break it down into smaller interfaces, each with different purposes.

```ts
// Instead of:
interface Worker {
  work(): void;
  eat(): void;
}

// Use:
interface Working {
  work(): void;
}

interface Eating {
  eat(): void;
}

class Human implements Working, Eating {
  work() {
    // human working
  }

  eat() {
    // human eating
  }
}
```

## D - Dependency Inversion Principle

High-level modules should not depend on low-level modules.
Both should depend on abstractions.

Abstractions (interfaces) should not depend on details, but rather the other way around.
(Classes communicate with each other through interfaces,
not through implementations.)

```ts
// Not apply principle
// Cart is high module
public class Cart {
    public void Checkout(int orderId, int userId) {
        // Database, Logger, EmailSender là module cấp thấp
        Database db = new Database();
        db.Save(orderId);

        Logger log = new Logger();
        log.LogInfo("Order has been checkout");

        EmailSender es = new EmailSender();
        es.SendEmail(userId);
    }
}
```

```ts
// Apply principle

public interface IDatabase {
        void Save(int orderId);
}

public interface ILogger {
        void LogInfo(string info);
}

public interface IEmailSender {
        void SendEmail(int userId);
}

// Module implement interface
public class Logger implements ILogger {
    public void LogInfo(string info) {}
}

public class Database implements IDatabase {
    public void Save(int orderId) {}
}

public class EmailSender implements IEmailSender {
    public void SendEmail(int userId) {}
}

public void Checkout(int orderId, int userId) {
    //IDatabase db = new XMLDatabase();
    //IDatebase db = new SQLDatabase();
    IDatabase db = new Database();
    db.Save(orderId);

    ILogger log = new Logger();
    log.LogInfo("Order has been checkout");

    IEmailSender es = new EmailSender();
    es.SendEmail(userId);
}
```
