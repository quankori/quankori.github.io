# SOLID

- S - Single Responsibility Principle

Một class chỉ nên giữ 1 trách nhiệm duy nhất (Chỉ có thể sửa đổi class với 1 lý do duy nhất)

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

- O - Open/Closed Principle

Có thể mở rộng 1 class, nhưng không được sửa đổi bên trong class đó

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

- L - Liskov’s Substitution Principle

Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình

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

- I - Interface Segregation Principle

Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với các mục đích khác nhau

- D - Dependency Inversion Principle

1. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp.
   Cả 2 nên phụ thuộc vào abstraction.
2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại.
   ( Các class giao tiếp với nhau thông qua interface,
   không phải thông qua implementation.)

```ts
// khi chưa áp dụng nguyên lý
// Cart là module cấp cao
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
// Code sau khi áp dụng nguyên lý

public interface IDatabase {
        void Save(int orderId);
}

public interface ILogger {
        void LogInfo(string info);
}

public interface IEmailSender {
        void SendEmail(int userId);
}

// Các Module implement các Interface
public class Logger implements ILogger {
    public void LogInfo(string info) {}
}

public class Database implements IDatabase {
    public void Save(int orderId) {}
}

public class EmailSender implements IEmailSender {
    public void SendEmail(int userId) {}
}

// Hàm checkout mới sẽ như sau
public void Checkout(int orderId, int userId) {
    // Nếu muốn thay đổi database, logger ta chỉ cần thay đổi code ở dưới các module này mà không ảnh hưởng đến hàm checkout
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
