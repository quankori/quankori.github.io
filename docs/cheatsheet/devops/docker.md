---
title: Docker CheatSheet
---

### Clear all

```bash
docker stop $(docker ps -a -q)
```

```bash
docker rmi -f $(docker images -a -q)
```

```bash
docker rm $(docker ps -a -q)
```

```bash
docker system prune
```

### Basic

Pull, list

```bash
docker pull image_name:version
```

```bash
docker images
```

```bash
docker ps
```

Log

```bash
docker logs -t --tail 1000 container 2>&1 | grep -i error
```

```bash
docker logs -f container_id
```

Attach, restart, execute

```bash
docker attach container_id
```

```bash
docker start container_id
```

```bash
docker exec -it container_id /bin/bash
```

Copy local to docker

```bash
docker cp <local_path> 1d8:/<remote_path>
```

### Docker M1 BuildX

Open permission

```bash
sudo chown -R $(id -u):$(id -g) $HOME/.docker
```

Build docker to AMD64 and buildx

```bash
sudo docker buildx build -t prj-ecr-dev --platform=linux/amd64 .
```
