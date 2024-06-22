---
title: Domain Driven Design (DDD)
---

## Key Concepts of DDD

1. **Domain**:

   - The area of knowledge or activity that the application is concerned with. It represents the business problem that needs to be solved.

2. **Ubiquitous Language**:

   - A common language used by both developers and domain experts. It ensures clear communication and a shared understanding of the domain.

3. **Entities**:

   - Objects that have a distinct identity and lifecycle. For example, in an e-commerce system, a `Customer` is an entity.

4. **Value Objects**:

   - Objects that are defined by their attributes rather than their identity. They are immutable. For example, `Address` in a customer entity.

5. **Aggregates**:

   - A cluster of entities and value objects that are treated as a single unit. The aggregate has a root entity, known as the aggregate root, that controls access to the other entities.

6. **Repositories**:

   - Mechanisms for retrieving and storing aggregates. They provide an abstraction over the data storage layer.

7. **Factories**:

   - Objects responsible for creating instances of entities and aggregates, ensuring that the creation process is encapsulated and consistent.

8. **Services**:
   - Operations or processes that do not naturally belong to entities or value objects. They are stateless and typically perform domain logic.

## Layers in DDD

1. **Domain Layer**:

   - Contains the business logic and domain model. This is where entities, value objects, aggregates, and domain services reside.

2. **Application Layer**:

   - Orchestrates domain operations. It coordinates tasks by delegating work to the domain layer. This layer does not contain business logic.

3. **Infrastructure Layer**:

   - Contains technical implementations such as repositories, external services, and data access layers. It supports the other layers but is not concerned with business logic.

4. **User Interface Layer**:
   - Handles user interactions. This could be a web interface, API, or any other form of user interaction.

## Example Scenario: E-commerce System

1. **Domain**:

   - The e-commerce domain, which includes customers, orders, products, and payments.

2. **Ubiquitous Language**:

   - Terms like `Customer`, `Order`, `Product`, and `Payment` are used consistently across the team.

3. **Entities**:

   - `Customer`, `Order`, and `Product` are entities with unique identities.

4. **Value Objects**:

   - `Address`, `Money`, and `ProductDetails` are value objects.

5. **Aggregates**:

   - `Order` aggregate includes the `Order` entity and `OrderItem` value objects.

6. **Repositories**:

   - `OrderRepository` for accessing and storing orders.

7. **Factories**:

   - `OrderFactory` for creating new orders.

8. **Services**:
   - `PaymentService` for processing payments.

## Example Code in Go

### Domain Layer

**Entity: Customer**

```go
package domain

type Customer struct {
    ID   string
    Name string
    Address Address
}
```

**Value Object: Address**

```go
package domain

type Address struct {
    Street  string
    City    string
    ZipCode string
}
```

**Aggregate: Order**

```go
package domain

type Order struct {
    ID     string
    CustomerID string
    Items  []OrderItem
    Total  Money
}

type OrderItem struct {
    ProductID string
    Quantity  int
    Price     Money
}

type Money struct {
    Amount   float64
    Currency string
}
```

**Service: PaymentService**

```go
package domain

type PaymentService interface {
    ProcessPayment(order Order) error
}
```

### Repository Interface

**OrderRepository**

```go
package domain

type OrderRepository interface {
    Save(order Order) error
    FindByID(id string) (*Order, error)
}
```

### Application Layer

**Order Application Service**

```go
package application

import "example.com/domain"

type OrderService struct {
    orderRepo domain.OrderRepository
    paymentService domain.PaymentService
}

func (s *OrderService) PlaceOrder(customerID string, items []domain.OrderItem) (*domain.Order, error) {
    order := domain.Order{
        ID:         generateOrderID(),
        CustomerID: customerID,
        Items:      items,
        Total:      calculateTotal(items),
    }
    if err := s.orderRepo.Save(order); err != nil {
        return nil, err
    }
    if err := s.paymentService.ProcessPayment(order); err != nil {
        return nil, err
    }
    return &order, nil
}

func generateOrderID() string {
    // Implementation to generate a unique order ID
}

func calculateTotal(items []domain.OrderItem) domain.Money {
    // Implementation to calculate the total amount
}
```

## Summary

- **Domain-Driven Design (DDD)**: A design approach that focuses on modeling the core business domain and its logic.
- **Key Concepts**:
  - **Domain**: The area of knowledge or activity the application addresses.
  - **Ubiquitous Language**: A shared language between developers and domain experts.
  - **Entities**: Objects with unique identities.
  - **Value Objects**: Immutable objects defined by their attributes.
  - **Aggregates**: Clusters of entities and value objects treated as a single unit.
  - **Repositories**: Abstractions for data access.
  - **Factories**: Responsible for creating instances of entities and aggregates.
  - **Services**: Stateless operations performing domain logic.
- **Layers**:
  - **Domain Layer**: Business logic and domain model.
  - **Application Layer**: Orchestrates domain operations.
  - **Infrastructure Layer**: Technical implementations supporting other layers.
  - **User Interface Layer**: Handles user interactions.
