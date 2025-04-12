---
title: Microservices Architecture
---

Kiến trúc Microservices chia một ứng dụng lớn thành một tập hợp các dịch vụ nhỏ, độc lập, mỗi dịch vụ chạy trong tiến trình riêng và giao tiếp với nhau qua mạng. Mặc dù mang lại nhiều lợi ích về tính linh hoạt, khả năng mở rộng và tốc độ phát triển, kiến trúc này cũng đặt ra những thách thức mới, đặc biệt là trong việc giao tiếp giữa các dịch vụ và đảm bảo tính ổn định của toàn hệ thống.

## Communication Patterns

Việc lựa chọn cách các microservices giao tiếp với nhau ảnh hưởng lớn đến hiệu năng, độ phức tạp và khả năng phục hồi của hệ thống.

### Synchronous Communication (Giao tiếp đồng bộ):

Một dịch vụ gửi yêu cầu (request) đến dịch vụ khác và đợi phản hồi (response). Hoạt động giống như một lời gọi hàm thông thường qua mạng. Ví dụ là REST APIs (qua HTTP/HTTPS), gRPC.

#### Ưu điểm:

Đơn giản, dễ hiểu, luồng xử lý rõ ràng.

#### Nhược điểm:

- Khớp nối thời gian (Temporal coupling): Dịch vụ gọi phải đợi dịch vụ được gọi xử lý xong. Nếu dịch vụ được gọi chậm hoặc lỗi, dịch vụ gọi cũng bị ảnh hưởng.

- Giảm khả năng phục hồi: Lỗi ở một dịch vụ có thể lan truyền (cascading failures) sang các dịch vụ phụ thuộc vào nó.

- Khó mở rộng: Việc mở rộng một dịch vụ có thể bị giới hạn bởi khả năng xử lý đồng bộ của các dịch vụ mà nó gọi.

### Asynchronous Communication (Giao tiếp bất đồng bộ):

Một dịch vụ gửi đi một thông điệp (message) hoặc sự kiện (event) mà không cần đợi phản hồi ngay lập tức. Dịch vụ nhận sẽ xử lý thông điệp/sự kiện đó vào thời điểm thích hợp. Ví dụ là sử dụng Message Brokers (Kafka, RabbitMQ, Azure Service Bus), Webhooks. Thường liên quan chặt chẽ đến Event-Driven Architecture (EDA).

#### Ưu điểm:

- Khớp nối lỏng (Loose coupling): Dịch vụ gửi và nhận không cần hoạt động cùng lúc.

- Tăng khả năng phục hồi: Lỗi ở một dịch vụ ít ảnh hưởng đến các dịch vụ khác. Nếu dịch vụ nhận lỗi, thông điệp/sự kiện thường có thể được lưu lại và xử lý sau.

- Tăng khả năng mở rộng: Dễ dàng thêm các dịch vụ nhận mới hoặc tăng số lượng phiên bản của dịch vụ nhận để xử lý tải.

#### Nhược điểm:

- Phức tạp hơn: Cần có hạ tầng Message Broker. Luồng xử lý khó theo dõi hơn.

- Tính nhất quán cuối cùng (Eventual consistency): Dữ liệu có thể không được cập nhật đồng nhất ngay lập tức trên toàn hệ thống.

### Các mẫu giao tiếp phổ biến:

- API Gateway: Đóng vai trò là một cổng vào duy nhất cho tất cả các yêu cầu từ client bên ngoài đến hệ thống microservices. Nó có thể xử lý routing, xác thực, tổng hợp kết quả từ nhiều service, caching, rate limiting... giúp đơn giản hóa phía client và bảo vệ các service bên trong.

- Backend for Frontend (BFF): Một biến thể của API Gateway, nơi mỗi loại client (ví dụ: web app, mobile app) có một API Gateway riêng, được tối ưu hóa cho nhu cầu cụ thể của client đó.

