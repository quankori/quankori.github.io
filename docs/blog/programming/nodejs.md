---
title: Node.js
---

## Kiến Trúc Cốt Lõi (Core Architecture)

Node.js không phải là một ngôn ngữ lập trình mới, mà là một môi trường thực thi JavaScript xây dựng trên V8 JavaScript engine của Chrome. Kiến trúc của nó được thiết kế để xử lý hiệu quả các tác vụ I/O.

### Mô Hình Hướng Sự Kiện và Event Loop

Trái tim của Node.js là Event Loop. Nó cho phép Node.js thực hiện non-blocking I/O mặc dù JavaScript là đơn luồng (single-threaded).

#### Cách hoạt động:

1. **Client gửi yêu cầu**: Khi một yêu cầu đến (ví dụ: đọc file, truy vấn database), Node.js đặt yêu cầu đó vào hàng đợi (queue).

2. **Giao cho hệ điều hành**: Node.js không tự mình thực hiện tác vụ I/O. Thay vào đó, nó sử dụng thư viện libuv để giao tác vụ đó cho hệ điều hành (OS). Hệ điều hành có thể sử dụng các cơ chế đa luồng riêng để xử lý hiệu quả.

3. **Tiếp tục xử lý**: Trong khi OS đang xử lý tác vụ I/O, Event Loop không bị chặn. Nó tiếp tục quay vòng, kiểm tra xem có sự kiện nào khác cần xử lý không (ví dụ: yêu cầu mới, timer hết hạn).

4. **Callback được kích hoạt**: Khi OS hoàn thành tác vụ I/O, nó thông báo cho Node.js. Event Loop nhận được thông báo này và đưa hàm callback tương ứng với tác vụ đã hoàn thành vào Poll Queue (hoặc các queue khác tùy pha).

5. T**hực thi Callback**: Khi Call Stack trống, Event Loop lấy callback từ Poll Queue (hoặc các queue khác) và đẩy vào Call Stack để thực thi.

#### Các Pha Chính của Event Loop (theo libuv):

- Timers: Thực thi các callback được lên lịch bởi setTimeout() và setInterval().

- Pending Callbacks: Thực thi các callback I/O bị trì hoãn đến vòng lặp tiếp theo.

- Idle, Prepare: Chỉ sử dụng nội bộ.

- Poll: Truy xuất các sự kiện I/O mới; thực thi các callback liên quan đến I/O (hầu hết các callback, trừ close callbacks, timers, và setImmediate). Node.js có thể chặn ở pha này nếu không có gì khác để làm.

- Check: Thực thi các callback của setImmediate().

- Close Callbacks: Thực thi các callback đóng (ví dụ: socket.on('close', ...)).

### V8 Engine

V8 là engine JavaScript mã nguồn mở hiệu năng cao của Google, được viết bằng C++. Node.js sử dụng V8 để biên dịch mã JavaScript thành mã máy gốc.

- **Call Stack**: Nơi các frame thực thi hàm được đẩy vào và lấy ra (LIFO - Last In, First Out).

- **Memory Heap**: Nơi cấp phát bộ nhớ cho các đối tượng và biến. Garbage Collection (GC) diễn ra ở đây.

### Module System

Node.js có hai hệ thống module chính:

- **CommonJS (CJS)**: Hệ thống module mặc định trong lịch sử Node.js. Sử dụng require() để nhập và module.exports hoặc exports để xuất. Đồng bộ.

- **ES Modules (ESM)**: Chuẩn module chính thức của JavaScript. Sử dụng import và export. Bất đồng bộ. Node.js hỗ trợ ESM thông qua đuôi file .mjs hoặc cấu hình "type": "module" trong package.json.

## Garbage Collection (GC)

GC là quá trình tự động thu hồi bộ nhớ không còn được sử dụng. V8 sử dụng chiến lược Generational Collection:

### Young Generation (Thế hệ trẻ):

Hầu hết các đối tượng được tạo ra ở đây.

Không gian nhỏ, chia thành "from-space" và "to-space".

Sử dụng thuật toán Scavenge (Copying Collector):

- Khi "from-space" đầy, GC bắt đầu.

- Nó quét các đối tượng còn sống trong "from-space".

