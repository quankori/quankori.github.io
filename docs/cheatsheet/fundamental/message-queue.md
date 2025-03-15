---
title: Message Queue
---

## Overview

Both **RabbitMQ** and **Kafka** are popular message brokers in microservices architectures, each with distinct approaches:

- **RabbitMQ**: A traditional message broker using AMQP, focusing on delivering messages between producers and consumers via queues.
- **Kafka**: A distributed streaming platform storing and processing event streams in real-time, using topics and partitions.

Below are the details on components, NestJS implementations, and workflow visualizations for each.

---

## 1. RabbitMQ with NestJS

### Components

- **Producer**: Service sending messages to RabbitMQ (NestJS client).
- **Queue**: Stores messages, ensuring FIFO processing.
- **Consumer**: Service receiving and processing messages from the queue (NestJS microservice).
- **Exchange**: Routes messages to queues based on routing keys (e.g., direct, topic, fanout).
- **Channel**: Communication channel between producer/consumer and RabbitMQ.

### NestJS Sample Code

#### Producer (Sending Messages)

```typescript
// src/producer/producer.service.ts
import { Injectable } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";

@Injectable()
export class ProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672"],
        queue: "email_queue",
        queueOptions: { durable: true },
      },
    });
  }

  async sendEmail(email: string) {
    await this.client.emit("send_email", { email }).toPromise();
    console.log(`Sent email request for ${email}`);
  }
}
```

#### Consumer (Receiving and Processing Messages)

```typescript
// src/consumer/consumer.controller.ts
import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export class ConsumerController {
  @EventPattern("send_email") // Listens to events from the queue
  async handleEmail(data: { email: string }) {
    console.log(`Processing email for ${data.email}`);
    // Process email logic here
  }
}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://localhost:5672"],
      queue: "email_queue",
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
bootstrap();
```

### Workflow Visualization

```
[Producer] --> [Exchange] --> [Queue: email_queue] --> [Consumer]
   |              |             |                        |
   |              |             |                        +--> Process email
   |              |             +--> Store message
   |              +--> Route via routing key
   +--> Send message (send_email)
```

1. **Producer** sends a message to the **Exchange** with a routing key (e.g., `send_email`).
2. **Exchange** routes the message to the **Queue** (`email_queue`).
3. **Consumer** retrieves and processes the message (e.g., sends an email).
4. Message is removed from the queue after acknowledgment.

---

## 2. Kafka with NestJS

### Components

- **Producer**: Service sending events to a Kafka topic (NestJS client).
- **Topic**: Channel storing event streams, divided into partitions.
- **Partition**: Segment of data within a topic, enabling parallel processing.
- **Consumer**: Service consuming events from a topic (NestJS microservice).
- **Consumer Group**: Group of consumers sharing workload across partitions.

### NestJS Sample Code

#### Producer (Sending Events)

```typescript
// src/producer/producer.service.ts
import { Injectable, OnModuleInit } from "@nestjs/common";
import {
  ClientKafka,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";

@Injectable()
export class ProducerService implements OnModuleInit {
  private client: ClientKafka;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.KAFKA,
      options: {
        client: { brokers: ["localhost:9092"] },
        consumer: { groupId: "email-group" },
      },
    }) as ClientKafka;
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async sendEmail(email: string) {
    await this.client
      .emit("email_topic", { key: email, value: { email } })
      .toPromise();
    console.log(`Sent email event for ${email} to Kafka`);
  }
}
```

#### Consumer (Receiving and Processing Events)

```typescript
// src/consumer/consumer.controller.ts
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class ConsumerController {
  @MessagePattern("email_topic") // Listens to the topic
  async handleEmail(data: { key: string; value: { email: string } }) {
    console.log(`Processing email event for ${data.value.email}`);
    // Process email logic here
  }
}

// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: { brokers: ["localhost:9092"] },
      consumer: { groupId: "email-group" },
    },
  });
  await app.listen();
}
bootstrap();
```

### Workflow Visualization

```
[Producer] --> [Topic: email_topic] --> [Partition 0] --> [Consumer Group: email-group]
   |              |                     [Partition 1] --> [Consumer 1]
   |              |                     [Partition 2] --> [Consumer 2]
   |              +--> Store event
   +--> Send event (email_topic)
```

1. **Producer** sends an event to the **Topic** (`email_topic`) with a key (e.g., email).
2. **Topic** distributes the event to **Partitions** based on the key.
3. **Consumer Group** assigns partitions to consumers (e.g., Consumer 1, Consumer 2).
4. Each **Consumer** processes events from its assigned partition (e.g., sends email).
5. Events remain stored in the topic (unlike RabbitMQ’s immediate removal).

---

## Comparison of RabbitMQ and Kafka

| **Aspect**           | **RabbitMQ**                      | **Kafka**                            |
| -------------------- | --------------------------------- | ------------------------------------ |
| **Model**            | Queue-based (AMQP)                | Topic-based (Event Streaming)        |
| **Message Handling** | Removed after processing (ack)    | Retained for a period (retention)    |
| **Parallelism**      | Single queue, competing consumers | Partitions enable parallel consumers |
| **Use Case**         | Task queues, short-lived messages | Event streaming, real-time data      |
| **Consistency**      | Strong (queue-based)              | Eventual (partition-based)           |

---

## Bash Scripts & Commands

### RabbitMQ

- **Start RabbitMQ (Docker)**:
  ```bash
  docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
  ```
- **Create Queue (CLI)**:
  ```bash
  rabbitmqadmin declare queue name=email_queue durable=true
  ```

### Kafka

- **Start Kafka (Docker)**:
  ```bash
  docker run -d --name zookeeper -p 2181:2181 zookeeper
  docker run -d --name kafka -p 9092:9092 --link zookeeper:zookeeper confluentinc/cp-kafka
  ```
- **Create Topic (CLI)**:
  ```bash
  kafka-topics.sh --create --topic email_topic --partitions 3 --replication-factor 1 --bootstrap-server localhost:9092
  ```

---

## General Workflow Visualization

### RabbitMQ

```
[Producer] --> [Exchange] --> [Queue] --> [Consumer 1]
   |              |             |         [Consumer 2]
   +--> Emit       +--> Route    +--> Consume (FIFO)
```

### Kafka

```
[Producer] --> [Topic] --> [Partition 0] --> [Consumer 1]
   |             |        [Partition 1] --> [Consumer 2]
   +--> Emit      +--> Distribute       +--> Consume (Parallel)
```
