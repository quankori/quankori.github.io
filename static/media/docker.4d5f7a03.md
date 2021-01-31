# Docker Cheatsheet

- Dừng toàn bộ docker

```bash
docker stop $(docker ps -a -q)
```

- Xóa toàn bộ images

```bash
docker rmi -f $(docker images -a -q)
```

- Xóa toàn bộ containers

```bash
docker rm $(docker ps -a -q)
```

- Xem các images trong máy

```bash
docker images
```

- Tải image

```bash
docker pull image_name:version
```

- Xóa image chỉ định

```bash
docker image rm image_name:version
```

- Truy cập image

```bash
# condition:
# --name: Đặt tên container
# --port: Tạo port
# -i: Cho phép nhận tham số
# -t: Chạy termnial
docker run -it image_name /bin/bash
```

- Xem container đang chạy

```bash
docker ps
```

- Truy cập container đang chạy

```bash
docker attach container_id
```

- Chạy lại container

```bash
docker start container_id
```

- Dừng container

```bash
docker stop container_id
```

- Xóa container

```bash
docker rm container_id
```

- Tương tác với container

```bash
docker exec -it container_id /bin/bash
```

- Log container

```bash
docker logs -f container_id
```

- Copy file to container

```bash
docker cp <local_path> 1d8:/<remote_path>
```
