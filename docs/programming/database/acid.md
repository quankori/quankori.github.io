---
title: ACID Database
---

## Explanation of ACID Properties

ACID is an acronym that stands for Atomicity, Consistency, Isolation, and Durability. These properties are essential for ensuring the reliability and integrity of transactions in database systems. Here’s a detailed explanation suitable for interviews:

## ACID Properties

1. **Atomicity**
2. **Consistency**
3. **Isolation**
4. **Durability**

## Detailed Explanation

### 1. Atomicity

**Definition**:

- Ensures that each transaction is treated as a single "atomic" unit, which either fully completes or fully fails. There is no partial completion.

**Key Points**:

- **All-or-Nothing**: If any part of the transaction fails, the entire transaction is rolled back, and the database remains unchanged.
- **Example**: Consider a banking transaction where money is transferred from Account A to Account B. Atomicity ensures that either both the debit from Account A and the credit to Account B happen, or neither happens.

**Example Scenario**:

- **Successful Transaction**:
  - Debit $100 from Account A.
  - Credit $100 to Account B.
- **Failed Transaction**:
  - If the debit from Account A succeeds but the credit to Account B fails, the entire transaction is rolled back.

### 2. Consistency

**Definition**:

- Ensures that a transaction brings the database from one valid state to another valid state, maintaining all predefined rules and constraints.

**Key Points**:

- **Data Integrity**: Every transaction must leave the database in a consistent state.
- **Validation**: All constraints, such as foreign keys, unique constraints, and business rules, must be satisfied.

**Example Scenario**:

- In a database with a constraint that requires the balance of an account to be non-negative, any transaction that would result in a negative balance is rolled back to maintain consistency.

### 3. Isolation

**Definition**:

- Ensures that the execution of transactions concurrently will result in a system state that would be obtained if the transactions were executed sequentially, one after the other.

**Key Points**:

- **Concurrency Control**: Transactions are isolated from each other until they are completed.
- **Levels of Isolation**: Different levels of isolation (e.g., READ COMMITTED, REPEATABLE READ, SERIALIZABLE) provide varying degrees of isolation.

**Example Scenario**:

- If two transactions are trying to update the same account balance simultaneously, isolation ensures that the final balance reflects both updates in a manner as if the transactions were processed sequentially.

### 4. Durability

**Definition**:

- Ensures that once a transaction has been committed, it will remain so, even in the event of a system crash or power failure.

**Key Points**:

- **Permanent Changes**: Committed transactions are recorded in non-volatile memory (e.g., disk), ensuring they are not lost.
- **Recovery Mechanisms**: Database systems use logs and backup mechanisms to ensure durability.

**Example Scenario**:

- After transferring $100 from Account A to Account B and committing the transaction, the changes remain even if the database server crashes immediately afterward.

## Example in SQL

Let's consider a bank database where we want to transfer money from one account to another. Here’s how ACID properties ensure the transaction is reliable.

```sql
START TRANSACTION;

-- Atomicity: Ensure both operations succeed or both fail.
UPDATE accounts
SET balance = balance - 100
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE account_id = 2;

-- Consistency: Ensure balance constraints are met.
-- If any constraint fails, the transaction is rolled back.

-- Isolation: Ensure no other transaction interferes with this transaction.
-- Depending on isolation level, the changes are not visible to other transactions until commit.

COMMIT; -- Durability: Once committed, the changes are permanent.
```

## Summary

- **ACID Properties**: Ensures reliable and consistent transactions in a database.
  - **Atomicity**: All-or-nothing transactions.
  - **Consistency**: Maintains data integrity by ensuring transactions move the database from one valid state to another.
  - **Isolation**: Transactions are isolated from each other until they are completed.
  - **Durability**: Committed transactions are permanent and survive system failures.
- **Real-World Example**: In a banking system, transferring funds between accounts demonstrates how ACID properties maintain data integrity and reliability.
- **Importance**: These properties are crucial for systems requiring robust and reliable transaction processing, such as banking, finance, and online commerce.
