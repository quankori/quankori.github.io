---
title: AWS CLI CheatSheet
---

- Copy file local to remote server

```bash
scp -i mykey.pem somefile.txt root@my.ec2.id.amazonaws.com:/
```

- Get info account

```bash
aws sts get-caller-identity --profile
```

- Change account AWS

```bash
aws configure --profile <profile-name>
```
