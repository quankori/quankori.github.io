---
title: Process and Thread
---

## Concept

**Process**: Một tiến trình (process) là một đơn vị độc lập chứa một chương trình đang được thực thi và các tài nguyên của nó. Mỗi tiến trình có không gian địa chỉ riêng, và một tiến trình không thể truy cập trực tiếp vào không gian địa chỉ của một tiến trình khác (trừ khi sử dụng cơ chế IPC).

IPC viết tắt của Inter-Process Communication (Giao tiếp giữa các tiến trình). Đây là một tập hợp các phương pháp cho các tiến trình khác nhau để giao tiếp với nhau. IPC được sử dụng cả trong môi trường hệ thống đơn và đa hệ thống, cho phép các tiến trình chia sẻ dữ liệu, tín hiệu hoặc tin nhắn một cách cùng phối hợp và an toàn.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/2.png)

**Thread**: Đó là đơn vị nhỏ nhất của mã được thực thi. Một tiến trình có thể chứa nhiều luồng (threads). Tất cả các luồng trong cùng một tiến trình chia sẻ không gian địa chỉ của tiến trình đó, làm cho việc chia sẻ dữ liệu giữa các luồng dễ dàng hơn. Tuy nhiên, điều này cũng mang đến những thách thức về đồng bộ hóa.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/6.png)

## Child Processes:

Trong Node.js, khi bạn muốn thực thi một lệnh hệ thống, bạn có thể sử dụng mô-đun `child_process`. Mô-đun này cho phép bạn chạy các lệnh hệ thống, quản lý các tiến trình con và giao tiếp với chúng, khi bạn muốn thực thi một lệnh hệ thống hoặc cần tách logic trong một tiến trình hoàn toàn riêng biệt.

```js
const { exec } = require("child_process");

exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`Output: ${stdout}`);
  console.error(`Errors: ${stderr}`);
});
```

```js
const { fork } = require("child_process");

const child = fork("./child-script.js");

child.on("message", (msg) => {
  console.log("Message from child:", msg);
});

child.send({ hello: "world" });
```

In file `child-script.js`

```js
process.on("message", (msg) => {
  console.log("Message from parent:", msg);
  process.send({ msg: "Hello from child!" });
});
```

Khi bạn tạo một tiến trình con, bạn đang khởi chạy một tiến trình hệ thống hoàn toàn mới. Trong môi trường Unix, điều này thường được thực hiện bằng cách sử dụng lệnh fork().

fork(): Đây là một lệnh hệ thống được sử dụng để tạo một bản sao của tiến trình hiện tại. Lệnh này trả về hai lần: một lần cho tiến trình gốc (cha) và một lần cho tiến trình con. Trong Node.js, fork() giúp tạo một tiến trình con mới của Node.js và thiết lập một kênh giao tiếp IPC giữa chúng.

spawn() và exec(): Cả hai phương thức này đều tạo ra một tiến trình con, nhưng chúng khác nhau về giao tiếp và quản lý đầu ra. spawn() trả về một luồng (stream) và phù hợp để xử lý các ứng dụng có lượng dữ liệu lớn. exec() trả về toàn bộ đầu ra dưới dạng một chuỗi khi tiến trình con kết thúc.

IPC (Inter-Process Communication - Giao tiếp giữa các tiến trình) là một cơ chế cho phép hai (hoặc nhiều) tiến trình giao tiếp và chia sẻ dữ liệu với nhau.

## Worker Threads:

Bắt đầu từ phiên bản Node.js 10.5.0, một mô-đun mới được giới thiệu có tên là `worker_threads`. Nó cung cấp một cách để tạo ra các luồng (threads), giúp thực hiện tính toán song song dễ dàng hơn trong môi trường Node.js, khi bạn cần tăng hiệu suất tính toán bằng cách tận dụng các lõi CPU không sử dụng và bạn muốn giữ tất cả logic trong cùng một tiến trình.