- Service Discovery: Giúp các microservices tìm thấy địa chỉ mạng (IP, port) của nhau một cách động, thay vì phải cấu hình cứng địa chỉ. Thường bao gồm hai phần chính:

  1. Service Registry (Sổ đăng ký dịch vụ):

     - Là một cơ sở dữ liệu hoặc dịch vụ trung tâm nơi mỗi phiên bản dịch vụ tự đăng ký thông tin vị trí của nó (IP, port, metadata) khi khởi động.
     - Các phiên bản dịch vụ cũng thường gửi các tín hiệu "heartbeat" (nhịp tim) để báo rằng chúng vẫn còn hoạt động. Nếu không nhận được heartbeat, Registry sẽ tự động hủy đăng ký (deregister) phiên bản đó.
     - Ví dụ về Service Registry: Consul, Eureka, etcd, Zookeeper.

  2. Discovery Mechanism (Cơ chế khám phá): Cách client tìm ra địa chỉ của provider. Có hai cách chính:

     - Client-Side Discovery: Client tự truy vấn Service Registry để lấy danh sách các địa chỉ khả dụng của dịch vụ đích, sau đó tự chọn một địa chỉ (thường thông qua thuật toán cân bằng tải như Round Robin).
     - Server-Side Discovery: Client gửi yêu cầu đến một thành phần trung gian (như Load Balancer hoặc API Gateway). Thành phần này sẽ truy vấn Service Registry, chọn một địa chỉ dịch vụ đích phù hợp và chuyển tiếp yêu cầu đến đó. Client không cần biết về sự tồn tại của Service Registry.

## Microservice Resiliency Patterns

Trong một hệ thống phân tán như microservices, lỗi là điều khó tránh khỏi (lỗi mạng, lỗi dịch vụ, quá tải...). Các mẫu resiliency giúp hệ thống vẫn hoạt động ổn định hoặc phục hồi nhanh chóng khi có lỗi xảy ra.

Các mẫu phục hồi phổ biến:

### Circuit Breaker (Ngắt mạch)

Hoạt động giống như cầu dao điện. Khi số lượng lỗi khi gọi một dịch vụ cụ thể vượt ngưỡng cho phép, Circuit Breaker sẽ "mở" (open), ngăn chặn các yêu cầu tiếp theo đến dịch vụ đó trong một khoảng thời gian. Thay vì gọi dịch vụ lỗi, nó có thể trả về lỗi ngay lập tức hoặc một giá trị mặc định (fallback). Sau một thời gian, nó sẽ chuyển sang trạng thái "nửa mở" (half-open) để thử gửi lại một vài yêu cầu. Nếu thành công, mạch sẽ "đóng" (closed) lại; nếu thất bại, nó lại "mở".

Ngăn chặn việc lãng phí tài nguyên vào việc gọi một dịch vụ đang gặp sự cố, tránh lỗi lan truyền, cho phép dịch vụ bị lỗi có thời gian phục hồi.

- Thuật toán/Logic: Cần duy trì trạng thái của "mạch" cho mỗi dịch vụ đích.
  - Trạng thái: CLOSED (Cho phép yêu cầu), OPEN (Từ chối yêu cầu), HALF_OPEN (Thử nghiệm một vài yêu cầu).
  - Biến đếm: Đếm số lỗi liên tiếp (trong CLOSED), số thành công liên tiếp (trong HALF_OPEN).
  - Ngưỡng: Số lỗi tối đa cho phép trước khi chuyển sang OPEN.
  - Thời gian chờ (Timeout): Khoảng thời gian ở trạng thái OPEN trước khi chuyển sang HALF_OPEN.
- Luồng hoạt động:
  - CLOSED: Gửi yêu cầu. Nếu thành công, reset bộ đếm lỗi. Nếu lỗi, tăng bộ đếm lỗi. Nếu bộ đếm lỗi vượt ngưỡng -> chuyển sang OPEN, bắt đầu đếm thời gian chờ.
  - OPEN: Từ chối ngay lập tức mọi yêu cầu (hoặc trả về giá trị mặc định/fallback). Khi hết thời gian chờ -> chuyển sang HALF_OPEN.
  - HALF_OPEN: Cho phép một số lượng giới hạn yêu cầu đi qua. Nếu yêu cầu thành công -> chuyển về CLOSED, reset bộ đếm. Nếu yêu cầu thất bại -> quay lại OPEN, bắt đầu lại thời gian chờ.

### Retry (Thử lại)

Tự động thực hiện lại một yêu cầu nếu nó thất bại (thường là do lỗi tạm thời như lỗi mạng). Nên kết hợp với cơ chế chờ tăng dần (exponential backoff) để tránh làm quá tải dịch vụ đích.

Xử lý các lỗi tạm thời một cách tự động.

Chỉ nên retry các thao tác an toàn (idempotent - thực hiện nhiều lần cho kết quả như một lần) hoặc khi biết chắc lỗi là tạm thời.

- Vòng lặp: Đặt lời gọi dịch vụ bên trong một vòng lặp (ví dụ: for hoặc while).
  Biến đếm: Giới hạn số lần thử lại tối đa.
