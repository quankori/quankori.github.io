---
title: SOLID Principle
---

## S - Single Responsibility Principle

Một lớp nên chỉ có một trách nhiệm (Nó chỉ nên được sửa đổi vì một lý do).

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

Có thể mở rộng một lớp, nhưng không được phép sửa đổi nội dung của nó.

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

Trong một chương trình, các đối tượng của một lớp con có thể thay thế lớp cha mà không ảnh hưởng đến tính đúng đắn của chương trình.

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

Thay vì sử dụng một giao diện lớn, chúng ta nên chia thành các giao diện nhỏ hơn, mỗi giao diện có mục đích khác nhau.

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

Các mô-đun cấp cao không nên phụ thuộc vào các mô-đun cấp thấp.
Cả hai nên phụ thuộc vào trừu tượng.

Trừu tượng (giao diện) không nên phụ thuộc vào chi tiết, mà ngược lại.
(Các lớp giao tiếp với nhau thông qua giao diện,
không thông qua việc thực thi cụ thể.)

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
