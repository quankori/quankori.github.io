---
title: Cloud Concept
---

## Benefis of Cloud Computing

In converting infrastructure and applications from on-premises data centers to AWS, one of the significant financial opportunities is replacing variable operating costs (OPEX) with low initial capital costs (CAPEX).

With on-premises infrastructure, daily operations related to maintenance, upgrades, and expanding the infrastructure are calculated as OPEX. However, when moving to AWS, these costs can be replaced by low initial capital costs to build and deploy new infrastructure, and then related operating costs will be minimized.

Using AWS helps organizations save on non-fixed operating costs and minimize initial capital investment. By switching from OPEX to CAPEX, organizations can increase flexibility in managing costs, reduce initial capital investment, and enhance the ability to grow and expand rapidly.

### OPEX vs CAPEX

OPEX and CAPEX are two financial concepts in business management. Simply put, OPEX (Operational Expenditures) refers to the costs associated with the day-to-day operations of an organization, such as electricity costs, rent, employee salaries, expenses for purchasing components, supplies, and so forth. On the other hand, CAPEX (Capital Expenditures) pertains to costs associated with investing in an organization's fixed assets, like the expenses for construction, purchasing equipment, machinery, etc.

A more illustrative way to understand this is to compare the cost of buying a car with the costs of maintaining it. The cost of buying a new car can be seen as an initial capital expenditure (CAPEX), while expenses for gasoline, maintenance, and regular repairs are considered operating costs (OPEX).

In the realm of information technology, costs for software, hardware, and cloud services might be considered OPEX, whereas purchasing new servers or networking equipment might be categorized as CAPEX.

From a business perspective, the choice between OPEX and CAPEX influences how an organization manages and allocates its budget and resources. Utilizing cloud services from AWS helps reduce initial capital expenditures (CAPEX) and shift towards variable operating expenses (OPEX), enabling organizations to save on costs and enhance financial management flexibility.

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

IaaS delivers on-demand infrastructure resources, such as compute, storage, networking, and virtualization. With IaaS, the service provider owns and operates the infrastructure, but customers will need to purchase and manage software, such as operating systems, middleware, data, and applications.

- Platform as a Service (PaaS)

PaaS delivers and manages hardware and software resources for developing, testing, delivering, and managing cloud applications. Providers typically offer middleware, development tools, and cloud databases within their PaaS offerings.

- Software as a Service (SaaS)

SaaS provides a full application stack as a service that customers can access and use. SaaS solutions often come as ready-to-use applications, which are managed and maintained by the cloud service provider.

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

Public clouds deliver resources, such as compute, storage, network, develop-and-deploy environments, and applications over the internet. They are owned and run by third-party cloud service providers like AWS.

### Private cloud

Private clouds are built, run, and used by a single organization, typically located on-premises. They provide greater control, customization, and data security but come with similar costs and resource limitations associated with traditional IT environments.

### Hybrid cloud

Environments that mix at least one private computing environment (traditional IT infrastructure or private cloud, including edge) with one or more public clouds are called hybrid clouds. They allow you to leverage the resources and services from different computing environments and choose which is the most optimal for the workloads.
