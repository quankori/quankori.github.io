---
title: Worker Thread
---

## Concept

Worker thread là một khái niệm trong lập trình đa luồng (multithreading) và đa tiến trình (multiprocessing), cho phép chạy mã nguồn cùng một thời điểm trên nhiều luồng hoặc tiến trình riêng biệt. Worker threads thường được sử dụng để tận dụng sức mạnh của các CPU đa lõi và để tối ưu hóa hiệu suất chương trình.

Một ví dụ cụ thể về việc sử dụng worker thread để xử lý một tệp có dung lượng lớn là khi bạn cần thực hiện các phép tính phức tạp trên các dữ liệu trong tệp và muốn tận dụng sức mạnh của nhiều luồng hoặc tiến trình để giảm thời gian xử lý.

## Code

Trong ví dụ này, main.js là tệp chính để chạy. Nó tạo một worker thread bằng cách tạo một đối tượng Worker và truyền tên tệp của worker (worker.js) và dữ liệu gửi cho worker. Trong worker thread (worker.js), chúng ta nhận dữ liệu từ workerData, thực hiện một phép biến đổi đơn giản, và sau đó gửi kết quả trở lại cho luồng chính thông qua parentPort.

```js
// main.js
const { Worker, isMainThread } = require("worker_threads");

if (isMainThread) {
  // Chạy trong luồng chính
  console.log("Main thread started.");

  const worker = new Worker("./worker.js", {
    workerData: "Hello from main.js",
  });

  worker.on("message", (message) => {
    console.log(`Received message from worker: ${message}`);
  });

  worker.on("error", (error) => {
    console.error(`Worker error: ${error}`);
  });

  worker.on("exit", (code) => {
    console.log(`Worker exited with code ${code}`);
  });
} else {
  // Chạy trong worker thread
  const workerData = require("worker_threads").workerData;
  console.log(`Worker thread started. Received data: ${workerData}`);

  const result = workerData.toUpperCase();

  // Gửi kết quả về cho luồng chính
  require("worker_threads").parentPort.postMessage(result);
}
```

```js
// worker.js
const { parentPort, workerData } = require("worker_threads");
console.log(`Worker thread started. Received data: ${workerData}`);

const result = workerData.toLowerCase();

// Gửi kết quả về cho luồng chính
parentPort.postMessage(result);
```

Trong Node.js, khi sử dụng worker threads, mỗi worker thread sẽ có một biến toàn cục được gọi là isMainThread để xác định xem mã nguồn hiện tại có chạy trong luồng chính (main thread) hay trong worker thread.

Việc kiểm tra isMainThread trong tệp main.js là cách để xác định xem mã nguồn đang chạy trong luồng chính hay không. Khi bạn chạy tệp main.js, biến isMainThread sẽ có giá trị true, vì bạn đang chạy trong luồng chính. Do đó, bạn có thể sử dụng điều kiện để quyết định các hoạt động cần thực hiện trong luồng chính.

Ví dụ, khi bạn tạo worker thread bằng cách tạo đối tượng Worker trong luồng chính, bạn muốn đảm bảo rằng mã nguồn trong tệp worker.js chỉ được chạy trong worker thread, chứ không phải trong luồng chính. Điều này giúp tách biệt hoạt động của luồng chính và các worker thread.

Do đó, kiểm tra isMainThread trong main.js giúp bạn quản lý và điều chỉnh việc chạy mã nguồn theo cách thích hợp trong môi trường sử dụng worker threads.
