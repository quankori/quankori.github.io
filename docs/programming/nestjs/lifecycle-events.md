---
title: Lifecycle Events
---

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/nestjs/7.png)

## Concept

Trong NestJS, Lifecycle Events là các sự kiện được gắn liền với các thành phần chính của ứng dụng, như module, controller, provider và gateway. Các sự kiện này cho phép bạn thực hiện các hành động tùy chỉnh tại các giai đoạn quan trọng của vòng đời của các thành phần này. Dưới đây là các Lifecycle Events cơ bản trong NestJS:

1. Module/ Provider/ Controller Events:

   - `onModuleInit`: Được gọi sau khi module/provider/controller đã được khởi tạo và tất cả các provider đã được khởi tạo.
   - `onModuleDestroy`: Được gọi khi ứng dụng bị module/provider/controller tắt và bị hủy.

2. Application Events:

   - `onApplicationBootstrap`: Được gọi sau khi ứng dụng đã khởi tạo tất cả các module và tất cả các Lifecycle Events khác.
   - `onApplicationShutdown`: Được gọi khi ứng dụng bị tắt và tất cả các module đều bị hủy.

3. Gateway Events:

   - `handleConnection`: Được gọi khi một kết nối WebSocket mới được thiết lập.
   - `handleDisconnect`: Được gọi khi một kết nối WebSocket bị đóng.

## Code

```ts
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";

@Injectable()
export class MyService implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    console.log("MyService has been initialized");
  }

  onModuleDestroy() {
    console.log("MyService is being destroyed");
  }

  doSomething() {
    console.log("Doing something...");
  }
}
```
