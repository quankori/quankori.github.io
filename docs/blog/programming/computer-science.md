---
title: Computer Science
---

## Core Concepts: Nền tảng Hoạt động

### Stack và Heap: Quản lý Bộ nhớ Cấp Cao

Trong hầu hết các ngôn ngữ lập trình, bộ nhớ của một chương trình thường được chia thành hai khu vực chính: Stack và Heap.

#### Stack

Là một vùng nhớ có cấu trúc LIFO (Last-In, First-Out). Nó được sử dụng để lưu trữ các biến cục bộ (local variables), tham số hàm (function parameters), và địa chỉ trả về (return addresses) khi một hàm được gọi.

Việc cấp phát và giải phóng bộ nhớ trên Stack diễn ra rất nhanh chóng và được quản lý tự động bởi trình biên dịch/runtime. Khi một hàm được gọi, một "stack frame" mới được đẩy vào đỉnh Stack. Khi hàm kết thúc, stack frame đó được tự động gỡ bỏ.

Stack thường có kích thước cố định và tương đối nhỏ. Việc cấp phát quá nhiều bộ nhớ trên Stack (ví dụ: đệ quy quá sâu) có thể dẫn đến lỗi "stack overflow".

**Trong Go**: Mỗi goroutine trong Go có một Stack riêng, ban đầu có kích thước nhỏ (vài KB) và có thể tự động tăng/giảm kích thước khi cần. Điều này cho phép Go tạo ra hàng triệu goroutine một cách hiệu quả.

**Trong Node.js (V8)**: Node.js chạy trên engine V8 của Google Chrome. Mỗi lời gọi hàm trong JavaScript cũng tạo ra một stack frame trên Call Stack của V8. Giống như các môi trường khác, nó có kích thước giới hạn.

#### Heap

Là một vùng nhớ lớn hơn và linh hoạt hơn Stack, được sử dụng để lưu trữ các đối tượng có vòng đời không xác định tại thời điểm biên dịch, hoặc các đối tượng có kích thước lớn. Việc cấp phát bộ nhớ trên Heap cần được quản lý một cách tường minh hoặc thông qua cơ chế thu gom rác (Garbage Collection - GC).

Cấp phát và giải phóng bộ nhớ trên Heap chậm hơn so với Stack. Lập trình viên (hoặc runtime) chịu trách nhiệm quản lý bộ nhớ này. Trong các ngôn ngữ như C/C++, lập trình viên phải tự malloc/free hoặc new/delete. Trong Go và JavaScript (Node.js), cơ chế GC tự động tìm và giải phóng các vùng nhớ không còn được tham chiếu.

Heap thường lớn hơn Stack rất nhiều và kích thước có thể thay đổi động trong quá trình chạy chương trình.

**Trong Go**: Các đối tượng được cấp phát động (ví dụ: sử dụng new() hoặc make(), hoặc khi biến "escape" khỏi scope của hàm) sẽ được lưu trữ trên Heap. Go sử dụng một trình thu gom rác đồng thời (concurrent garbage collector) hiệu quả.

**Trong Node.js (V8)**: Các đối tượng (objects), mảng (arrays), closures được tạo ra trong JavaScript thường được cấp phát trên Heap của V8. V8 cũng có một cơ chế GC phức tạp (thường là generational) để quản lý bộ nhớ Heap.

### CPU và Process: Thực thi và Cô lập

**CPU (Central Processing Unit)**: Bộ não của máy tính, chịu trách nhiệm thực thi các chỉ thị (instructions) của chương trình. CPU có một hoặc nhiều lõi (cores), mỗi lõi có thể thực thi một luồng (thread) chỉ thị tại một thời điểm (với công nghệ như Hyper-Threading, một lõi vật lý có thể xử lý nhiều luồng logic).

**Process (Tiến trình)**: Là một thực thể (instance) của một chương trình đang chạy. Mỗi process có không gian địa chỉ bộ nhớ ảo (virtual address space) riêng biệt, bao gồm code, dữ liệu (global variables), Heap, và ít nhất một Thread thực thi. Hệ điều hành chịu trách nhiệm quản lý các process, cấp phát tài nguyên (CPU time, memory) và đảm bảo sự cô lập giữa chúng.

**Thread (Luồng)**: Là đơn vị thực thi cơ bản nhất trong một process. Một process có thể có một hoặc nhiều thread, tất cả cùng chia sẻ không gian địa chỉ bộ nhớ của process đó (code, data, heap) nhưng mỗi thread có Stack và bộ đếm chương trình (program counter) riêng. Việc chuyển đổi ngữ cảnh (context switching) giữa các thread trong cùng một process thường nhanh hơn giữa các process khác nhau.

