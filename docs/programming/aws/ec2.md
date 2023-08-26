---
title: Amazon Elastic Compute Cloud
---

## Types of EC2

- **On-Demand Instances**: Đây là loại EC2 hỗ trợ thuê máy ảo theo giờ mà không cần các cam kết dài hạn hay thỏa thuận trả trước. Phù hợp cho các ứng dụng có độ linh hoạt cao, nhu cầu sử dụng ngắn hạn, hoặc biến động lớn.

- **Reserved Instances**:

  - **Standard Reserved Instances**: Loại EC2 này cho phép người dùng đặt trước để giữ chỗ cho việc sử dụng máy ảo và cam kết trả phí cho việc sử dụng trong khoảng thời gian từ 1 đến 3 năm. Thông thường được sử dụng để ổn định chi phí cho các ứng dụng có nhu cầu sử dụng liên tục và yêu cầu sử dụng từ trung bình đến cao.

  - **Convertible Reserved Instances**: Tương tự như các Standard Reserved Instances, nhưng có một sự khác biệt: người dùng có thể chuyển đổi loại phiên bản này sang loại khác để đáp ứng yêu cầu của các ứng dụng khác nhau.

- **Spot Instances**: Loại EC2 này cho phép người dùng đấu giá giá cả cho việc sử dụng máy ảo dựa trên tỷ lệ giá cả hiện tại trên thị trường. Khi giá đấu giá cạnh tranh hơn giá đã đặt trước, các Spot Instances sẽ được sử dụng. Tuy nhiên, khi giá tăng trở lại, các Spot Instances có thể bị kết thúc.

## Payment Types for Reserved Instances

- **Partial Upfront**: Đây là phương pháp thanh toán cho các phiên bản Đã Đặt Trước (Reserved Instances) nơi người dùng phải thanh toán trước một khoản tiền với mức giá giảm và sau đó thanh toán cho việc sử dụng trong phần còn lại của thời gian đặt trước.

- **No Upfront**: Loại phiên bản Đã Đặt Trước này không yêu cầu thanh toán trước. Tuy nhiên, mức giảm giá sẽ thấp hơn so với Thanh toán Trước Toàn Bộ và Thanh toán Trước Một Phần

- **Deferred**: Loại phiên bản Đã Đặt Trước này cho phép người dùng hoàn tất việc thanh toán trước vào cuối thời gian đặt trước. Trước khi bắt đầu sử dụng các phiên bản Đã Đặt Trước, người dùng chỉ cần phải thanh toán một số tiền nhỏ và phải thanh toán số tiền còn lại trước khi kết thúc thời gian đặt trước.

- **All Upfront**: Đây là phương pháp thanh toán trước cho các phiên bản Đã Đặt Trước nơi người dùng phải trả toàn bộ chi phí đặt trước trước khi bắt đầu sử dụng các phiên bản Đã Đặt Trước. Với loại này, chi phí sử dụng máy ảo sẽ được giảm giá một cách đáng kể nhất.

Best discount type: `All upfront payment for a 3-year term purchase`.

## Cost Allocation Tags

Nhãn phân bổ chi phí là một tính năng của AWS cho phép bạn đánh dấu (tag) các tài nguyên của mình trên AWS với các nhãn để phân loại và theo dõi chi phí của những tài nguyên đó. Nhãn đính kèm vào một tài nguyên có thể chứa thông tin về mục đích sử dụng, ưu tiên, phân loại địa điểm, ưu tiên dự án, v.v.

Việc đánh dấu những tài nguyên này giúp bạn có cái nhìn rõ ràng về chi phí của từng tài nguyên, các nhóm tài nguyên, hoặc toàn bộ cơ sở hạ tầng AWS của bạn. Nó cũng hỗ trợ bạn trong việc theo dõi các dự án, phân bổ chi phí, và quản lý tài nguyên một cách hiệu quả hơn. Nhãn phân bổ chi phí là một công cụ quan trọng trong việc quản lý chi tiêu của bạn trên nền tảng AWS.

## Storage

- **Instance Store**: Là lưu trữ trên đĩa cứng cục bộ của máy ảo EC2, được sử dụng cho các ứng dụng có thể chấp nhận mất dữ liệu và yêu cầu tốc độ cao. Tuy nhiên, dữ liệu sẽ bị mất nếu phiên bản EC2 bị kết thúc hoặc gặp sự cố.

- **Elastic Block Store (EBS)**: Là một dịch vụ lưu trữ block được sử dụng để lưu trữ dữ liệu trên phần cứng riêng biệt, đảm bảo tính liên tục và khả năng sao lưu. EBS có thể được gắn vào và tách ra khỏi các phiên bản EC2 và có nhiều loại khác nhau, bao gồm EBS GP2, EBS Provisioned IOPS, EBS Magnetic, và EBS Throughput Optimized HDD. Lưu trữ dữ liệu trên phần cứng riêng biệt của AWS và gắn vào các phiên bản EC2. Nó cung cấp hiệu suất cao, tính liên tục và khả năng sao lưu. EBS được sử dụng cho các ứng dụng yêu cầu tính toàn vẹn dữ liệu và mất dữ liệu ít hơn.