- Các đối tượng còn sống được sao chép sang "to-space".

- Các đối tượng đã sống sót qua một (hoặc hai) lần Scavenge sẽ được "thăng cấp" lên Old Generation.

- Sau khi sao chép xong, "from-space" và "to-space" đổi vai trò cho nhau.

Quá trình này nhanh nhưng tốn gấp đôi bộ nhớ (do cần 2 space).

### Old Generation (Thế hệ già):

Chứa các đối tượng đã sống sót qua Young Generation hoặc các đối tượng lớn.

Sử dụng thuật toán Mark-Sweep & Mark-Compact:

- Marking (Đánh dấu): Bắt đầu từ các đối tượng gốc (root objects - ví dụ: biến toàn cục, stack), GC duyệt qua đồ thị đối tượng và đánh dấu tất cả các đối tượng có thể truy cập được (còn sống).

- Sweeping (Quét): GC quét qua toàn bộ Heap và thu hồi bộ nhớ của các đối tượng không được đánh dấu (rác).

- Compacting (Nén - tùy chọn): Sau khi quét, bộ nhớ có thể bị phân mảnh. GC di chuyển các đối tượng còn sống lại gần nhau để giảm phân mảnh và cải thiện hiệu quả cấp phát bộ nhớ sau này. Quá trình này tốn thời gian hơn.

GC ở Old Generation diễn ra ít thường xuyên hơn nhưng tốn thời gian hơn ("stop-the-world" - tạm dừng thực thi JavaScript).

## Tối Ưu Hóa Hiệu Năng (Performance Optimization)

**Sử dụng Non-blocking I/O**: Tận dụng tối đa bản chất bất đồng bộ của Node.js. Sử dụng async/await hoặc Promises thay vì các hàm đồng bộ (ví dụ: fs.readFileSync).

**Streams**: Sử dụng streams (fs.createReadStream, fs.createWriteStream) để xử lý dữ liệu lớn mà không cần tải toàn bộ vào bộ nhớ.

**Caching**: Lưu trữ các kết quả tính toán hoặc dữ liệu thường xuyên truy cập (ví dụ: sử dụng Redis, Memcached hoặc caching trong bộ nhớ).

Tối ưu hóa Code:

- Giảm các vòng lặp lồng nhau phức tạp.

- Sử dụng các cấu trúc dữ liệu hiệu quả (ví dụ: Map, Set).

- Tránh cấp phát bộ nhớ không cần thiết trong các vòng lặp hoặc hàm chạy thường xuyên.

**Worker Threads**: Sử dụng worker_threads để chạy các tác vụ nặng về CPU (ví dụ: mã hóa, xử lý ảnh) trên các luồng riêng biệt mà không chặn Event Loop chính.

**Profiling & Monitoring**: Sử dụng các công cụ như node --inspect, Chrome DevTools, clinic.js, New Relic, Datadog để xác định các điểm nghẽn cổ chai (bottlenecks) và rò rỉ bộ nhớ (memory leaks).

Tối ưu hóa GC:

- Tránh tạo quá nhiều đối tượng tồn tại ngắn hạn.

- Sử dụng Object Pooling nếu hợp lý.

**Sử dụng phiên bản Node.js và V8 mới nhất**: Thường xuyên có các cải tiến về hiệu năng.

## Callback, Callback Hell, và Async/Await Chuyên Sâu

### Callbacks

Callback là một hàm được truyền vào một hàm khác như một đối số, và được gọi lại (executed) sau khi một tác vụ nào đó hoàn thành (thường là tác vụ bất đồng bộ).

### Callback Hell (Pyramid of Doom)

Khi có nhiều tác vụ bất đồng bộ phụ thuộc lẫn nhau, việc lồng các callback vào nhau dẫn đến mã khó đọc, khó bảo trì và dễ lỗi.

```js
// Example of Callback Hell (Conceptual)
getData(
  id,
  (data) => {
    processData(
      data,
      (processed) => {
        saveData(
          processed,
          (result) => {
            logResult(
              result,
              (status) => {
                console.log("All done!", status);
              },
              (err) => {
                console.error("Logging failed:", err);
              }
            );
          },
          (err) => {
            console.error("Saving failed:", err);
          }
        );
      },
      (err) => {
        console.error("Processing failed:", err);
      }
    );
  },
  (err) => {
    console.error("Getting data failed:", err);
  }
);
```

