---
title: Database
---

## AWS Database Migration Service

AWS Database Migration Service (AWS DMS) là một dịch vụ của Amazon Web Services (AWS) cho phép di chuyển dữ liệu từ một nơi đến nơi khác, giữa các cơ sở dữ liệu khác nhau. AWS DMS giúp người dùng sao chép cơ sở dữ liệu đến hoặc từ AWS Cloud, và giữ nguyên tính toàn vẹn và khả năng truy cập của dữ liệu trong quá trình di chuyển.

AWS DMS hỗ trợ nhiều loại cơ sở dữ liệu, bao gồm MySQL, PostgreSQL, Oracle, SQL Server và MongoDB. Nó cung cấp các công cụ để tối ưu hóa và can thiệp vào quá trình di chuyển dữ liệu, như lọc và biến đổi dữ liệu.

Các tính năng chính của AWS DMS bao gồm:

- Khả năng di chuyển dữ liệu giữa các cơ sở dữ liệu khác nhau.
- Hỗ trợ cho nhiều loại cơ sở dữ liệu.
- Tùy chọn lọc và biến đổi dữ liệu trong quá trình di chuyển.
- Cải thiện hiệu suất và tối ưu hóa quá trình di chuyển dữ liệu.
- Đảm bảo tính toàn vẹn và khả năng truy cập của dữ liệu trong quá trình di chuyển.

Với AWS DMS, người dùng có thể dễ dàng di chuyển cơ sở dữ liệu của họ giữa các nền tảng khác nhau mà không cần phải lo lắng về việc mất dữ liệu hoặc gián đoạn kết nối. AWS DMS giúp tăng tính linh hoạt của kiến trúc cơ sở dữ liệu và giảm chi phí và thời gian cho quá trình di chuyển.

## AWS DynamoDB

Amazon DynamoDB là một dịch vụ cơ sở dữ liệu NoSQL được quản lý và cung cấp bởi Amazon Web Services (AWS). Nó được thiết kế để xử lý các ứng dụng web có khả năng mở rộng cao, đáp ứng với hàng triệu yêu cầu trong giây đồng thời từ các ứng dụng phức tạp.

### DynamoDB Streams

DynamoDB Streams là một tính năng của dịch vụ cơ sở dữ liệu NoSQL DynamoDB của Amazon Web Services (AWS). Nó cung cấp một luồng dữ liệu thời gian thực của các thay đổi dữ liệu được lưu trữ trong bảng DynamoDB, cho phép các ứng dụng khác có thể xử lý các sự kiện này để thực hiện các tác vụ như đồng bộ hóa dữ liệu, xây dựng bản sao dự phòng hoặc phân tích dữ liệu.

Khi một thay đổi dữ liệu được thực hiện trong bảng DynamoDB, DynamoDB Streams sẽ ghi lại sự kiện đó và phát ra thông báo cho các ứng dụng kết nối đến luồng dữ liệu. Điều này giúp các ứng dụng có thể theo dõi các thay đổi dữ liệu trên bảng DynamoDB một cách nhanh chóng và hiệu quả.

DynamoDB Streams hỗ trợ tính năng tự động phân tán, tự động mở rộng và đảm bảo tính sẵn sàng cao thông qua việc lưu trữ dữ liệu trên nhiều vùng khác nhau và tự động điều chỉnh luồng dữ liệu khi có nhu cầu mở rộng hoặc giảm thiểu quy mô.