- **Elastic File System (EFS)**:Lưu trữ dữ liệu qua nhiều phiên bản EC2 và chia sẻ nó qua mạng. Nó cung cấp khả năng mở rộng linh hoạt và quản lý dễ dàng cho các ứng dụng cần chia sẻ dữ liệu qua nhiều phiên bản EC2. EFS có tính năng tự phục hồi và đảm bảo tính toàn vẹn dữ liệu.

Về bản chất, EBS được sử dụng cho các ứng dụng lưu trữ dữ liệu trên một máy chủ EC2 duy nhất, trong khi EFS được sử dụng cho các ứng dụng chia sẻ dữ liệu qua nhiều máy chủ EC2.

## Types of EBS

| EBS Type                 | Cost per GB/month                                     | Max Performance (IOPS) | Max Data Transfer Speed | Main Feature                                                |
| ------------------------ | ----------------------------------------------------- | ---------------------- | ----------------------- | ----------------------------------------------------------- |
| GP2 (SSD)                | $0.10 USD                                             | 16,000 IOPS            | 250 MB/s                | General-purpose needs, supports burstable performance       |
| Provisioned IOPS (SSD)   | $0.125 - $0.185 USD (depending on the requested IOPS) | 64,000 IOPS            | 1,000 MB/s              | For high-performance applications                           |
| Magnetic                 | $0.05 USD                                             | 40-200 IOPS            | 100 MB/s                | Low-cost storage or applications with low performance needs |
| Throughput Optimized HDD | $0.045 USD                                            | N/A                    | 500 MB/s                | For applications requiring large data processing            |

Explanation:

- **GP2 (SSD)**: Satisfies general-purpose needs with burstable performance.
- **Provisioned IOPS (SSD)**: Meant for applications requiring high performance and data integrity.
- **Magnetic**: Used for applications with low performance requirements or budget constraints.
- **Throughput Optimized HDD**: For applications requiring processing of large data sets.

## EBS Types

| EBS Type                 | Cost per GB/month                              | Maximum IOPS | Maximum Data Transfer Rate | Key Feature                                           |
| ------------------------ | ---------------------------------------------- | ------------ | -------------------------- | ----------------------------------------------------- |
| GP2 (SSD)                | $0.10 USD                                      | 16,000 IOPS  | 250 MB/s                   | General purpose, supports burstable performance       |
| Provisioned IOPS (SSD)   | $0.125 - $0.185 USD (depends on required IOPS) | 64,000 IOPS  | 1,000 MB/s                 | For high-performance applications                     |
| Magnetic                 | $0.05 USD                                      | 40-200 IOPS  | 100 MB/s                   | Low-cost storage or applications with low performance |
| Throughput Optimized HDD | $0.045 USD                                     | N/A          | 500 MB/s                   | For big data processing applications                  |

**Explanation**:

- **GP2 (SSD)**: For general requirements with burstable performance capabilities.
- **Provisioned IOPS (SSD)**: For applications requiring high performance and data integrity.
- **Magnetic**: For applications with low performance requirements wanting to save on costs.
- **Throughput Optimized HDD**: For applications processing large data.

## RAID

RAID viết tắt của "Redundant Array of Independent Disks," là một kỹ thuật lưu trữ dữ liệu được sử dụng để cải thiện độ tin cậy và hiệu năng của các hệ thống lưu trữ sử dụng nhiều ổ cứng.

Các loại RAID phổ biến nhất bao gồm:

- **RAID 0**: Tạo một ổ đĩa ảo bằng cách kết hợp hai hoặc nhiều ổ đĩa vật lý thành một nhóm. Dữ liệu được chia thành các phần nhỏ và lưu trữ trên các ổ đĩa khác nhau. RAID 0 không có khả năng khôi phục dữ liệu nếu một ổ đĩa bị hỏng nhưng lại có tốc độ đọc/ghi cao hơn so với một ổ đĩa đơn.

- **RAID 1**: Sử dụng hai hoặc nhiều ổ đĩa giống nhau và sao chép dữ liệu từ một ổ đĩa này sang ổ đĩa kia. RAID 1 có thể khôi phục dữ liệu nếu một ổ đĩa bị hỏng nhưng lại có chi phí cao hơn và tốc độ đọc/ghi thấp hơn so với RAID 0.

- **RAID 10 (or RAID 1+0)**:Là sự kết hợp của RAID 1 và RAID 0, sử dụng ít nhất bốn ổ đĩa và chia dữ liệu thành các phần, sau đó sao chép các phần này sang các ổ đĩa khác nhau. RAID 10 có khả năng khôi phục dữ liệu xuất sắc và tốc độ đọc/ghi cao, nhưng lại có giá cao hơn so với các kỹ thuật RAID khác.

## AWS Lambda

- **Purpose**: Run serverless code in response to events.
- **Description**: Compute service that lets you run code without provisioning servers.
- **Use case**: Image processing, real-time stream analysis.
- **Example**: Automatically creating a thumbnail when an image is uploaded to S3.
- **Key features**: Automatic scaling, built-in fault tolerance, event-driven execution.

## AWS Lightsail

- **Purpose**: Easily deploy and manage applications in the cloud.
- **Description**: Provides developers compute, storage, and networking capacity and capabilities to deploy and manage websites and web applications in the cloud.
- **Use case**: Hosting simple web applications or websites.
- **Example**: Deploying a WordPress site with a single click.
- **Key features**: Fixed monthly plans, integrated tools, managed databases.
