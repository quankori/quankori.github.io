---
title: Domain-Centric Architectures
---

Các kiến trúc phần mềm hiện đại như Onion, Clean, EBI, và Hexagonal (Ports and Adapters) ngày càng trở nên phổ biến nhờ khả năng giải quyết các vấn đề cố hữu trong các kiến trúc phân lớp truyền thống. Chúng tập trung vào việc đặt miền nghiệp vụ (domain) làm trung tâm (domain-centric) và quản lý sự phụ thuộc một cách chặt chẽ thông qua nguyên tắc Đảo ngược Phụ thuộc (Dependency Inversion). Điều này giúp xây dựng các ứng dụng linh hoạt, dễ bảo trì, dễ kiểm thử và ít bị ảnh hưởng bởi những thay đổi trong các thành phần cơ sở hạ tầng (như UI, database).

## Onion Architecture

Được giới thiệu bởi Jeffrey Palermo, Onion Architecture giải quyết vấn đề phụ thuộc của Layered Architecture bằng cách đặt Domain Model và Domain Services (lõi nghiệp vụ) vào trung tâm. Các lớp bên ngoài phụ thuộc vào các lớp bên trong, nhưng không ngược lại. Quy tắc phụ thuộc (Dependency Rule) là mấu chốt: mọi phụ thuộc chỉ hướng vào trong.

Các lớp chính (từ trong ra ngoài):

Domain Model: Các thực thể (entities) cốt lõi của miền nghiệp vụ. Không phụ thuộc vào bất cứ thứ gì khác.

Domain Services: Logic nghiệp vụ liên quan đến nhiều entities hoặc các quy tắc phức tạp. Chỉ phụ thuộc vào Domain Model.

Application Services: Điều phối các trường hợp sử dụng (use cases) của ứng dụng. Phụ thuộc vào Domain Services và các interface được định nghĩa ở lớp này (nhưng triển khai ở lớp ngoài).

Infrastructure / Outer Layers: Các chi tiết kỹ thuật như UI, Database, Frameworks, API bên ngoài. Lớp này phụ thuộc vào Application Services (thông qua interfaces) và triển khai các interface đó (ví dụ: UserRepository triển khai IUserRepository).

Nguyên tắc Đảo ngược Phụ thuộc (Dependency Inversion Principle) được áp dụng triệt để: các lớp bên trong định nghĩa interfaces, và các lớp bên ngoài cung cấp implementations. Điều này giúp tách biệt hoàn toàn lõi nghiệp vụ khỏi các chi tiết kỹ thuật.

```
my-onion-app/
├── src/
│   ├── domain/                 # Innermost core
│   │   ├── models/             # Entities
│   │   │   └── user.model.ts
│   │   └── services/           # Domain services (optional)
│   │       └── user.logic.ts
│   ├── application/            # Application layer
│   │   ├── services/           # Application services / Use cases
│   │   │   └── user.service.ts
│   │   └── interfaces/         # Interfaces for outer layers to implement
│   │       └── user.repository.interface.ts
│   ├── infrastructure/         # Outermost layer
│   │   ├── persistence/        # Data access implementation
│   │   │   └── user.repository.ts
│   │   ├── web/                # Controllers, API endpoints
│   │   │   └── user.controller.ts
│   │   └── external/           # Clients for external APIs
│   ├── core/                   # Shared utilities (few dependencies)
│   └── main.ts                 # Entry point, dependency injection setup
├── node_modules/
├── package.json
└── tsconfig.json
```

## Clean Architecture

Clean Architecture, được đề xuất bởi Robert C. Martin (Uncle Bob), rất tương đồng với Onion và Hexagonal Architecture. Nó cũng nhấn mạnh việc tách biệt các mối quan tâm thành các vòng tròn đồng tâm và tuân thủ nghiêm ngặt Quy tắc Phụ thuộc (Dependency Rule): phụ thuộc chỉ hướng vào trong.

