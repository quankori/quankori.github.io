---
title: Amazon Virtual Private Cloud
---

## Network ACL

A Network Access Control List (ACL) is a feature of Amazon Web Services (AWS) used to control access to network resources. It operates at the network layer and is applied to resources within an Amazon Virtual Private Cloud (VPC), including subnets and instances.

Network ACLs function similarly to a network-level firewall, allowing you to control inbound and outbound connections to and from a subnet or instance within a VPC. It enables you to create rules that either permit or deny connections based on source and destination IP addresses, protocols, and ports.

Each subnet in a VPC can be associated with a Network ACL. If a subnet isn't linked to any Network ACL, it defaults to a Network ACL that permits all incoming and outgoing connections.

Network ACLs enable you to control access at the network layer, whereas EC2 Security Groups allow you to control access at the instance level. However, this doesn't mean that Network ACLs and Security Groups are interchangeable. Instead, they complement each other, providing comprehensive protection for your network resources within a VPC.

## Subnet network

A subnet network is a portion of a larger network that has been divided into smaller subnetworks, with each subnetwork belonging to the same IP address range. The purpose of subdividing a larger network into subnets is to manage, control, and secure access traffic between devices on the network.

Each subnet network has its own range of IP addresses, determined by a subnet mask. The subnet mask helps differentiate IP addresses on the network into different subnetworks based on the number of 0 bits at the end of the IP address.

In Amazon Web Services (AWS), subnet networks are used within Amazon Virtual Private Cloud (VPC), a service that allows users to create custom private networks on the AWS platform. Subnets within a VPC can be used to partition the network into different zones with varying levels of privacy, enhancing security and access control.

## CIDR

CIDR (Classless Inter-Domain Routing) is a method of IP routing that allows for more detailed and manageable segmentation of IP address ranges. CIDR represents IP address ranges by using specific bits from the IP address to define the subnet.

CIDR IP addresses are written in the form (IP address)/(number of mask bits). For example, 192.168.0.0/24 indicates that the first 24 bits of the IP address define the subnet, while the remaining 8 bits make up individual IP addresses.

In AWS, CIDR is used within Amazon Virtual Private Cloud (VPC) to define IP address ranges for subnet networks. When creating a subnet within a VPC, users must specify a CIDR block to determine the available IP address range for that subnet.

To calculate the number of available IP addresses within a CIDR range, you can use the formula: 2^(32 - number of mask bits). For example, in the CIDR range 192.168.0.0/24, there are a total of 256 IP addresses (2^(32-24)).

## VPC Peering

VPC Peering is a feature within Amazon Virtual Private Cloud (VPC) that allows for direct connectivity between two or more separate VPCs, even if they do not belong to the same AWS account. This connection enables VPCs to access each other's resources through a private and secure network link.

When setting up VPC Peering, subnets in different VPCs are connected to each other through a virtual network connection managed by AWS. This allows instances in different VPCs to exchange traffic directly through a private network, enhancing the flexibility and efficiency of your applications.

Some advantages of VPC Peering include:

- **Security**: VPC Peering connections are encrypted and transmitted through a private network, ensuring the safety of transmitted data.
- **Flexibility**: VPC Peering allows for connections between VPCs in different regions, different AWS accounts, or with different CIDR blocks.
- **Cost Savings**: VPC Peering enables the exchange of traffic between VPCs through a private network, reducing the need for public-facing gateways or VPN connections, thus saving costs for businesses.

## NAT Gateway

NAT Gateway is a service provided by Amazon Web Services (AWS) that allows instances within an Amazon Virtual Private Cloud (VPC) to access the Internet through a single IP address, enhancing security and network traffic management.

When an instance in a VPC needs to connect to the Internet for tasks like software updates or other network-related activities, the NAT Gateway forwards network traffic from that instance to the Internet. NAT Gateway is placed in a public subnet, and instances that need Internet access should be placed in private subnets and associated with the NAT Gateway.

Some benefits of NAT Gateway include:

- **Security**: NAT Gateway helps hide the actual IP addresses of instances within the VPC, enhancing system security.
- **Flexibility**: NAT Gateway can handle network traffic to and from the Internet for multiple private subnets within the VPC.
- **Reliability**: NAT Gateway is deployed across multiple Availability Zones in an AWS region, increasing system reliability and availability.
- **Automation**: Managed by AWS, NAT Gateway reduces management and maintenance tasks for users.

However, NAT Gateway is a paid service, and users are billed monthly based on the amount of network traffic forwarded through the NAT Gateway.

## Route Table

A route table is an essential component within Amazon Web Services' (AWS) Amazon Virtual Private Cloud (VPC), used to determine how network traffic is routed between subnets or an internet gateway within the VPC.

Each subnet in a VPC has a route table, and this route table contains route entries that specify how network traffic should be directed. These route entries define the destinations that can be accessed from that subnet and the next hop where network traffic will be forwarded.

Route entries can be configured to route network traffic to other subnets within the VPC, route network traffic to the Internet through an Internet gateway or NAT Gateway, or route network traffic to external network devices outside the VPC.

Route tables also allow users to customize route entries to route network traffic as desired, providing flexibility and efficiency for the network system within the VPC.

In summary, a Route Table is an important component within Amazon Virtual Private Cloud (VPC) used to route network traffic between subnets or an Internet gateway within the VPC. It enables users to customize route entries for routing network traffic as needed.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/aws/1.png)