**Trong Go (Goroutines và M:N Scheduler)**:

Go sử dụng khái niệm Goroutine thay vì trực tiếp làm việc với OS threads. Goroutine là các hàm hoặc phương thức có thể chạy đồng thời với các hàm/phương thức khác. Chúng rất nhẹ (lightweight), chỉ tốn vài KB bộ nhớ Stack ban đầu.

Go runtime triển khai một bộ lập lịch (scheduler) M:N, tức là nó ánh xạ M goroutine lên N OS threads. Runtime tự động quản lý việc tạo, lập lịch và hủy các OS threads cần thiết để chạy các goroutine. Điều này cho phép Go xử lý hàng ngàn, thậm chí hàng triệu goroutine đồng thời một cách hiệu quả mà không tạo ra quá nhiều OS threads. Khi một goroutine thực hiện một lời gọi hệ thống chặn (blocking system call) như I/O, Go runtime có thể chuyển OS thread đó sang chạy một goroutine khác, tránh lãng phí tài nguyên CPU.

**Trong Node.js (Event Loop và Worker Threads)**:

Node.js hoạt động dựa trên mô hình Event Loop và kiến trúc single-threaded (cho mã JavaScript chính). Hầu hết các tác vụ I/O (mạng, file system) được thực hiện một cách bất đồng bộ (asynchronous) và không chặn (non-blocking). Khi một tác vụ I/O bắt đầu, Node.js đăng ký một callback và giao việc đó cho hệ điều hành hoặc một thread pool (libuv). Event Loop sẽ tiếp tục xử lý các sự kiện khác. Khi tác vụ I/O hoàn thành, callback tương ứng sẽ được đưa vào hàng đợi (callback queue) và Event Loop sẽ thực thi nó khi Call Stack trống.

Mô hình này rất hiệu quả cho các ứng dụng I/O-bound. Tuy nhiên, nếu có một tác vụ CPU-bound (tính toán nặng) chạy trên luồng chính, nó sẽ chặn Event Loop, khiến toàn bộ ứng dụng bị "đơ".

Để xử lý các tác vụ CPU-bound, Node.js cung cấp module worker_threads, cho phép tạo ra các luồng riêng biệt để chạy mã JavaScript song song, giải phóng Event Loop chính.

### Ảnh hưởng đến I/O Bound vs. CPU Bound và Scaling

**I/O Bound**: Các tác vụ dành phần lớn thời gian chờ đợi các hoạt động I/O hoàn thành (ví dụ: đọc/ghi file, truy vấn database, gọi API mạng).

- Go: Rất mạnh mẽ trong xử lý I/O bound nhờ goroutines và M:N scheduler. Hàng ngàn kết nối mạng có thể được xử lý đồng thời một cách hiệu quả.

- Node.js: Cũng rất hiệu quả nhờ mô hình non-blocking I/O và Event Loop. Thích hợp cho các web server, API gateway xử lý nhiều request đồng thời.

**CPU Bound**: Các tác vụ dành phần lớn thời gian thực hiện tính toán trên CPU (ví dụ: xử lý ảnh/video, mã hóa, thuật toán phức tạp).

- Go: Có thể tận dụng nhiều lõi CPU bằng cách chạy nhiều goroutine tính toán song song trên các OS thread khác nhau (do M:N scheduler quản lý).

- Node.js: Luồng chính dễ bị chặn bởi tác vụ CPU-bound. Cần sử dụng worker_threads để thực hiện các tính toán nặng song song mà không ảnh hưởng đến Event Loop chính.

**Scaling (Mở rộng)**:

- Vertical Scaling (Scale Up - Mở rộng dọc): Tăng cường tài nguyên cho một máy chủ duy nhất (thêm CPU, RAM). Cả Go và Node.js đều hưởng lợi từ việc này, nhưng có giới hạn vật lý và chi phí.

