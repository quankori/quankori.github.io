---
title: System Design Pattern
---

## SAGA Pattern: Quản lý Transaction Phân tán

Trong kiến trúc microservices, một nghiệp vụ kinh doanh (business transaction) thường phải trải qua nhiều service khác nhau. Việc duy trì tính nhất quán dữ liệu (consistency) trở nên phức tạp vì chúng ta không thể sử dụng các transaction ACID truyền thống kéo dài qua nhiều database độc lập. SAGA pattern ra đời để giải quyết vấn đề này.

Một SAGA là một chuỗi các local transaction. Mỗi local transaction trong SAGA sẽ cập nhật dữ liệu trong một service cụ thể và phát ra một message hoặc event để kích hoạt local transaction tiếp theo trong service khác. Nếu một local transaction thất bại, SAGA sẽ thực thi các compensating transaction để hoàn tác (undo) các thay đổi đã được thực hiện bởi các local transaction trước đó, đảm bảo tính nhất quán cuối cùng (eventual consistency).

Có hai cách chính để điều phối SAGA:

### Choreography (Điều phối Phi tập trung)

Mỗi service tự biết phải làm gì tiếp theo dựa trên các event nhận được từ các service khác. Không có một bộ điều phối trung tâm.

Service A hoàn thành local transaction, publish một event (ví dụ: OrderCreated). Service B lắng nghe event này, thực hiện local transaction của mình và publish event tiếp theo (ví dụ: PaymentProcessed). Service C lắng nghe event của B, v.v. Nếu Service B thất bại, nó sẽ publish một event lỗi (ví dụ: PaymentFailed), và Service A (hoặc một service khác) sẽ lắng nghe event này để thực thi compensating transaction (ví dụ: hủy đơn hàng).

Ưu điểm:

- Đơn giản, dễ hiểu cho các SAGA ngắn.

- Không có điểm lỗi trung tâm (single point of failure) trong việc điều phối.

- Các service ít phụ thuộc (loosely coupled).

Nhược điểm:

- Khó theo dõi luồng nghiệp vụ khi SAGA có nhiều bước.

- Dễ xảy ra phụ thuộc vòng (cyclic dependencies) giữa các service nếu không cẩn thận.

- Việc debug và kiểm thử trở nên phức tạp.

### Orchestration (Điều phối Tập trung)

Có một service điều phối trung tâm (Orchestrator) chịu trách nhiệm chỉ đạo luồng SAGA. Orchestrator gửi các command đến từng service để yêu cầu thực hiện local transaction và nhận lại kết quả (hoặc event).

Client gửi request tạo đơn hàng đến Orchestrator. Orchestrator gửi command CreateOrder đến Order Service. Order Service thực hiện xong, trả kết quả về Orchestrator. Orchestrator gửi command ProcessPayment đến Payment Service. Nếu Payment Service thành công, Orchestrator gửi command ShipOrder đến Shipping Service. Nếu Payment Service thất bại, Orchestrator sẽ gửi command CancelOrder (compensating transaction) đến Order Service.

Ưu điểm:

- Luồng nghiệp vụ được quản lý tập trung, dễ hiểu và theo dõi.

- Dễ dàng quản lý các phụ thuộc và logic phức tạp.

- Ít khả năng xảy ra phụ thuộc vòng.

Nhược điểm:

- Orchestrator có thể trở thành điểm lỗi trung tâm.

- Logic nghiệp vụ tập trung quá nhiều vào Orchestrator.

- Các service tham gia SAGA phụ thuộc vào Orchestrator.

## CQRS (Command Query Responsibility Segregation)

Là một mẫu (pattern) tách biệt hoàn toàn trách nhiệm giữa việc thay đổi trạng thái hệ thống (thông qua các Commands) và việc truy vấn trạng thái hệ thống (thông qua các Queries)

**Commands**: Đại diện cho ý định thay đổi trạng thái (ví dụ: CreateUserCommand, UpdateProductPriceCommand). Chúng thường không trả về dữ liệu mà chỉ báo thành công/thất bại. Logic xử lý command có thể phức tạp.

**Queries**: Đại diện cho yêu cầu lấy dữ liệu (ví dụ: GetUserByIdQuery, GetProductsByCategoryQuery). Chúng chỉ đọc dữ liệu và không làm thay đổi trạng thái. Logic xử lý query thường đơn giản hơn.

