---
title: Node.js Concept
---

## Node.js structure

- V8 được sử dụng để thông dịch và thực thi mã JavaScript.
- Libuv được sử dụng để truy cập vào hệ thống tệp và một số khía cạnh của đồng thời.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/3.PNG)

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/4.PNG)

## Node.js Fundamentals

1. **Event Loop & Non-Blocking I/O**: Node.js đạt được tính đồng thời cao bằng cách sử dụng vòng lặp sự kiện kết hợp với I/O không chặn. Trong khi mã JavaScript chạy trên một luồng duy nhất, nhiều hoạt động, đặc biệt là I/O, được gửi đi, cho phép luồng chính xử lý các nhiệm vụ khác mà không cần chờ đợi. Cơ chế này làm cho Node.js hiệu quả cho các ứng dụng liên quan đến I/O.

2. **Worker Threads**: Node.js giới thiệu mô-đun "worker_threads" từ phiên bản 10.5.0, cung cấp khả năng chạy mã JavaScript trong các luồng song song, nâng cao khả năng xử lý nhiệm vụ liên quan đến CPU.

## Single-threaded vs Multi-threaded

### 1. Concurrency Model:

- **Node.js (Single-threaded)**: Dựa vào mô hình sự kiện, I/O không chặn, phù hợp cho các nhiệm vụ liên quan đến I/O. Các nhiệm vụ liên quan đến CPU có thể gặp khó khăn, trừ khi sử dụng luồng công việc (worker threads) hoặc gom cụm (clustering).

- **Other Languages (Multi-threaded)**:Ngôn ngữ như Java hoặc C# sử dụng đa luồng, phù hợp cho cả các nhiệm vụ liên quan đến I/O và CPU. Tuy nhiên, chúng đưa ra các thách t

### 2. Memory Consumption:

- **Node.js**: Thường thấp hơn do không cần nhiều luồng cho mỗi kết nối. Tuy nhiên, cần đảm bảo vòng lặp sự kiện không bị chặn để duy trì hiệu suất.

- **Multi-threaded Languages**: Có thể có kích thước lớn hơn vì mỗi luồng duy trì một ngăn xếp riêng, nhưng có thể phân phối các nhiệm vụ liên quan đến CPU một cách hiệu quả.

### 3. Complexity:

- **Node.js**: Thường đơn giản hơn về quản lý đồng thời. Trong hầu hết các tình huống, không cần phải quản lý đồng bộ hóa luồng. Vấn đề chính là tránh chặn vòng lặp sự kiện.

- **Multi-threaded Languages**: Có thể phức tạp do quản lý luồng tường minh, các vấn đề đồng bộ hóa luồng và nguy cơ tắc nghẽn tiềm tàng.

### 4. Scalability:

- **Node.js**: Mở rộng theo chiều ngang bằng cách thêm nhiều phiên bản. Điều này có thể thực hiện thông qua các công cụ như mô-đun gom cụm (cluster module) hoặc các tiện ích triển khai hộp điều khiển (container orchestration).

- **Multi-threaded Languages**: Có thể mở rộng cả theo chiều dọc (thêm luồng) và chiều ngang (thêm máy).

Node.js thực sự có thể hoạt động theo cách đa luồng với mô-đun "worker_threads". Tuy nhiên, thiết kế chính của nó là đơn luồng. Việc triển khai nhiều luồng trong Node.js đưa ra các thách thức điển hình của lập trình đa luồng trong các ngôn ngữ khác.

## Event loop

- Khi gửi một yêu cầu bất đồng bộ, như yêu cầu HTTP, Node.js không đợi yêu cầu đó hoàn thành trước khi tiếp tục thực thi các yêu cầu khác. Thay vào đó, Node.js gửi yêu cầu đó tới hệ thống và tiếp tục thực thi các yêu cầu khác. Khi yêu cầu đó hoàn thành, hệ thống thông báo cho Node.js rằng yêu cầu đã hoàn thành, và Node.js tiếp tục thực thi các nhiệm vụ khác.

- Các nhiệm vụ trong vòng lặp sự kiện được xếp hàng trong các hàng đợi khác nhau, bao gồm:

  - Task queue (also known as a callback queue): Chứa các hàm callback được gọi khi một yêu cầu bất đồng bộ kết thúc.

  - Microtask queue: Chứa các hàm callback được gọi khi một promise được giải quyết hoặc bị từ chối.

  - Timers queue: Chứa các hàm callback được gọi khi một thời gian hoặc hẹn giờ (timeout hoặc interval) được kích hoạt.

- Khi vòng lặp sự kiện bắt đầu, nó thực thi các nhiệm vụ trong hàng đợi microtask trước, sau đó là hàng đợi nhiệm vụ, và cuối cùng là hàng đợi timers.

