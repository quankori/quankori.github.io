---
title: Cloud Concept
---

## Benefis of Cloud Computing

Khi chuyển đổi cơ sở hạ tầng và ứng dụng từ các trung tâm dữ liệu tại chỗ (on-premises) sang AWS, một trong những cơ hội tài chính quan trọng là thay thế chi phí hoạt động biến đổi (OPEX) bằng chi phí vốn ban đầu thấp (CAPEX).

Với cơ sở hạ tầng tại chỗ, các hoạt động hàng ngày liên quan đến bảo dưỡng, nâng cấp, và mở rộng cơ sở hạ tầng được tính toán như là OPEX. Tuy nhiên, khi chuyển sang AWS, những chi phí này có thể được thay thế bằng chi phí vốn ban đầu thấp để xây dựng và triển khai cơ sở hạ tầng mới, sau đó chi phí hoạt động liên quan sẽ được giảm thiểu.

Sử dụng AWS giúp các tổ chức tiết kiệm được chi phí hoạt động không cố định và giảm thiểu đầu tư vốn ban đầu. Bằng cách chuyển từ OPEX sang CAPEX, các tổ chức có thể tăng cường linh hoạt trong việc quản lý chi phí, giảm đầu tư vốn ban đầu, và nâng cao khả năng phát triển và mở rộng nhanh chóng.

### OPEX vs CAPEX

OPEX và CAPEX là hai khái niệm tài chính trong quản lý doanh nghiệp. Đơn giản, OPEX (Chi phí Hoạt động) ám chỉ các chi phí liên quan đến hoạt động hàng ngày của một tổ chức, chẳng hạn như chi phí điện, tiền thuê, lương nhân viên, chi phí mua sắm linh kiện, nguyên vật liệu, và cetera. Ngược lại, CAPEX (Chi phí Vốn) liên quan đến các chi phí đầu tư vào tài sản cố định của tổ chức, như chi phí xây dựng, mua sắm thiết bị, máy móc, v.v.

Một cách minh họa dễ hiểu hơn là so sánh chi phí mua xe với chi phí duy trì nó. Chi phí mua một chiếc xe mới có thể được xem như một chi phí vốn ban đầu (CAPEX), trong khi các chi phí cho xăng, bảo dưỡng, và sửa chữa định kỳ được coi là chi phí hoạt động (OPEX).

Trong lĩnh vực công nghệ thông tin, chi phí cho phần mềm, phần cứng, và dịch vụ đám mây có thể được coi là OPEX, trong khi việc mua máy chủ mới hoặc thiết bị mạng có thể được phân loại như là CAPEX.

Từ góc độ doanh nghiệp, việc lựa chọn giữa OPEX và CAPEX ảnh hưởng đến cách mà một tổ chức quản lý và phân bổ ngân sách và nguồn lực của mình. Sử dụng các dịch vụ đám mây từ AWS giúp giảm thiểu chi phí vốn ban đầu (CAPEX) và chuyển sang chi phí hoạt động biến đổi (OPEX), cho phép các tổ chức tiết kiệm chi phí và tăng cường linh hoạt trong quản lý tài chính.

## Shared responsibility model

| Responsibility                                                                                | AWS | User |
| --------------------------------------------------------------------------------------------- | --- | ---- |
| Physical security of data centers                                                             | ✓   |      |
| Network and infrastructure security                                                           | ✓   |      |
| Hypervisor and virtual instance security                                                      | ✓   |      |
| Patching and updating of host operating system, application stacks, and AWS-provided services | ✓   |      |
| Configuration of firewall and access control lists (ACLs)                                     | ✓   |      |
| Encryption of data in transit and at rest                                                     | ✓   |      |
| Managing access to resources and data                                                         |     | ✓    |
| Security configuration of applications and operating systems                                  |     | ✓    |
| Data classification and protection                                                            |     | ✓    |
| Incident response planning and execution                                                      |     | ✓    |

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/aws/2.png)

## Types of Cloud Computing

- Infrastructure as a Service (IaaS)

IaaS (Infrastructure as a Service) cung cấp các tài nguyên cơ sở hạ tầng theo yêu cầu, chẳng hạn như tính toán, lưu trữ, mạng và ảo hóa. Với IaaS, nhà cung cấp dịch vụ sở hữu và vận hành cơ sở hạ tầng, nhưng khách hàng sẽ cần phải mua và quản lý phần mềm, chẳng hạn như hệ điều hành, phần mềm trung gian, dữ liệu và ứng dụng.

