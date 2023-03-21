---
title: Management & Governance
---

## AWS Organizations

AWS Organizations là một dịch vụ của Amazon Web Services (AWS), cho phép người dùng quản lý nhiều tài khoản AWS trong một tổ chức duy nhất.

Với AWS Organizations, người dùng có thể tạo và quản lý các tài khoản AWS của mình, thiết lập các chính sách điều khiển truy cập, quản lý chi phí và khả năng sử dụng tài nguyên. Nó cung cấp cho người dùng một bộ công cụ để tổ chức tài khoản AWS của họ thành các đơn vị quản lý riêng biệt, giúp cho việc quản lý các tài khoản này trở nên thuận tiện và hiệu quả hơn.

Các tính năng của AWS Organizations bao gồm:

- Quản lý tài khoản: cho phép người dùng tạo, xóa và quản lý các tài khoản AWS.
- Thiết lập chính sách: cho phép người dùng thiết lập các chính sách điều khiển truy cập và quản lý tài nguyên cho tất cả các tài khoản trong tổ chức.
- Quản lý chi phí: cho phép tổng hợp các khoản chi phí từ nhiều tài khoản vào một hóa đơn duy nhất và theo dõi các chi phí trong tổ chức.
- Quản lý tài nguyên: cho phép người dùng quản lý tài nguyên (ví dụ: máy chủ ảo EC2, Cơ sở dữ liệu RDS) trong các tài khoản của mình một cách hiệu quả hơn.

Với AWS Organizations, người dùng có thể giảm thiểu chi phí, tối ưu hóa việc sử dụng tài nguyên, quản lý độ phức tạp và an toàn cho các ứng dụng và dịch vụ được chạy trên nền tảng AWS.

## Well-Architected Framework

Well-Architected Framework (WAF) của AWS là một bộ khung hướng dẫn thiết kế kiến trúc đáng tin cậy cho các ứng dụng đang chạy trên nền tảng AWS. Nó giúp quý khách hàng đánh giá chi tiết sự phù hợp của kiến trúc đang được sử dụng với những tiêu chuẩn và các best-practices đã được AWS xác định.

Các phần chính của WAF bao gồm:

- Operational Excellence: Phần này tập trung vào việc đảm bảo rằng các hệ thống được triển khai và quản lý hiệu quả, để đáp ứng yêu cầu kinh doanh và khách hàng.

- Security: Phần này tập trung vào việc đảm bảo tính bảo mật của các ứng dụng và dữ liệu được quản lý trên nền tảng AWS, bao gồm các giải pháp bảo mật cơ bản và các công nghệ bảo mật tiên tiến.

- Reliability: Phần này tập trung vào việc đảm bảo rằng các ứng dụng luôn hoạt động đúng cách, với sự gián đoạn tối thiểu trong trường hợp các sự cố xảy ra.

- Performance Efficiency: Phần này tập trung vào việc đảm bảo rằng các ứng dụng được triển khai và quản lý với hiệu suất tối ưu và đảm bảo sử dụng tài nguyên hiệu quả.

- Cost Optimization: Phần này tập trung vào việc đảm bảo rằng các ứng dụng được triển khai và quản lý với chi phí tối thiểu và đảm bảo sử dụng tài nguyên một cách hiệu quả.

## Lợi ích chuyển on-premises qua AWS

Trong việc chuyển đổi hạ tầng và các ứng dụng từ trung tâm dữ liệu on-premises sang AWS, một trong những cơ hội tài chính quan trọng là thay thế chi phí hoạt động biến đổi (OPEX) bằng chi phí vốn ban đầu thấp (CAPEX).

Với hạ tầng on-premises, các hoạt động vận hành hàng ngày liên quan đến việc duy trì, nâng cấp và mở rộng hạ tầng được tính toán dưới dạng OPEX. Tuy nhiên, khi di chuyển đến AWS, chi phí này có thể được thay thế bằng các khoản chi phí vốn ban đầu thấp để xây dựng và triển khai hạ tầng mới, và sau đó những chi phí vận hành liên quan sẽ được giảm thiểu.