- Khi một nhiệm vụ được thực thi, Node.js đặt nó vào một vòng lặp vô tận để đợi các nhiệm vụ khác. Trong lúc đợi, Node.js tiếp tục thực thi các nhiệm vụ trong hàng đợi vòng lặp sự kiện.

## process.nextTick() and setImmediate() in Event Loop

Trong Node.js, cả process.nextTick() và setImmediate() được sử dụng để lên lịch thực thi một hàm callback sau khi giai đoạn hiện tại của vòng lặp sự kiện hoàn thành. Tuy nhiên, chúng hoạt động trong các phần khác nhau của vòng lặp.

### process.nextTick()

**Description**: Lên lịch một hàm callback được gọi sau khi giai đoạn hiện tại của vòng lặp sự kiện hoàn thành và trước bất kỳ hoạt động I/O nào diễn ra.

**Operation**: Hàm callback được thêm vào một hàng đợi đặc biệt được gọi là "nextTick queue," và sẽ được thực thi sau mỗi giai đoạn của vòng lặp sự kiện. Điều này có nghĩa là nếu bạn tiếp tục thêm các hàm vào hàng đợi "nextTick," vòng lặp sự kiện có thể bị mắc kẹt trong giai đoạn hiện tại, và các hoạt động khác (như I/O) có thể bị trì hoãn.

```js
console.log("Start");

process.nextTick(() => {
  console.log("Next Tick");
});

console.log("End");
```

Output

```js
Start
End
Next Tick
```

### setImmediate()

**Description**: Lên lịch một hàm callback để thực thi trong giai đoạn "check" của vòng lặp sự kiện sau khi các sự kiện I/O được xử lý.

**Operation**: Hàm callback được thêm vào một hàng đợi riêng và sẽ được thực thi sau khi tất cả các sự kiện I/O được xử lý.

```js
console.log("Start");

setImmediate(() => {
  console.log("Immediate");
});

console.log("End");
```

Output

```js
Start;
End;
Immediate;
```

Tuy nhiên, thứ tự giữa Next Tick và Immediate không được đảm bảo trong mọi tình huống, đặc biệt khi chúng được gọi từ một chu kỳ I/O. Nhưng nếu chạy trong ngữ cảnh không có I/O, process.nextTick() luôn luôn được thực thi trước setImmediate().

Trong thực tế, khi bạn cần lên lịch một hàm chạy sau khi ngăn xếp hiện tại hoàn thành nhưng trước bất kỳ hoạt động I/O nào, hãy sử dụng process.nextTick(). Khi bạn muốn lên lịch một hàm chạy sau tất cả các hoạt động I/O, hãy sử dụng setImmediate().

## Side Effects

Tác động phụ đề cập đến bất kỳ thay đổi có thể quan sát được trong hệ thống do việc thực thi một hàm, ngoại trừ giá trị mà hàm trả về. Điều này có thể là bất kỳ thứ gì, từ thay đổi biến toàn cục, thực hiện yêu cầu mạng, thao tác DOM, ghi vào tệp, hoặc in ra console, và còn nhiều hơn nữa.

Tác động phụ không phải lúc nào cũng xấu và thường cần thiết (ví dụ, chúng ta cần tác động phụ để cập nhật giao diện người dùng hoặc lưu dữ liệu vào cơ sở dữ liệu). Tuy nhiên, các hàm có tác động phụ thường khó kiểm tra, gỡ lỗi và lập luận hơn so với các hàm thuần túy, không có tác động phụ.

```ts
let counter: number = 0;
function increment(): void {
  counter++; // This is a side effect as it modifies an external variable.
}
```

## State Mutation

Thay đổi trạng thái đề cập đến việc sửa đổi trực tiếp hoặc thay đổi trạng thái của cấu trúc dữ liệu. Trong các ngôn ngữ như JavaScript và TypeScript, đối tượng và mảng thường là biến đổi theo mặc định, có nghĩa là các thuộc tính và phần tử của chúng có thể được thay đổi trực tiếp sau khi chúng được tạo.

Thay đổi trạng thái có thể dẫn đến hành vi không dự đoán được, đặc biệt trong các ứng dụng lớn hoặc khi sử dụng một số mô hình lập trình như lập trình hàm. Đây là lý do tại sao các thư viện như Redux nhấn mạnh về tầm quan trọng của việc xem xét trạng thái là bất biến và thực hiện thay đổi thông qua các bản sao thay vì thay đổi trực tiếp.

```ts
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice",
  age: 25,
};

user.age = 26; // This is a state mutation.
```
