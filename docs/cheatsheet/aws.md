---
title: AWS CheatSheet
---

## Copy file to AWS

```bash
scp -i mykey.pem somefile.txt root@my.ec2.id.amazonaws.com:/
```

## AWS CLI account

```bash
aws sts get-caller-identity --profile
```

## Access AWS ECS

```bash
aws ecs execute-command  \
--profile profile_name \
--cluster cluster_name \
--task task_id \
--container admin \
--command "/bin/bash" \
--interactive
```

## Change account AWS

```bash
aws configure --profile <profile-name>
```
