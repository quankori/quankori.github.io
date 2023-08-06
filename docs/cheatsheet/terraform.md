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

- State

```bash
terraform import

terraform state list

terraform state rm
```

- Check version

```bash
curl -sL https://checkpoint-api.hashicorp.com/v1/check/terraform | jq -r '.current_version'
```

- Downlaod version

```bash
wget https://releases.hashicorp.com/terraform/....
```

- Unzip and move to local bin

```bash
unzip unzip terraform_VERSION_linux_amd64.zip

sudo mv terraform /usr/local/bin/
```

- Terraform init state

Mục đích của tùy chọn này là giúp bạn di chuyển trạng thái từ một backend cấu hình cũ sang một backend cấu hình mới mà không cần phải thực hiện công việc này một cách thủ công.

```bash
terraform init -migrate-state
```

Tùy chọn này buộc Terraform không tham chiếu hoặc sử dụng bất kỳ cấu hình backend nào hiện có.

```bash
terraform init -reconfigure
```

Khi chạy terraform init với tùy chọn -upgrade, lệnh sẽ cố gắng tải về và cập nhật các phiên bản mới nhất của providers mà bạn đã sử dụng, theo điều kiện phiên bản đã được xác định trong mã của bạn.

```bash
terraform init -upgrade
```