- Horizontal Scaling (Scale Out - Mở rộng ngang): Thêm nhiều máy chủ để chạy các bản sao (instances) của ứng dụng.

  - Go: Kiến trúc goroutine nhẹ và hiệu quả giúp việc chạy nhiều instance Go trở nên dễ dàng. Các ứng dụng Go thường được thiết kế stateless, thuận lợi cho việc scale ngang sau một bộ cân bằng tải (load balancer).

  - Node.js: Cũng có thể scale ngang tốt, đặc biệt là các ứng dụng stateless. Tuy nhiên, nếu ứng dụng có state (trạng thái) cần chia sẻ giữa các instance (ví dụ: session người dùng, WebSocket connections), cần có giải pháp quản lý state tập trung (như Redis, Memcached) hoặc cơ chế sticky session trên load balancer. Việc quản lý nhiều process Node.js trên cùng một máy (sử dụng các công cụ như PM2) cũng là một hình thức scale (tận dụng nhiều core).

## Memory Management (Quản lý Bộ nhớ) trong Khoa học Máy tính

Quản lý bộ nhớ là quá trình cấp phát và giải phóng tài nguyên bộ nhớ cho các chương trình. Mục tiêu là cung cấp bộ nhớ khi cần và thu hồi khi không còn sử dụng để tránh lãng phí và lỗi.

**Allocation (Cấp phát)**: Gán một khối bộ nhớ cho một biến hoặc cấu trúc dữ liệu. Có thể là cấp phát tĩnh (static - tại thời điểm biên dịch), cấp phát trên Stack (tự động), hoặc cấp phát động (dynamic - trên Heap tại thời điểm chạy).

**Deallocation (Giải phóng)**: Thu hồi bộ nhớ đã cấp phát để nó có thể được tái sử dụng. Có thể là giải phóng thủ công (manual - C/C++) hoặc tự động (automatic - thông qua Garbage Collection).

**Garbage Collection (GC - Thu gom rác)**: Cơ chế tự động xác định và giải phóng các vùng nhớ không còn được chương trình tham chiếu đến (unreachable memory). Các thuật toán GC phổ biến bao gồm:

- Reference Counting: Đếm số lượng tham chiếu đến mỗi đối tượng. Khi số đếm về 0, đối tượng được thu gom. (Dễ bị cycle detection problem).

- Mark-and-Sweep: Đánh dấu các đối tượng có thể truy cập từ gốc (roots - global variables, stack), sau đó quét toàn bộ Heap và giải phóng các đối tượng không được đánh dấu.

- Generational GC: Giả định rằng hầu hết các đối tượng chết trẻ. Heap được chia thành các "thế hệ". GC thường xuyên quét thế hệ trẻ (young generation) và ít thường xuyên hơn ở thế hệ già (old generation). V8 sử dụng phương pháp này.

- Concurrent/Parallel GC: Thực hiện các pha của GC song song với việc thực thi chương trình chính để giảm thiểu thời gian "stop-the-world" (khi ứng dụng phải dừng hoàn toàn để GC chạy). Go sử dụng GC đồng thời.

**Memory Fragmentation (Phân mảnh Bộ nhớ)**: Xảy ra khi các khối bộ nhớ trống bị phân tán rải rác trên Heap, khiến việc cấp phát một khối nhớ lớn liên tục trở nên khó khăn dù tổng bộ nhớ trống vẫn còn nhiều.

## Process Management (Quản lý Tiến trình) trong Khoa học Máy tính

Hệ điều hành chịu trách nhiệm tạo, lập lịch, và chấm dứt các tiến trình, quản lý tài nguyên và sự tương tác giữa chúng.

**Process States (Trạng thái Tiến trình)**: Một tiến trình có thể ở các trạng thái như New (Mới tạo), Ready (Sẵn sàng chạy), Running (Đang chạy trên CPU), Waiting (Đang chờ I/O hoặc sự kiện khác), Terminated (Đã kết thúc).

**Process Control Block (PCB)**: Cấu trúc dữ liệu được hệ điều hành sử dụng để lưu trữ thông tin về một tiến trình (ID tiến trình, trạng thái, bộ đếm chương trình, thanh ghi CPU, thông tin lập lịch, thông tin quản lý bộ nhớ, file đang mở,...).

**Scheduling (Lập lịch)**: Quyết định tiến trình nào sẽ được chạy trên CPU tiếp theo và trong bao lâu. Các thuật toán lập lịch phổ biến: First-Come First-Served (FCFS), Shortest Job First (SJF), Priority Scheduling, Round Robin.

**Context Switching (Chuyển đổi Ngữ cảnh)**: Hành động lưu trạng thái của tiến trình đang chạy hiện tại và nạp trạng thái của tiến trình tiếp theo để chạy. Đây là một hoạt động tốn kém chi phí (overhead).

**Inter-Process Communication (IPC - Giao tiếp Liên Tiến trình)**: Các cơ chế cho phép các tiến trình khác nhau giao tiếp và chia sẻ dữ liệu (ví dụ: Pipes, Shared Memory, Message Queues, Sockets).

