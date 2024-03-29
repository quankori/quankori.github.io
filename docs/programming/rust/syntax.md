---
title: Syntax
---

## Data Types

### Variables

```rust
let mut mutable = 12; // Mutable `i32`.
mutable = 21;
let logical: bool = true; // Default is immutable
let a_float: f64 = 1.0;  // Regular annotation
let an_integer   = 5i32; // Suffix annotation
let max = u32::MAX;

let num: i32 = 10;
let num_u64: u64 = num as u64;
```

### Log

```rust
println!("Logging info to console");
```

### Comments

```rust
// This is a single line comment.
/* This is a
   multiline comment. */
```

### Numeric Types & Basic Arithmetic

```rust
let sum = 5 + 10; // addition
let difference = 95.5 - 4.3; // subtraction
let product = 4 * 30; // multiplication
let quotient = 56.7 / 32.2; // division
let remainder = 43 % 5; // modulus

let x = 5;
let y = {
    let x_squared = x * x;
    x_squared + 1
};
```

### Enums

```rust
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```

### Structs

```rust
struct Person {
    name: String,
    age: u8,
}
```

### Tuples

- Memory: Stack

```rust
let tuple: (i32, f64, u8) = (500, 6.4, 1);
```

### Option Type

`Option<T>` là một enum cho phép biểu diễn sự có mặt (Some) hoặc vắng mặt (None) của một giá trị, giúp xử lý tình huống giá trị có thể không tồn tại mà không dùng đến giá trị null.

```rust
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}
```

### Result Type

Result<T, E> là một enum dùng để biểu diễn thành công (Ok) hoặc lỗi (Err), thường được sử dụng trong xử lý lỗi.

```rust
fn divide_result(numerator: f64, denominator: f64) -> Result<f64, String> {
    if denominator == 0.0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(numerator / denominator)
    }
}
```

### Basic Closures

```rust
fn main() {
    let add_one = |x: i32| x + 1;
    println!("The result of adding one: {}", add_one(5));
}
```

## Control Flow

### If else

```rust
if 1 == 2 {
    println!("That's odd!");
} else {
    println!("That's right!");
}
```

### Match Epxression

Trong Rust, match expression là một cấu trúc điều khiển mạnh mẽ cho phép bạn so sánh một giá trị với một loạt các mẫu (patterns). Nó tương tự như switch-case trong các ngôn ngữ khác như C hoặc Java, nhưng mạnh mẽ và linh hoạt hơn nhiều. match cho phép bạn không chỉ so sánh giá trị với các hằng số mà còn với các cấu trúc dữ liệu phức tạp, cho phép destructuring (phân rã) các giá trị và thậm chí là kết hợp với các guard conditions.

```rust
let number = 13;
match number {
    1 => println!("One!"),
    2 | 3 | 5 | 7 | 11 => println!("This is a prime"),
    13..=19 => println!("A teen"),
    _ => println!("Ain't special"),
}
```

```rust
enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE,
}

fn match_http_method(method: HttpMethod) {
    match method {
        HttpMethod::GET => println!("fetch data"),
        HttpMethod::POST => println!("submit data"),
        HttpMethod::PUT => println!("update data"),
        HttpMethod::DELETE => println!("delete data"),
    }
}
```

### If let else

```rust
let option = Some(7);

if let Some(i) = option {
    println!("Matched: {}", i);
} else {
    println!("Didn't match a number");
}
```

## Loop

### Loop

```rust
let mut count = 0;
loop {
    count += 1;
    if count == 5 {
        println!("Reached five");
        break;
    }
}
```

### While Loop

```rust
let mut number = 3;
while number != 0 {
    println!("{}!", number);
    number -= 1;
}
println!("LIFTOFF!!!");
```

### For Loop

```rust
for i in 0..5 {
    println!("{} times repetition", i);
}
```

### While let

```rust
let mut stack = Vec::new();

stack.push(1);
stack.push(2);
stack.push(3);

while let Some(top) = stack.pop() {
    println!("{}", top);
}
```

## Collections

### The Vector

- Data Structure

Memory: Heap

