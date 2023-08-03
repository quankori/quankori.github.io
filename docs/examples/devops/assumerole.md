---
title: Assume Role Example
---

Install package assume-role

```bash
go install github.com/remind101/assume-role@latest
```

Create IAM Users with basic policy

```yml
{
  "Version": "2012-10-17",
  "Statement":
    [
      {
        "Effect": "Allow",
        "Action":
          [
            "iam:ListMFADevices",
            "iam:CreateVirtualMFADevice",
            "iam:EnableMFADevice",
            "iam:ListVirtualMFADevices",
            "iam:ResyncMFADevice",
            "iam:ListMFADeviceTags",
            "iam:DeactivateMFADevice",
            "iam:DeleteVirtualMFADevice",
            "iam:TagMFADevice",
            "iam:UntagMFADevice",
            "iam:ListAccessKeys",
            "iam:CreateAccessKey",
            "sts:AssumeRole",
            "iam:ChangePassword",
            "iam:GetAccountSummary",
          ],
        "Resource": ["arn:aws:iam::*:user/*", "arn:aws:iam::*:mfa/*"],
      },
    ],
}
```

Create new role add `Permissions policies` you want, in tab `Trusted entities` edit

```yml
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::{USER_ID}:user/{IAM_USER}"
                ]
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "Bool": {
                    "aws:MultiFactorAuthPresent": "true"
                }
            }
        }
    ]
}
```

Config `.config` profile user

```bash
[profile kori-admin]
region = ap-south-1
mfa_serial = 
source_profile = kori // Reference with credentials
role_arn = // ARN role
```

Use assume role with ARN role added

```bash
assume-role kori-admin // profile config
```

Save assume role

```bash
eval $(assume-role kori-admin)
```