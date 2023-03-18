---
title: Terraform
---

## Setup Terraform

- Install aws cli

- Setup HashiCorp tab package

```bash
brew tap hashicorp/tap
```

- Setup Terraform CLI package

```bash
brew install hashicorp/tap/terraform
```

- Update latest version Terraform

```bash
brew update
brew upgrade hashicorp/tap/terraform
```

- Check terraform

```bash
terraform -help
```

- Check library

```bash
https://registry.terraform.io/
```

## Command line Terraform

- Basic command line

```bash
terraform init
terraform apply -auto-approve
terraform destroy
```

- Log and debug

```bash
terraform plan

terraform plan -out plan.out

terraform show -json plan.out > plan.json
```
