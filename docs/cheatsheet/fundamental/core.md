---
title: Core CheatSheet
---

### Object-Oriented Programming (OOP)

- Encapsulation: Bundling data with methods that operate on that data.
- Inheritance: Creating new classes from existing ones to promote code reuse.
- Polymorphism: Allowing objects to be treated as instances of their parent class, enabling flexibility.
- Abstraction: Hiding complex implementation details and exposing only necessary parts.

### Stateless / Stateful

- Stateless: The server does not retain any information about the client between requests. Each request is independent and contains all necessary information.
- Stateful: The server maintains context or state about the client across multiple requests, allowing for persistent interactions.

### Process / Thread

- Process: An independent program in execution with its own memory space. Processes are isolated from each other, providing stability and security.
- Thread: The smallest unit of processing within a process, sharing the same memory space. Threads allow concurrent execution within a process, enabling parallelism.

### SSH

```
+---------+                        +----------+
|  Client |                        |  Server  |
+---------+                        +----------+
     |                                   |
     |       1. Initiate Connection      |
     |----------------------------------->|
     |                                   |
     |       2. Server Sends Public Key  |
     |<-----------------------------------|
     |                                   |
     | 3. Client Verifies Server's Identity|
     |                                   |
     |   4. Client Generates Session Key |
     |----------------------------------->|
     |                                   |
     | 5. Server Acknowledges Session Key|
     |<-----------------------------------|
     |                                   |
     |    6. Encrypted Communication Begins|
     |----------------------------------->|
     |                                   |
     |          ... Data Transfer ...     |
     |                                   |
```

### SSL

```
+---------+                        +----------+
|  Client |                        |  Server  |
+---------+                        +----------+
     |                                   |
     |      1. Client Hello               |
     |----------------------------------->|
     |                                   |
     |      2. Server Hello               |
     |      3. Server Certificate         |
     |      4. Server Key Exchange        |
     |      5. Server Hello Done          |
     |<-----------------------------------|
     |                                   |
     |      6. Client Key Exchange        |
     |      7. Change Cipher Spec         |
     |      8. Client Finished            |
     |----------------------------------->|
     |                                   |
     |      9. Change Cipher Spec         |
     |     10. Server Finished            |
     |<-----------------------------------|
     |                                   |
     |      11. Encrypted Data Transfer   |
     |<----------------------------------->|
     |                                   |
```

### BigO

- O(1): Constant time
- O(log n): Logarithmic time
- O(n): Linear time
- O(n log n): Linearithmic time
- O(n²): Quadratic time