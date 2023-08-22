---
title: Migration & Transfer
---

## AWS Database Migration Service

- **Purpose**: Migrate databases to AWS with minimal downtime.
- **Description**: A service that allows easy migration of databases to AWS, either on-premises or in the cloud.
- **Use case**: Migrating a production database to RDS or Aurora.
- **Example**: Migrating a MySQL database to Amazon Aurora without stopping the source database.
- **Key features**: Supports various databases, continuous data replication, minimal downtime.

## AWS Snow Family

| Feature/Service          | AWS Snowcone                                                             | AWS Snowball                                                         | AWS Snowmobile                                                   |
| ------------------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Primary Purpose**      | Edge computing & data transfer                                           | Large-scale data transfer                                            | Exabyte-scale data transfer                                      |
| **Storage Capacity**     | 8 TB usable capacity                                                     | 80 TB or 42 TB depending on region & type                            | Up to 100 PB                                                     |
| **Size & Form**          | Small, rugged & portable (4.5 lbs)                                       | Suitcase-sized device                                                | Semi-trailer truck                                               |
| **Compute**              | 2 CPUs, 4 GB of RAM, and an optional GPU                                 | Varies based on the type (Standard, Edge Computing, etc.)            | Designed primarily for storage, not compute                      |
| **Networking**           | 10 GbE network interfaces                                                | 10 GbE & 25 GbE                                                      | 45Gbps per Snowmobile                                            |
| **Use Cases**            | Edge locations, IoT, healthcare, content distribution, remote field work | Datacenter migrations, disaster recovery, content distribution       | Massive datacenter migrations or large digital archive transfers |
| **Operational Duration** | Indefinite                                                               | Typically a few days to a couple of weeks                            | Several weeks to a few months depending on data size             |
| **Security**             | Encryption, tamper-evident enclosures                                    | Encryption, tamper-evident enclosures, Trusted Platform Module (TPM) | Encryption, 24/7 video surveillance, security personnel          |
| **Interface**            | AWS OpsHub, AWS CLI                                                      | AWS OpsHub, AWS CLI, AWS Management Console                          | AWS OpsHub, AWS CLI                                              |

## AWS Server Migration Service

- **Purpose**: Migrate on-premises servers to AWS.
- **Description**: Automated service for migrating existing workloads to AWS.
- **Use case**: Moving virtual machines from a data center to Amazon EC2.
- **Example**: Incremental replication of active VMs to AWS.
- **Key features**: Automated server replication, multi-server migration, scheduling.

## AWS Migration Hub

- **Purpose**: Track migration progress.
- **Description**: Central hub to monitor and manage migrations from on-premises to AWS.
- **Use case**: Large scale AWS migration projects.
- **Example**: Tracking the progress of migrating 100 servers from on-premises to AWS.
- **Key features**: Centralized migration tracking, integrated tools, progress visualization.
