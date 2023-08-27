---
title: Callbacks in Node.js
---

## Concept

Callback là một khái niệm cơ bản trong lập trình bất đồng bộ trong Node.js. Chúng cho phép thực hiện các hoạt động không chặn, có thể cải thiện đáng kể hiệu suất cho các nhiệm vụ liên quan đến I/O. Tuy nhiên, do sự lồng ghép tiềm năng của callback, việc nhận thức và quản lý "callback hell" là rất quan trọng, sử dụng các mẫu hoặc các tính năng ngôn ngữ mới để đảm bảo mã có thể bảo trì và dễ đọc.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/7.png)

## Promise

Một Promise trong JavaScript đại diện cho một giá trị có thể có sẵn ngay bây giờ, trong tương lai hoặc không bao giờ. Nó cho phép bạn viết mã bất đồng bộ theo một cách đồng bộ hơn. Promise có ba trạng thái:

**Pending**: Trạng thái ban đầu; promise chưa được thực hiện hoặc bị từ chối.

**Fulfilled**: Hoạt động đã được thực hiện thành công.

**Rejected**: Hoạt động thất bại

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 2000);
});

myPromise.then((result) => {
  console.log(result); // "Promise resolved"
});
```

### Các loại Promise khác

`Promise.race` và `Promise.any` cùng là các phương thức của đối tượng Promise trong JavaScript, nhưng chúng có mục đích và cách hoạt động khác nhau. Tương tự, `Promise.all` và `Promise.allSettled` cũng là hai phương thức khác nhau trong việc xử lý nhiều Promise. Dưới đây là sự so sánh giữa chúng:

- `Promise.race` vs. `Promise.any`:

**Promise.race**: Phương thức này nhận vào một mảng các Promise và trả về Promise mới. Promise này sẽ được giải quyết hoặc bị từ chối ngay khi một Promise trong mảng được giải quyết hoặc từ chối. Kết quả của Promise.race sẽ là kết quả của Promise đầu tiên hoàn thành.

**Promise.any**: Đây là một phương thức mới được giới thiệu trong ES2021. Promise.any cũng nhận vào một mảng các Promise và trả về một Promise mới. Promise này sẽ được giải quyết ngay khi một Promise trong mảng được giải quyết. Tuy nhiên, nếu tất cả các Promise đều bị từ chối, Promise này sẽ bị từ chối và trả về một lỗi chứa mảng các lỗi từ các Promise đã bị từ chối.

- `Promise.all` vs. `Promise.allSettled`:

**Promise.all**: Phương thức này nhận vào một mảng các Promise và trả về một Promise mới. Promise này chỉ được giải quyết khi tất cả các Promise trong mảng đều được giải quyết. Kết quả của Promise.all là một mảng các kết quả tương ứng với các Promise trong mảng ban đầu.

**Promise.allSettled**: Đây là một phương thức khác được giới thiệu trong ES2020. Promise.allSettled cũng nhận vào một mảng các Promise và trả về một Promise mới. Promise này sẽ được giải quyết sau khi tất cả các Promise trong mảng đã được giải quyết hoặc bị từ chối. Kết quả của Promise.allSettled là một mảng các đối tượng mô tả tình trạng của từng Promise, bất kể là đã giải quyết hay từ chối.

Tóm lại:

Promise.race và Promise.any liên quan đến việc xử lý kết quả từ nhiều Promise nhưng có cách hoạt động và ứng xử khác nhau khi có Promise bị từ chối.
Promise.all và Promise.allSettled đều liên quan đến việc chờ đợi kết quả từ nhiều Promise, nhưng Promise.all bị từ chối khi có ít nhất một Promise bị từ chối, trong khi Promise.allSettled trả về một mảng tình trạng của tất cả Promise dù có bị từ chối hay không.

## Async/Await

async/await được xây dựng dựa trên promises và cung cấp cú pháp dễ đọc và sạch hơn để xử lý các hoạt động bất đồng bộ. Một hàm được khai báo với từ khóa async luôn luôn trả về một promise.

**async**: Từ khóa này được sử dụng để khai báo một hàm bất đồng bộ.

**await**: Từ khóa này chỉ có thể được sử dụng bên trong một hàm async và được sử dụng để tạm dừng việc thực thi của hàm async cho đến khi promise được giải quyết hoặc bị từ chối.

```js
async function fetchData() {
  let response = await fetch("https://api.example.com/data");
  let data = await response.json();
  console.log(data);
}
fetchData();
```
