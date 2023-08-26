---
title: AWS Security
---

## AWS Inspector

- **Purpose**: Automated security assessment.
- **Description**: Helps improve the security and compliance of applications.
- **Use case**: Security assessment for EC2 instances.
- **Example**: Automated vulnerability detection for an EC2 deployment.
- **Key features**: Automated, detailed reporting, vulnerability assessments.

## AWS WAF

- **Purpose**: Web application firewall.
- **Description**: Protects web applications from common exploits.
- **Use case**: Protect web applications from SQL injection, XSS.
- **Example**: Defending a web app against a DDOS attack.
- **Key features**: Customizable rules, real-time monitoring, AWS integration.

## AWS Shield

- **Purpose**: Managed DDoS protection.
- **Description**: Provides protection against DDoS attacks.
- **Use case**: Defending applications from DDoS attacks.
- **Example**: Safeguarding an e-commerce site during a flash sale.
- **Key features**: 24/7 DDoS protection, traffic engineering, risk management.

## AWS Artifact

- **Purpose**: Compliance documentation.
- **Description**: Portal for on-demand access to AWS's compliance reports.
- **Use case**: Satisfying regulatory audit requirements.
- **Example**: Retrieving a compliance report for an auditor's review.
- **Key features**: On-demand access, a range of reports, central repository.

## AWS GuardDuty

- **Purpose**: Threat detection.
- **Description**: Managed threat detection service that analyzes logs for malicious activity.
- **Use case**: Monitoring and securing AWS accounts and workloads.
- **Example**: Detecting compromised EC2 instances in an AWS environment.
- **Key features**: Continuous monitoring, threat intelligence, anomaly detection.

## AWS CloudTrail

- **Purpose**: AWS activity logging.
- **Description**: Tracks user activity and API usage.
- **Use case**: Security analysis, resource change tracking.
- **Example**: Auditing all S3 bucket permission changes.
- **Key features**: Event history, integrates with other AWS services, encryption.

## CloudTrail Log File Validation

- **Purpose**: Ensuring integrity of CloudTrail logs.
- **Description**: Feature of CloudTrail that checks the integrity of the delivered logs.
- **Use case**: Security and forensic analysis.
- **Example**: Validating the integrity of stored CloudTrail logs.
- **Key features**: Digital signatures, validation tools, chain of custody.

## AWS Single Sign-On

- **Purpose**: Centralized access management.
- **Description**: Managed service that lets users sign into multiple AWS accounts.
- **Use case**: Centralized access for AWS environments.
- **Example**: Allowing users to log into multiple AWS accounts with one set of credentials.
- **Key features**: SSO, central dashboard, AD integration.

## AWS Cognito

- **Purpose**: User identity and data synchronization.
- **Description**: Provides user sign-up, sign-in, and access control.
- **Use case**: Mobile and web app user management.
- **Example**: Creating a user directory for a mobile game.
- **Key features**: User directory, OAuth2.0, SAML, data sync.

## AWS KMS

- **Purpose**: Cryptographic key management.
- **Description**: Managed service for creating and controlling encryption keys.
- **Use case**: Data encryption for AWS services.
- **Example**: Encrypting an S3 bucket's data at rest.
- **Key features**: Centralized key management, audit capabilities, integrated with AWS services.

## AWS Directory Service for Microsoft Active Directory

- **Purpose**: Managed Microsoft Active Directory.
- **Description**: Managed service that runs Microsoft Active Directory on AWS.
- **Use case**: Any application or service that requires AD.
- **Example**: Joining EC2 instances to a domain.
- **Key features**: Easy AD deployment, trust relationships, scales to tens of thousands of users.

## AWS IAM

**IAM User**: Đại diện cho một người dùng hoặc ứng dụng cụ thể đã được xác thực và ủy quyền để truy cập các tài nguyên trong AWS. Mỗi IAM User có một tên người dùng và thông tin xác thực độc nhất.

**IAM Group**: Là một tập hợp của nhiều IAM Users. Groups được sử dụng để quản lý quyền truy cập cho nhiều người dùng cùng một lúc thay vì quản lý từng người dùng một cách riêng lẻ. Khi một IAM User được thêm vào một nhóm, người dùng đó thừa hưởng tất cả các quyền đã được gán cho nhóm đó.

**IAM Policy**: : Định nghĩa các quy tắc cho việc truy cập các tài nguyên AWS. Các Policy được gắn vào IAM Users hoặc IAM Groups để kiểm soát quyền truy cập của họ đến các tài nguyên cụ thể như các instance EC2, cơ sở dữ liệu RDS, hoặc bucket S3. IAM Policies sử dụng các quy tắc liên quan đến nguyên tắc, hành động, và tài nguyên để quản lý việc truy cập vào các tài nguyên AWS.

**IAM Role**: Liên quan đến việc cấp quyền truy cập tạm thời trong AWS. Nó cho phép một IAM User hoặc một dịch vụ AWS khác được cấp quyền để truy cập vào các tài nguyên AWS cụ thể. Roles thường được sử dụng khi một dịch vụ AWS cần truy cập vào tài nguyên AWS khác. Trong những trường hợp như vậy, IAM Role được gán cho dịch vụ, cấp cho nó các quyền truy cập cần thiết. Khác với IAM Users hoặc IAM Groups, IAM Roles không được liên kết trực tiếp với người dùng hoặc nhóm. Thay vào đó, chúng được liên kết với một tập hợp các nguyên tắc, cho phép bất kỳ người dùng hoặc dịch vụ AWS nào được ủy quyền có thể truy cập các tài nguyên được chỉ định.

## Information Security Standards

**SOC 2 (System and Organization Controls 2)**: Là một tiêu chuẩn để kiểm toán và đánh giá việc triển khai các biện pháp kiểm soát bảo mật, đảm bảo tính toàn vẹn, khả dụng và an toàn của các dịch vụ, sản phẩm, và hạ tầng của tổ chức. Được thiết kế để đáp ứng yêu cầu cho các công ty xử lý thông tin của khách hàng.

**SOC 1 (System and Organization Controls 1)**: Là một tiêu chuẩn để kiểm toán và đánh giá tính toàn vẹn và an ninh của các báo cáo tài chính do các tổ chức sản xuất. Còn được biết đến với tên gọi là Statement on Standards for Attestation Engagements 18 (SSAE 18).

**PCI DSS (Payment Card Industry Data Security Standard)**: Là một tiêu chuẩn bảo mật dành cho các tổ chức xử lý thông tin thanh toán, đảm bảo rằng dữ liệu thanh toán của khách hàng được bảo vệ tối ưu. Tiêu chuẩn này đảm bảo các doanh nghiệp tuân thủ các quy định về bảo mật, quản lý, và bảo vệ dữ liệu thanh toán.

**HIPAA (Health Insurance Portability and Accountability Act)**:: Là một quy định về bảo mật thông tin tại Hoa Kỳ, đặc biệt để bảo vệ thông tin sức khỏe cá nhân của người tiêu dùng và đảm bảo thông tin đó được bảo mật và an toàn. HIPAA được áp dụng cho tất cả các tổ chức và cá nhân liên quan đến việc lưu trữ, xử lý, và chia sẻ thông tin sức khỏe.