Việc sử dụng AWS giúp các tổ chức tiết kiệm chi phí hoạt động không cố định và tối thiểu hóa đầu tư vốn ban đầu. Bằng cách chuyển từ OPEX sang CAPEX, các tổ chức có thể tăng tính linh hoạt trong việc quản lý chi phí, giảm thiểu đầu tư vốn ban đầu và tăng khả năng phát triển và mở rộng nhanh chóng.

### OPEX và CAPEX

OPEX và CAPEX là hai khái niệm tài chính trong quản lý kinh doanh. Dưới góc nhìn đơn giản, OPEX (Operational Expenditures) là các chi phí liên quan đến hoạt động vận hành hàng ngày của một tổ chức, ví dụ như chi phí tiêu điện, chi phí thuê mặt bằng, chi phí lương nhân viên, chi phí mua linh kiện, vật tư, ... Trong khi đó, CAPEX (Capital Expenditures) là các chi phí liên quan đến việc đầu tư vào tài sản cố định của tổ chức, ví dụ như chi phí xây dựng, mua sắm thiết bị, máy móc, ...

Một cách trực quan để hiểu rõ hơn là so sánh chi phí mua xe hơi với chi phí duy trì xe hơi. Chi phí mua xe hơi mới có thể được xem là chi phí vốn ban đầu (CAPEX), trong khi chi phí xăng, bảo dưỡng và sửa chữa định kỳ được coi là chi phí hoạt động (OPEX).

Trong lĩnh vực công nghệ thông tin, các chi phí cho phần mềm, phần cứng và các dịch vụ đám mây có thể được coi là OPEX, trong khi việc mua sắm máy chủ hay thiết bị mạng mới có thể được coi là CAPEX.

Từ góc nhìn kinh doanh, việc chọn giữa OPEX và CAPEX có ảnh hưởng đến cách quản lý và phân bổ ngân sách và tài nguyên của một tổ chức. Việc sử dụng các dịch vụ đám mây của AWS giúp giảm thiểu chi phí vốn ban đầu (CAPEX) và chuyển sang chi phí hoạt động biến đổi (OPEX), giúp các tổ chức tiết kiệm chi phí và tăng tính linh hoạt trong quản lý tài chính.

## AWS Shared Responsibility Model

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

## Support plan

AWS cung cấp các loại Support Plan khác nhau để hỗ trợ người dùng khi sử dụng dịch vụ của AWS, bao gồm:

- Basic Support: Đây là một gói hỗ trợ miễn phí được cung cấp cho tất cả các khách hàng AWS. Nó bao gồm tiện ích hỗ trợ qua email, truy cập vào diễn đàn và tài liệu hỗ trợ.

- Developer Support: Đây là một gói hỗ trợ giúp các nhà phát triển xử lý các vấn đề kỹ thuật khi sử dụng các dịch vụ của AWS. Gói này bao gồm tiện ích hỗ trợ qua email, truy cập vào diễn đàn, tài liệu hướng dẫn và hỗ trợ chat trực tiếp.

- Business Support: Đây là một gói hỗ trợ cao cấp hơn, cung cấp hỗ trợ kỹ thuật 24/7/365, phiếu yêu cầu hỗ trợ đã ưu tiên, chuyên viên hỗ trợ được chỉ định, và nhiều tính năng khác.

- Enterprise Support: Đây là gói hỗ trợ chuyên nghiệp nhất của AWS. Gói dịch vụ này cung cấp một số tính năng nâng cao như hỗ trợ tùy chỉnh, chuyên gia kỹ thuật được chỉ định, giám sát sức khỏe của hệ thống, và các tùy chọn báo cáo và phân tích.

Tóm lại, AWS cung cấp một loạt các gói hỗ trợ khác nhau để đáp ứng nhu cầu và ngân sách của từng khách hàng, từ các khách hàng có nhu cầu hỗ trợ cơ bản đến các doanh nghiệp lớn có nhu cầu hỗ trợ tùy chỉnh và nâng cao.