Mô hình dữ liệu riêng biệt (Optional but common): Thường đi kèm với việc sử dụng các mô hình dữ liệu (data models) khác nhau cho việc ghi (write model - tối ưu cho việc ghi và đảm bảo tính nhất quán) và việc đọc (read model(s) - tối ưu cho việc truy vấn nhanh, có thể là các view được chuẩn bị sẵn, denormalized). Dữ liệu từ write model thường được cập nhật sang read model(s) một cách bất đồng bộ (ví dụ: thông qua events).

Lợi ích: Tối ưu hóa độc lập cho việc đọc và ghi, cải thiện hiệu năng, khả năng mở rộng (có thể scale riêng phần đọc và phần ghi), đơn giản hóa các mô hình dữ liệu phức tạp.

## Backends for Frontend (BFF): Tối ưu Giao diện Người dùng

BFF là một pattern kiến trúc nơi bạn tạo ra các backend API riêng biệt, được tối ưu hóa cho từng loại giao diện người dùng (frontend client) cụ thể (ví dụ: web app, mobile app, desktop app). Thay vì một API gateway chung chung, mỗi client type sẽ có một BFF riêng.

Các loại client khác nhau thường có nhu cầu dữ liệu và định dạng khác nhau. Một API chung có thể trả về quá nhiều hoặc quá ít dữ liệu, hoặc định dạng không phù hợp, buộc client phải xử lý thêm logic. BFF giúp đơn giản hóa phía client.

BFF đóng vai trò như một lớp trung gian giữa client và các microservices hạ nguồn (downstream). Nó nhận request từ client, gọi đến một hoặc nhiều microservices cần thiết, tổng hợp, biến đổi dữ liệu và trả về kết quả theo đúng định dạng mà client đó mong muốn.

Ưu điểm:

- Tối ưu hóa trải nghiệm cho từng loại client.

- Giảm logic xử lý ở phía client.

- Cho phép các team frontend phát triển độc lập hơn với các backend service chung.

- Cải thiện bảo mật bằng cách chỉ expose những gì cần thiết cho từng client.

Nhược điểm:

- Tăng số lượng backend cần phát triển và quản lý.

- Có thể dẫn đến trùng lặp code giữa các BFF nếu không quản lý tốt.

- Tăng thêm một lớp mạng (network hop).

## Transactional Outbox và Inbox Pattern: Đảm bảo Tin cậy trong Giao tiếp Bất đồng bộ

Khi một service cần cập nhật database của mình VÀ gửi một message/event đến một service khác (ví dụ: thông qua message queue như Kafka, RabbitMQ), làm thế nào để đảm bảo cả hai hành động này xảy ra một cách nguyên tử (atomic)? Nếu cập nhật DB thành công nhưng gửi message thất bại (hoặc ngược lại), hệ thống sẽ rơi vào trạng thái không nhất quán.

### Transactional Outbox

Thay vì trực tiếp gửi message sau khi cập nhật DB, service sẽ ghi message đó vào một bảng đặc biệt trong cùng database gọi là "outbox table", trong cùng một local transaction với việc cập nhật dữ liệu nghiệp vụ.

Workflow:

1. Bắt đầu một local database transaction.

2. Cập nhật bảng dữ liệu nghiệp vụ (ví dụ: Orders).

3. Chèn một record mô tả message/event vào bảng Outbox (chứa thông tin như đích đến, payload,...).

4. Commit database transaction.

5. Một tiến trình riêng biệt (message relay/event publisher) sẽ theo dõi bảng Outbox, đọc các message chưa gửi và publish chúng lên message broker. Sau khi publish thành công, message trong bảng Outbox sẽ được đánh dấu là đã gửi hoặc xóa đi.

Vì cả việc cập nhật dữ liệu nghiệp vụ và ghi vào outbox đều nằm trong cùng một DB transaction, chúng sẽ hoặc cùng thành công hoặc cùng thất bại (atomicity). Tiến trình relay đảm bảo message cuối cùng sẽ được gửi đi (at-least-once delivery).

### Transactional Inbox

Là pattern phía service nhận message, đảm bảo việc xử lý message và cập nhật trạng thái là idempotent (thực hiện nhiều lần không thay đổi kết quả sau lần đầu thành công) và đáng tin cậy.

Workflow:

1. Service nhận (consumer) đọc message từ message broker.

2. Ghi thông tin message (ví dụ: message ID) vào một bảng Inbox trong database của mình. Kiểm tra xem message ID này đã được xử lý chưa. Nếu đã xử lý, bỏ qua message (đảm bảo idempotency).

3. Nếu chưa xử lý:

- Bắt đầu một local database transaction.

