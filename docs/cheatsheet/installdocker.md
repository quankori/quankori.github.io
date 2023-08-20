---
title: Install Docker 
---

## Debian Docker

Install docker

```bash
sudo apt install docker.io
```

Active service

```bash
sudo systemctl enable --now docker
```

Add user to group

```bash
sudo usermod -aG docker $USER
```

Group docker

```bash
newgrp docker
```

Install docker compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Chmod file

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

## RedHat Docker

Install docker

```bash
yum install docker-ce docker-ce-cli containerd.io
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce docker-ce-cli containerd.io
```

Active service

```bash
systemctl start docker
```

## AWS EC2 Docker

Update system

```bash
sudo yum update
```

Install docker

```bash
sudo yum search docker
```

```bash
sudo yum info docker
```

```bash
sudo yum install docker
```

Active service

```bash
sudo usermod -a -G docker ec2-user
id ec2-user
newgrp docker
```

Enable docker service

```bash
sudo systemctl enable docker.service
```

Enable docker service

```bash
sudo systemctl start docker.service
```

Docker-compose

```bash
wget https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)
sudo mv docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose
sudo chmod -v +x /usr/local/bin/docker-compose
```
