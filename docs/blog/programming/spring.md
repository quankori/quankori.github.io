---
title: Spring Boots
---

## Core Architecture

**Core architecture**:

- **Spring framework**: Provides foundational IoC, DI, and AOP.
- **Auto-configuration**: Streamlines setup with starters and embedded servers.
- **Language features**: Integrates Java/Kotlin with annotations and reactive support.

### Spring Framework Service

```java
// src/main/java/com/example/core/SpringFrameworkService.java (**Spring framework**)
package com.example.core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Service
public class SpringFrameworkService {
    private final Dependency dependency;

    @Autowired
    public SpringFrameworkService(Dependency dependency) {
        this.dependency = dependency;
    }

    public String processData() {
        return "Processed with " + dependency.getData();
    }
}

class Dependency {
    public String getData() {
        return "Dependency Data";
    }
}

@Configuration
class Config {
    @Bean
    public Dependency dependency() {
        return new Dependency();
    }
}
```

**Spring Framework Service Details**:

- **Purpose**: Demonstrates IoC and Dependency Injection (DI) using Spring annotations.
- **Explanation**: The `@Service` annotation marks `SpringFrameworkService` as a Spring-managed bean. `@Autowired` injects the `Dependency` bean, defined in a `@Configuration` class with a `@Bean` method, showcasing IoC and DI. `processData` uses the injected dependency to return a result.
- **Spring Framework Details**:
  - **Inversion of Control (IoC)**: Spring container manages bean lifecycle and dependencies.
  - **Dependency Injection (DI)**: Beans are injected via constructor, setter, or field injection (here, constructor).
  - **Aspect-Oriented Programming (AOP)**: Not shown but enables cross-cutting concerns (e.g., logging, security) via aspects.

### Auto-Configuration Service

```java
// src/main/java/com/example/core/AutoConfigService.java (**Auto-configuration**)
package com.example.core;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AutoConfigService {
    private String setting;

    public void setSetting(String setting) {
        this.setting = setting;
    }

    public String getSetting() {
        return "Setting: " + setting;
    }
}
```

**Auto-Configuration Service Details**:

- **Purpose**: Shows auto-configuration with Spring Boot’s `@ConfigurationProperties`.
- **Explanation**: `@Component` registers the class as a bean, and `@ConfigurationProperties` binds properties from `application.properties` (e.g., `app.setting=value`) to the `setting` field, demonstrating auto-configuration without manual setup.
- **Auto-Configuration Details**:
  - **Starter Dependencies**: Pre-configured libraries (e.g., `spring-boot-starter-web`) include defaults.
  - **Embedded Servers**: Tomcat/Jetty run within the app (e.g., no external server needed).
  - **Convention over Configuration**: Sensible defaults reduce manual configuration.

### Language Features Service

```java
// src/main/java/com/example/core/LanguageFeaturesService.java (**Language features**)
package com.example.core;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class LanguageFeaturesService {
    public Mono<String> processReactively(String input) {
        return Mono.just("Processed: " + input);
    }
}
```

**Language Features Service Details**:

- **Purpose**: Highlights reactive programming support with annotations.
- **Explanation**: `@Service` marks the class as a Spring bean, and `processReactively` returns a `Mono` (reactive type from Project Reactor), simulating async processing with a simple string transformation.
- **Language Features Details**:
  - **Java Integration**: Uses Java with Spring annotations (e.g., `@Service`).
  - **Kotlin Support**: Not shown but natively supported (e.g., `class MyService` in Kotlin).
  - **Annotations**: Simplifies configuration (e.g., `@Autowired`, `@Bean`).
  - **Reactive Programming**: WebFlux enables non-blocking operations (e.g., `Mono`, `Flux`).

---

## Performance Optimization

**Performance optimization**:

- **Memory management**: Tunes JVM memory and garbage collection.
- **Concurrency**: Manages threads and reactive streams.
- **Caching**: Enhances speed with Spring Cache.
- **Database access**: Optimizes data operations with Hibernate and pooling.

### Memory Service

```java
// src/main/java/com/example/perf/MemoryService.java (**Memory management**)
package com.example.perf;

import org.springframework.stereotype.Service;

@Service
public class MemoryService {
    public void allocateMemory() {
        Object[] objects = new Object[1000000];
        for (int i = 0; i < objects.length; i++) {
            objects[i] = new Object();
        }
        Runtime runtime = Runtime.getRuntime();
        long usedMemory = runtime.totalMemory() - runtime.freeMemory();
        System.out.println("Used memory: " + usedMemory);
    }
}
```

**Memory Service Details**:

