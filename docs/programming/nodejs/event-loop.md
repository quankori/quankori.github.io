---
title: Event Loop
---

## Concept

- Khi gửi một yêu cầu bất đồng bộ, như yêu cầu HTTP, Node.js không đợi yêu cầu đó hoàn thành trước khi tiếp tục thực thi các yêu cầu khác. Thay vào đó, Node.js gửi yêu cầu đó tới hệ thống và tiếp tục thực thi các yêu cầu khác. Khi yêu cầu đó hoàn thành, hệ thống thông báo cho Node.js rằng yêu cầu đã hoàn thành, và Node.js tiếp tục thực thi các nhiệm vụ khác.

- Các nhiệm vụ trong vòng lặp sự kiện được xếp hàng trong các hàng đợi khác nhau, bao gồm:

  - Task queue (also known as a callback queue): Chứa các hàm callback được gọi khi một yêu cầu bất đồng bộ kết thúc.

  - Microtask queue: Chứa các hàm callback được gọi khi một promise được giải quyết hoặc bị từ chối.

  - Timers queue: Chứa các hàm callback được gọi khi một thời gian hoặc hẹn giờ (timeout hoặc interval) được kích hoạt.

- Khi vòng lặp sự kiện bắt đầu, nó thực thi các nhiệm vụ trong hàng đợi microtask trước, sau đó là hàng đợi nhiệm vụ, và cuối cùng là hàng đợi timers.

- Khi một nhiệm vụ được thực thi, Node.js đặt nó vào một vòng lặp vô tận để đợi các nhiệm vụ khác. Trong lúc đợi, Node.js tiếp tục thực thi các nhiệm vụ trong hàng đợi vòng lặp sự kiện.

## MicroTask và Macro Task

**Microtask Queue (Job Queue)**:

- Các nhiệm vụ microtask là các tác vụ nhẹ và ưu tiên hơn so với các tác vụ khác.
- Các tác vụ microtask bao gồm các promise callbacks, MutationObserver callbacks, và tác vụ đợi của API như process.nextTick trong Node.js.
- Khi call stack trống, các tác vụ trong microtask queue được thực hiện trước.

**Macro Task Queue (Task Queue)**:

- Các nhiệm vụ macro task chậm hơn và ít ưu tiên hơn so với các tác vụ microtask.
- Các tác vụ macro task bao gồm các tác vụ như setTimeout, setInterval, requestAnimationFrame, DOM events, fetch, và các tác vụ gửi mạng.
- Các tác vụ trong macro task queue chỉ được thực hiện khi call stack hoàn toàn trống và không còn tác vụ nào trong microtask queue.

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
