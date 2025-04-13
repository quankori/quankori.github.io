---
title: Design Principle
---

## Monolithic First Strategy: Khởi đầu Đơn giản

Đây là một chiến lược phát triển đề xuất việc bắt đầu xây dựng ứng dụng dưới dạng một khối đơn nhất (monolith) thay vì ngay lập tức chia nhỏ thành nhiều microservices. Chỉ khi ứng dụng phát triển, trở nên phức tạp và các ranh giới nghiệp vụ (bounded contexts) trở nên rõ ràng hơn, chúng ta mới xem xét việc tách dần các thành phần ra thành microservices.

- Lý do:

  - Đơn giản ban đầu: Phát triển, kiểm thử và triển khai một monolith ban đầu thường nhanh và dễ dàng hơn nhiều so với việc thiết lập và quản lý một hệ sinh thái microservices phức tạp.

  - Chưa rõ ràng về ranh giới: Khi bắt đầu một dự án mới, việc xác định đúng các ranh giới để chia microservices có thể rất khó khăn. Chia sai có thể dẫn đến phụ thuộc chặt chẽ và chi phí tái cấu trúc cao sau này.

  - Giảm chi phí vận hành ban đầu: Không cần đầu tư vào các công cụ phức tạp cho service discovery, distributed tracing, message queues,... ngay từ đầu.

- Ưu điểm:

  - Tăng tốc độ phát triển ở giai đoạn đầu.

  - Dễ dàng hơn trong việc refactor code trong cùng một codebase.

  - Đơn giản hóa việc triển khai và gỡ lỗi ban đầu.

- Nhược điểm:

  - Nếu không thiết kế cẩn thận ngay từ đầu (ví dụ: modular monolith), việc tách monolith sau này có thể rất khó khăn và tốn kém ("monolith bùn" - big ball of mud).

  - Khó khăn trong việc scale các thành phần riêng lẻ.

  - Rào cản trong việc áp dụng các công nghệ khác nhau cho các phần khác nhau của ứng dụng.

## Polyglot Persistence: Đa dạng Lưu trữ Dữ liệu

Thay vì cố gắng sử dụng một loại cơ sở dữ liệu duy nhất cho tất cả các nhu cầu lưu trữ của ứng dụng, Polyglot Persistence đề xuất việc sử dụng nhiều công nghệ lưu trữ dữ liệu khác nhau, lựa chọn loại phù hợp nhất cho từng loại dữ liệu hoặc yêu cầu truy cập cụ thể.

- Ví dụ:

  - Sử dụng Relational Database (SQL) (như PostgreSQL, MySQL) cho dữ liệu có cấu trúc rõ ràng, cần đảm bảo tính toàn vẹn (ACID), và các mối quan hệ phức tạp (ví dụ: thông tin người dùng, đơn hàng).

  - Sử dụng Document Database (NoSQL) (như MongoDB, Couchbase) cho dữ liệu bán cấu trúc hoặc không có cấu trúc cố định, cần sự linh hoạt về schema (ví dụ: catalog sản phẩm, nội dung bài viết).

  - Sử dụng Key-Value Store (NoSQL) (như Redis, Memcached) cho việc truy cập dữ liệu cực nhanh dựa trên key, thường dùng cho caching hoặc session management.

  - Sử dụng Search Engine (như Elasticsearch, OpenSearch) cho nhu cầu tìm kiếm toàn văn (full-text search) phức tạp và phân tích dữ liệu log.

  - Sử dụng Graph Database (NoSQL) (như Neo4j) cho dữ liệu có mối quan hệ mạng lưới phức tạp (ví dụ: mạng xã hội, hệ thống gợi ý).

- Ưu điểm:

  - Tối ưu hóa hiệu năng lưu trữ và truy vấn cho từng loại dữ liệu/tác vụ cụ thể.

  - Tăng tính linh hoạt và khả năng mở rộng cho từng phần của hệ thống.

  - Cho phép lựa chọn công nghệ phù hợp nhất với bài toán.

- Nhược điểm:

  - Tăng độ phức tạp trong việc quản lý và vận hành nhiều loại database khác nhau.

  - Đòi hỏi đội ngũ phát triển có kiến thức về nhiều công nghệ lưu trữ.

  - Khó khăn hơn trong việc đảm bảo tính nhất quán dữ liệu giữa các hệ thống lưu trữ khác nhau (có thể cần dùng SAGA hoặc các pattern khác).

## Core Development Principles: Kim chỉ nam cho Code Chất lượng

Đây là những nguyên tắc cơ bản, được đúc kết qua thời gian, giúp lập trình viên viết code dễ hiểu, dễ bảo trì, dễ mở rộng và ít lỗi hơn.

**SOLID**: Bộ 5 nguyên tắc thiết kế hướng đối tượng:

