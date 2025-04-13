---
title: Golang
---

## Concurrency trong Go: Goroutines, Channels và Select

Go coi concurrency là công dân hạng nhất (first-class citizen). Thay vì sử dụng OS threads trực tiếp, Go cung cấp các cơ chế trừu tượng ở mức cao hơn.

### Goroutines

Goroutine là một hàm hoặc phương thức có thể chạy đồng thời (concurrently) với các hàm/phương thức khác. Chúng cực kỳ nhẹ (lightweight) so với OS threads.

**Đặc điểm**:

- Stack có thể mở rộng: Goroutine bắt đầu với một stack nhỏ (vài KB) và có thể tự động tăng/giảm kích thước khi cần, tránh lãng phí bộ nhớ.

- Quản lý bởi Go Runtime: Việc lên lịch (scheduling) và quản lý goroutines được thực hiện bởi Go runtime scheduler, không phải OS scheduler.

- Chi phí thấp: Việc tạo và chuyển đổi ngữ cảnh (context switching) giữa các goroutine nhanh hơn nhiều so với OS threads. Bạn có thể chạy hàng trăm nghìn, thậm chí hàng triệu goroutine trong một ứng dụng Go.

**Ảnh hưởng hệ thống**:

- CPU: Nhiều goroutine có thể chạy song song trên nhiều lõi CPU (parallelism) nếu GOMAXPROCS > 1. Trên một lõi, chúng chạy đồng thời (concurrency) bằng cách xen kẽ.

- RAM: Chi phí bộ nhớ ban đầu cho mỗi goroutine rất nhỏ, giúp tiết kiệm RAM đáng kể so với mô hình thread-per-request.

- Process: Tất cả goroutines chạy trong cùng một process OS, chia sẻ không gian địa chỉ.

### Channels

Channels là các "ống dẫn" có kiểu dữ liệu (typed conduits) cho phép các goroutine giao tiếp và đồng bộ hóa (synchronize) với nhau bằng cách gửi và nhận giá trị. Triết lý của Go là: "Do not communicate by sharing memory; instead, share memory by communicating."

Cách tạo:

```go
myChannel := make(chan int) // (unbuffered)
myBufferedChannel := make(chan string, 10) // (buffered)
```

**Hoạt động**:

- Gửi: myChannel <- value

- Nhận: value := <-myChannel

- Blocking:

  - Gửi trên unbuffered channel sẽ block goroutine gửi cho đến khi có goroutine khác sẵn sàng nhận.

  - Nhận trên unbuffered channel sẽ block goroutine nhận cho đến khi có goroutine khác gửi giá trị.

  - Gửi trên buffered channel chỉ block nếu buffer đầy.

  - Nhận trên buffered channel chỉ block nếu buffer rỗng.

- Đóng channel: `close(myChannel)`. Việc nhận từ channel đã đóng sẽ trả về giá trị zero của kiểu dữ liệu và một giá trị boolean false. Gửi vào channel đã đóng sẽ gây panic. Lặp qua channel bằng for range sẽ tự động dừng khi channel được đóng.

Ảnh hưởng hệ thống: Cung cấp cơ chế đồng bộ hóa an toàn, tránh được nhiều vấn đề data race thường gặp khi dùng bộ nhớ chia sẻ và locks truyền thống.

### Select Statement

Cho phép một goroutine đợi trên nhiều channel operations (gửi hoặc nhận) cùng một lúc.

Cách hoạt động:

- select sẽ block cho đến khi một trong các case (các channel operation) sẵn sàng thực thi.

- Nếu nhiều case cùng sẵn sàng, select sẽ chọn ngẫu nhiên một case để thực thi.

- Case default: Nếu có default, select sẽ không block. Nếu không có case nào khác sẵn sàng, default sẽ được thực thi. Hữu ích để thực hiện non-blocking send/receive hoặc kiểm tra trạng thái.

Cho phép xây dựng các logic điều phối và xử lý sự kiện phức tạp từ nhiều nguồn đồng thời một cách hiệu quả.

### Các Cơ Chế Đồng Bộ Hóa Khác (sync package)

**sync.Mutex & sync.RWMutex**: Cung cấp cơ chế khóa (locking) truyền thống để bảo vệ các vùng tài nguyên chia sẻ (critical sections) khỏi data races. RWMutex cho phép nhiều goroutine đọc đồng thời nhưng chỉ một goroutine ghi tại một thời điểm.

**sync.WaitGroup**: Cung cấp cơ chế để đợi một nhóm các goroutine hoàn thành công việc. Sử dụng Add(delta), Done(), Wait().

