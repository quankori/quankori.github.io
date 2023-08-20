---
title: Management & Governance
---

## Well-Architected infrastructure

Well-Architected Framework của AWS là một bộ khung hướng dẫn thiết kế kiến trúc đáng tin cậy cho các ứng dụng đang chạy trên nền tảng AWS. Nó giúp quý khách hàng đánh giá chi tiết sự phù hợp của kiến trúc đang được sử dụng với những tiêu chuẩn và các best-practices đã được AWS xác định.

Các phần chính của WAF bao gồm:

- Operational Excellence: Phần này tập trung vào việc đảm bảo rằng các hệ thống được triển khai và quản lý hiệu quả, để đáp ứng yêu cầu kinh doanh và khách hàng.

- Security: Phần này tập trung vào việc đảm bảo tính bảo mật của các ứng dụng và dữ liệu được quản lý trên nền tảng AWS, bao gồm các giải pháp bảo mật cơ bản và các công nghệ bảo mật tiên tiến.

- Reliability: Phần này tập trung vào việc đảm bảo rằng các ứng dụng luôn hoạt động đúng cách, với sự gián đoạn tối thiểu trong trường hợp các sự cố xảy ra.

- Performance Efficiency: Phần này tập trung vào việc đảm bảo rằng các ứng dụng được triển khai và quản lý với hiệu suất tối ưu và đảm bảo sử dụng tài nguyên hiệu quả.

- Cost Optimization: Phần này tập trung vào việc đảm bảo rằng các ứng dụng được triển khai và quản lý với chi phí tối thiểu và đảm bảo sử dụng tài nguyên một cách hiệu quả.

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

AWS Trusted Advisor is a service provided by Amazon Web Services (AWS) to help its customers optimize their AWS environment. It utilizes the knowledge and experience accumulated from AWS to provide recommendations on resources, performance, security, and cost.

AWS Trusted Advisor operates by automatically scanning your AWS environment and comparing it to predefined best practices. It then provides recommendations to improve operations, reduce costs, and enhance the availability of the system.

The main components of Trusted Advisor include:

- Cost Optimization: This section checks your resources on AWS and provides recommendations on how to optimize resource usage to reduce costs.

- Performance: This section reviews the performance of your AWS system and provides recommendations on how to optimize it.

- Security: This section checks your security measures on the AWS platform and provides recommendations on how to enhance security.

- Fault Tolerance: This section reviews the availability and recovery capabilities of your AWS resources and provides recommendations on how to optimize readiness.

- Service Limits: This section checks your service limits on AWS and provides recommendations on how to optimize resource usage to avoid exceeding those limits.

## AWS Organizations

- **Purpose**: Manage and govern multiple AWS accounts centrally.
- **Description**: A service allowing you to create a centralized environment to manage billing, security, and compliance across multiple AWS accounts.
- **Use Case**: Large enterprises managing multiple AWS accounts.
- **Example**: Setting consolidated billing for multiple departments in a corporation.
- **Key Features**: Hierarchical structure, policy-based management, consolidated billing.

## AWS Application Discovery Service

- **Purpose**: Discover on-premises applications to ease migration to AWS.
- **Description**: Helps enterprises plan migration projects by gathering information about their on-premises data centers.
- **Use Case**: Pre-migration assessment.
- **Example**: Assessing and grouping servers based on applications before cloud migration.
- **Key Features**: Server discovery, application dependency mapping, migration planning.

## AWS Quick Start

- **Purpose**: Accelerate cloud adoption with predefined templates.
- **Description**: Automated deployments for popular workloads and architectural baselines.
- **Use Case**: Rapid cloud deployment.
- **Example**: Quickly deploying a WordPress website on AWS.
- **Key Features**: Pre-built templates, integration with AWS best practices, wide range of workloads.

## AWS Config

- **Purpose**: Track resource inventory and changes.
- **Description**: Provides a detailed view of the configuration of AWS resources in your account.
- **Use Case**: Compliance and audit.
- **Example**: Ensuring no publicly accessible S3 buckets exist in an account.
- **Key Features**: Resource tracking, change tracking, compliance checks.

## AWS CloudFormation

- **Purpose**: Define and deploy infrastructure as code.
- **Description**: Allows you to use templates to define, provision, and manage AWS resources.
- **Use Case**: Reproducible infrastructure deployment.
- **Example**: Deploying an entire three-tier web application using a single template.
- **Key Features**: Template-based provisioning, drift detection, modular and reusable.

## AWS Control Tower

- **Purpose**: Set up and govern a secure, compliant multi-account AWS environment.
- **Description**: Simplifies the process of setting up AWS Organizations and other baseline infrastructure.
- **Use Case**: Streamlined AWS account setup and governance.
- **Example**: Enabling a centralized log archive and audit trail across multiple AWS accounts.
- **Key Features**: Account factory, guardrails, log archive.

## Enterprise Support Concierge

- **Purpose**: Personalized cloud support.
- **Description**: Dedicated technical advisors providing 24/7 access to cloud support engineers.
- **Use Case**: Enterprises requiring dedicated and in-depth support.
- **Example**: Guidance during critical deployment or troubleshooting complex issues.
- **Key Features**: Infrastructure event management, training, architectural guidance.
