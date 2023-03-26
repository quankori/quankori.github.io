---
title: MongoDB Read Replicate
---

`docker-compose.yml`

```yaml
version: "3.8"

services:
  mongo1:
    container_name: mongo1
    image: mongo:4.4
    volumes:
      - ./data/data1:/data/db
      - ./rs-init.sh:/scripts/rs-init.sh
    networks:
      - mongors-network
    ports:
      - 27021:27017
    links:
      - mongo2
      - mongo3
    restart: always
    entrypoint: ["/usr/bin/mongod", "--bind_ip_all", "--replSet", "dbrs"]
  mongo2:
    container_name: mongo2
    image: mongo:4.4
    volumes:
      - ./data/data2:/data/db
    networks:
      - mongors-network
    ports:
      - 27022:27017
    restart: always
    entrypoint: ["/usr/bin/mongod", "--bind_ip_all", "--replSet", "dbrs"]
  mongo3:
    container_name: mongo3
    image: mongo:4.4
    volumes:
      - ./data/data3:/data/db
    networks:
      - mongors-network
    ports:
      - 27023:27017
    restart: always
    entrypoint: ["/usr/bin/mongod", "--bind_ip_all", "--replSet", "dbrs"]

networks:
  mongors-network:
    driver: bridge
```

---

`rs-init.sh`

```bash
#!/bin/bash

mongo <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo1:27017",
            "priority": 3
        },
        {
            "_id": 2,
            "host": "mongo2:27017",
            "priority": 2
        },
        {
            "_id": 3,
            "host": "mongo3:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF
```