**sync.Once**: Đảm bảo một đoạn code chỉ được thực thi đúng một lần duy nhất, ngay cả khi được gọi từ nhiều goroutine.

**Context package**: Cực kỳ quan trọng để quản lý cancellation signals, deadlines, và request-scoped values qua các goroutine và các lớp API. Giúp tránh rò rỉ goroutine và tài nguyên khi một tác vụ cần được hủy bỏ.

## Concurrency vs. Parallelism trong Go

**Concurrency (Đồng thời)**: Là khả năng xử lý nhiều công việc dường như cùng một lúc. Trên một lõi CPU, Go runtime scheduler xen kẽ việc thực thi các goroutine, tạo cảm giác chúng chạy song song. Đây là về cấu trúc chương trình.

**Parallelism (Song song)**: Là khả năng thực sự thực thi nhiều công việc chính xác tại cùng một thời điểm. Điều này yêu cầu nhiều lõi CPU. Go runtime sẽ phân phối các goroutine chạy trên các OS threads khác nhau, mỗi thread được gán cho một lõi CPU (thông qua biến môi trường GOMAXPROCS, mặc định bằng số lõi CPU). Đây là về thực thi.

#### So sánh Đơn luồng vs. Đa luồng (Goroutines):

- Đơn luồng (Truyền thống): Một tác vụ phải hoàn thành trước khi tác vụ tiếp theo bắt đầu. Nếu một tác vụ bị chặn (ví dụ: chờ I/O), toàn bộ luồng bị dừng.

- Đa luồng (Goroutines):

  - I/O-bound Tasks: Khi một goroutine bị chặn bởi I/O (ví dụ: đọc file, gọi mạng), Go runtime scheduler sẽ chuyển OS thread đó sang chạy một goroutine khác đang sẵn sàng. Điều này giúp tận dụng tối đa CPU thay vì để nó nhàn rỗi chờ I/O. Đây là lợi ích lớn của concurrency.

  - CPU-bound Tasks: Khi các tác vụ đòi hỏi tính toán CPU liên tục, việc chạy chúng song song trên nhiều lõi CPU (parallelism) sẽ tăng tốc độ xử lý tổng thể. Go scheduler sẽ cố gắng phân phối các goroutine này lên các P (Processor) khác nhau để chạy trên các M (Machine/Thread) khác nhau.

Go's concurrency model đặc biệt hiệu quả cho các ứng dụng I/O-bound (như web servers, microservices) vì nó cho phép xử lý hàng nghìn kết nối đồng thời với chi phí tài nguyên thấp. Nó cũng tận dụng tốt các hệ thống đa lõi cho các tác vụ CPU-bound.

## Go Runtime: Scheduler, GC và Lightweight Threads

Go runtime là một phần quan trọng của hệ sinh thái Go, cung cấp các dịch vụ cốt lõi.

### Scheduler (GMP Model)

Go sử dụng mô hình scheduler M:N, nghĩa là M goroutines được ánh xạ lên N OS threads. Mô hình cụ thể là GMP:

- G (Goroutine): Đại diện cho một goroutine, bao gồm stack, trạng thái hiện tại, và con trỏ lệnh.

- M (Machine): Đại diện cho một OS thread do hệ điều hành quản lý. M thực thi mã Go.

- P (Processor): Đại diện cho một "bộ xử lý logic", là ngữ cảnh cần thiết để M thực thi G. Mỗi P có một hàng đợi các goroutine có thể chạy (local run queue - LRQ). Số lượng P được kiểm soát bởi GOMAXPROCS.

Luồng hoạt động:

1. Một P lấy một G từ hàng đợi cục bộ (LRQ) của nó.

2. P tìm một M đang chờ (idle) hoặc tạo M mới nếu cần.

3. P gán G cho M để thực thi.

4. M thực thi G. Nếu G bị block bởi system call, M sẽ tách khỏi P và P có thể được một M khác sử dụng để chạy G khác. Khi system call hoàn thành, M sẽ cố gắng lấy lại P cũ hoặc tìm P khác.

5. Nếu LRQ của một P hết G, nó sẽ cố gắng "lấy trộm" (work-stealing) G từ LRQ của P khác hoặc từ hàng đợi toàn cục (global run queue - GRQ) để đảm bảo các M luôn bận rộn.

Ưu điểm: Hiệu quả cao, chi phí context switching thấp giữa các goroutine, khả năng mở rộng tốt với số lượng lớn goroutine, tận dụng tốt các lõi CPU.

