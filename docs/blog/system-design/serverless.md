---
title: Serverless Architecture
---

Đây là một cách tiếp cận nơi nhà cung cấp đám mây (cloud provider) chịu trách nhiệm hoàn toàn việc quản lý cơ sở hạ tầng máy chủ, bao gồm việc cấp phát tài nguyên, vá lỗi hệ điều hành, và tự động co giãn (scaling). Nhà phát triển chỉ cần tập trung vào việc viết và triển khai mã nguồn (thường dưới dạng các hàm - functions) mà không cần bận tâm đến máy chủ vật lý hay ảo bên dưới.

Các đặc điểm chính:

1.  Không quản lý máy chủ (No Server Management): Đây là điểm cốt lõi. Bạn không cần phải lo lắng về việc cài đặt, cấu hình, bảo trì hay nâng cấp máy chủ.
2.  Function as a Service (FaaS): Là thành phần phổ biến nhất của serverless. Mã nguồn được tổ chức thành các hàm nhỏ, độc lập, chỉ chạy khi được kích hoạt bởi một sự kiện nào đó. Ví dụ: AWS Lambda, Azure Functions, Google Cloud Functions.
3.  Tự động co giãn (Automatic Scaling): Nền tảng đám mây tự động tăng hoặc giảm số lượng tài nguyên cần thiết để xử lý lượng tải hiện tại. Bạn không cần cấu hình auto-scaling thủ công.
4.  Thanh toán theo mức sử dụng (Pay-as-you-go / Pay-per-execution): Bạn thường chỉ trả tiền cho thời gian thực thi mã nguồn và tài nguyên đã tiêu thụ (ví dụ: số lượt gọi hàm, thời gian chạy, bộ nhớ sử dụng), thay vì trả tiền cho máy chủ chạy liên tục 24/7. Khi không có yêu cầu nào, bạn có thể không tốn chi phí tính toán.
5.  Hướng sự kiện (Event-Driven): Các hàm serverless thường được thiết kế để được kích hoạt bởi các sự kiện, ví dụ: một yêu cầu HTTP đến API Gateway, một tệp mới được tải lên bộ nhớ lưu trữ (S3, Blob Storage), một tin nhắn mới trong hàng đợi (SQS, Service Bus), một thay đổi trong cơ sở dữ liệu, hoặc một lịch trình định sẵn.
6.  Backend as a Service (BaaS): Serverless cũng thường tận dụng các dịch vụ backend được quản lý hoàn toàn khác như cơ sở dữ liệu (DynamoDB, Firestore), xác thực (Auth0, Firebase Auth), lưu trữ tệp...

Ưu điểm:

- Giảm gánh nặng vận hành và quản lý hạ tầng.
- Tiềm năng tiết kiệm chi phí (nếu ứng dụng có lưu lượng không đều).
- Tăng tốc độ phát triển và triển khai.
- Tự động co giãn linh hoạt.

Nhược điểm:

- Cold Starts: Có thể có độ trễ khi một hàm được gọi lần đầu tiên sau một thời gian không hoạt động.
- Vendor Lock-in: Phụ thuộc nhiều vào các dịch vụ và API của nhà cung cấp đám mây cụ thể.
- Hạn chế tài nguyên: Các hàm FaaS thường có giới hạn về thời gian thực thi, bộ nhớ, kích thước gói mã nguồn.
- Quản lý trạng thái: Các hàm FaaS thường là stateless, việc quản lý trạng thái giữa các lần gọi cần giải pháp bên ngoài (như database, cache).
- Khó gỡ lỗi và giám sát (Observability): Việc theo dõi và gỡ lỗi trong môi trường phân tán, không có máy chủ cố định có thể phức tạp hơn.

Tóm lại, Serverless là một mô hình mạnh mẽ cho phép tập trung vào logic nghiệp vụ, nhưng cũng cần cân nhắc kỹ các đặc điểm và thách thức của nó khi lựa chọn cho dự án. Nó có thể được dùng để xây dựng toàn bộ ứng dụng hoặc chỉ một phần của hệ thống, đôi khi kết hợp với microservices truyền thống.
