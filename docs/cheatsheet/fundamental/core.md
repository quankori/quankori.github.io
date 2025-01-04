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

### Heap vs. Stack

#### Heap

- **Definition**: A memory region used for dynamic memory allocation where variables are allocated and freed in an arbitrary order.
- **Characteristics**:
  - **Size**: Typically larger than the stack.
  - **Lifetime**: Variables persist until they are explicitly deallocated or garbage collected.
  - **Access Speed**: Slower access compared to the stack due to the need for dynamic allocation and deallocation.
  - **Usage**: Suitable for objects whose size or lifetime cannot be determined at compile time.
- **Use Case**: Managing large data structures like trees, graphs, or objects in languages with dynamic memory allocation (e.g., Java's `new` operator).

#### Stack

- **Definition**: A memory region that stores temporary variables created by functions. It operates in a last-in, first-out (LIFO) manner.
- **Characteristics**:
  - **Size**: Limited size, typically smaller than the heap.
  - **Lifetime**: Variables are automatically deallocated when the function call ends.
  - **Access Speed**: Faster access due to predictable allocation and deallocation order.
  - **Usage**: Suitable for function call management and small, temporary variables.
- **Use Case**: Managing function call stacks, storing primitive data types, and local variables within functions.

### Concurrency vs. Parallelism

#### Concurrency

- **Definition**: The ability of a system to handle multiple tasks simultaneously by managing their execution over time, often through interleaving.
- **Characteristics**:
  - **Task Management**: Multiple tasks make progress without necessarily executing at the same instant.
  - **Resource Sharing**: Tasks may share resources like CPU time, memory, and I/O.
  - **Complexity**: Requires careful handling of synchronization, race conditions, and deadlocks.
- **Use Cases**:
  - **Web Servers**: Handling multiple client requests simultaneously by interleaving their processing.
  - **User Interfaces**: Allowing responsiveness by managing multiple input events and background tasks concurrently.
  - **Real-Time Systems**: Managing multiple real-time tasks that need to make progress within certain time constraints.

#### Parallelism

- **Definition**: The ability to execute multiple tasks or parts of a task simultaneously, typically using multiple processors or cores.
- **Characteristics**:
  - **Simultaneous Execution**: Tasks or task parts run at the same time on different processing units.
  - **Performance**: Can significantly reduce execution time for compute-intensive tasks.
  - **Hardware Dependency**: Requires hardware support for multiple processing units.
- **Use Cases**:
  - **Scientific Computing**: Performing large-scale simulations and computations by distributing tasks across multiple cores or machines.
  - **Image and Video Processing**: Processing multiple frames or pixels in parallel to speed up rendering and encoding.
  - **Big Data Analytics**: Distributing data processing tasks across a cluster of machines to handle large datasets efficiently.