```rust
let v: Vec<i32> = Vec::new();
```

- Vector For Loops

```rust
let v = vec![10, 20, 30, 40, 50];
for i in &v {
    println!("{}", i);
}
for element in vec.iter() {
    println!("Giá trị là: {}", element);
}
```

### Array

Memory: Stack

```rust
let arr = [10, 20, 30, 40, 50];

for element in arr.iter() {
    println!("Giá trị là: {}", element);
}
```

### Strings

Memory: Heap

```rust
let s: String = String::from("hello");
```

### Slices

Trong Rust, slices là một loại dữ liệu cho phép bạn tham chiếu một phần hoặc toàn bộ dãy liên tục của một collection như một mảng hoặc một vector, mà không sở hữu collection đó. Slices là một cách hữu ích để truy cập vào một dãy các phần tử mà không cần copy chúng, giúp tăng hiệu suất và giảm bộ nhớ sử dụng.

```rust
let s = String::from("Hello, world!");

// Lấy một slice từ ký tự thứ nhất đến ký tự thứ năm
let slice = &s[0..5];

println!("{}", slice); // "Hello"
```

### Map combinator

```rust
let a = Some(5);
let b: Option<i32> = a.map(|v| v * 2);

println!("{:?}", b); // Prints: Some(10)
```

### Using Iterators

```rust
let numbers = vec![1, 2, 3, 4, 5];
let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();

println!("{:?}", doubled);
```

### Ranges

```rust
for i in 1..5 {
    println!("{}", i); // Prints numbers 1 to 4
}
```

### HashMap Data Structure

HashMap<K, V> là một cấu trúc dữ liệu cho phép lưu trữ dữ liệu dưới dạng cặp khóa-giá trị, nơi mỗi khóa là duy nhất.

```rust
use std::collections::HashMap;

fn main() {
    let mut book_reviews = HashMap::new();

    book_reviews.insert("Rust Book", "Excellent resource for Rustaceans.");

    println!("{:?}", book_reviews);
}
```

## Module

### Inline modules

```rust
mod my_module {
    pub fn say_hello() {
        println!("Hello, Rustacean!");
    }
}

fn main() {
    my_module::say_hello();
}
```

### External Crates

Cargo.toml

```toml
[dependencies]
rand = "0.8.0"
```

### External Modules

```rust
// greetings/mod.rs
pub mod english;
pub mod vietnamese;
```

```rust
// greetings/english.rs
pub fn hello() -> String {
    "Hello".to_string()
}
```

```rust
// greetings/vietnamese.rs
pub fn hello() -> String {
    "Xin chào".to_string()
}
```

```rust
// my_module.rs
// main.rs
mod greetings;

fn main() {
    println!("{}", greetings::english::hello());
    println!("{}", greetings::vietnamese::hello());
}
```

```rust
use greetings::english;
use greetings::vietnamese;

fn main() {
    println!("{}", english::hello());
    println!("{}", vietnamese::hello());
}
```

## Functions

### Macros

Macros trong Rust cho phép bạn viết code có thể viết code khác (metaprogramming), cho phép tái sử dụng code một cách linh hoạt.

```rust
macro_rules! say_hello {
    () => {
        println!("Hello");
    };
}

say_hello!();
```

### Functions

```rust
fn greet(name: &str) {
    println!("Hello, {}!", name);
}
```

```rust
fn function(i: i32) -> i32 { i + 1 }
```

