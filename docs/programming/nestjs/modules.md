---
title: Modules
---

## Concept

Trong NestJS, modules là một phần cơ bản trong việc xây dựng ứng dụng. Chúng giúp tổ chức mã nguồn thành các phần nhỏ, độc lập và có cấu trúc, từ đó tạo nên sự tương tác và sắp xếp hợp lý giữa các thành phần khác nhau của ứng dụng. Một ứng dụng NestJS được xây dựng từ nhiều modules mà mỗi module đại diện cho một phần của ứng dụng.

Có hai loại module chính trong NestJS:

**Application Module**:

Application module (module ứng dụng) là module gốc và đầu tiên được tạo ra khi bạn khởi đầu ứng dụng NestJS. Nó là module mà bạn cung cấp để khởi chạy ứng dụng. Application module thường chứa các import và export của các module con, controllers, providers và gateway mà bạn muốn sử dụng trong ứng dụng.

**Feature Module**:

Feature module (module tính năng) là module chứa các thành phần liên quan đến một chức năng cụ thể của ứng dụng. Bằng cách tổ chức mã nguồn thành các feature module, bạn tạo ra một cách cấu trúc rõ ràng cho ứng dụng. Các feature module thường chứa các controllers, providers, services và các thành phần khác liên quan đến chức năng đó.

Một số ưu điểm của việc sử dụng feature module:

- **Tách biệt chức năng**: Mỗi chức năng của ứng dụng được tách biệt thành một module riêng, làm cho mã nguồn dễ đọc và quản lý hơn.
- **Tái sử dụng**: Bạn có thể tái sử dụng feature module trong các dự án khác hoặc trong cùng một dự án.
- **Testability** (khả năng kiểm thử): Module được tổ chức rõ ràng giúp việc kiểm thử trở nên dễ dàng và tập trung vào từng phần của ứng dụng.

## Code

```ts
// app.module.ts (Application Module)
import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule {}

// cats.module.ts (Feature Module)
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```