Các vòng tròn chính (từ trong ra ngoài):

Entities: Các đối tượng nghiệp vụ cốt lõi của ứng dụng, chứa các quy tắc nghiệp vụ quan trọng nhất và ít thay đổi nhất.

Use Cases (Interactors): Logic nghiệp vụ cụ thể của ứng dụng, điều phối luồng dữ liệu đến và đi từ Entities. Chúng định nghĩa các interfaces cho lớp ngoài (Presenters, Gateways).

Interface Adapters: Chuyển đổi dữ liệu giữa định dạng phù hợp cho Use Cases/Entities và định dạng phù hợp cho các thành phần bên ngoài (Database, Web, UI). Bao gồm Controllers, Presenters, Gateways (Repositories).

Frameworks & Drivers: Lớp ngoài cùng chứa các chi tiết cụ thể như Frameworks (web framework), Database, UI, thiết bị.

Giống như Onion, Clean Architecture sử dụng Dependency Inversion để đảm bảo lõi nghiệp vụ (Entities, Use Cases) không phụ thuộc vào các chi tiết bên ngoài.

```
my-clean-app/
├── src/
│   ├── domain/                 # Entities + Use Case Interfaces (sometimes separate)
│   │   ├── entities/
│   │   │   └── product.entity.ts
│   │   └── usecases/
│   │       ├── interfaces/     # Input/Output ports, Gateway interfaces
│   │       │   └── product.repository.interface.ts
│   │       │   └── product.presenter.interface.ts
│   │       └── get_product.usecase.ts # Interactor
│   ├── application/            # Use Case implementations (sometimes merged into domain)
│   ├── infrastructure/         # Outermost layer
│   │   ├── adapters/           # Interface Adapters
│   │   │   ├── controllers/    # Web controllers
│   │   │   │   └── product.controller.ts
│   │   │   ├── presenters/     # Data formatters for UI/API
│   │   │   │   └── product.api.presenter.ts
│   │   │   └── gateways/       # Repository implementations
│   │   │       └── product.mongo.repository.ts
│   │   └── frameworks/         # Web framework, DB driver setup
│   │       └── express.setup.ts
│   └── main.ts                 # Entry point, DI container setup
├── node_modules/
├── package.json
└── tsconfig.json
```

## EBI Architecture (Entity-Boundary-Interactor)

EBI là một biến thể hoặc cách nhìn khác của Clean Architecture, tập trung vào việc mô hình hóa các Use Cases. Nó chia các thành phần xử lý một yêu cầu thành ba loại:

Interactor (Use Case): Đối tượng điều phối chính cho một use case cụ thể. Nó chứa logic ứng dụng, gọi đến Entities và Boundaries. Tương đương với Use Case/Interactor trong Clean Architecture.

Entity: Các đối tượng nghiệp vụ cốt lõi. Tương đương với Entities trong Clean Architecture.

Boundary: Interfaces định nghĩa cách Interactor giao tiếp với thế giới bên ngoài (cả input và output).

Input Boundary: Interface mà lớp ngoài (ví dụ: Controller) gọi để kích hoạt Interactor.

Output Boundary: Interface mà Interactor gọi để gửi kết quả ra lớp ngoài (ví dụ: Presenter).

Gateway/Repository Boundary: Interface mà Interactor dùng để tương tác với dữ liệu (do lớp ngoài triển khai).

Quy tắc phụ thuộc vẫn là hướng vào trong: Interactor phụ thuộc vào Entity và Boundary interfaces, nhưng không phụ thuộc vào các lớp triển khai Boundary ở bên ngoài.

