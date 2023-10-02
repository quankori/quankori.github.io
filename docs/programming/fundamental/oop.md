---
title: Object-oriented programming
---

## Inheritance

Tái sử dụng một hàm từ một lớp khác thông qua việc kế thừa lớp đó.

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

Đa hình trong thời gian chạy là quá trình gọi một phương thức bị ghi đè trong quá trình thực thi chương trình. Trong quá trình này, một phương thức bị ghi đè được gọi thông qua một biến tham chiếu của lớp cha.

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

Trừu tượng là quá trình che giấu chi tiết thực hiện và chỉ hiển thị các tính năng cho người dùng.

Có hai cách để đạt được trừu tượng: sử dụng giao diện và lớp trừu tượng.

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

Bạn có thể tạo ra một lớp chỉ cho việc đọc hoặc chỉ cho việc ghi bằng cách thực hiện một phương thức setter hoặc getter.

Bạn có thể kiểm soát dữ liệu. Ví dụ, nếu bạn muốn đặt giá trị của một ID chỉ khi nó lớn hơn 100, bạn có thể viết logic bên trong phương thức setter.

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