- **Purpose**: Demonstrates heap allocation and memory usage reporting.
- **Explanation**: Allocates a large array on the heap, fills it with objects, and uses `Runtime` to report used memory, simulating memory-intensive operations manageable via JVM tuning.
- **Memory Management Details**:
  - **JVM Tuning**: Adjusts heap size with `-Xms` (initial) and `-Xmx` (max), e.g., `-Xms512m -Xmx1024m`.
  - **Garbage Collection**: G1 or ZGC manages memory; triggered by heap pressure or `System.gc()`.

### Concurrency Service

```java
// src/main/java/com/example/perf/ConcurrencyService.java (**Concurrency**)
package com.example.perf;

import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;

@Service
public class ConcurrencyService {
    public CompletableFuture<String> asyncOperation(String input) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return "Processed: " + input;
        });
    }
}
```

**Concurrency Service Details**:

- **Purpose**: Shows asynchronous processing with CompletableFuture.
- **Explanation**: Uses `CompletableFuture.supplyAsync` to run a task asynchronously, simulating a 1-second delay and returning a processed string, leveraging thread pools implicitly.
- **Concurrency Details**:
  - **Threads**: Managed by JVM thread pools (e.g., ForkJoinPool by default).
  - **Reactive Streams**: Not shown but supported via Reactor (e.g., `Mono`, `Flux`).

### Cache Service

```java
// src/main/java/com/example/perf/CacheService.java (**Caching**)
package com.example.perf;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class CacheService {
    @Cacheable("data")
    public String getData(String key) {
        return "Cached Data: " + key;
    }
}
```

**Cache Service Details**:

- **Purpose**: Implements caching with Spring Cache.
- **Explanation**: `@Cacheable` caches the method result under the "data" cache name, returning a string with the key; subsequent calls with the same key retrieve the cached value instead of recomputing.
- **Caching Details**:
  - **Spring Cache**: Uses Ehcache or Redis (configurable via `CacheManager`).
  - **Annotations**: `@Cacheable` simplifies caching logic.

### Database Service

```java
// src/main/java/com/example/perf/DatabaseService.java (**Database access**)
package com.example.perf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DatabaseService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DatabaseService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public String fetchData() {
        return jdbcTemplate.queryForObject("SELECT name FROM users WHERE id = 1", String.class);
    }
}
```

**Database Service Details**:

- **Purpose**: Demonstrates database access with JDBC and pooling.
- **Explanation**: Uses `JdbcTemplate` (injected via `@Autowired`) to query a database table, leveraging HikariCP (default in Spring Boot) for connection pooling, returning a single string result.
- **Database Access Details**:
  - **Hibernate/JPA**: Not shown but optimizes ORM (e.g., `@Entity` mapping).
  - **Connection Pooling**: HikariCP manages database connections efficiently.

---

## Scaling

**Scaling**:

- **Horizontal scaling**: Scales with Spring Cloud and microservices.
- **Vertical scaling**: Boosts single-instance performance via JVM tuning.
- **Distributed systems**: Integrates messaging and caching for distribution.

### Scale Service

```java
// src/main/java/com/example/scale/ScaleService.java (**Distributed systems**)
package com.example.scale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ScaleService {
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public ScaleService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String topic, String message) {
        kafkaTemplate.send(topic, message);
        System.out.println("Message sent to " + topic + ": " + message);
    }
}
```

**Scale Service Details**:

- **Purpose**: Sends messages to Kafka for distributed communication.
- **Explanation**: Uses `KafkaTemplate` (injected via `@Autowired`) to send a message to a specified topic, logging the action for confirmation.
- **Scaling Details**:
  - **Horizontal Scaling**: Spring Cloud enables load balancing and microservices.
  - **Vertical Scaling**: JVM tuning (e.g., `-Xmx`) enhances single-instance capacity.
  - **Distributed Systems**: Kafka for messaging, Redis for caching, not shown but Hazelcast could cluster data.

---

## Scope Details

- **Global Scope**: Static fields or variables outside methods/classes (e.g., `public static int x;`).
- **Closure Scope**: Simulated with lambdas capturing variables (e.g., `int x = 1; Runnable r = () -> System.out.println(x);`).
- **Class Scope**: Instance or static fields within a class (e.g., `private int y;`).
- **Method Scope**: Local variables within a method (e.g., `int z = 1;`).
- **Block Scope**: Variables within `{}` blocks (e.g., `for (int i = 0; i < 10; i++) {}`).
- **Spring Scopes**:
  - **Singleton**: One instance app-wide (default).
  - **Prototype**: New instance per request.
  - **Request**: New instance per HTTP request (web context).

## Notes

- Dependencies (Maven):
  ```xml
  <dependencies>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jdbc</artifactId>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
  </dependencies>
  ```
- Requires Kafka (`localhost:9092`), Redis (`localhost:6379`), and a database (e.g., H2 in-memory).
- Run with `mvn spring-boot:run`.