### Implementing Functionality

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Phương thức này sẽ trả về diện tích của hình chữ nhật
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // Phương thức này kiểm tra xem hình chữ nhật này có thể chứa một hình chữ nhật khác hay không
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    // Hàm liên kết (associated function) không lấy `self` làm tham số đầu vào
    // Có thể gọi nó bằng cách sử dụng cú pháp `::`
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };
    let square = Rectangle::square(10);

    println!("Diện tích hình chữ nhật là: {}", rect1.area());
    println!("rect1 có thể chứa rect2? {}", rect1.can_hold(&rect2));
    println!("Kích thước của square là: {} x {}", square.width, square.height);
}
```

### Generics & Functions

```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list.iter() {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    let result = largest(&numbers);
    println!("The largest number is {}", result);

    let chars = vec!['y', 'm', 'a', 'q'];
    let result = largest(&chars);
    println!("The largest char is {}", result);
}
```

## Ownership

### Ownership & Lifetimes

Lifetime 'a đảm bảo rằng dữ liệu mà tham chiếu trỏ tới không bị giải phóng trước khi tham chiếu kết thúc. Rust yêu cầu bạn phải xác định lifetimes khi tham chiếu có thể sống lâu hơn dữ liệu chúng trỏ tới.

```rust
fn main() {
    let string1 = String::from("long string is long");
    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is {}", result);
    }
}

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

### Smart Pointer

```rust
use std::rc::Rc;

let five = Rc::new(5);
let five2 = five.clone();
```

`Rc<T>` là một smart pointer cho phép nhiều ownership trên heap, sử dụng reference counting để quản lý bộ nhớ.

## Traits

Trong Rust, trait là một cách để định nghĩa các hành vi (chức năng) mà các kiểu dữ liệu khác nhau có thể chia sẻ. Nó tương tự như interface trong các ngôn ngữ khác.

```rust
trait Speak {
    fn speak(&self);
}

struct Dog {
    name: String,
}

impl Speak for Dog {
    fn speak(&self) {
        println!("{} says Woof!", self.name);
    }
}

fn main() {
    let dog = Dog { name: String::from("Buddy") };
    dog.speak();
}
```

### Implementing the Default trait

Default là một trait trong Rust cho phép định nghĩa một giá trị mặc định cho một kiểu dữ liệu.

```rust
#[derive(Debug)]
struct Book {
    title: String,
    author: String,
}

impl Default for Book {
    fn default() -> Self {
        Book {
            title: String::from("Unknown"),
            author: String::from("Unknown"),
        }
    }
}

fn main() {
    let book = Book::default();
    println!("{:?}", book);
}
```

### Trait Objects

```rust
trait Animal {
    fn make_sound(&self);
}

struct Dog;

impl Animal for Dog {
    fn make_sound(&self) {
        println!("Woof!");
    }
}

fn make_animal_sound(animal: &dyn Animal) {
    animal.make_sound();
}
```

dyn Animal là một trait object, cho phép chúng ta gọi hàm trên các kiểu dữ liệu khác nhau mà chúng cùng triển khai trait Animal. Điều này tăng tính linh hoạt nhưng có trade-off là giảm hiệu suất do động cấp phát và vtable lookup.

## Other

### Customer Error Types

```rust
enum MyError {
    Io(std::io::Error),
    Num(std::num::ParseIntError),
}

fn read_number() -> Result<i32, MyError> {
    let mut line = String::new();
    std::io::stdin().read_line(&mut line).map_err(MyError::Io)?;
    let num: i32 = line.trim().parse().map_err(MyError::Num)?;
    Ok(num)
}
```

### Testing

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
```

### Gathering User Input

```rust
use std::io;

fn main() {
    let mut input = String::new();

    println!("Please enter some text:");

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    println!("You typed: {}", input);
}
```

## Concurrency

### Thread

Rust cho phép tạo các luồng mới sử dụng thread::spawn. join đợi cho luồng kết thúc.

```rust
use std::thread;

let handle = thread::spawn(|| {
    for _ in 0..10 {
        println!("Hello from a thread!");
    }
});

handle.join().unwrap();
```

### Channels

Channels trong Rust bao gồm transmitter (tx) và receiver (rx), cho phép truyền dữ liệu giữa các threads.

```rust
use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    tx.send(10).unwrap();
});

println!("Received: {}", rx.recv().unwrap());
```

### Mutex

Mutex cho phép truy cập an toàn đến dữ liệu từ nhiều threads bằng cách đảm bảo rằng chỉ một thread có thể truy cập dữ liệu tại một thời điểm.

```rust
use std::sync::Mutex;

let m = Mutex::new(5);

{
    let mut num = m.lock().unwrap();
    *num = 6;
}
```
