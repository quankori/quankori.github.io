---
title: Object-oriented programming
---

## Inheritance

Tái sử dụng một hàm từ một lớp khác thông qua việc kế thừa lớp đó.

```java
class Animal {
void eat() {
    System.out.println("eating...");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("barking...");
    }
}

public class TestInheritance1 {
    public static void main(String args[]) {
        Dog d = new Dog();
        d.bark();
        d.eat();
    }
}
```

## Polymorphism

Đa hình trong thời gian chạy là quá trình gọi một phương thức bị ghi đè trong quá trình thực thi chương trình. Trong quá trình này, một phương thức bị ghi đè được gọi thông qua một biến tham chiếu của lớp cha.

```java
class Bike {
    void run() {
        System.out.println("running");
    }
}

public class Splender extends Bike {
    void run() {
        System.out.println("running safely with 60km");
    }

    public static void main(String args[]) {
        Bike b = new Splender();
        b.run();
    }
}
```

## Abstraction

Trừu tượng là quá trình che giấu chi tiết thực hiện và chỉ hiển thị các tính năng cho người dùng.

Có hai cách để đạt được trừu tượng: sử dụng giao diện và lớp trừu tượng.

- Abstract

```java
abstract class Bike{
    abstract void run();
}

class Honda4 extends Bike{
    void run() {
        System.out.println("running safely..");
    }

    public static void main(String args[]) {
        Bike obj = new Honda4();
        obj.run();
    }
}
```

- Interface

```java
interface printable {
    void print();
}

class A6 implements printable {
    public void print() {
        System.out.println("Hello");
    }

    public static void main(String args[]){
        A6 obj = new A6();
        obj.print();
    }
}
```

## Encapsulation

Bạn có thể tạo ra một lớp chỉ cho việc đọc hoặc chỉ cho việc ghi bằng cách thực hiện một phương thức setter hoặc getter.

Bạn có thể kiểm soát dữ liệu. Ví dụ, nếu bạn muốn đặt giá trị của một ID chỉ khi nó lớn hơn 100, bạn có thể viết logic bên trong phương thức setter.

```java
public class Student {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

class Test {
    public static void main(String[] args) {
        Student s = new Student();
        s.setName("Hai");
        System.out.println(s.getName());
    }
}
```