### Promises

Promises cung cấp một cách cấu trúc mã bất đồng bộ tốt hơn, tránh Callback Hell bằng cách cho phép "chaining" (nối chuỗi) các hành động .then() và xử lý lỗi tập trung qua .catch().

### Async/Await Chuyên Sâu

async/await là cú pháp được xây dựng trên Promises, giúp viết mã bất đồng bộ trông giống như mã đồng bộ, dễ đọc và dễ hiểu hơn rất nhiều.

- async function: Khai báo một hàm luôn trả về một Promise. Nếu hàm trả về một giá trị không phải Promise, nó sẽ tự động được bọc trong một Promise đã được giải quyết (resolved).

- await operator: Chỉ có thể sử dụng bên trong một async function. Nó tạm dừng việc thực thi của async function cho đến khi Promise theo sau await được giải quyết (settled - resolved hoặc rejected).

  - Nếu Promise được resolved, await trả về giá trị đã resolved.

  - Nếu Promise bị rejected, await ném ra (throws) lỗi đã rejected.

- Cách hoạt động bên dưới (Under the Hood):

async/await thực chất là "syntactic sugar" (cú pháp tiện lợi) cho Generators và Promises. Khi V8 (hoặc trình biên dịch TypeScript/Babel) gặp async function, nó biến đổi hàm đó thành một dạng state machine (máy trạng thái) sử dụng generators (function\* và yield).

1. Khi async function được gọi, nó trả về một Promise ngay lập tức.

2. Khi gặp await somePromise, hàm tạm dừng (yield).

3. Khi somePromise được giải quyết, Event Loop sẽ lên lịch để hàm tiếp tục thực thi từ điểm dừng. Giá trị resolved được trả về từ yield.

4. Nếu somePromise bị reject, lỗi sẽ được ném ra tại điểm await, có thể được bắt bởi try...catch.

5. Khi hàm thực thi xong (return hoặc hết code), Promise mà nó trả về ban đầu sẽ được resolve với giá trị return. Nếu có lỗi không được bắt, Promise sẽ bị reject.

Sự tương tác với Event Loop: await không chặn Event Loop. Nó chỉ tạm dừng việc thực thi của chính hàm async đó. Event Loop vẫn tiếp tục chạy và xử lý các sự kiện khác trong khi chờ Promise được giải quyết. Khi Promise giải quyết, việc tiếp tục thực thi hàm async được đưa vào hàng đợi (Microtask Queue, ưu tiên hơn Macrotask Queue/Callback Queue) và sẽ chạy ngay khi Call Stack trống.

### Scaling trong Node.js

Node.js chạy trên một luồng chính duy nhất. Để tận dụng các hệ thống đa lõi và xử lý tải cao, cần có các chiến lược scaling:

### Child Processes (child_process module)

Cho phép tạo ra các tiến trình (process) con riêng biệt. Mỗi tiến trình con có bộ nhớ và Event Loop riêng.

spawn(): Tốt cho luồng dữ liệu lớn (streams).

exec(): Tốt cho chạy các lệnh shell, có buffer.

execFile(): Tương tự exec nhưng chạy file thực thi trực tiếp, an toàn hơn.

fork(): Một dạng đặc biệt của spawn, tạo ra một tiến trình Node.js mới và cho phép giao tiếp hai chiều qua IPC (Inter-Process Communication). Thường dùng với cluster.

Hữu ích cho việc chạy các script bên ngoài hoặc tách biệt các phần của ứng dụng.

### Worker Threads (worker_threads module)

Cho phép chạy mã JavaScript song song trên các luồng (thread) riêng biệt trong cùng một tiến trình. Các luồng chia sẻ bộ nhớ hiệu quả hơn so với các tiến trình riêng biệt (qua SharedArrayBuffer hoặc postMessage).

Rất lý tưởng cho các tác vụ CPU-bound (tính toán nặng) mà không muốn chặn Event Loop chính.

Không nên dùng cho các tác vụ I/O-bound (Node.js đã tối ưu cho việc này bằng non-blocking I/O trên luồng chính).

### Cluster (cluster module)

