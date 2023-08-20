---
title: MySQL CheatSheet
---

## Basic command

Login monitor

```bash
mysql -u root -p
```

Login monitor another container

```bash
mysql -u root -h container_name -p
```

Show all database

```bash
show databases;
```

Show all table

```bash
show tables;
```

Show all columns

```bash
desc table_name;
```

Create database

```bash
create database testdb;
```

Create table

```bash
create table info (name varchar(20), lastname varchar(20), age int(2));
```

Use database

```bash
use testdb;
```

## Backup and Restore

Dump

```bash
mysqldump -u root -h container_name -p database_name > /tmp/.sql
```

Backup all

```bash
mongodump --out D:\data\mongodb_backup
```

Backup one database

```bash
mongodump --db mongo_color --out d:\data\mongodb_backup
```

Restore

```bash
mongorestore --db l4_analytics C:\l4_analytics
```