- S - Single Responsibility Principle (Nguyên tắc Đơn trách nhiệm): Mỗi class/module chỉ nên chịu trách nhiệm về một phần chức năng duy nhất của phần mềm. Thay đổi một chức năng không nên ảnh hưởng đến các chức năng khác.

- O - Open/Closed Principle (Nguyên tắc Đóng/Mở): Các thực thể phần mềm (class, module, function) nên mở cho việc mở rộng (adding new functionality) nhưng đóng cho việc sửa đổi (changing existing code). Thường đạt được qua kế thừa hoặc sử dụng interface/abstract class.

- L - Liskov Substitution Principle (Nguyên tắc Thay thế Liskov): Các đối tượng của lớp con (subclass) phải có thể thay thế các đối tượng của lớp cha (superclass) mà không làm thay đổi tính đúng đắn của chương trình. Lớp con không nên thay đổi hành vi cơ bản của lớp cha.

- I - Interface Segregation Principle (Nguyên tắc Phân tách Interface): Client không nên bị buộc phải phụ thuộc vào các interface mà chúng không sử dụng. Nên chia nhỏ các interface lớn thành các interface nhỏ hơn, cụ thể hơn.

- D - Dependency Inversion Principle (Nguyên tắc Đảo ngược Phụ thuộc): Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả hai nên phụ thuộc vào các abstraction (ví dụ: interface). Abstraction không nên phụ thuộc vào chi tiết, mà chi tiết nên phụ thuộc vào abstraction. (Xem thêm về IoC/DI).

