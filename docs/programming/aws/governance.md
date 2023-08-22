---
title: Management & Governance
---

## Well-Architected infrastructure

The AWS Well-Architected Framework is a guide for designing trustworthy architectures for applications running on the AWS platform. It assists customers in comprehensively assessing the alignment of their current architectures with the standards and best practices defined by AWS.

The main pillars of the Well-Architected Framework include:

- **Operational Excellence**: This pillar focuses on ensuring that systems are deployed and managed effectively to meet business and customer demands.

- **Security**: This pillar emphasizes ensuring the security of applications and data managed on the AWS platform, encompassing both foundational security solutions and advanced security technologies.

- **Reliability**: This section centers on guaranteeing that applications consistently operate correctly, with minimal interruptions in the event of incidents.

- **Performance Efficiency**: This pillar concentrates on ensuring that applications are deployed and managed with optimal performance and efficient resource utilization.

- **Cost Optimization**: This area zeroes in on making sure applications are deployed and managed at minimal cost while ensuring efficient resource usage.


## Support plan

AWS offers different Support Plans to assist users in using AWS services, including:

- **Basic Support**: This is a free support package provided to all AWS customers. It includes email support utilities, access to forums, and support documentation.

- **Developer Support**: This package helps developers address technical issues when using AWS services. This package includes email support utilities, access to forums, tutorial documentation, and direct chat support.

- **Business Support**: This is a more premium support package, providing 24/7/365 technical support, prioritized support tickets, assigned support specialists, and many other features.

- **Enterprise Support**: This is AWS's most professional support package. This service package offers advanced features like customized support, assigned technical experts, system health monitoring, and reporting and analysis options.

In summary, AWS offers a range of different support packages to meet the needs and budgets of each customer, from customers needing basic support to large enterprises requiring customized and advanced support.

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
