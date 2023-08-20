---
title: Containers
---

## AWS Elastic Container Registry (ECR)

- **Purpose**: Container image storage.
- **Description**: Fully managed Docker container registry.
- **Use case**: Store, manage, and deploy Docker container images.
- **Example**: Storing Docker images for a microservices architecture.
- **Key features**: Secure, scalable, integrated with ECS and EKS.

## AWS Elastic Container Service (ECS)

- **Purpose**: Container orchestration.
- **Description**: Managed service to run, stop, and manage Docker containers on a cluster.
- **Use case**: Microservices deployment, batch processing.
- **Example**: Deploying a three-tier web application as containers.
- **Key features**: Deep AWS integration, Fargate compatibility, service discovery.

## Fargate

- **Purpose**: Serverless compute for containers.
- **Description**: Allows running containers without managing the underlying infrastructure.
- **Use case**: Containerized applications without infrastructure management.
- **Example**: Running a stateless web app in containers without managing servers.
- **Key features**: Serverless, integrates with ECS and EKS, automatic scaling.

## AWS Elastic Kubernetes Service (EKS)

- **Purpose**: Managed Kubernetes service.
- **Description**: Lets you run Kubernetes on AWS without maintaining the control plane.
- **Use case**: Kubernetes-based applications.
- **Example**: Hosting a multi-container application using Kubernetes.
- **Key features**: Deep AWS integration, managed Kubernetes, auto-scaling.