**DRY (Don't Repeat Yourself - Đừng Lặp lại Chính mình)**: Tránh trùng lặp code. Mọi phần kiến thức hoặc logic nên có một đại diện duy nhất, rõ ràng, có thẩm quyền trong hệ thống. Sử dụng hàm, lớp, module để tái sử dụng code.

**KISS (Keep It Simple, Stupid - Giữ nó Đơn giản, Ngốc ạ)**: Ưu tiên các giải pháp đơn giản, dễ hiểu. Tránh sự phức tạp không cần thiết. Code đơn giản dễ đọc, dễ debug và dễ bảo trì hơn.

**YAGNI (You Ain't Gonna Need It - Bạn sẽ không cần nó đâu)**: Chỉ nên implement những chức năng thực sự cần thiết ở thời điểm hiện tại. Đừng thêm các chức năng "có thể cần trong tương lai" vì điều đó thường dẫn đến code thừa, phức tạp và tốn thời gian mà không mang lại giá trị ngay lập tức.

**GRASP (General Responsibility Assignment Software Patterns - Các Pattern Gán Trách nhiệm Phần mềm Tổng quát)**: Là một tập hợp các nguyên tắc (pattern) hướng dẫn việc gán trách nhiệm (responsibility) cho các đối tượng trong thiết kế hướng đối tượng. Một số pattern phổ biến trong GRASP bao gồm Information Expert (Gán trách nhiệm cho lớp có thông tin cần thiết), Creator (Ai nên tạo đối tượng?), Controller (Ai xử lý yêu cầu hệ thống?), Low Coupling (Giảm sự phụ thuộc), High Cohesion (Tăng sự gắn kết bên trong module). GRASP là một chủ đề lớn và sâu hơn, đáng để tìm hiểu riêng.

## Inversion of Control (IoC - Đảo ngược Điều khiển)

Là một nguyên tắc thiết kế phần mềm trong đó luồng điều khiển của chương trình bị "đảo ngược". Thay vì code của bạn gọi đến các thư viện hoặc framework để thực hiện tác vụ, thì framework hoặc container sẽ gọi đến code của bạn tại những điểm xác định.

Ví dụ: Trong lập trình GUI truyền thống, bạn viết một vòng lặp chính để chờ đợi input. Với IoC, bạn viết các event handler, và framework (ví dụ: thư viện UI) sẽ gọi các handler đó khi sự kiện xảy ra.

**Dependency Injection (DI - Tiêm Phụ thuộc)**: Là một pattern cụ thể để triển khai IoC. Thay vì một đối tượng tự tạo ra các phụ thuộc (dependencies - các đối tượng khác mà nó cần để hoạt động), các phụ thuộc này được "tiêm" (inject) vào đối tượng từ bên ngoài (thường bởi một framework hoặc container IoC). Việc tiêm có thể thực hiện qua constructor, setter method, hoặc interface.

Lợi ích của IoC/DI:

- Loose Coupling: Giảm sự phụ thuộc trực tiếp giữa các thành phần, làm cho hệ thống linh hoạt hơn.

- Tăng khả năng kiểm thử (Testability): Dễ dàng thay thế các phụ thuộc thật bằng các đối tượng giả (mock objects) trong unit test.

- Tăng khả năng tái sử dụng và bảo trì: Các thành phần ít phụ thuộc lẫn nhau hơn.

## CAP Theorem (Định lý CAP)

Là một định lý nền tảng trong khoa học máy tính về hệ thống phân tán, phát biểu rằng một hệ thống lưu trữ dữ liệu phân tán không thể đồng thời đảm bảo cả ba tính chất sau đây khi có sự cố phân vùng mạng (network partition):

**C - Consistency (Tính nhất quán)**: Mọi lượt đọc (read) đều nhận được dữ liệu ghi (write) gần nhất hoặc một lỗi. Tất cả các node trong hệ thống đều thấy cùng một dữ liệu tại cùng một thời điểm.

**A - Availability (Tính sẵn sàng)**: Mọi yêu cầu (request) gửi đến một node không bị lỗi đều nhận được phản hồi (không phải lỗi), nhưng không đảm bảo phản hồi đó chứa dữ liệu ghi gần nhất. Hệ thống luôn sẵn sàng hoạt động.

**P - Partition Tolerance (Khả năng chịu lỗi Phân vùng)**: Hệ thống vẫn tiếp tục hoạt động (đảm bảo C hoặc A) ngay cả khi có sự cố mất kết nối mạng (phân vùng) giữa các node.

Ý nghĩa: Trong thực tế, sự cố phân vùng mạng (P) là điều không thể tránh khỏi trong hệ thống phân tán. Do đó, định lý CAP buộc các nhà thiết kế hệ thống phải lựa chọn đánh đổi giữa Consistency (C) và Availability (A) khi xảy ra sự cố phân vùng.

**CP (Consistency + Partition Tolerance)**: Hệ thống ưu tiên tính nhất quán. Khi có phân vùng mạng, hệ thống có thể từ chối một số yêu cầu (trở nên không sẵn sàng - unavailable) để đảm bảo dữ liệu đọc ra luôn là mới nhất. Ví dụ: nhiều hệ thống RDBMS truyền thống, hệ thống tài chính.

**AP (Availability + Partition Tolerance)**: Hệ thống ưu tiên tính sẵn sàng. Khi có phân vùng mạng, hệ thống vẫn cố gắng trả lời mọi yêu cầu, nhưng dữ liệu trả về có thể không phải là mới nhất (eventual consistency). Ví dụ: nhiều hệ thống NoSQL như Cassandra, DynamoDB (ở cấu hình mặc định), hệ thống mạng xã hội.

Lưu ý: Sự đánh đổi chỉ xảy ra khi có sự cố phân vùng mạng. Khi mạng ổn định, hệ thống có thể cố gắng cung cấp cả C và A.

## Scalability Principles (Nguyên tắc về Khả năng Mở rộng)

Scalability là khả năng của hệ thống xử lý được lượng tải (workload) ngày càng tăng bằng cách thêm tài nguyên.

**Horizontal Scaling (Scale Out - Mở rộng Ngang)**: Thêm nhiều máy chủ (nodes) vào hệ thống để phân tán tải. Thường hiệu quả về chi phí và linh hoạt hơn.

**Vertical Scaling (Scale Up - Mở rộng Dọc)**: Tăng cường tài nguyên (CPU, RAM, Disk) cho một máy chủ hiện có. Có giới hạn vật lý và chi phí tăng nhanh.

**Statelessness (Phi trạng thái)**: Thiết kế các thành phần xử lý (ví dụ: application server) không lưu trữ trạng thái của client giữa các request. Trạng thái được lưu ở client hoặc một nơi lưu trữ tập trung (như database, cache). Điều này giúp dễ dàng scale ngang vì bất kỳ server nào cũng có thể xử lý bất kỳ request nào.

**Asynchronous Communication (Giao tiếp Bất đồng bộ)**: Sử dụng message queues hoặc event streams để tách rời các thành phần. Service gửi không cần đợi service nhận xử lý xong. Giúp hệ thống phản hồi nhanh hơn và chịu lỗi tốt hơn.

**Caching**: Lưu trữ dữ liệu thường xuyên truy cập hoặc kết quả tính toán tốn kém vào bộ nhớ đệm nhanh (in-memory, Redis, Memcached) để giảm tải cho database và tăng tốc độ phản hồi.

**Database Scaling**:

- Read Replicas: Tạo các bản sao chỉ đọc (read replicas) của database để xử lý các truy vấn đọc, giảm tải cho database chính (master).

- Sharding: Phân chia dữ liệu database thành các phần nhỏ hơn (shards) và lưu trữ chúng trên nhiều server database khác nhau. Phức tạp nhưng hiệu quả cho việc scale cả ghi (write) và đọc (read) với lượng dữ liệu cực lớn.

**Load Balancing**: Phân phối các request đến một cách đồng đều giữa nhiều server backend, tránh tình trạng quá tải cho một server đơn lẻ.
