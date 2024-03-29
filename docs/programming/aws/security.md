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

**IAM User**: Represents a specific user or application that has been authenticated and authorized to access resources within AWS. Each IAM User has a unique username and authentication information.

**IAM Group**: A collection of multiple IAM Users. Groups are used to manage access rights for multiple users at once, instead of managing each user individually. When an IAM User is added to a group, that user inherits all the permissions assigned to that group.

**IAM Policy**: Defines rules for accessing AWS resources. Policies are attached to IAM Users or IAM Groups to control their access to specific resources like EC2 instances, RDS databases, or S3 buckets. IAM Policies use rules related to principles, actions, and resources to manage access to AWS resources.

**IAM Role**: Relates to granting temporary access permissions within AWS. It allows an IAM User or another AWS service to be granted permission to access specific AWS resources. Roles are commonly used when an AWS service needs to access other AWS resources. In such cases, an IAM Role is assigned to the service, granting it the necessary access. Unlike IAM Users or IAM Groups, IAM Roles are not directly linked to users or groups. Instead, they are associated with a set of principles, allowing any authorized user or AWS service to access the specified resources.

## Information Security Standards

**SOC 2 (System and Organization Controls 2)**: A standard for auditing and evaluating the implementation of security controls, ensuring the integrity, availability, and security of services, products, and infrastructure within an organization. It is designed to meet requirements for companies that handle customer information.

**SOC 1 (System and Organization Controls 1)**: A standard for auditing and assessing the integrity and security of financial reports produced by organizations. Also known as Statement on Standards for Attestation Engagements 18 (SSAE 18).

**PCI DSS (Payment Card Industry Data Security Standard)**: A security standard for organizations that process payment information, ensuring optimal protection of customer payment data. This standard ensures that businesses comply with regulations related to payment data security, management, and protection.

**HIPAA (Health Insurance Portability and Accountability Act)**: A U.S. regulation focused on safeguarding personal health information, ensuring that such information is kept secure and confidential. HIPAA applies to all organizations and individuals involved in storing, processing, and sharing healthcare information.
