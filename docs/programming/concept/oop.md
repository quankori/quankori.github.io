---
title: Object-oriented programming
---

## Inheritance

Reusing a function from another class through inheriting that class.

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

Polymorphism at runtime is the process of calling an overridden method during the execution of a program. In this process, an overridden method is called through a reference variable of a parent class.

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

Abstraction is a process of hiding the implementation details and showing only the features to the user.

There are two ways to achieve abstraction: using interfaces and abstract classes.

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

You can create a read-only or write-only class by implementing a setter or getter method.

You can control the data. For example, if you want to set the value of an ID only if it's greater than 100, you can write the logic inside the setter method.

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