```js
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  // This is the main thread

  const worker = new Worker(__filename); // Start a new worker with this file

  worker.on("message", (msg) => {
    console.log("Message from worker:", msg);
  });

  worker.postMessage("Hello Worker!");
} else {
  // This is the worker thread

  parentPort.on("message", (msg) => {
    console.log("Message from main thread:", msg);
    parentPort.postMessage("Hello Main Thread!");
  });
}
```

Node.js mặc định chạy trên một luồng duy nhất, sử dụng vòng lặp sự kiện để xử lý các hoạt động bất đồng bộ. Tuy nhiên, một số tác vụ, đặc biệt là các tác vụ tính toán, có thể chặn vòng lặp sự kiện, làm giảm hiệu suất.

Đó là lúc worker_threads xuất hiện:

- Khi bạn tạo một Worker, một luồng mới được tạo ra, chạy song song với luồng chính.
- Mỗi worker có vòng lặp sự kiện và ngữ cảnh riêng của nó, có nghĩa là chúng hoạt động độc lập và không chia sẻ trạng thái.
- Workers có thể giao tiếp với luồng chính và lẫn nhau bằng cơ chế truyền thông điệp.
- Các đối tượng như ArrayBuffer có thể được chia sẻ giữa các luồng, nhưng việc chia sẻ dữ liệu giữa các luồng yêu cầu cẩn trọng để tránh vấn đề như tình trạng cạnh tranh (race conditions).

Nói chung, "child processes" thích hợp khi bạn cần tách biệt hoàn toàn hoặc khi chạy các tác vụ độc lập với Node.js. Trong khi đó, "worker threads" hữu ích khi bạn muốn tận dụng tất cả các lõi trên CPU mà không cần phải khởi động nhiều phiên bản của Node.js.

## Cluster mode

Chế độ cụm (Cluster mode) là một tính năng trong Node.js cho phép bạn tạo nhiều tiến trình con để chạy cùng một ứng dụng Node.js trên một máy tính hoặc mạng. Mỗi tiến trình con có thể chạy trên một CPU hoặc lõi riêng biệt, từ đó tận dụng được sức mạnh của các CPU hoặc lõi trong hệ thống.

Trong chế độ cụm, tiến trình chính (master process) có trách nhiệm tạo ra và quản lý các tiến trình con (worker processes). Tiến trình chính chia sẻ các kết nối TCP và UDP với các tiến trình con, cho phép chúng chia sẻ kết nối mạng và xử lý các yêu cầu đồng thời. Khi một yêu cầu được nhận, tiến trình chính phân phối yêu cầu đó tới một trong các tiến trình con đang có sẵn.

```js
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this example, it's an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("Hello from Node.js!");
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

Giải thích:

1. Đầu tiên, chúng ta kiểm tra xem tiến trình hiện tại có phải là tiến trình chính (master process) bằng cách sử dụng cluster.isMaster. Tiến trình chính có trách nhiệm tạo ra các tiến trình con (workers).
2. Nếu đó là tiến trình chính, chúng ta tạo ra bao nhiêu tiến trình con (workers) tương ứng với số lõi CPU sử dụng cluster.fork().
3. Chúng ta thiết lập một trình lắng nghe sự kiện trên tiến trình chính để lắng nghe sự kiện exit. Sự kiện này được kích hoạt khi một tiến trình con chết đi.
4. Nếu đó không phải là tiến trình chính (nghĩa là nó là một tiến trình con), chúng ta thiết lập một máy chủ HTTP lắng nghe trên cổng 8000 và phản hồi với chuỗi "Hello from Node.js!".

Ở đây, chúng ta sử dụng cluster để tạo nhiều tiến trình con chạy cùng một ứng dụng, tận dụng sức mạnh của nhiều lõi CPU. Khi một tiến trình con kết thúc hoặc bị tắt, tiến trình chính có thể tạo lại một tiến trình con mới để đảm bảo sẽ luôn có các tiến trình con sẵn sàng để xử lý các yêu cầu.