Cho phép tạo ra nhiều tiến trình Node.js (workers) cùng lắng nghe trên một cổng mạng (port).

Một Master Process được tạo ra đầu tiên.

Master Process sử dụng cluster.fork() để tạo ra các Worker Processes.

Master Process quản lý việc phân phối các kết nối đến (incoming connections) cho các Worker Processes (thường theo kiểu Round-robin).

Mỗi Worker Process là một tiến trình Node.js độc lập với Event Loop riêng.

Giúp tận dụng tối đa các lõi CPU của máy chủ để xử lý nhiều yêu cầu đồng thời. Đây là cách phổ biến nhất để scale ứng dụng Node.js trên một máy chủ duy nhất.

## RxJS và Lập Trình Phản ứng (Reactive Programming) Chuyên Sâu

Ngoài Callbacks, Promises và Async/Await, RxJS (Reactive Extensions for JavaScript) cung cấp một mô hình mạnh mẽ khác để xử lý các luồng dữ liệu và sự kiện bất đồng bộ: Lập trình phản ứng.

RxJS xem các sự kiện (click chuột, dữ liệu từ API, tin nhắn WebSocket, timer,...) như những luồng dữ liệu (streams) có thể quan sát được theo thời gian.

### Các Khái Niệm Cốt Lõi

- Observable: Đại diện cho một tập hợp các giá trị hoặc sự kiện trong tương lai (một stream). Observable là lazy (chỉ thực thi khi có ai đó đăng ký - subscribe) và có thể phát ra nhiều giá trị theo thời gian (0 đến vô hạn). Nó cũng có thể bị hủy (cancel).

Khác với Promise: Promise chỉ xử lý một giá trị duy nhất (resolved hoặc rejected) và không thể hủy bỏ sau khi đã bắt đầu.

- Observer: Là một đối tượng có các hàm callback để lắng nghe các giá trị được phát ra bởi Observable:

next(value): Được gọi mỗi khi Observable phát ra một giá trị mới.

error(err): Được gọi nếu Observable gặp lỗi. Stream kết thúc.

complete(): Được gọi khi Observable hoàn thành việc phát giá trị và không còn giá trị nào nữa. Stream kết thúc.

- Subscription: Đại diện cho việc thực thi một Observable. Nó được trả về khi bạn gọi .subscribe(). Quan trọng nhất, nó có phương thức .unsubscribe() để hủy bỏ việc lắng nghe và giải phóng tài nguyên, tránh rò rỉ bộ nhớ.

- Operators: Là các hàm thuần túy (pure functions) cho phép bạn thao tác với các stream dữ liệu một cách khai báo (declarative). RxJS cung cấp một bộ sưu tập lớn các operators:

  - Creation Operators: Tạo Observable từ các nguồn khác nhau (of, from, interval, timer, fromEvent).

  - Transformation Operators: Biến đổi giá trị trong stream (map, pluck, scan, mergeMap/flatMap, switchMap, concatMap).

  - Filtering Operators: Lọc các giá trị không mong muốn (filter, take, skip, debounceTime, distinctUntilChanged).

  - Combination Operators: Kết hợp nhiều Observable lại với nhau (combineLatest, merge, zip, forkJoin).

  - Error Handling Operators: Xử lý lỗi trong stream (catchError, retry).

  - Utility Operators: Các toán tử tiện ích khác (tap - để thực hiện side effect, delay).

- Subject: Một loại đặc biệt hoạt động như cả Observable và Observer. Nó có thể phát (multicast) giá trị cho nhiều Observers cùng lúc. Hữu ích trong việc chia sẻ trạng thái hoặc sự kiện. Các loại phổ biến:

- Subject: Cơ bản nhất, không có giá trị ban đầu.

  - BehaviorSubject: Yêu cầu giá trị ban đầu và phát giá trị cuối cùng cho subscriber mới.

  - ReplaySubject: Ghi lại và phát lại một số lượng giá trị trước đó cho subscriber mới.

  - AsyncSubject: Chỉ phát giá trị cuối cùng khi stream complete.

- Scheduler: Kiểm soát thời điểm và cách thức các subscription bắt đầu và các thông báo được gửi đi. Hữu ích cho việc điều phối concurrency (ví dụ: asyncScheduler, queueScheduler).

