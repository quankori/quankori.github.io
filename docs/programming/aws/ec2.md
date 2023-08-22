---
title: Amazon Elastic Compute Cloud
---

## Types of EC2

- **On-Demand Instances**: These are the type of EC2 that supports renting virtual machines by the hour without any long-term commitments or upfront agreements. Suitable for applications with high flexibility, short-term usage needs, or significant fluctuations.

- **Reserved Instances**:

  - **Standard Reserved Instances**: This type of EC2 allows users to pre-order to reserve a spot for virtual machine usage and commit to paying for the usage over a period ranging from 1 to 3 years. Typically used to stabilize costs for applications with continuous usage needs and medium to high usage requirements.

  - **Convertible Reserved Instances**: Similar to the Standard Reserved Instances, but with a difference: users can convert this instance type to another type to meet the requirements of different applications.

- **Spot Instances**: This type of EC2 allows users to bid on virtual machine usage prices based on current market rates. When the bidding price is more competitive than the pre-ordered price, Spot Instances will be used. However, when the price goes back up, Spot Instances might get terminated.

## Payment Types for Reserved Instances

- **Partial Upfront**: This is a payment method for Reserved Instances where users must make an upfront payment at a discounted rate and then pay for the usage for the remaining duration of the reservation.

- **No Upfront**: This type of Reserved Instances does not require any upfront payment. However, the discount rate will be lower compared to Full Upfront and Partial Upfront.

- **Deferred**: This type of Reserved Instances allows users to complete the upfront payment at the end of the reservation period. Before starting to use the Reserved Instances, users only need to pay a small amount and must pay the remaining amount before the reservation period ends.

- **All Upfront**: This is a prepayment method for Reserved Instances where users must pay the entire reservation cost before starting to use the Reserved Instances. With this type, the virtual machine usage cost will be most significantly discounted.

Best discount type: `All upfront payment for a 3-year term purchase`.

## Cost Allocation Tags

Cost allocation tags are a feature of AWS that allows you to tag your resources in AWS with labels (tags) to categorize and track the costs of those resources. The tag attached to a resource can contain information about its usage purpose, priority, location classification, project priority, etc.

Tagging these resources helps you gain clarity on the costs of each resource, groups of resources, or your entire AWS infrastructure. It also assists you in tracking projects, distributing costs, and managing resources more effectively. Cost allocation tags are a critical tool in managing your expenses on the AWS platform.

## Storage

There are two types of EC2 storage in Amazon Web Services (AWS):

- **Instance Store**: Storage on the local disk of the EC2 virtual machine used for applications that can tolerate data loss and require high speed. However, data will be lost if the EC2 instance is terminated or faces an issue.

- **Elastic Block Store (EBS)**: A block storage service used to store data on separate hardware, ensuring continuity and backup capabilities. EBS can be attached and detached from EC2 instances and comes in various types, including EBS GP2, EBS Provisioned IOPS, EBS Magnetic, and EBS Throughput Optimized HDD.

The differences between EBS and EFS are:

- **Elastic Block Store (EBS)**: Stores data on AWS's separate hardware and attaches to EC2 instances. It offers high performance, continuity, and backup capabilities. EBS is utilized for applications that require data integrity and lesser data loss.

- **Elastic File System (EFS)**: Stores data across multiple EC2 instances and shares it over the network. It provides flexible scalability and easy management for applications that need data sharing across multiple EC2 instances. EFS features self-recovery and ensures data integrity.

In essence, EBS is used for applications storing data on a single EC2 server, while EFS is utilized for applications sharing data across multiple EC2 servers.

## Types of EBS

| EBS Type                 | Cost per GB/month                                           | Max Performance (IOPS) | Max Data Transfer Speed | Main Feature                                               |
| ------------------------ | ------------------------------------------------------------ | ----------------------- | ----------------------- | ---------------------------------------------------------- |
| GP2 (SSD)                | $0.10 USD                                                   | 16,000 IOPS             | 250 MB/s               | General-purpose needs, supports burstable performance      |
| Provisioned IOPS (SSD)   | $0.125 - $0.185 USD (depending on the requested IOPS)       | 64,000 IOPS             | 1,000 MB/s             | For high-performance applications                          |
| Magnetic                 | $0.05 USD                                                   | 40-200 IOPS             | 100 MB/s               | Low-cost storage or applications with low performance needs|
| Throughput Optimized HDD | $0.045 USD                                                  | N/A                     | 500 MB/s               | For applications requiring large data processing           |

Explanation:

- **GP2 (SSD)**: Satisfies general-purpose needs with burstable performance.
- **Provisioned IOPS (SSD)**: Meant for applications requiring high performance and data integrity.
- **Magnetic**: Used for applications with low performance requirements or budget constraints.
- **Throughput Optimized HDD**: For applications requiring processing of large data sets.

## EBS Types

| EBS Type                 | Cost per GB/month                                           | Maximum IOPS           | Maximum Data Transfer Rate | Key Feature                                           |
| ------------------------ | ------------------------------------------------------------ | ----------------------- | -------------------------- | ------------------------------------------------------|
| GP2 (SSD)                | $0.10 USD                                                   | 16,000 IOPS            | 250 MB/s                  | General purpose, supports burstable performance       |
| Provisioned IOPS (SSD)   | $0.125 - $0.185 USD (depends on required IOPS)              | 64,000 IOPS            | 1,000 MB/s                | For high-performance applications                     |
| Magnetic                 | $0.05 USD                                                   | 40-200 IOPS            | 100 MB/s                  | Low-cost storage or applications with low performance |
| Throughput Optimized HDD | $0.045 USD                                                  | N/A                    | 500 MB/s                  | For big data processing applications                 |

**Explanation**:
- **GP2 (SSD)**: For general requirements with burstable performance capabilities.
- **Provisioned IOPS (SSD)**: For applications requiring high performance and data integrity.
- **Magnetic**: For applications with low performance requirements wanting to save on costs.
- **Throughput Optimized HDD**: For applications processing large data.

## RAID

RAID stands for "Redundant Array of Independent Disks." It's a data storage technique used to improve the reliability and performance of storage systems using multiple hard drives.

The most common RAID types include:

- **RAID 0**: Creates a virtual drive by merging two or more physical drives into a group. Data is split into small segments and stored on different drives. RAID 0 lacks data recovery capabilities if a drive fails but offers higher read/write speeds compared to a single drive.

- **RAID 1**: Uses two or more identical drives and mirrors data from one drive to another. RAID 1 can recover data if a drive fails but is costlier than RAID 0 and offers lower read/write speeds.

- **RAID 5**: Uses at least three physical drives and stores parity information across different drives. RAID 5 can recover data if one drive fails and offers relatively high read/write speeds.

- **RAID 6**: Similar to RAID 5 but uses at least four drives to store parity information, enhancing data recovery capabilities compared to RAID 5.

- **RAID 10 (or RAID 1+0)**: A combination of RAID 1 and RAID 0, uses at least four drives and splits data into segments, which are then mirrored onto different drives. RAID 10 offers excellent data recovery capabilities and high read/write speeds, but it's pricier compared to other RAID techniques.


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
