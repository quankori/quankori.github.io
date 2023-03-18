---
title: Amazon Elastic Compute Cloud
---

## Các loại EC2

- On-Demand Instances: Là loại EC2 hỗ trợ cho thuê máy ảo theo giờ, không yêu cầu các cam kết dài hạn hoặc trước đó. Loại này phù hợp cho các ứng dụng có tính linh động cao, nhu cầu sử dụng ngắn hạn hoặc có biến động lớn.

- Reserved Instances:

  - Standard Reserved Instances: Là loại EC2 cho phép đặt hàng trước để tự giữ chỗ sử dụng máy ảo và cam kết thanh toán chi phí sử dụng trong một khoảng thời gian từ 1 năm đến 3 năm. Loại này thường được sử dụng để ổn định chi phí cho các ứng dụng có nhu cầu sử dụng liên tục và có nhu cầu sử dụng trung bình đến cao.

  - Convertible Reserved Instances: Tương tự như loại Standard Reserved Instances, nhưng khác biệt ở chỗ người dùng có thể chuyển đổi loại instance này sang loại khác để đáp ứng nhu cầu của các ứng dụng khác nhau.

- Spot Instances: Là loại EC2 cho phép người dùng đấu giá giá sử dụng máy ảo dựa trên mức giá thị trường hiện tại. Khi giá cạnh tranh hơn so với giá đặt hàng trước, Spot instances sẽ được sử dụng, nhưng khi giá tăng trở lại, Spot instances có thể bị hủy bỏ.

- Mặc định EC2 sẽ là loại On-demand Instances.

### Loại thanh toán của Resverved Instnaces

- Partial Upfront: Là loại thanh toán trước cho Reserved Instances trong đó người dùng phải thanh toán một khoản tiền trước ở mức giá giảm và phải thanh toán chi phí sử dụng cho phần còn lại của thời gian đặt hàng.

- No Upfront: Là loại Reserved Instances không yêu cầu thanh toán trước (upfront payment), tuy nhiên giá chiết khấu sẽ thấp hơn so với Full Upfront và Partial Upfront.

- Deferred: Là loại Reserved Instances cho phép người dùng hoàn thành thanh toán trước vào cuối thời gian đặt hàng. Trước khi bắt đầu sử dụng Reserved Instances, người dùng chỉ cần thanh toán một khoản tiền nhỏ và phải thanh toán số tiền còn lại trước khi kỳ đặt hàng kết thúc.

- All Upfront: Là loại thanh toán trước cho Reserved Instances trong đó người dùng phải thanh toán toàn bộ chi phí đặt hàng trước khi bắt đầu sử dụng Reserved Instances. Với loại này, chi phí sử dụng máy ảo sẽ được giảm giá lớn nhất.

Loại chiết khấu ngon nhất: `All upfront payment for a 3-year term purchase`

## Cost allocation tag

Cost allocation tags là một tính năng của AWS cho phép bạn đính thẻ các tài nguyên của mình trong AWS với các nhãn (tags) để phân loại và theo dõi chi phí sử dụng của các tài nguyên đó. Nhãn (tag) được đính kèm với một tài nguyên có thể chứa thông tin về mục đích sử dụng, độ ưu tiên, phân loại vị trí, độ ưu tiên của dự án, v.v.

Việc đính thẻ cho các tài nguyên này giúp bạn hiểu rõ hơn về các chi phí của từng tài nguyên, các nhóm tài nguyên, hoặc toàn bộ hạ tầng AWS của bạn. Nó cũng giúp bạn theo dõi các dự án, chia sẻ chi phí và quản lý tài nguyên hiệu quả hơn. Cost allocation tags là một công cụ quan trọng trong việc quản lý chi phí của bạn trên nền tảng AWS.

## Lưu trữ

Có hai loại lưu trữ EC2 trong Amazon Web Services (AWS) là:

- Instance Store: Lưu trữ trên đĩa cục bộ của máy ảo EC2 và được sử dụng cho các ứng dụng có thể chịu mất mát dữ liệu và yêu cầu tốc độ cao. Tuy nhiên, dữ liệu sẽ bị mất nếu EC2 instance bị xóa hoặc gặp sự cố.

- Elastic Block Store (EBS): Là dịch vụ lưu trữ khối được sử dụng để lưu trữ dữ liệu trên phần cứng riêng biệt, đảm bảo tính liên tục và khả năng sao lưu. EBS có thể được gắn kèm và ngắt kết nối từ EC2 instances và có nhiều loại, bao gồm EBS GP2, EBS Provisioned IOPS, EBS Magnetic và EBS Throughput Optimized HDD.

Sự khác nhau giữa EBS và EFS là:

- Elastic Block Store (EBS): Lưu trữ dữ liệu trên phần cứng riêng biệt của AWS và được gắn kèm vào EC2 instances. Nó cung cấp hiệu suất cao, tính liên tục và khả năng sao lưu. EBS có thể được sử dụng cho các ứng dụng yêu cầu tính toàn vẹn dữ liệu và chịu mất mát dữ liệu ít hơn.

- Elastic File System (EFS): Lưu trữ dữ liệu trên nhiều EC2 instances và được chia sẻ qua mạng. Nó cung cấp khả năng mở rộng linh hoạt và dễ dàng quản lý cho các ứng dụng có nhu cầu chia sẻ dữ liệu giữa nhiều EC2 instances. EFS có tính năng tự phục hồi và đảm bảo tính toàn vẹn dữ liệu.

Về cơ bản, EBS được sử dụng cho các ứng dụng lưu trữ dữ liệu trên một máy chủ EC2 duy nhất, trong khi EFS được sử dụng cho các ứng dụng chia sẻ dữ liệu trên nhiều máy chủ EC2.

### Các loại EBS

| Loại EBS                 | Giá thành mỗi GB/tháng                                       | Hiệu suất (IOPS) tối đa | Tốc độ truyền tải dữ liệu tối đa | Tính năng chính                                         |
| ------------------------ | ------------------------------------------------------------ | ----------------------- | -------------------------------- | ------------------------------------------------------- |
| GP2 (SSD)                | 0,10 USD                                                     | 16,000 IOPS             | 250 MB/s                         | Đáp ứng nhu cầu tổng quát, hỗ trợ burstable performance |
| Provisioned IOPS (SSD)   | 0,125 - 0,185 USD (tùy thuộc vào số lượng IOPS được yêu cầu) | 64,000 IOPS             | 1,000 MB/s                       | Dành cho các ứng dụng yêu cầu hiệu suất cao             |
| Magnetic                 | 0,05 USD                                                     | 40-200 IOPS             | 100 MB/s                         | Lưu trữ giá rẻ hoặc các ứng dụng yêu cầu ít hiệu suất   |
| Throughput Optimized HDD | 0,045 USD                                                    | N/A                     | 500 MB/s                         | Dành cho các ứng dụng yêu cầu xử lý dữ liệu lớn         |

Giải thích:

- GP2 (SSD): dùng để đáp ứng nhu cầu tổng quát với khả năng burstable performance.
- Provisioned IOPS (SSD): dùng cho các ứng dụng yêu cầu tính toàn vẹn dữ liệu và hiệu suất cao.
- Magnetic: dùng cho các ứng dụng có yêu cầu ít hiệu suất và muốn tiết kiệm chi phí.
- Throughput Optimized HDD: dùng cho các ứng dụng yêu cầu xử lý dữ liệu lớn.