### Garbage Collector (GC)

Go cung cấp bộ thu gom rác tự động (automatic garbage collection).

Thuật toán: Sử dụng thuật toán concurrent tri-color mark-and-sweep.

Đặc điểm:

- Concurrent: Hầu hết các giai đoạn đánh dấu (marking) và quét (sweeping) chạy đồng thời với chương trình chính (goroutines), giảm thiểu thời gian "Stop-The-World" (STW).

- Tri-color: Sử dụng ba màu (trắng, xám, đen) để theo dõi các đối tượng đã được quét.

- Write Barrier: Một cơ chế được bật trong giai đoạn đánh dấu để đảm bảo GC không bỏ sót các con trỏ mới được tạo ra hoặc thay đổi bởi chương trình chính trong khi GC đang chạy.

- Low Latency: Các phiên bản Go hiện đại có thời gian tạm dừng STW rất ngắn (thường dưới mili giây, thậm chí micro giây), phù hợp cho các ứng dụng yêu cầu độ trễ thấp.

Ảnh hưởng hệ thống: Tự động quản lý bộ nhớ heap, giảm gánh nặng cho lập trình viên. Mặc dù GC có chi phí CPU nhất định, thiết kế concurrent của nó giúp giảm thiểu ảnh hưởng đến hiệu năng ứng dụng.

### Lightweight Threads

Cần nhấn mạnh lại: Goroutines không phải là OS threads. Chúng là một khái niệm trừu tượng nhẹ hơn, được Go runtime multiplex (ghép kênh) lên một nhóm nhỏ các OS threads (M).

## Quản Lý Bộ Nhớ: Stack, Heap, Escape Analysis và Profiling

### Stack vs. Heap Allocation

**Stack**: Mỗi goroutine có một vùng nhớ stack riêng. Việc cấp phát và giải phóng trên stack rất nhanh (chỉ cần thay đổi con trỏ stack). Go compiler cố gắng cấp phát biến cục bộ trên stack của goroutine tạo ra nó. Bộ nhớ stack được giải phóng tự động khi hàm kết thúc.

**Heap**: Là vùng nhớ chung cho toàn bộ ứng dụng, được quản lý bởi GC. Việc cấp phát trên heap chậm hơn và tạo áp lực lên GC. Biến được cấp phát trên heap khi compiler xác định rằng biến đó có thể vẫn được tham chiếu sau khi hàm tạo ra nó kết thúc (nó "escapes" - thoát khỏi stack).

### Escape Analysis (Phân tích Thoát)

Đây là quá trình compiler thực hiện để xác định xem một biến có thể được cấp phát an toàn trên stack hay phải "thoát" ra heap.

Cách kiểm tra: go build -gcflags="-m" hoặc go run -gcflags="-m" main.go. Output sẽ chỉ ra biến nào bị di chuyển lên heap.

Lý do biến "thoát":

- Chia sẻ qua goroutines: Gửi con trỏ đến biến qua channel hoặc truy cập biến từ một goroutine khác.

- Trả về con trỏ: Hàm trả về con trỏ đến một biến cục bộ.

- Closure: Biến cục bộ được "capture" bởi một closure (hàm lồng) mà closure này có thể tồn tại lâu hơn hàm chứa biến đó.

- Kích thước không xác định: Cấp phát slice với kích thước không xác định tại compile time.

- Gán cho interface: Gán giá trị (đặc biệt là con trỏ) cho một biến kiểu interface thường khiến giá trị gốc thoát ra heap.

Ảnh hưởng: Việc biến thoát ra heap làm tăng số lượng cấp phát bộ nhớ động và tăng gánh nặng cho GC, có thể ảnh hưởng đến hiệu năng. Hiểu escape analysis giúp viết code hiệu quả hơn về mặt bộ nhớ.

### Profiling với pprof

pprof là công cụ profiling tiêu chuẩn của Go, cực kỳ mạnh mẽ để phân tích hiệu năng và sử dụng bộ nhớ.

Cách tích hợp (cho web server):

```go
import _ "net/http/pprof" // Import ẩn danh để đăng ký các HTTP handler
import "net/http"
import "log"

func main() {
// ... your application setup ...

    // Start pprof server on a separate port (recommended)
    go func() {
        log.Println(http.ListenAndServe("localhost:6060", nil))
    }()

    // ... start your main application server ...

}
```

Các loại Profile phổ biến:

- CPU Profile: Xem hàm nào tốn nhiều thời gian CPU nhất.