- Xử lý message (ví dụ: cập nhật dữ liệu nghiệp vụ).

- Đánh dấu message trong bảng Inbox là đã xử lý.

- Commit database transaction.

Ngăn chặn việc xử lý trùng lặp message trong trường hợp message được gửi lại (at-least-once delivery từ broker).

## Fan-out/Fan-in Pattern: Xử lý Song song và Tổng hợp Kết quả

Đây là một pattern luồng công việc (workflow pattern) thường được sử dụng để tăng tốc độ xử lý bằng cách chia một tác vụ lớn thành nhiều tác vụ nhỏ hơn chạy song song (Fan-out) và sau đó tổng hợp kết quả từ các tác vụ con đó (Fan-in).

Hoạt động:

**Fan-out**: Một thành phần điều phối (dispatcher/orchestrator) nhận một yêu cầu hoặc một tập dữ liệu lớn. Nó chia nhỏ công việc hoặc dữ liệu thành nhiều phần và gửi từng phần đến các worker khác nhau để xử lý đồng thời/song song. Ví dụ: gửi các ID sản phẩm cần cập nhật giá đến nhiều instance của Price Update Service.

**Fan-in**: Sau khi các worker hoàn thành xử lý phần việc của mình, chúng gửi kết quả trở lại. Một thành phần tổng hợp (aggregator/collector) sẽ đợi nhận đủ kết quả từ các worker (hoặc đến một ngưỡng nào đó/timeout) và tổng hợp chúng thành kết quả cuối cùng. Ví dụ: nhận các trạng thái cập nhật giá từ các worker và báo cáo kết quả tổng thể.

Ưu điểm:

- Tăng đáng kể tốc độ xử lý cho các tác vụ có thể chia nhỏ và song song hóa.

- Cải thiện khả năng mở rộng bằng cách thêm nhiều worker hơn.

Nhược điểm:

- Phức tạp trong việc quản lý luồng công việc, xử lý lỗi của từng worker, và tổng hợp kết quả.

- Cần cơ chế để theo dõi trạng thái của các tác vụ con.

- Chi phí giao tiếp mạng giữa dispatcher, worker, và aggregator.

Khi nào sử dụng: Khi cần xử lý một lượng lớn dữ liệu hoặc thực hiện một tác vụ phức tạp có thể được chia thành các phần độc lập chạy song song để giảm thời gian hoàn thành tổng thể. Thường thấy trong xử lý batch, data processing pipelines, hoặc các hệ thống tính toán hiệu năng cao.

## Shared Database Anti-Pattern: Cạm bẫy Cần Tránh

Đây là một anti-pattern (một giải pháp phổ biến nhưng không hiệu quả và nên tránh) trong kiến trúc microservices, nơi nhiều service khác nhau cùng truy cập và thao tác trên cùng một schema database.

Tại sao là Anti-pattern:

- Coupling (Phụ thuộc chặt chẽ): Bất kỳ thay đổi nào trong schema database (thêm/sửa/xóa bảng, cột) bởi một team có thể ảnh hưởng hoặc làm hỏng các service khác đang dùng chung database đó. Điều này đi ngược lại nguyên tắc độc lập và tự chủ của microservices.

- Khó khăn trong việc phát triển và triển khai độc lập: Các team không thể tự do thay đổi cấu trúc dữ liệu của mình mà không cần phối hợp chặt chẽ và kiểm thử hồi quy (regression testing) trên tất cả các service liên quan.

- Khó khăn trong việc scale: Việc scale database trở nên phức tạp vì phải đáp ứng nhu cầu của nhiều service khác nhau với các pattern truy cập dữ liệu khác nhau. Khó tối ưu hóa database cho một service cụ thể.

- Rào cản công nghệ: Tất cả các service buộc phải sử dụng chung một công nghệ database, hạn chế khả năng lựa chọn công nghệ phù hợp nhất cho từng service.

Giải pháp thay thế: Mỗi microservice nên sở hữu dữ liệu và database riêng của mình (Database per Service pattern). Việc giao tiếp và chia sẻ dữ liệu giữa các service nên được thực hiện thông qua các API được định nghĩa rõ ràng hoặc qua cơ chế event/messaging (kết hợp với các pattern như SAGA, Outbox/Inbox nếu cần đảm bảo consistency).

Khi nào cần đặc biệt lưu ý: Khi chuyển đổi từ kiến trúc monolith sang microservices, việc tách database là một trong những thách thức lớn nhất và cần được thực hiện cẩn thận để tránh rơi vào anti-pattern này.
