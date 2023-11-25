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

**Use Case**:

- Tính Toán Song Song: Khi bạn cần thực hiện các tác vụ tính toán phức tạp mà có thể chia nhỏ và thực hiện song song, như xử lý ảnh hoặc tính toán khoa học.
- Tối Ưu Hiệu Suất CPU Đa Lõi: Khi bạn muốn tận dụng tối đa sức mạnh của CPU đa lõi bằng cách phân phối các tác vụ tính toán tới các luồng khác nhau.
- Trao Đổi Dữ Liệu Nhanh Chóng: Khi cần trao đổi dữ liệu giữa các luồng một cách nhanh chóng và hiệu quả thông qua SharedArrayBuffer.

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
worker1.on("error", (error) => {
  console.error(error);
});
worker1.on("exit", (code) => {
  if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
});
worker1.postMessage("Dữ liệu cho Worker 1");

// Tạo Worker Thread thứ hai
const worker2 = new Worker("./src/worker-thread/child-thread.js");
worker2.on("message", (message) =>
  console.log("Tin nhắn từ Worker 2:", message)
);
worker2.postMessage("Dữ liệu cho Worker 2");
```

## Child Process

Theo mô hình trên thì child process là việc chúng ta tách từ 1 process chính ra 1 process con khác và chạy độc lập kể cả khi process chính đã xong hoặc ngủm. Nhưng mà tại sao đã có worker-thread này lại thêm child-process?

Bản chất cả 2 cũng khá khác nhau, child-process thì tạo ra 1 process khác có bộ nhớ riêng, biến môi trường riêng và không ảnh hưởng nhau, trong process chính còn worker thread thì tạo ra 1 thread khác nhưng vẫn tồn tại trên process chính.

Tuy nhiên nó cũng sẽ có một vài rũi ro nhất định như là: ảnh hưởng IPC, child process không kết thúc hay là việc khởi tạo quá nhiều process do code cũng sẽ ảnh hưởng khá nhiều đến việc sủ dụng quá nhiều tài nguyên CPU server.

Đây là một ví dụ xem thửu child process hoạt động

```js
const { spawn } = require("child_process");

// Khởi tạo child process để thực hiện một tác vụ (ví dụ: sleep trong bash)
const child = spawn("sleep", ["5"]); // 'sleep 5' là lệnh để chờ 5 giây

// Lắng nghe sự kiện khi child process kết thúc
child.on("exit", function (code, signal) {
  console.log("Child process exited with code", code);
});

// Main process ghi ra console ngay lập tức
console.log("Main process logged this message first.");
```

Một ví dụ về child process với IPC (Inter-Process Communication)

```js
const { fork } = require("child_process");

const child = fork("path/to/child_script.js");

// Gửi tin nhắn từ parent process đến child process
child.send({ hello: "world" });

// Nhận tin nhắn từ child process
child.on("message", (message) => {
  console.log("Message from child", message);
});

// Trong child script
process.on("message", (message) => {
  console.log("Message from parent:", message);

  // Gửi tin nhắn trở lại parent process
  process.send({ foo: "bar" });
});
```

Một ví dụ khác về thư thi mã linux

```js
const { exec } = require("child_process");

// Thực thi một lệnh Linux
exec("ls", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
});
```

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/child-process.jpg)

**Use Case**:

- Thực Hiện Tác Vụ Độc Lập: Khi bạn cần thực hiện tác vụ không liên quan trực tiếp tới logic chính của ứng dụng của bạn, như việc chạy một script shell hoặc giao tiếp với các ứng dụng khác.
- Xử Lý Tác Vụ Nặng: Khi một tác vụ cần nhiều tài nguyên CPU hoặc bộ nhớ và bạn không muốn nó ảnh hưởng tới tiến trình chính.
- Cô Lập Tác Vụ: Đối với các tác vụ mà bạn muốn cô lập hoàn toàn với môi trường của tiến trình chính, như xử lý dữ liệu nhạy cảm.

## Cluster trong Node.js

(Tác giả lười...)

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/cluster.jpg)

**Use Case**:

- Xử Lý Công Việc Song Song ở Cấp Độ Tiến Trình: Khi bạn muốn phân phối các yêu cầu mạng tới nhiều tiến trình con để tăng hiệu suất xử lý và khả năng chịu tải.
- Tăng Khả Năng Chịu Lỗi: Khi một tiến trình con gặp sự cố và cần khởi động lại, các tiến trình khác trong cluster vẫn có thể tiếp tục xử lý yêu cầu.
- Phân Phối Tải Trong Ứng Dụng Web: Sử dụng cluster trong một ứng dụng web có lưu lượng truy cập cao để phân phối tải giữa các tiến trình và tối ưu hiệu suất.

### PM2

(Tác giả lười...)

## Tóm tắt

- **Child Process**: Tốt cho việc cô lập và chạy tác vụ độc lập hoặc tương tác với các tiến trình khác bên ngoài.
- **Worker Threads**: Phù hợp cho việc xử lý song song và tối ưu hiệu suất trên các máy tính có CPU đa lõi.
- **Cluster**: Lý tưởng cho việc xử lý nhiều yêu cầu mạng song song, tăng khả năng chịu tải và khả năng chịu lỗi cho ứng dụng.

## Nguồn

- Một cuốn sách khá hay nói về việc quản lý thread và process là
  [Go Advanced - ZaloPay](https://zalopay-oss.github.io/go-advanced/ch1-basic/ch1-05-concurrency-parallelism.html), đây là cuốn sách về Golang do team ZaloPay public, dù không dính về Node.js nhưng về Process và Thread thì rất đầy đủ