## CPU Architecture (Kiến trúc CPU) trong Khoa học Máy tính

Hiểu biết cơ bản về cách CPU hoạt động giúp tối ưu hóa code ở mức độ thấp hơn.

**Instruction Set Architecture (ISA)**: Định nghĩa tập lệnh mà CPU có thể hiểu và thực thi (ví dụ: x86, ARM). Có hai loại chính:

- CISC (Complex Instruction Set Computer): Có tập lệnh lớn, phức tạp, một lệnh có thể thực hiện nhiều thao tác cấp thấp (phổ biến trên desktop/server - Intel, AMD).

- RISC (Reduced Instruction Set Computer): Có tập lệnh nhỏ, đơn giản, tối ưu hóa. Mỗi lệnh thường thực hiện một thao tác đơn giản và thực thi trong một chu kỳ xung nhịp (phổ biến trên mobile, embedded - ARM).

**Pipelining**: Kỹ thuật cho phép CPU bắt đầu xử lý lệnh tiếp theo trước khi lệnh hiện tại hoàn thành, giống như một dây chuyền lắp ráp, tăng thông lượng thực thi lệnh.

**Cores and Multiprocessing**: CPU hiện đại thường có nhiều lõi (cores), cho phép thực thi nhiều luồng (threads) song song thực sự.

**Cache Hierarchy (Hệ thống Cache Phân cấp)**: Các bộ nhớ đệm (cache) nhỏ, nhanh nằm giữa CPU và RAM chính (L1, L2, L3 cache). Cache lưu trữ dữ liệu và lệnh thường xuyên được truy cập để giảm thời gian chờ đợi từ RAM chậm hơn. Tận dụng tốt cache (locality of reference) là rất quan trọng cho hiệu năng.

_Branch Prediction_: CPU cố gắng đoán trước kết quả của các lệnh rẽ nhánh (if/else, loops) để nạp trước các lệnh có khả năng được thực thi tiếp theo, tránh làm đình trệ pipeline.

## Performance Optimization (Tối ưu Hiệu năng) trong Khoa học Máy tính

Tối ưu hóa hiệu năng là quá trình cải thiện hiệu quả sử dụng tài nguyên (CPU, bộ nhớ, mạng, I/O) và giảm thời gian phản hồi của ứng dụng.

**Profiling**: Đo lường và phân tích hiệu năng của ứng dụng để xác định các điểm nghẽn cổ chai (bottlenecks). Các công cụ profiling giúp xác định hàm nào tốn nhiều thời gian CPU nhất, hàm nào cấp phát nhiều bộ nhớ nhất, v.v.

- Go: Cung cấp công cụ pprof mạnh mẽ để profiling CPU, bộ nhớ, goroutine, blocking, mutex.

- Node.js: Có thể sử dụng V8 profiler tích hợp (qua Chrome DevTools hoặc cờ lệnh --prof), hoặc các thư viện như 0x, clinic.js.

**Algorithmic Optimization**: Chọn hoặc thiết kế thuật toán có độ phức tạp thời gian và không gian tốt hơn (ví dụ: sử dụng O(n log n) thay vì O(n^2)).

**Data Structure Selection**: Sử dụng cấu trúc dữ liệu phù hợp với tác vụ (ví dụ: hash map cho tìm kiếm nhanh, list cho truy cập tuần tự).

**Caching**: Lưu trữ kết quả của các phép tính toán tốn kém hoặc dữ liệu thường xuyên truy cập vào bộ nhớ nhanh hơn (in-memory cache, Redis, Memcached) để tránh phải tính toán lại hoặc truy vấn lại.

**Concurrency and Parallelism**: Sử dụng đồng thời (concurrency - Go goroutines, Node.js async/await) và song song (parallelism - Go trên multi-core, Node.js worker_threads) để xử lý nhiều tác vụ cùng lúc, đặc biệt hiệu quả cho I/O bound và CPU bound trên multi-core.

**Efficient I/O**: Sử dụng các kỹ thuật I/O hiệu quả như non-blocking I/O, batching (gom nhiều thao tác nhỏ thành một thao tác lớn), buffering.

**Memory Optimization**: Giảm cấp phát bộ nhớ không cần thiết, tránh memory leaks, sử dụng object pooling nếu phù hợp.

**Network Optimization**: Giảm số lượng request mạng, sử dụng nén dữ liệu, tận dụng HTTP/2.