| Plan Name                           | Basic                                        | Developer                              | Business                                           | Enterprise                                                                       |
| ----------------------------------- | -------------------------------------------- | -------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------- |
| Description                         | Free, limited support                        | Technical support for developers       | Technical and account support for businesses       | Personalized support with dedicated technical account manager                    |
| Price                               | Free                                         | Starts at $29/month                    | Starts at $100/month                               | Custom pricing                                                                   |
| Response Time                       | 12 hours                                     | 12 hours                               | 1 hour                                             | 15 minutes                                                                       |
| Support Channels                    | Email                                        | Email, Chat                            | Email, Chat, Phone                                 | Email, Chat, Phone                                                               |
| Customer Service                    | General guidance, documentation, whitepapers | Technical support, one-on-one guidance | Technical and account support, AWS Trusted Advisor | Personalized support, technical account manager, infrastructure event management |
| AWS Infrastructure Event Management | Not included                                 | Not included                           | Not included                                       | Included                                                                         |
| Trusted Advisor Checks              | Not included                                 | Not included                           | 7 checks                                           | Full suite of checks                                                             |
| Third-Party Software Support        | Not included                                 | Not included                           | Not included                                       | Included                                                                         |
| Concierge Support                   | Not included                                 | Not included                           | Not included                                       | Included                                                                         |

### Trusted Advisor

AWS Trusted Advisor là một dịch vụ được cung cấp bởi Amazon Web Services (AWS) để giúp khách hàng của họ tối ưu hóa môi trường AWS của họ. Nó sử dụng các kiến ​​thức và kinh nghiệm tích lũy từ AWS để cung cấp các khuyến nghị về tài nguyên, hiệu suất, bảo mật và chi phí.

AWS Trusted Advisor hoạt động bằng cách tự động quét môi trường AWS của bạn và so sánh nó với các best practices đã được xác định. Nó sau đó cung cấp các khuyến nghị để cải thiện hoạt động, giảm chi phí và tăng tính khả dụng của hệ thống.

Các phần chính của Trusted Advisor bao gồm:

- Cost Optimization: Phần này kiểm tra các tài nguyên của bạn trên AWS và cung cấp khuyến nghị về cách tối ưu hóa việc sử dụng tài nguyên để giảm thiểu chi phí.

- Performance: Phần này kiểm tra hiệu suất của hệ thống AWS của bạn và cung cấp khuyến nghị về cách tối ưu hóa hiệu suất.

- Security: Phần này kiểm tra các biện pháp bảo mật của bạn trên nền tảng AWS và cung cấp khuyến nghị về cách tăng cường bảo mật.

- Fault Tolerance: Phần này kiểm tra tính sẵn sàng và khả năng phục hồi của các tài nguyên trên AWS của bạn và cung cấp khuyến nghị về cách tối ưu hóa sự sẵn sàng.

- Service Limits: Phần này kiểm tra các giới hạn dịch vụ của bạn trên AWS và cung cấp khuyến nghị về cách tối ưu hóa sử dụng tài nguyên để tránh vượt quá giới hạn.

### AWS Concierge

AWS Concierge là một dịch vụ hỗ trợ cao cấp của Amazon Web Services (AWS) được cung cấp cho các khách hàng doanh nghiệp và khối lượng lớn. Nó giúp các khách hàng có được quản lý tài khoản AWS chuyên nghiệp, kế hoạch hóa quản lý chi phí và tối ưu hóa hiệu suất hạ tầng.

Với dịch vụ AWS Concierge, khách hàng sẽ được cung cấp một chuyên gia kỹ thuật AWS (Technical Account Manager - TAM) với kinh nghiệm để hỗ trợ các yêu cầu đặc biệt và làm việc với khách hàng để đảm bảo rằng các mục tiêu kinh doanh của họ được đáp ứng. Ngoài ra, khách hàng còn nhận được các dịch vụ hỗ trợ như kiểm tra tính khả dụng của ứng dụng và hướng dẫn về tối ưu hóa chi phí.

Dịch vụ AWS Concierge được thiết kế để giúp các khách hàng doanh nghiệp và khối lượng lớn thực hiện việc triển khai và quản lý các ứng dụng phức tạp trên nền tảng AWS một cách hiệu quả và tiết kiệm chi phí.
