---
title: Event-Driven Architecture
---

Các khái niệm xoay quanh "sự kiện" (event) đóng vai trò quan trọng trong nhiều kiến trúc phần mềm hiện đại, giúp xây dựng các hệ thống linh hoạt, có khả năng mở rộng và phục hồi tốt. Bài viết này sẽ làm rõ ba khái niệm cốt lõi thường đi cùng nhau:

- Event-Driven Architecture (EDA - Kiến trúc hướng sự kiện)

- Event Sourcing

- Events Processing (Xử lý sự kiện)

## Event-Driven Architecture

Đây là một mẫu kiến trúc phần mềm nơi các thành phần (thường là các dịch vụ hoặc microservices) giao tiếp với nhau một cách không đồng bộ thông qua việc sản xuất (producing) và tiêu thụ (consuming) các sự kiện (events).

Thay vì một thành phần gọi trực tiếp một thành phần khác theo kiểu yêu cầu-phản hồi (request-response), một thành phần sẽ phát ra một sự kiện khi có điều gì đó đáng chú ý xảy ra trong hệ thống (ví dụ: OrderPlaced, UserRegistered, InventoryUpdated). Các thành phần khác quan tâm đến loại sự kiện đó sẽ đăng ký lắng nghe và phản ứng lại một cách độc lập khi sự kiện xảy ra.

#### Thành phần chính:

- Event Producers (Nguồn phát sự kiện): Các thành phần tạo ra và gửi đi sự kiện đến kênh sự kiện.

- Event Consumers (Bên tiêu thụ sự kiện / Subscribers / Listeners): Các thành phần đăng ký nhận và xử lý các loại sự kiện cụ thể từ kênh sự kiện.

- Event Channel / Broker / Bus (Kênh/Môi giới/Trục sự kiện): Thành phần trung gian, chịu trách nhiệm tiếp nhận sự kiện từ Producers và phân phối chúng đến các Consumers quan tâm. Ví dụ phổ biến: Apache Kafka, RabbitMQ, Azure Event Hub, Google Cloud Pub/Sub.

#### Đặc điểm nổi bật:

- Asynchronous (Không đồng bộ): Producer không cần chờ Consumer xử lý xong sự kiện.

- Loose Coupling (Khớp nối lỏng): Producer và Consumer không cần biết về sự tồn tại trực tiếp của nhau, chúng chỉ cần biết về sự kiện và kênh sự kiện. Điều này giúp dễ dàng thay đổi, thêm, bớt các thành phần.

- Scalability (Khả năng mở rộng): Có thể dễ dàng tăng số lượng Consumer để xử lý nhiều sự kiện hơn hoặc tăng số lượng Producer.

- Resilience (Khả năng phục hồi): Nếu một Consumer bị lỗi, các Consumer khác và Producer vẫn có thể tiếp tục hoạt động. Kênh sự kiện thường có cơ chế lưu trữ và đảm bảo gửi lại sự kiện.

## Event Sourcing

Đây là một mẫu (pattern) dùng để lưu trữ trạng thái (state) của một đối tượng nghiệp vụ (thường là một Aggregate trong Domain-Driven Design - DDD). Thay vì chỉ lưu trạng thái hiện tại của đối tượng, Event Sourcing lưu trữ toàn bộ chuỗi các sự kiện đã xảy ra với đối tượng đó theo trình tự thời gian.

Mỗi khi có một hành động làm thay đổi trạng thái của đối tượng, hệ thống không cập nhật trực tiếp bản ghi trạng thái hiện tại. Thay vào đó, nó ghi lại một sự kiện không thể thay đổi (immutable event) mô tả chính xác sự thay đổi đó. Ví dụ, với một đơn hàng: OrderCreated, ItemAddedToOrder, ShippingAddressUpdated, OrderShipped.

Trạng thái hiện tại của đối tượng có thể được tính toán hoặc tái tạo bất cứ lúc nào bằng cách đọc và áp dụng (replay) toàn bộ chuỗi sự kiện liên quan đến đối tượng đó từ đầu đến cuối.

Trong Event Sourcing, chính chuỗi các sự kiện (event log hay event stream) là nguồn dữ liệu gốc và đáng tin cậy nhất, không phải là trạng thái hiện tại được tính toán.

#### Lợi ích:

- Audit Trail (Lịch sử kiểm toán): Cung cấp một lịch sử đầy đủ và chi tiết về mọi thay đổi đã xảy ra với đối tượng.

- State Reconstruction (Tái tạo trạng thái): Có thể tái tạo trạng thái của đối tượng tại bất kỳ thời điểm nào trong quá khứ bằng cách replay các sự kiện đến thời điểm đó.

- Temporal Queries (Truy vấn theo thời gian): Dễ dàng trả lời các câu hỏi liên quan đến lịch sử thay đổi.

- Decoupling & CQRS: Thường đi kèm và là nền tảng tốt để triển khai mô hình CQRS (Command Query Responsibility Segregation), tách biệt việc xử lý lệnh (ghi dữ liệu) và truy vấn (đọc dữ liệu).

## Events Processing

Đây là thuật ngữ chung chỉ các hoạt động liên quan đến việc tiếp nhận, phân tích, diễn giải và phản ứng lại các sự kiện xảy ra trong hệ thống. Về cơ bản, đây là công việc mà các Event Consumers trong kiến trúc EDA thực hiện.

Xử lý sự kiện là cơ chế trung tâm cho phép các hệ thống hướng sự kiện phản ứng lại với những thay đổi, thực thi logic nghiệp vụ, cập nhật trạng thái, và kích hoạt các hành động tiếp theo.

#### Các loại hình xử lý sự kiện phổ biến:

- Simple Event Processing (Xử lý sự kiện đơn giản): Xử lý từng sự kiện một cách độc lập ngay khi nó xảy ra. Logic xử lý thường đơn giản và trực tiếp.

Ví dụ: Khi nhận sự kiện PasswordResetRequested, gửi email chứa link đặt lại mật khẩu.

- Complex Event Processing (CEP - Xử lý sự kiện phức tạp): Tập trung vào việc phát hiện các mẫu (patterns), mối tương quan và các mối quan hệ phức tạp giữa nhiều sự kiện khác nhau theo thời gian để suy ra những sự kiện hoặc tình huống mới, có ý nghĩa hơn.

Ví dụ: Phát hiện cơ hội kinh doanh bằng cách nhận thấy sự kiện "khách hàng xem sản phẩm A" và "khách hàng xem sản phẩm B" xảy ra trong vòng 5 phút, từ đó suy ra sự kiện "khách hàng quan tâm đến gói sản phẩm A+B". Hoặc phát hiện gian lận khi có nhiều giao dịch nhỏ đáng ngờ xảy ra liên tiếp.

- Event Stream Processing (ESP - Xử lý luồng sự kiện): Xử lý các dòng dữ liệu (luồng sự kiện) liên tục và không có điểm dừng một cách theo thời gian thực hoặc gần thời gian thực. Thường bao gồm các hoạt động như lọc (filtering), biến đổi (transformation), tổng hợp (aggregation) dữ liệu trên các cửa sổ thời gian (time windows).

Ví dụ: Tính toán số lượng người dùng đang hoạt động trong 1 phút qua dựa trên luồng sự kiện đăng nhập/đăng xuất; phân tích dữ liệu từ cảm biến IoT liên tục.
