# Docker Compose Cheatsheet

- Xóa docker compose

```bash
docker-compose rm --all
```

- Tải containers

```bash
docker-compose pull
```

- Build container

```bash
docker-compose build --no-cache
```

- Chạy docker-compose

```bash
docker-compose up --force-recreate
```

- Chạy logs docker-compose

```bash
docker-compose logs
```

- Example

```yaml
version: "3"
services:
  nginx: # Nginx
    container_name: docker_main
    build: ../nginx/
    volumes:
      - ../nginx:/etc/nginx/conf.d/
    ports:
      - "80:80" # Outside - Inside
    depends_on: # links or depends_on
      - "source"
    networks:
      - private_network
    restart: always

  source: # Golang
    container_name: docker_source
    volumes:
      - ../..:/projects
    build: # Location build dockerifle
      context: ../../
      dockerfile: Dockerfile
    networks: # Network inside
      - private_network
    restart: always # Always resets

  database: # MySQL
    container_name: docker_database
    image: mysql:5.7
    environment:
      - "MYSQL_ROOT_PASSWORD=1234"
    volumes:
      - "$PWD/database/mysql:/var/lib/mysql"
    networks:
      - private_network

  jenkins: # Jenkins
    container_name: docker_jenkins
    image: kori_jenkins
    build:
      context: $PWD/jenkins
    ports:
      - "8080:8080"
    volumes:
      - $PWD/jenskins_data:/var/jenkins_home
    networks:
      - private_network
    restart: always

networks:
  private_network:
```
