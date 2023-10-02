---
title: Amazon Elastic Compute Cloud
---

## Types of EC2

- **On-Demand Instances**: These are a type of EC2 instance that supports renting virtual machines by the hour without the need for long-term commitments or upfront agreements. They are suitable for highly flexible applications, short-term usage needs, or significant fluctuations in demand.

- **Reserved Instances**:

  - **Standard Reserved Instances**: This type of EC2 instance allows users to reserve and secure virtual machine capacity and commit to paying for its usage over a period of 1 to 3 years. It is typically used to stabilize costs for applications with continuous and medium to high usage requirements.

  - **Convertible Reserved Instances**: Similar to Standard Reserved Instances, but with a difference: users can convert this type of instance into another type to meet the demands of different applications.

- **Spot Instances**: This type of EC2 instance allows users to bid on virtual machine usage based on the current market price. When the bidding price competes favorably with the predefined price, Spot Instances are allocated and used. However, if the price increases again, Spot Instances may be terminated. Spot Instances are a cost-effective option for workloads that can be flexible with their compute resources and are willing to trade lower cost for potential interruptions.

## Payment Types for Reserved Instances

- **Partial Upfront**: This is a payment option for Reserved Instances where users pay an upfront amount at a reduced price and then pay for the remaining usage over the reserved time period.

- **No Upfront**: This type of Reserved Instance does not require an upfront payment. However, the discount rate will be lower compared to All Upfront and Partial Upfront payment options.

- **Deferred**: This type of Reserved Instance allows users to complete the upfront payment at the end of the reserved time period. Before starting to use the Reserved Instances, users only need to make a small initial payment and must pay the remaining amount before the end of the reservation period.

- **All Upfront**: This is a prepayment method for Reserved Instances where users must pay the entire upfront cost before starting to use the Reserved Instances. With this option, the virtual machine usage costs will be discounted the most significantly.

Best discount type: `All upfront payment for a 3-year term purchase`.

## Cost Allocation Tags

Cost allocation tags is a feature of AWS that allows you to tag your resources on AWS with labels to categorize and track the costs of those resources. Labels attached to a resource can contain information about its intended use, priority, location classification, project priority, and more.

Tagging these resources helps you gain a clear view of the costs associated with each resource, resource groups, or your entire AWS infrastructure. It also supports you in tracking projects, allocating costs, and managing resources more efficiently. Cost allocation tags are an important tool in managing your expenses on the AWS platform.

## Storage

- **Instance Store**: This is local hard disk storage of EC2 instances, used for applications that can tolerate data loss and require high-speed storage. However, data will be lost if the EC2 instance is terminated or experiences a failure.

- **Elastic Block Store (EBS)**: EBS is a block storage service used to store data on dedicated hardware, ensuring persistence and backup capability. EBS can be attached to and detached from EC2 instances and comes in various types, including EBS GP2, EBS Provisioned IOPS, EBS Magnetic, and EBS Throughput Optimized HDD. It stores data on dedicated AWS hardware and attaches to EC2 instances, providing high performance, persistence, and backup capability. EBS is used for applications that require data integrity and less data loss.

- **Elastic File System (EFS)**: Stores data across multiple EC2 instances and shares it over the network. It provides flexible scaling and easy management for applications that need to share data across multiple EC2 instances. EFS has self-healing features and ensures data integrity.

In essence, EBS is used for applications that store data on a single EC2 instance, while EFS is used for applications that share data across multiple EC2 instances.

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

RAID stands for "Redundant Array of Independent Disks," and it is a data storage technique used to enhance the reliability and performance of storage systems using multiple hard drives.

The most common types of RAID include:

- **RAID 0**: This creates a virtual disk by combining two or more physical drives into a group. Data is divided into smaller portions and stored on different drives. RAID 0 does not have data recovery capabilities if one drive fails but offers higher read/write speeds compared to a single drive.

- **RAID 1**: It uses two or more identical drives and mirrors data from one drive to another. RAID 1 can recover data if one drive fails but is more costly and has lower read/write speeds compared to RAID 0.

- **RAID 10 (or RAID 1+0)**: This is a combination of RAID 1 and RAID 0, using at least four drives and splitting data into portions, then mirroring these portions onto different drives. RAID 10 offers excellent data recovery capabilities and high read/write speeds but is more expensive compared to other RAID techniques.

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
