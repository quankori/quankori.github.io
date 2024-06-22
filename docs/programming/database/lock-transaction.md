---
title: Lock Transaction
---

## Lock Transactions in Databases

Locks are mechanisms used in database systems to ensure data consistency and integrity during concurrent transactions. They prevent conflicts when multiple transactions try to read or write the same data simultaneously. Understanding how locks work and their different types is crucial for designing robust and high-performance database applications.

## Why Locks are Necessary

- **Data Integrity**: Ensure that concurrent transactions do not lead to inconsistent or incorrect data.
- **Isolation**: Maintain the isolation property of transactions, ensuring that the intermediate states of a transaction are not visible to other transactions.
- **Concurrency Control**: Allow multiple transactions to proceed concurrently without interfering with each other.

## Types of Locks

1. **Shared Lock (S)**
2. **Exclusive Lock (X)**
3. **Intent Locks**
4. **Row-Level Locks**
5. **Table-Level Locks**
6. **Deadlocks**

### 1. Shared Lock (S)

**Definition**:

- Allows multiple transactions to read a resource but not modify it.
- Multiple transactions can hold a shared lock on the same resource simultaneously.

**Use Case**:

- Reading data from a table.

**Example**:

```sql
-- Transaction 1
BEGIN TRANSACTION;
SELECT * FROM accounts WHERE account_id = 123; -- Acquires a shared lock

-- Transaction 2
BEGIN TRANSACTION;
SELECT * FROM accounts WHERE account_id = 123; -- Also acquires a shared lock
```

### 2. Exclusive Lock (X)

**Definition**:

- Allows a transaction to read and modify a resource.
- No other transaction can hold a lock on the same resource while an exclusive lock is held.

**Use Case**:

- Updating or deleting data in a table.

**Example**:

```sql
-- Transaction 1
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 123; -- Acquires an exclusive lock

-- Transaction 2
BEGIN TRANSACTION;
SELECT * FROM accounts WHERE account_id = 123; -- Blocked until Transaction 1 releases the lock
```

### 3. Intent Locks

**Definition**:

- Indicate a transaction's intention to acquire a shared or exclusive lock on a resource.
- Used to manage locks in hierarchical structures (e.g., database, table, row).

**Types**:

- **Intent Shared (IS)**: Indicates intention to acquire shared locks.
- **Intent Exclusive (IX)**: Indicates intention to acquire exclusive locks.
- **Shared with Intent Exclusive (SIX)**: A combination of shared and intent exclusive locks.

**Example**:

```sql
-- Acquiring intent locks
LOCK TABLE accounts IN SHARE MODE; -- Intent shared lock
LOCK TABLE accounts IN EXCLUSIVE MODE; -- Intent exclusive lock
```

### 4. Row-Level Locks

**Definition**:

- Locks specific rows in a table, allowing higher concurrency compared to table-level locks.

**Use Case**:

- Updating specific rows in a large table without blocking access to other rows.

**Example**:

```sql
-- Transaction 1
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 123; -- Row-level lock on account_id = 123

-- Transaction 2
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 124; -- Row-level lock on account_id = 124
```

### 5. Table-Level Locks

**Definition**:

- Locks an entire table, preventing other transactions from accessing any rows in the table.

**Use Case**:

- Operations that affect the entire table (e.g., altering the table structure).

**Example**:

```sql
-- Transaction 1
BEGIN TRANSACTION;
LOCK TABLE accounts IN EXCLUSIVE MODE; -- Table-level lock

-- Transaction 2
BEGIN TRANSACTION;
SELECT * FROM accounts; -- Blocked until Transaction 1 releases the lock
```

### 6. Deadlocks

**Definition**:

- A situation where two or more transactions are waiting for each other to release locks, resulting in a cycle of dependencies and blocking all involved transactions.

**Detection and Resolution**:

- DBMSs use deadlock detection algorithms to identify deadlocks and resolve them by rolling back one or more transactions.

**Example**:

```sql
-- Transaction 1
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 123; -- Acquires exclusive lock on account_id = 123
UPDATE accounts SET balance = balance - 100 WHERE account_id = 124; -- Waits for lock held by Transaction 2

-- Transaction 2
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 124; -- Acquires exclusive lock on account_id = 124
UPDATE accounts SET balance = balance - 100 WHERE account_id = 123; -- Waits for lock held by Transaction 1
```

## Isolation Levels in Transactions

Isolation levels determine the degree to which the operations in one transaction are isolated from those in other concurrent transactions. Different isolation levels help balance between performance and consistency. The four standard isolation levels are:

1. **Read Uncommitted**
2. **Read Committed**
3. **Repeatable Read**
4. **Serializable**

### 1. Read Uncommitted

**Definition**:

