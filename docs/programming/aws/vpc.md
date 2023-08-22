---
title: Amazon Virtual Private Cloud
---

## Network ACL

A Network Access Control List (ACL) is a feature of Amazon Web Services (AWS) used to control access to network resources. It operates at the network layer and is applied to resources on Amazon Virtual Private Cloud (VPC), including subnets and instances.

Network ACL functions similarly to a network-level firewall, allowing you to control the connections accessing and leaving a subnet or instance on a VPC. It lets you create rules to permit or deny connections based on source and destination IP addresses, protocols, and ports.

Each subnet in a VPC can be associated with a Network ACL. If a subnet is not associated with any Network ACL, it defaults to a Network ACL that allows all incoming and outgoing connections.

Network ACL allows you to control access at the network layer, whereas EC2's Security Group lets you control access at the instance layer. However, this doesn't mean Network ACL and Security Group replace each other. Instead, they complement each other, providing comprehensive protection for your network resources on VPC.

## Subnet network

A subnet network is a segment of a larger network that is divided into smaller subnetworks, each belonging to the same IP address range. The purpose of segmenting a larger network into subnets is to manage, control, and secure traffic between devices on the network.

Each subnet network has its IP address range, defined by a subnet mask. The subnet mask helps differentiate IP addresses on the network into different subnetworks based on the number of trailing 0 bits in the IP address.

In Amazon Web Services (AWS), subnet networks are used within Amazon Virtual Private Cloud (VPC), a service that allows users to create custom private networks on the AWS platform. Subnets in VPC can be used to segment the network into areas with varying degrees of privacy, enhancing security and access recognition.

## CIDR

CIDR (Classless Inter-Domain Routing) is an IP routing method that enables more granular and manageable IP address range segmentation. CIDR represents IP address ranges using a specific number of bits from the IP address to denote the subnet.

CIDR IP addresses are written as (IP address)/(number of mask bits). For example, 192.168.0.0/24 indicates that the first 24 bits of the IP address define the subnet, while the remaining 8 bits form individual IP addresses.

In AWS, CIDR is utilized within the Amazon Virtual Private Cloud (VPC) to define the IP address range for subnet networks. When creating a subnet in VPC, users must specify a CIDR block to determine the available IP address range for that subnet.

To calculate the number of available IP addresses in a CIDR range, one can use the formula: 2^(32-number of mask bits). For instance, in the CIDR range 192.168.0.0/24, there are a total of 256 IP addresses (2^(32-24)).

## VPC Peering

VPC Peering is a feature in Amazon Virtual Private Cloud (VPC) that allows direct connection between two or more different VPCs, even if they don't belong to the same AWS account. This connection allows VPCs to access each other's resources through a private and secure network connection.

When you set up VPC Peering, subnets in different VPCs are interconnected via a virtual network connection managed by AWS. This allows instances in different VPCs to exchange traffic directly through a private network, enhancing the flexibility and efficiency of your applications.

Some advantages of VPC Peering include:

- **Security**: VPC Peering connections are encrypted and transmitted through a private network, ensuring the data transferred is secure.
- **Flexibility**: VPC Peering allows connecting different VPCs located in different regions, different accounts, or using different CIDR blocks.
- **Cost Savings**: VPC Peering allows traffic exchange between VPCs through a private network, reducing the need for public gateways or VPN connections, thus saving costs for businesses.

However, it's important to note that VPC Peering only allows access to resources in another VPC, not resources outside of AWS.

## NAT Gateway

NAT Gateway is a service provided by Amazon Web Services (AWS) that allows instances within an Amazon Virtual Private Cloud (VPC) to access the Internet via a single unique IP address, enhancing security and managing network traffic.

When an instance in a VPC needs to connect to the Internet to download updates, install software, or perform other network tasks, the NAT Gateway forwards the traffic from that instance to the Internet. The NAT Gateway is placed in a public subnet, and instances wanting to access the Internet should be placed in private subnets and linked to the NAT Gateway.

Some advantages of NAT Gateway include:

- **Security**: NAT Gateway helps conceal the actual IP address of instances within the VPC, enhancing system security.
- **Flexibility**: NAT Gateway can handle traffic to and from the Internet for multiple private subnets within the VPC.
- **Reliability**: NAT Gateway is deployed across multiple Zones in an AWS region, enhancing system reliability and availability.
- **Automation**: Managed by AWS, the NAT Gateway reduces management and maintenance tasks for users.

However, NAT Gateway is a paid service, and users need to pay monthly fees corresponding to the traffic forwarded through the NAT Gateway.

## Route Table

The route table is an essential component in Amazon Virtual Private Cloud (VPC) of Amazon Web Services (AWS), used to determine how traffic is routed between subnets or an internet gateway within the VPC.

Every subnet within the VPC has a route table, and this route table contains route entries that dictate how traffic should be directed. These route entries define possible destinations accessible from that subnet and the next hop where the traffic will be forwarded.

Route entries can be set up to direct traffic to other subnets within the VPC, route traffic to the Internet via an Internet gateway or NAT Gateway, or route traffic to other network devices outside the VPC.

Route tables also allow users to customize route entries to route traffic as they wish, providing flexibility and efficiency to the network system within the VPC.

In conclusion, the Route Table is a vital component in Amazon Virtual Private Cloud (VPC) that helps direct traffic between subnets or an Internet gateway within the VPC and allows users to customize route entries to route traffic according to their preferences.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/aws/1.png)
