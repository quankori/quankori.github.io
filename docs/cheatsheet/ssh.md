---
title: SSH CheatSheet
---

## Generate SSH (Default OpenSSH)

```bash
ssh-keygen -f <path>
```

## Generate SSH PEM (Privacy-Enhanced Mail)

```bash
ssh-keygen -t rsa -m PEM -f <path>
```

## Generate SSH GIT (ED25519)

```bash
ssh-keygen -t ed25519 -C "minhquan.k0r1@gmail.com"
```

## Make sure ssh-agent running

```bash
eval "$(ssh-agent -s)"
```

## Add ssh key account to ssh-agent

```bash
ssh-add ~/.ssh/id_ed25519
```

## Step add user to ec2

Add new user

```bash
sudo adduser newuser
```

Create folder ssh

```bash
sudo mkdir /home/newuser/.ssh
```

Copy public SSH user to file

```bash
sudo nano /home/newuser/.ssh/authorized_keys
```

Grant permission for newuser

```bash
sudo chown -R newuser:newuser /home/newuser/.ssh
sudo chmod 700 /home/newuser/.ssh
sudo chmod 600 /home/newuser/.ssh/authorized_keys
```

User test

```bash
ssh newuser@<ip_ec2>
```
