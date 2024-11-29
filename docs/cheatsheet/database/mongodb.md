---
title: MongoDB CheatSheet
---

### Basic command

- Login monitor

```bash
mongo uri
```

- Connect to mongo

```bash
mongo -host 127.0.0.1 --port 27017 -u root --password XXXXXX
```

- Show all databases

```bash
show dbs;
```

- Show excute database

```bash
use db_name;
```

- Show all collections

```bash
show collections;
```

### Backup and Restore

- Backup

```bash
mongodump --db your-db-name
```

- Restore backup

```bash
mongorestore --db your-db-name dump/your-db-name
```

### Add users

```bash
db.addUser({user: "development", pwd: "123456", roles: [ "dbAdmin"]});
```