- Xử lý lỗi: Bắt lỗi từ lời gọi dịch vụ. Kiểm tra xem lỗi có thuộc loại nên thử lại hay không (ví dụ: lỗi mạng tạm thời, lỗi 5xx, không phải lỗi 4xx như Bad Request).
- Delay (Trì hoãn): Trước khi thử lại, đợi một khoảng thời gian.
- Backoff: Thường sử dụng chiến lược tăng thời gian chờ giữa các lần thử lại (ví dụ: Exponential Backoff - thời gian chờ = base_delay \* 2 ^ (số_lần_thử_lại)), để tránh làm quá tải dịch vụ đích.

### Timeout (Hết thời gian chờ)

Đặt một khoảng thời gian chờ tối đa cho một yêu cầu. Nếu không nhận được phản hồi trong khoảng thời gian đó, yêu cầu sẽ bị hủy và coi là thất bại.

Tránh việc một dịch vụ bị treo vô thời hạn khi chờ đợi một dịch vụ khác phản hồi quá chậm.

### Bulkhead (Vách ngăn)

Cách ly các tài nguyên (ví dụ: connection pool, thread pool) được sử dụng để tương tác với các dịch vụ khác nhau. Nếu một dịch vụ đích bị chậm hoặc lỗi, nó chỉ làm cạn kiệt tài nguyên trong "vách ngăn" của nó, không ảnh hưởng đến khả năng gọi các dịch vụ khác.

Ngăn chặn lỗi của một thành phần ảnh hưởng đến toàn bộ hệ thống.

- Phân nhóm: Xác định các nhóm tài nguyên riêng biệt cho các lời gọi đến các dịch vụ đích khác nhau (hoặc các loại yêu cầu khác nhau).
- Giới hạn tài nguyên: Sử dụng các cơ chế như:
  - Thread Pools: Cấp phát các pool luồng riêng biệt cho mỗi nhóm. Nếu pool đầy, yêu cầu mới cho nhóm đó sẽ bị từ chối hoặc đưa vào hàng đợi.
  - Semaphores: Sử dụng semaphore để giới hạn số lượng yêu cầu đồng thời cho mỗi nhóm.
  - Connection Pools: Sử dụng các pool kết nối cơ sở dữ liệu/HTTP riêng biệt.
- Cách ly: Đảm bảo rằng việc cạn kiệt tài nguyên trong một "vách ngăn" không ảnh hưởng đến các "vách ngăn" khác.

### Rate Limiter (Giới hạn tần suất)

Kiểm soát số lượng yêu cầu mà một dịch vụ gửi đi hoặc chấp nhận trong một khoảng thời gian nhất định.

Bảo vệ dịch vụ khỏi bị quá tải bởi số lượng yêu cầu lớn đột ngột.

- Token Bucket:
  - Duy trì một "xô" chứa "token", được đổ đầy lại với một tốc độ cố định.
  - Mỗi yêu cầu đến cần lấy 1 token từ xô. Nếu xô hết token, yêu cầu bị từ chối/xếp hàng.
  - Cần lưu số lượng token hiện tại và thời điểm đổ đầy token lần cuối.
- Leaky Bucket:
  - Yêu cầu đến được đưa vào một hàng đợi (xô) có kích thước cố định.
  - Xử lý yêu cầu từ hàng đợi với một tốc độ cố định (như nước rỉ ra từ xô).
  - Nếu hàng đợi đầy, yêu cầu mới bị từ chối.
- Fixed Window Counter:
  - Chia thời gian thành các cửa sổ cố định (ví dụ: 60 giây).
  - Đếm số yêu cầu trong cửa sổ hiện tại.
  - Nếu số yêu cầu vượt ngưỡng, từ chối yêu cầu mới.
  - Reset bộ đếm khi bắt đầu cửa sổ mới.
- Sliding Window Log:
  - Lưu trữ timestamp của các yêu cầu gần đây trong một danh sách/log.
  - Khi có yêu cầu mới, xóa các timestamp cũ hơn khoảng thời gian giới hạn (ví dụ: cũ hơn 60 giây).
  - Đếm số timestamp còn lại. Nếu vượt ngưỡng, từ chối. Thêm timestamp mới nếu chấp nhận.
- Sliding Window Counter (Hiệu quả hơn): Kết hợp ý tưởng của Fixed Window và Sliding Log để ước tính số lượng yêu cầu trong cửa sổ trượt mà không cần lưu tất cả timestamp.