```
my-ebi-app/
├── src/
│   ├── usecases/               # Group by use case
│   │   └── register_user/
│   │       ├── register_user.interactor.ts # Interactor
│   │       ├── register_user.request.model.ts # Input data structure
│   │       ├── register_user.response.model.ts # Output data structure
│   │       ├── user.entity.ts              # Entity (can be shared)
│   │       ├── user.repository.boundary.ts # Gateway Boundary Interface
│   │       └── user.presenter.boundary.ts  # Output Boundary Interface
│   ├── domain_entities/        # Or separate Entities if shared across many use cases
│   │   └── user.ts
│   ├── infrastructure/         # Boundary Implementations
│   │   ├── controllers/        # Calls Input Boundary
│   │   │   └── user.api.controller.ts
│   │   ├── presenters/         # Implements Output Boundary
│   │   │   └── user.json.presenter.ts
│   │   └── persistence/        # Implements Gateway Boundary
│   │       └── user.db.repository.ts
│   └── main.ts                 # Entry point, DI setup
├── node_modules/
├── package.json
└── tsconfig.js
```

## Hexagonal Architecture

Được đặt tên bởi Alistair Cockburn, Hexagonal Architecture (còn gọi là Ports and Adapters) cũng nhằm mục đích tách biệt lõi ứng dụng (logic nghiệp vụ) khỏi các yếu tố bên ngoài (UI, DB, API khác...).

Application Core (Hexagon): Chứa Entities và Use Cases (logic nghiệp vụ thuần túy), không biết gì về thế giới bên ngoài.

Ports: Là các cổng giao tiếp của lõi ứng dụng, được định nghĩa dưới dạng interfaces. Có hai loại port:

Driving Ports (Input Ports): API của lõi ứng dụng, định nghĩa cách thế giới bên ngoài có thể lái (gọi) ứng dụng (ví dụ: UserServicePort với phương thức createUser). Thường được triển khai bởi Use Cases/Application Services.

Driven Ports (Output Ports): Interfaces định nghĩa những gì lõi ứng dụng cần từ bên ngoài (ví dụ: UserRepositoryPort để lưu/tải dữ liệu, NotificationServicePort để gửi email). Lõi ứng dụng gọi các port này.

Adapters: Là cầu nối giữa thế giới bên ngoài và các Port.

Driving Adapters: Chuyển đổi input từ bên ngoài (HTTP request, CLI command) thành lời gọi đến Driving Port (ví dụ: UserController gọi UserServicePort).

Driven Adapters: Triển khai các Driven Port interfaces, tương tác với các công cụ cụ thể (ví dụ: DatabaseUserRepository triển khai UserRepositoryPort, SmtpNotificationService triển khai NotificationServicePort).

Quy tắc phụ thuộc: Mọi phụ thuộc đều hướng từ Adapters vào Ports (và vào Application Core). Lõi ứng dụng không phụ thuộc vào Adapters.

```
my-hexagonal-app/
├── src/
│   ├── application/            # Application core (Hexagon)
│   │   ├── domain/             # Entities
│   │   │   └── order.model.ts
│   │   ├── ports/              # Port definitions
│   │   │   ├── input/          # Driving Ports
│   │   │   │   └── place_order.usecase.port.ts
│   │   │   └── output/         # Driven Ports
│   │   │       └── order.repository.port.ts
│   │   │       └── payment.gateway.port.ts
│   │   └── services/           # Use Cases / Application Services (implement Input Ports)
│   │       └── order.service.ts
│   ├── infrastructure/         # Adapters and external details
│   │   ├── adapters/
│   │   │   ├── input/          # Driving Adapters
│   │   │   │   └── web/        # REST Controller
│   │   │   │   │   └── order.controller.ts
│   │   │   │   └── cli/        # Command Line Interface
│   │   │   │       └── order.command.ts
│   │   │   └── output/         # Driven Adapters
│   │   │       ├── persistence/ # Database implementation
│   │   │       │   └── order.dynamodb.repository.ts
│   │   │       └── payment/     # Payment gateway implementation
│   │   │           └── stripe.adapter.ts
│   │   └── config/             # DI, framework setup
│   └── main.ts                 # Entry point
├── node_modules/
├── package.json
└── tsconfig.json
```
