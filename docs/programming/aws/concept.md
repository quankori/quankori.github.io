---
title: Cloud Concept
---

## Benefis of Cloud Computing

When transitioning infrastructure and applications from on-premises data centers to AWS, one of the significant financial opportunities is replacing operational expenditure (OPEX) with low initial capital expenditure (CAPEX).

With on-premises infrastructure, day-to-day activities related to maintenance, upgrades, and infrastructure expansion are considered as OPEX. However, when moving to AWS, these costs can be replaced with lower initial capital expenditure for building and deploying new infrastructure, after which ongoing operational costs will be minimized.

Using AWS helps organizations save on variable operational costs and reduce initial capital investments. By shifting from OPEX to CAPEX, organizations can enhance cost management flexibility, lower initial capital investments, and improve their ability to grow and scale rapidly.

### OPEX vs CAPEX

OPEX and CAPEX are two financial concepts in business management. Simply put, OPEX (Operational Expenditure) refers to the costs associated with the day-to-day operations of an organization, such as electricity costs, rent, employee salaries, expenses for purchasing components, raw materials, and so on. In contrast, CAPEX (Capital Expenditure) relates to costs associated with investments in the fixed assets of an organization, such as construction costs, equipment purchases, machinery, etc.

An easy-to-understand illustration is comparing the cost of buying a car to the cost of maintaining it. The cost of buying a new car can be considered an initial capital expenditure (CAPEX), while the costs for fuel, maintenance, and periodic repairs are regarded as operational expenses (OPEX).

In the field of information technology, expenses for software, hardware, and cloud services can be categorized as OPEX, while acquiring new servers or networking equipment may be classified as CAPEX.

From a business perspective, the choice between OPEX and CAPEX impacts how an organization manages and allocates its budget and resources. Using cloud services from AWS helps minimize initial capital expenditures (CAPEX) and shifts towards operational expenditure (OPEX), allowing organizations to save costs and enhance financial management flexibility.

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

The public cloud provides resources such as computing, storage, networking, development and deployment environments, as well as applications over the internet. They are owned and operated by third-party cloud service providers like AWS.

### Private cloud

Private clouds are built, operated, and used by a single organization, often located in on-premises data centers. They offer better control, customization, and data security but come with similar resource constraints and costs as traditional IT environments.

### Hybrid cloud

Hybrid clouds combine at least one private computing environment (traditional IT infrastructure or a private cloud, including edge computing) with one or more public clouds, known as hybrid clouds. They allow you to leverage resources and services from different computing environments and choose the most optimal environment for your computing tasks.