- Transactions can read data that has been modified but not yet committed by other transactions.
- This isolation level allows dirty reads.

**Example Issues**:

- **Dirty Read**: A transaction reads data written by another transaction that has not yet committed.

### 2. Read Committed

**Definition**:

- Transactions can only read data that has been committed.
- This isolation level prevents dirty reads but allows non-repeatable reads.

**Example Issues**:

- **Non-repeatable Read**: A transaction reads the same row twice and gets different data each time because another transaction modified the data between the reads.

### 3. Repeatable Read

**Definition**:

- Ensures that if a transaction reads a row, subsequent reads of the same row will return the same data.
- This isolation level prevents dirty reads and non-repeatable reads but allows phantom reads.

**Example Issues**:

- **Phantom Read**: A transaction reads a set of rows that satisfy a condition, but another transaction inserts or deletes rows that satisfy the condition, leading to different results in subsequent reads.

### 4. Serializable

**Definition**:

- The highest isolation level, ensuring complete isolation from other transactions.
- This isolation level prevents dirty reads, non-repeatable reads, and phantom reads.

**Example Issues**:

- **None**: Serializable transactions are fully isolated but can result in reduced concurrency and performance.

## Examples in NestJS (TypeORM) and Go (GORM)

### Example in NestJS with TypeORM

**1. Install Dependencies**:

```bash
npm install @nestjs/typeorm typeorm mysql
```

**2. Set Up TypeORM Configuration**:
Create a `typeorm.config.ts` file:

```typescript
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "test_db",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
};
```

**3. Transaction with Isolation Levels**:
In a service file, you can use TypeORM's `QueryRunner` to manage transactions with isolation levels.

```typescript
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Repository,
  QueryRunner,
  getConnection,
  IsolationLevel,
} from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async transferFunds(
    senderId: number,
    receiverId: number,
    amount: number
  ): Promise<void> {
    const queryRunner: QueryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(IsolationLevel.REPEATABLE_READ);

    try {
      const sender = await queryRunner.manager.findOne(User, senderId);
      const receiver = await queryRunner.manager.findOne(User, receiverId);

      if (sender.balance >= amount) {
        sender.balance -= amount;
        receiver.balance += amount;

        await queryRunner.manager.save(sender);
        await queryRunner.manager.save(receiver);

        await queryRunner.commitTransaction();
      } else {
        throw new Error("Insufficient funds");
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
```

### Example in Go with GORM

**1. Install Dependencies**:

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

**2. Set Up GORM Configuration**:
Create a `main.go` file:

```go
package main

import (
	"fmt"
	"log"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type User struct {
	ID      uint
	Name    string
	Balance float64
}

func main() {
	dsn := "root:password@tcp(127.0.0.1:3306)/test_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(&User{})

	transferFunds(db, 1, 2, 100.0)
}

func transferFunds(db *gorm.DB, senderID uint, receiverID uint, amount float64) {
	err := db.Transaction(func(tx *gorm.DB) error {
		var sender, receiver User

		if err := tx.Clauses(clause.Locking{Strength: "UPDATE"}).First(&sender, senderID).Error; err != nil {
			return err
		}
		if err := tx.Clauses(clause.Locking{Strength: "UPDATE"}).First(&receiver, receiverID).Error; err != nil {
			return err
		}

		if sender.Balance >= amount {
			sender.Balance -= amount
			receiver.Balance += amount

			if err := tx.Save(&sender).Error; err != nil {
				return err
			}
			if err := tx.Save(&receiver).Error; err != nil {
				return err
			}
		} else {
			return fmt.Errorf("insufficient funds")
		}

		return nil
	}, &sql.TxOptions{Isolation: sql.LevelRepeatableRead})

	if err != nil {
		log.Printf("Transfer failed: %v\n", err)
	} else {
		log.Println("Transfer successful")
	}
}
```

**3. Ensure to Import Required Packages**:

```go
import (
	"database/sql"
	"gorm.io/gorm/clause"
)
```

## Summary

- **Isolation Levels**:

  - **Read Uncommitted**: Allows dirty reads, least isolation.
  - **Read Committed**: Prevents dirty reads, allows non-repeatable reads.
  - **Repeatable Read**: Prevents dirty and non-repeatable reads, allows phantom reads.
  - **Serializable**: Prevents all anomalies, highest isolation.

- **Types**:
  - **Shared Lock (S)**: Allows multiple transactions to read.
  - **Exclusive Lock (X)**: Allows one transaction to read and write.
  - **Intent Locks**: Indicate intention to acquire a specific type of lock.
  - **Row-Level Locks**: Lock specific rows for higher concurrency.
  - **Table-Level Locks**: Lock entire tables, useful for table-wide operations.
  - **Deadlocks**: Cycles of dependencies that block transactions, resolved by the DBMS.
