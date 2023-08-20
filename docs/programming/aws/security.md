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

IAM User là một thực thể đại diện cho một người dùng hoặc ứng dụng được xác thực và ủy quyền truy cập vào tài nguyên trong AWS. Mỗi IAM User có một tên đăng nhập và chứng chỉ xác thực riêng biệt.

IAM Group là một tập hợp các IAM User. Nhóm được sử dụng để quản lý quyền truy cập của nhiều người dùng cùng một lúc, thay vì phải quản lý từng người dùng một cách riêng lẻ. Khi một IAM User được thêm vào một nhóm, người dùng sẽ thừa hưởng tất cả các quyền truy cập được gán cho nhóm.

IAM Policy là một bộ quy tắc xác định quyền truy cập vào tài nguyên trong AWS. Chính sách được gán cho IAM User hoặc IAM Group để kiểm soát quyền truy cập vào các tài nguyên cụ thể như EC2 instances, RDS databases, hay S3 buckets. IAM Policy sử dụng các quy tắc về nguyên tắc (principles), hành động (actions) và tài nguyên (resources) để kiểm soát việc truy cập vào các tài nguyên AWS.

IAM Role là một khái niệm liên quan đến quyền truy cập tạm thời trong AWS. Nó cho phép một IAM User hoặc một dịch vụ AWS khác được ủy quyền truy cập vào các tài nguyên cụ thể trong AWS. IAM Role thường được sử dụng khi một dịch vụ AWS yêu cầu truy cập vào một tài nguyên khác trong AWS. Trong trường hợp này, IAM Role được gán cho dịch vụ AWS đó để có thể truy cập vào tài nguyên được chỉ định. Khác với IAM User hoặc IAM Group, IAM Role không liên kết trực tiếp với một người dùng hoặc nhóm. Thay vào đó, nó được gán cho một danh sách nguyên tắc, cho phép mọi người dùng hoặc dịch vụ AWS được ủy quyền truy cập vào tài nguyên được chỉ định.

## Tiêu chuẩn bảo mật thông tin

SOC 2 (System and Organization Controls 2): Là một tiêu chuẩn kiểm tra và đánh giá việc thực hiện các điều khiển bảo mật, nhằm đảm bảo tính toàn vẹn, sẵn sàng và bảo mật của dịch vụ, sản phẩm và cơ sở hạ tầng của một tổ chức. SOC 2 được thiết kế để đáp ứng các yêu cầu đối với các công ty và tổ chức xử lý thông tin khách hàng.

SOC 1 (System and Organization Controls 1): Là một tiêu chuẩn kiểm tra và đánh giá để đảm bảo tính toàn vẹn và an toàn của các báo cáo tài chính được tạo ra bởi các tổ chức. Nó còn được gọi là Statement on Standards for Attestation Engagements 18 (SSAE 18).

PCI DSS (Payment Card Industry Data Security Standard): Là một tiêu chuẩn bảo mật dành cho các tổ chức xử lý thông tin thanh toán, đảm bảo rằng các thông tin thanh toán của khách hàng được bảo vệ tốt nhất có thể. Nó đảm bảo rằng các doanh nghiệp tuân thủ các quy định về bảo mật, quản lý và bảo vệ thông tin thanh toán.

HIPAA (Health Insurance Portability and Accountability Act): Là một quy định bảo mật thông tin y tế tại Mỹ, đặc biệt là để bảo vệ thông tin cá nhân y tế của người tiêu dùng và đảm bảo rằng những thông tin này được bảo vệ an toàn và riêng tư. HIPAA áp dụng cho tất cả các tổ chức và cá nhân liên quan đến việc lưu trữ, xử lý và chia sẻ thông tin y tế.
