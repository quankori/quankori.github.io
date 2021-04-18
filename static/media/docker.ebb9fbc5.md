# Cài đặt docker

### Debian

- Cài docker

```bash
sudo apt install docker.io
```

- Kích hoạt service

```bash
sudo systemctl enable --now docker
```

- Thêm user hiện tại vào group

```bash
sudo usermod -aG docker $USER
```

- Group docker khỏi chạy sudo

```bash
newgrp docker
```

### RedHat

- Cài docker

```bash
yum install docker-ce docker-ce-cli containerd.io
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce docker-ce-cli containerd.io
```

- Kích hoạt service

```bash
systemctl start docker
```

### Docker compose

- Cài đặt docker compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

- Chmod file

```bash
sudo chmod +x /usr/local/bin/docker-compose
```
