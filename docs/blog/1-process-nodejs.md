---
title: Process và Thread trong Node.js
---

Sau khi trải qua n lần phỏng vấn cho vị trí Node.js Developer, tôi đã gặp nhiều câu hỏi xoay quanh các vấn đề như Event Loop, Scope, Non Blocking I/O, Asynchronous,... Đây là những câu hỏi phổ biến khi phỏng vấn cho vị trí Node.js Developer. Tuy nhiên, ngoài những câu hỏi đó, còn có một số câu hỏi khiến tôi tò mò về cách quản lý và mở rộng **thread**, **process** trong Node.js. Tôi từng nghe và tìm hiểu về các khái niệm **Cluster**, **Child Process** và **Worker Threads** trong các bài blog, nhưng thực tế thì tôi ít khi được áp dụng và hiểu về cơ chế đặc biệt này của Node.js. 😂

Tuy nhiên, để hiểu rõ sức mạnh của Node.js trong việc này, chúng ta cần bắt đầu từ những khái niệm căn bản: **Process** và **Thread** trong lập trình. Cả hai đều là nền tảng cơ bản cho bất kỳ hệ thống xử lý đa tác vụ nào, và hiểu biết vững chắc về chúng sẽ giúp ta khám phá sâu hơn về cách Node.js sử dụng chúng để tối ưu hiệu suất và không chỉ giới hạn ở Node.js còn nhiều ngôn ngữ lập trình khác cũng xoay quanh về này.

## Khái niệm về Process và Thread

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/8.PNG)

### Process

Như trên hình, Process bao gồm các phần Thread và Memory. Process đại diện cho 1 tiến trình diễn ra, tiến trình ở đây có thể hình dung khi bạn mở 1 trình duyệt hoặc chạy một chương trình thì lúc này tạo ra một tiến trình.

Các thành phần của 1 tiến trình (Process) khi chạy được hệ điều hành cấp:

- Mã định danh tiến trình gọi là PID.
- Ít nhất một main thread cho process, main thread tắt thì process cũng tắt theo.
- Vùng nhớ cho Process, như trong hình là phần màu trắng. Với bộ nhớ chung là Heap (phần màu xanh dương)

### Thread

Thread là một luồng trong tiến trình, như trong hình thì trong các thread sẽ có hai thành phần chính là:

- **Registers** có thể hiểu là nơi lưu trữ biến tạm thời khi thực thi thread
- **Stack** là vùng nhớ trong thread được cấp khoảng 1-2 MB

Và ngoài ra các thread sẽ xài chung vùng bộ nhớ chung là Heap (vùng xanh dương). Tuy nhiên, khi quản lý multi thread chúng ta sẽ gặp một số thuật vấn đề sau:

- Khi process tạo quá nhiều thread sẽ bị lỗi **stack overflow**
- Khi thread sử dụng chung bộ nhớ Heap bị xung đột dữ liệu sẽ xảy ra lỗi **race condition**
- Số lượng thread chạy song song một thời điểm sẽ bằng số lượng CPU mà chúng ta đang có => nhiều thread không giúp nhanh hơn. Thường sẽ là số thread chạy song song = số core CPU \* 2 🧐

## Worker Threads là gì

Trong một số khái niệm cốt lõi của Node.js, một thời gian dài nó được xem là một môi trường đơn luồng (single thread). Tuy nhiên, từ phiên bản 10.5 trở đi, Node.js đã giới thiệu tính năng `worker_thread` và từ phiên bản 12, tính năng này đã trở thành ổn định. Điều này đã mở ra cánh cửa cho một sự cải tiến mới về việc sử dụng đa luồng (multi-thread) trong Node.js.

Nhưng tại sao lại cần tính năng đa luồng (worker_thread) khi Node.js đang có ưu điểm là đơn luồng?

Trước khi nói về lợi ích của worker_thread, chúng ta hãy xem xét các hạn chế và điểm yếu của việc sử dụng đơn luồng. Dù thực hiện các tác vụ không đồng bộ (non-blocking) giúp định hình sức mạnh của đơn luồng, nhưng nó vẫn bị giới hạn trong việc xử lý các tác vụ nặng về CPU. Điều này có thể gây ảnh hưởng tới hiệu suất của Event Loop bằng cách làm chậm hoặc chặn nó. Vì vậy, worker_thread ra đời nhằm khắc phục hạn chế này bằng cách tạo ra những luồng riêng biệt, giúp giảm tải cho Event Loop chính và cải thiện hiệu suất.

Khi được tạo ra, mỗi luồng trong worker_thread sẽ có một vùng nhớ stack và heap riêng, giúp tránh các lỗi liên quan đến `stack overflow`. Thông qua việc truyền tin nhắn (message passing), các luồng này có thể tương tác với nhau mà không gặp những vấn đề thông thường của đa luồng như deadlocks hay race conditions. Tuy nhiên, quá trình chuyển đổi ngữ cảnh (`context switching`) giữa các luồng cũng có thể làm giảm hiệu suất khi có quá nhiều luồng được tạo ra.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/worker-thread.jpg)

Một ví dụ về Worker Threads trong bài toán nén file

`child-thread.js`

```js
const { parentPort } = require("worker_threads");
const JSZip = require("jszip");
const fs = require("fs");
const path = require("path");

parentPort.on("message", async () => {
  const imagesDirectory = path.join(__dirname, "images");
  const zip = new JSZip();

  fs.readdirSync(imagesDirectory).forEach((file) => {
    const filePath = path.join(imagesDirectory, file);
    const data = fs.readFileSync(filePath);
    zip.file(file, data);
  });

  const zipData = await zip.generateAsync({ type: "nodebuffer" });
  fs.writeFileSync(path.join(__dirname, "output.zip"), zipData);
  parentPort.postMessage("File zip đã được tạo: output.zip");
});
```

`main-thread.js`

```js
const { Worker } = require("worker_threads");

// Tạo Worker Thread thứ nhất
const worker1 = new Worker("./src/worker-thread/child-thread.js");
worker1.on("message", (message) =>
  console.log("Tin nhắn từ Worker 1:", message)
);
worker1.postMessage("Dữ liệu cho Worker 1");

// Tạo Worker Thread thứ hai
const worker2 = new Worker("./src/worker-thread/child-thread.js");
worker2.on("message", (message) =>
  console.log("Tin nhắn từ Worker 2:", message)
);
worker2.postMessage("Dữ liệu cho Worker 2");
```

## Child Process

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/child-process.jpg)

## Cluster trong Node.js

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/cluster.jpg)

## Tóm tắt

## Nguồn

- Một cuốn sách khá hay nói về việc quản lý thread và process là
  [Go Advanced - ZaloPay](https://zalopay-oss.github.io/go-advanced/ch1-basic/ch1-05-concurrency-parallelism.html), đây là cuốn sách về Golang do team ZaloPay public, dù không dính về Node.js nhưng về Process và Thread thì rất đầy đủ
