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
