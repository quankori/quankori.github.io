---
title: Database CheatSheet
---

### ACID

- **Atomicity**: Atomicity ensures that each transaction is treated as a single "unit," which either completely succeeds or completely fails. There is no partial completion of a transaction.
- **Consistency**: Consistency ensures that a transaction brings the database from one valid state to another, maintaining database invariants. The data must adhere to all predefined rules, such as constraints, cascades, and triggers.
- **Isolation**: Isolation ensures that concurrent transactions occur independently without interfering with each other. Intermediate states of a transaction are invisible to other transactions.
- **Durability**: Durability ensures that once a transaction has been committed, it remains so, even in the event of a system failure (e.g., power loss, crashes).