- Heap Profile: Xem hàm nào cấp phát nhiều bộ nhớ heap nhất (cả đang sử dụng và đã cấp phát).

- Goroutine Profile: Xem stack trace của tất cả các goroutine đang chạy (hữu ích để debug deadlock hoặc rò rỉ goroutine).

- Mutex Profile: Xem các điểm tranh chấp mutex (lock contention).

- Block Profile: Xem các điểm mà goroutine bị block (chờ channel, mutex, syscall).

Cách sử dụng:

- Web UI: Truy cập `http://localhost:6060/debug/pprof/` trong trình duyệt.

- Command Line: `go tool pprof http://localhost:6060/debug/pprof/heap` hoặc `go tool pprof <binary> <profile_file>`. Cung cấp giao diện tương tác để phân tích (ví dụ: top, list functionName, web).

Ảnh hưởng: pprof là công cụ không thể thiếu để tìm và sửa các vấn đề về hiệu năng và bộ nhớ trong các ứng dụng Go phức tạp.

## Các Mẫu Concurrency Phổ Biến

Go's concurrency primitives cho phép xây dựng nhiều mẫu thiết kế mạnh mẽ.

#### Worker Pools

Mục đích: Giới hạn số lượng goroutine chạy đồng thời để xử lý một lượng lớn công việc, tránh tiêu tốn quá nhiều tài nguyên (CPU, RAM, file descriptors,...).

Cấu trúc:

1. Một channel (tasks) để gửi công việc cần xử lý.

2. Một nhóm goroutines (workers) với số lượng cố định. Mỗi worker đọc công việc từ tasks channel.

3. (Tùy chọn) Một channel (results) để workers gửi kết quả về.

4. Sử dụng sync.WaitGroup để chờ tất cả workers hoàn thành khi không còn task nào.

#### Fan-out / Fan-in

Fan-out: Một goroutine (producer) phân phối công việc cho nhiều goroutine khác (workers) thông qua nhiều channels hoặc một channel chung.

Fan-in: Nhiều goroutine (workers) gửi kết quả của chúng vào một channel duy nhất (consumer). Consumer tổng hợp hoặc xử lý các kết quả này.

Kết hợp: Thường được sử dụng cùng nhau. Ví dụ: Một producer fan-out công việc cho một worker pool, và các workers fan-in kết quả về một consumer duy nhất.

## Những Khái Niệm Golang Chuyên Sâu Ít Người Biết

- sync.Pool:

Mục đích: Cung cấp một cách để tái sử dụng các đối tượng đã cấp phát nhưng không còn dùng đến, thay vì để GC thu dọn chúng ngay lập tức. Giúp giảm áp lực GC cho các đối tượng được cấp phát và giải phóng thường xuyên (ví dụ: buffer, đối tượng request tạm thời).

Lưu ý: sync.Pool không đảm bảo đối tượng lấy ra là cái đã Put vào trước đó. Các đối tượng trong Pool có thể bị GC thu dọn bất cứ lúc nào, đặc biệt là giữa các chu kỳ GC. Không nên dùng cho các đối tượng cần duy trì trạng thái quan trọng.

- Race Detector:

Mục đích: Phát hiện các lỗi data race (khi nhiều goroutine truy cập cùng một biến mà không có đồng bộ hóa và ít nhất một truy cập là ghi) tại runtime. Data race là lỗi rất khó debug.

Cách dùng: Thêm flag -race khi build, run hoặc test: go run -race main.go, go test -race ./....

Lưu ý: Bật race detector làm chậm chương trình và tăng sử dụng bộ nhớ, chỉ nên dùng trong quá trình phát triển và testing.

- Build Tags (Build Constraints):

Mục đích: Cho phép biên dịch có điều kiện các file hoặc đoạn code dựa trên các tag được cung cấp lúc build. Hữu ích để viết code cho các hệ điều hành/kiến trúc khác nhau hoặc tạo các phiên bản build khác nhau (ví dụ: debug vs. release).

Cách dùng: Thêm comment //go:build mytag ở đầu file Go. Build với go build -tags="mytag".

- cgo:

Mục đích: Cho phép Go gọi code C (và ngược lại).

Cách dùng: import "C". Viết code C trong comment đặc biệt phía trên import.

Ảnh hưởng: Gọi từ Go sang C (và ngược lại) có chi phí context switching đáng kể. cgo cũng có thể ảnh hưởng đến việc quản lý stack của goroutine và tương tác với Go scheduler/GC. Nên hạn chế sử dụng nếu không thực sự cần thiết.

