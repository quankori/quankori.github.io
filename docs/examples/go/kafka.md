---
title: Publish & Subscribe in Kafka
---

Docker-compose example for Kafka

```yml
version: '3'
services:
  zookeeper:
    image: docker.io/bitnami/zookeeper:3.9
    ports:
      - "2181:2181"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes

  kafka:
    image: docker.io/bitnami/kafka:3.4
    ports:
      - "9092:9092"
    environment:
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
    depends_on:
      - zookeeper
```


Publish in Kafka

```go
package main

import (
	"log"
	"strconv"

	"github.com/IBM/sarama"
)

func main() {
	// Set up Kafka producer configuration
	config := sarama.NewConfig()
	config.Producer.Return.Successes = true

	// Create a Kafka producer
	brokerAddress := "127.0.0.1:9092"
	producer, err := sarama.NewSyncProducer([]string{brokerAddress}, config)
	if err != nil {
		log.Fatalf("Error creating Kafka producer: %v", err)
	}
	defer producer.Close()
	topic := "kori_test"

	for i := 0; i < 10; i++ {
		// Publish messages to a Kafka topic
		message := "Hello, a!" + strconv.FormatInt(int64(i), 10)

		// Create a Kafka message
		kafkaMessage := &sarama.ProducerMessage{
			Topic: topic,
			Value: sarama.StringEncoder(message),
		}

		// Send the message to Kafka
		_, _, err = producer.SendMessage(kafkaMessage)
		if err != nil {
			log.Fatalf("Error sending message: %v", err)
		}

		log.Printf("Message sent to Kafka: %s", message)
	}
}
```

Subscribe in Kafka

```go
package main

import (
	"log"
	"os"
	"os/signal"

	"github.com/IBM/sarama"
)

func main() {
	// Set up Kafka consumer configuration
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	// Create a Kafka consumer
	brokerAddress := "127.0.0.1:9092"
	consumer, err := sarama.NewConsumer([]string{brokerAddress}, config)
	if err != nil {
		log.Fatalf("Error creating Kafka consumer: %v", err)
	}
	defer consumer.Close()

	// Subscribe to Kafka topic(s)
	topic := "kori_test"
	partitionConsumer, err := consumer.ConsumePartition(topic, 0, sarama.OffsetOldest)
	if err != nil {
		log.Fatalf("Error subscribing to topic: %v", err)
	}
	defer partitionConsumer.Close()

	// Set up a signal channel to gracefully stop the consumer
	signals := make(chan os.Signal, 1)
	signal.Notify(signals, os.Interrupt)

	// Consume and process messages
	for {
		select {
		case message := <-partitionConsumer.Messages():
			log.Printf("Received message: %s", string(message.Value))
		case err := <-partitionConsumer.Errors():
			log.Printf("Error while consuming: %v", err)
		case <-signals:
			log.Println("Interrupt signal received, shutting down...")
			return
		}
	}
}
```