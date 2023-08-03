---
title: Docker CheatSheet
---

## Setup

### Debian Docker

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

### RedHat Docker

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

### AWS EC2 Docker

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

### Docker compose

Install docker compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Chmod file

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

## Stop all container

```bash
docker stop $(docker ps -a -q)
```

## Remove all images

```bash
docker rmi -f $(docker images -a -q)
```

## Remove all containers

```bash
docker rm $(docker ps -a -q)
```

## Remove all volumes

```bash
docker system prune
```

```bash
docker volume rm $(docker volume ls -qf dangling=true | xargs)
```

## List images

```bash
docker images
```

## Pull image

```bash
docker pull image_name:version
```

## Remove image selected

```bash
docker image rm image_name:version
```

## Access image

```bash
# condition:
# --name: Đặt tên container
# --port: Tạo port
# -i: Cho phép nhận tham số
# -t: Chạy termnial
docker run -it image_name /bin/bash
```

## Log container running

```bash
docker ps
```

## Access container runnning

```bash
docker attach container_id
```

## Restart container

```bash
docker start container_id
```

## Stop container

```bash
docker stop container_id
```

## Remove container

```bash
docker rm container_id
```

## Execute container

```bash
docker exec -it container_id /bin/bash
```

## Log container

```bash
docker logs -f container_id
```

## Copy file to container

```bash
docker cp <local_path> 1d8:/<remote_path>
```

## Docker log tail container

```bash
docker logs -t --tail 1000 container 2>&1 | grep -i error
```
