---
title: Message Queue CheatSheet
---

### **Apache Kafka**

#### **Structure**

1. **Producer**:
   - Applications that send (publish) messages to Kafka topics.
2. **Topic**:
   - A category or feed name to which records are published.
   - Topics are partitioned for scalability and fault tolerance.
3. **Partition**:
   - A single log within a topic.
   - Each partition is an ordered, immutable sequence of records.
   - Partitions allow Kafka to scale horizontally.
4. **Broker**:
   - A Kafka server that stores data and serves clients.
   - A Kafka cluster consists of multiple brokers.
5. **Consumer**:
   - Applications that read (subscribe to) messages from Kafka topics.
   - Consumers can be part of a consumer group for load balancing.
6. **Consumer Group**:
   - A group of consumers that share the workload of reading from a topic.
   - Each partition is consumed by only one consumer in the group.
7. **ZooKeeper** (Note: As of Kafka 2.8+, ZooKeeper is being phased out in favor of the Kafka Raft Metadata mode):
   - Manages and coordinates the Kafka brokers.

#### **Workflow Visualization**

```
[Producer A]       [Producer B]
     |                  |
     v                  v
   +-----------------------+
   |        Kafka          |
   |   +---------------+   |
   |   |   Topic 1     |   |
   |   | Partition 0   |   |
   |   | Partition 1   |   |
   |   +---------------+   |
   +-----------------------+
        /           \
       /             \
[vConsumer Group 1] [vConsumer Group 2]
[Consumer A1, A2]    [Consumer B1, B2]
```

**Explanation:**

- Multiple producers send messages to a Kafka topic.
- The topic is divided into partitions to allow parallel processing.
- Each consumer group can have multiple consumers, with each consumer handling different partitions, ensuring scalability and fault tolerance.

---

### **RabbitMQ**

#### **Structure**

1. **Producer**:
   - Applications that send (publish) messages to RabbitMQ.
2. **Exchange**:
   - Receives messages from producers and routes them to queues based on routing rules.
   - Types of exchanges:
     - **Direct**: Routes messages with a specific routing key to queues.
     - **Topic**: Routes messages based on pattern matching of routing keys.
     - **Fanout**: Broadcasts messages to all bound queues.
     - **Headers**: Routes based on message header attributes.
3. **Queue**:
   - Buffers messages until they are consumed.
   - Consumers subscribe to queues to receive messages.
4. **Binding**:
   - Rules that define how messages are routed from exchanges to queues.
5. **Consumer**:
   - Applications that receive (consume) messages from queues.
6. **Broker**:
   - The RabbitMQ server that manages exchanges, queues, and bindings.

#### **Workflow Visualization**

```
[Producer A]       [Producer B]
     |                  |
     v                  v
   +-----------------------+
   |       Exchange        |
   |   (e.g., Direct)      |
   +----+-------+-----+----+
        |       |     |
        |       |     |
        v       v     v
    [Queue 1] [Queue 2] [Queue 3]
        |        |        |
        v        v        v
 [Consumer A1] [Consumer B1] [Consumer C1]
```

**Explanation:**

- Producers send messages to an exchange.
- The exchange routes messages to one or more queues based on bindings and routing keys.
- Consumers subscribe to queues to receive messages.
- Depending on the exchange type, messages can be routed in various patterns (e.g., direct routing, broadcasting).

#### **Comparative Summary**

| Feature              | Apache Kafka                                                      | RabbitMQ                                    |
| -------------------- | ----------------------------------------------------------------- | ------------------------------------------- |
| **Architecture**     | Distributed log with partitions                                   | Broker with exchanges and queues            |
| **Use Cases**        | Real-time data streaming, event sourcing, log aggregation         | Task queues, request/reply, pub/sub         |
| **Message Ordering** | Within partitions                                                 | In queues                                   |
| **Throughput**       | Very high                                                         | Moderate to high                            |
| **Durability**       | High (replication and persistence)                                | High (durable queues and messages)          |
| **Scalability**      | Easily scalable by adding brokers                                 | Scalable but may require more configuration |
| **Complexity**       | Higher (requires understanding of partitions and consumer groups) | Generally simpler to set up and use         |