### Tại Sao Dùng RxJS trong Node.js?

Mặc dù Node.js đã có cơ chế non-blocking I/O hiệu quả, RxJS vẫn mang lại lợi ích trong các kịch bản phức tạp:

- Quản lý luồng sự kiện phức tạp: Xử lý các luồng sự kiện liên tục như WebSockets, dữ liệu cảm biến IoT, hoặc tương tác người dùng phức tạp.

- Kết hợp và điều phối nhiều tác vụ bất đồng bộ: Khi bạn cần kết hợp kết quả từ nhiều API calls, database queries, hoặc các sự kiện hệ thống theo những cách phức tạp (ví dụ: chờ tất cả hoàn thành, lấy cái đầu tiên, xử lý song song có giới hạn).

- Rate Limiting, Debouncing, Throttling: Dễ dàng kiểm soát tần suất các hành động được thực thi (ví dụ: giới hạn số lần gọi API, trì hoãn xử lý input người dùng).

- Quản lý State phức tạp: Sử dụng BehaviorSubject hoặc ReplaySubject để quản lý và chia sẻ trạng thái trong ứng dụng.

- Code dễ đọc hơn cho logic bất đồng bộ phức tạp: Sử dụng các operators giúp diễn đạt các luồng xử lý phức tạp một cách rõ ràng và khai báo hơn so với việc lồng nhiều callback hoặc promise chain.

### So Sánh với Promises/Async/Await

**Promises/Async/Await**: Tuyệt vời cho các tác vụ bất đồng bộ trả về một giá trị duy nhất (ví dụ: gọi API, đọc file). Cú pháp async/await làm cho code trông giống đồng bộ, rất dễ đọc cho các luồng tuần tự.

**RxJS**: Mạnh mẽ hơn khi xử lý các luồng (streams) có thể phát ra nhiều giá trị theo thời gian, cần hủy bỏ (cancellation), hoặc yêu cầu các phép biến đổi/kết hợp luồng phức tạp. Đường cong học tập (learning curve) của RxJS cao hơn.

## Chuyên Sâu về Scope trong JavaScript (và TypeScript)

#### Global Scope

Biến được khai báo bên ngoài bất kỳ hàm hay block nào sẽ thuộc Global Scope. Trong môi trường Node.js, biến global thực sự được gắn vào đối tượng global. Trong trình duyệt là window. Nên hạn chế tối đa việc sử dụng biến global.

#### Function Scope

Biến được khai báo bằng var bên trong một hàm chỉ có thể truy cập được bên trong hàm đó (và các hàm lồng bên trong).

#### Block Scope

Biến được khai báo bằng let và const bên trong một block ({ ... } - ví dụ: trong if, for, hoặc block đơn lẻ) chỉ có thể truy cập được bên trong block đó. Đây là scope được ưa chuộng hơn Function Scope vì nó giúp giới hạn phạm vi của biến chặt chẽ hơn.

#### Lexical Scope (Static Scope)

JavaScript sử dụng Lexical Scope, nghĩa là scope của một hàm được xác định tại thời điểm hàm đó được định nghĩa, chứ không phải tại thời điểm nó được gọi. Một hàm lồng bên trong (inner function) có thể truy cập các biến của hàm cha (outer function) ngay cả khi hàm cha đã thực thi xong. Đây chính là cơ chế tạo ra Closures.

**Closure**: Là sự kết hợp của một hàm và môi trường lexical (lexical environment) nơi hàm đó được khai báo. Môi trường này bao gồm tất cả các biến cục bộ có hiệu lực tại thời điểm hàm được tạo ra. Closure cho phép hàm "nhớ" môi trường mà nó được tạo ra.

#### Scope Chain

Khi truy cập một biến, JavaScript engine sẽ tìm kiếm biến đó theo chuỗi scope (Scope Chain):

1. Bắt đầu từ scope hiện tại (local scope).

2. Nếu không tìm thấy, tìm lên scope của hàm cha (outer scope).

3. Tiếp tục tìm lên các scope cha tiếp theo.

4. Cuối cùng, tìm trong Global Scope.

5. Nếu không tìm thấy ở đâu cả, sẽ báo lỗi ReferenceError.
