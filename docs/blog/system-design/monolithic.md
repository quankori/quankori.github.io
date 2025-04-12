---
title: Monolithic Architecture
---

## Monolithic Architecture

Đây là dạng đơn giản nhất của Monolithic. Toàn bộ code của ứng dụng nằm trong một codebase duy nhất và được triển khai như một khối. Mặc dù dễ bắt đầu, mô hình này có thể trở nên khó quản lý, khó mở rộng và khó cập nhật khi ứng dụng phát triển lớn hơn. Các thành phần thường liên kết chặt chẽ với nhau.

```
my-monolith-app/
├── src/
│   ├── app.ts           # Entry point, main logic
│   ├── user_handler.ts  # Handles user related requests
│   ├── product_handler.ts # Handles product related requests
│   └── database.ts      # Database connection and queries
├── node_modules/
├── package.json
└── tsconfig.json
```

## Modular Monolithic Architecture

Để giải quyết một số nhược điểm của Monolithic cơ bản, kiến trúc Modular Monolithic chia ứng dụng thành các module logic riêng biệt. Mỗi module chịu trách nhiệm cho một chức năng hoặc một miền nghiệp vụ cụ thể (ví dụ: quản lý người dùng, quản lý sản phẩm, xử lý đơn hàng). Mặc dù vẫn được đóng gói và triển khai như một khối duy nhất, sự phân chia này giúp cải thiện cấu trúc code, tăng khả năng bảo trì và cho phép các nhóm phát triển làm việc song song trên các module khác nhau dễ dàng hơn. Các module giao tiếp với nhau thông qua các interface hoặc API nội bộ rõ ràng.

```
my-modular-monolith-app/
├── src/
│   ├── modules/
│   │   ├── users/
│   │   │   ├── user.service.ts
│   │   │   ├── user.controller.ts
│   │   │   └── user.types.ts
│   │   ├── products/
│   │   │   ├── product.service.ts
│   │   │   ├── product.controller.ts
│   │   │   └── product.types.ts
│   │   └── orders/
│   │       ├── order.service.ts
│   │       ├── order.controller.ts
│   │       └── order.types.ts
│   ├── core/             # Core functionalities, shared components (e.g., database, auth)
│   │   └── database.ts
│   ├── main.ts           # Application entry point, wires modules together
│   └── config.ts         # Application configuration
├── node_modules/
├── package.json
└── tsconfig.json
```

## Layered (N-Layer) Architecture

Kiến trúc Layered (hay N-Tier, N-Lớp) tổ chức ứng dụng thành các lớp (layers) xếp chồng lên nhau. Mỗi lớp có một trách nhiệm cụ thể và chỉ giao tiếp trực tiếp với lớp ngay bên dưới hoặc bên trên nó. Các lớp phổ biến bao gồm:

Presentation Layer (Lớp Trình Bày): Chịu trách nhiệm hiển thị giao diện người dùng và nhận input từ người dùng (ví dụ: Web UI, API Endpoints).

Business Logic Layer (Lớp Nghiệp Vụ): Chứa các quy tắc nghiệp vụ cốt lõi của ứng dụng. Lớp này xử lý dữ liệu từ lớp trình bày và tương tác với lớp truy cập dữ liệu.

Data Access Layer (Lớp Truy Cập Dữ Liệu - DAL): Chịu trách nhiệm tương tác với cơ sở dữ liệu hoặc các nguồn dữ liệu khác (lưu trữ, truy vấn dữ liệu).

(Optional) Application Layer/Service Layer: Đôi khi được thêm vào giữa Presentation và Business Logic để điều phối các tác vụ và luồng công việc.

Mô hình này thúc đẩy sự tách biệt mối quan tâm (separation of concerns), giúp code dễ hiểu, dễ bảo trì và dễ kiểm thử hơn.

```
my-layered-app/
├── src/
│   ├── presentation/      # API Controllers, UI Views
│   │   └── user.controller.ts
│   ├── business/          # Business logic, services
│   │   └── user.service.ts
│   ├── persistence/       # Data access, repositories
│   │   └── user.repository.ts
│   ├── domain/            # Core domain models/entities
│   │   └── user.entity.ts
│   ├── core/              # Shared utilities, interfaces
│   │   └── database.ts
│   └── main.ts            # Application entry point
├── node_modules/
├── package.json
└── tsconfig.json
```

## Three-Tier Architecture

Three-Tier Architecture là một dạng cụ thể và rất phổ biến của Layered Architecture. Nó chia ứng dụng thành ba tầng (tiers) logic (và đôi khi là vật lý):

Presentation Tier (Tầng Trình Bày): Tương tự Presentation Layer, xử lý tương tác với người dùng. Thường là một web server phục vụ HTML/CSS/JS hoặc các API endpoints.

Application Tier (Tầng Ứng Dụng - Logic Tier): Tương tự Business Logic Layer, chứa logic nghiệp vụ của ứng dụng. Tầng này xử lý yêu cầu từ Presentation Tier và tương tác với Data Tier.

Data Tier (Tầng Dữ Liệu): Tương tự Data Access Layer, chịu trách nhiệm lưu trữ và truy xuất dữ liệu. Thường là một hệ quản trị cơ sở dữ liệu (Database Server).

Sự khác biệt chính so với N-Layer chung chung là sự nhấn mạnh vào ba tầng riêng biệt này, và thường ngụ ý khả năng triển khai các tầng trên các máy chủ vật lý khác nhau để tăng khả năng mở rộng và bảo mật, mặc dù trong ngữ cảnh Monolithic, chúng vẫn thường chạy trên cùng một tiến trình hoặc máy chủ.

```
my-three-tier-app/
├── src/
│   ├── presentation_tier/  # UI, Controllers
│   │   └── api.controller.ts
│   ├── application_tier/   # Business Logic, Services
│   │   └── processing.service.ts
│   ├── data_tier/          # Database interaction, Repositories
│   │   └── storage.repository.ts
│   ├── shared/             # Shared models, utilities
│   │   └── models.ts
│   └── main.ts             # Entry point
├── node_modules/
├── package.json
└── tsconfig.json
```