- Platform as a Service (PaaS)

PaaS (Platform as a Service) cung cấp và quản lý các tài nguyên phần cứng và phần mềm để phát triển, kiểm thử, cung cấp, và quản lý các ứng dụng đám mây. Các nhà cung cấp thường cung cấp phần mềm trung gian, công cụ phát triển, và cơ sở dữ liệu đám mây trong các dịch vụ PaaS của họ.

- Software as a Service (SaaS)

SaaS (Software as a Service) cung cấp toàn bộ ứng dụng dưới dạng dịch vụ mà khách hàng có thể truy cập và sử dụng. Các giải pháp SaaS thường là các ứng dụng sẵn sàng để sử dụng, được quản lý và duy trì bởi nhà cung cấp dịch vụ đám mây.

## Global infrastructure

### Region

- **Description**: AWS's infrastructure is geographically divided into multiple Regions around the world.
- **Purpose**:This ensures that data stays within a specific jurisdiction if required, assists in disaster recovery, and provides localized endpoints for services.
- **Examples**: US East (North Virginia), EU (Ireland), Asia Pacific (Tokyo), etc.

### Availability Zones (AZs)

- **Description**: Each Region is made up of multiple Availability Zones (usually 2 or more). An AZ is essentially one or more discrete data centers, each with redundant power, networking, and cooling.
- **Purpose**: They allow AWS services to run that are more fault-tolerant and highly available than if they'd be in a single data center.
- **Key Feature**: They are interconnected with high-bandwidth, low-latency networking, with fully redundant, dedicated metro fiber providing high-throughput and low-latency networking between AZs.

### Edge Locations

- **Description**: These are sites deployed in major cities and highly populated areas worldwide, separate from Regions and AZs.
- **Purpose**: Used mainly by Amazon CloudFront (AWS's Content Delivery Network) and AWS Lambda@Edge to cache content closer to end-users, thus reducing latency.
- **Key Feature**: There are many more Edge Locations than there are Regions or AZs.

## Economic Benefits

- **No Upfront Capital Expense**: This shifts spending from capital expenses (CAPEX) to operational expenses (OPEX), providing flexibility in business financing.
- **Economies of Scale**: These savings are passed down to customers in the form of reduced costs.
- **Variable vs. Fixed Cost**: This provides more value for businesses as they only pay for what they use.
- **Elasticity and Agility**: This means that businesses can quickly adapt to changing conditions without the fear of overprovisioning or under-provisioning resources.
- **Stop Guessing Capacity**: This eliminates the risks of overspending on unneeded resources or facing operational issues due to a lack of resources.
- **Increased Speed and Agility**: This speed enables companies to get products and services to market faster.
- **Global Reach**: This not only reduces latency but also helps in complying with regional data regulations without significant additional investment.
- **Focus on Business Differentiators**: This allows businesses to innovate more and focus on their core products or services.
- **Benefit from Continuous Innovation**: Customers can take advantage of the latest technologies without investing in new hardware or software.

## Cloud Deployment Models

### Public cloud

Đám mây công cộng cung cấp các tài nguyên, chẳng hạn như tính toán, lưu trữ, mạng, môi trường phát triển và triển khai, cũng như ứng dụng thông qua internet. Chúng được sở hữu và vận hành bởi các nhà cung cấp dịch vụ đám mây bên thứ ba như AWS.

### Private cloud

Đám mây riêng được xây dựng, vận hành và sử dụng bởi một tổ chức duy nhất, thường được đặt tại các trung tâm dữ liệu nội bộ. Chúng cung cấp sự kiểm soát, tùy chỉnh và bảo mật dữ liệu tốt hơn nhưng cũng đi kèm với các chi phí và hạn chế tài nguyên tương tự như môi trường IT truyền thống.

### Hybrid cloud

Các môi trường kết hợp ít nhất một môi trường tính toán riêng (cơ sở hạ tầng IT truyền thống hoặc đám mây riêng, bao gồm cả edge computing) với một hoặc nhiều đám mây công cộng được gọi là đám mây hỗn hợp (hybrid clouds). Chúng cho phép bạn tận dụng các tài nguyên và dịch vụ từ các môi trường tính toán khác nhau và lựa chọn môi trường nào là tối ưu nhất cho các tác vụ tính toán của bạn.
