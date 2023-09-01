---
title: Providers
---

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/nestjs/1.png)

## Concept

Trong NestJS, providers là các đối tượng chịu trách nhiệm cung cấp các dịch vụ, hàm, hay đối tượng cho các phần khác trong ứng dụng như controllers, modules, và injectables. Providers là cốt lõi của hệ thống dependency injection trong NestJS, cho phép các phần khác trong ứng dụng yêu cầu và sử dụng các dịch vụ mà không cần biết cách chính xác chúng được tạo ra.

## Standart Providers

Các providers được định nghĩa bằng cách sử dụng cú pháp `@Injectable()` decorator và được cung cấp cho các module để sử dụng

```ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class CatsService {
  findAll() {
    return ["Cat 1", "Cat 2"];
  }
}
```

## Customer Providers

Bên cạnh việc sử dụng @Injectable() decorator, bạn cũng có thể tạo các custom provider bằng cách sử dụng cú pháp object literal để định nghĩa provider.

### Value providers: useValue

Sử dụng useValue để cung cấp giá trị cố định cho provider.

```ts
const catsServiceProvider = {
  provide: "CatsService",
  useValue: {
    findAll: () => ["Cat 1", "Cat 2"],
  },
};
```

### Class providers: useClass

Sử dụng useClass để cung cấp một class để tạo instance cho provider.

```ts
const catsServiceProvider = {
  provide: "CatsService",
  useClass: CatsService,
};
```

### Factory providers: useFactory

Factory providers cho phép bạn sử dụng một hàm để tạo ra instance của provider. Điều này giúp bạn có thể tùy chỉnh việc khởi tạo của provider dựa trên logic hoặc cấu hình cụ thể.

```ts
import { Module } from "@nestjs/common";
import { Connection, DatabaseService } from "./database.service";

@Module({
  providers: [
    DatabaseService,
    {
      provide: "CONNECTION",
      useFactory: (connection: Connection) => {
        return new DatabaseService(connection);
      },
      inject: [Connection],
    },
  ],
  exports: ["CONNECTION", DatabaseService],
})
export class DatabaseModule {}
```

Trong ví dụ này, DatabaseService là một provider, và CONNECTION được tạo bởi hàm factory. Hàm factory có thể truy cập và sử dụng Connection để tạo instance của DatabaseService.

Trong ví dụ này, Connection là một class/provider khác được inject vào hàm factory thông qua `inject: [Connection]`. Khi NestJS cần tạo instance của CONNECTION provider, nó sẽ tự động inject một instance của Connection vào hàm factory.

### Alias providers: useExisting

Alias providers cho phép bạn tạo một tên khác cho một provider hiện có. Điều này hữu ích khi bạn muốn sử dụng một tên rút gọn hoặc thay đổi tên của một provider mà không ảnh hưởng đến việc sử dụng provider này trong các module khác.

```ts
import { Module } from "@nestjs/common";
import { ExistingService } from "./existing.service";

@Module({
  providers: [ExistingService],
  exports: [ExistingService],
})
export class AppModule {}
```

```ts
import { Module } from "@nestjs/common";
import { AliasService } from "./alias.service";

@Module({
  providers: [
    {
      provide: "AliasService",
      useExisting: ExistingService,
    },
  ],
})
export class CatsModule {}
```

Trong ví dụ này, provider `AliasService` thực chất là `ExistingService`, nhưng có tên khác để sử dụng trong module `CatsModule`.

### Non-service based providers

Có thể sử dụng non-service based providers để định nghĩa các giá trị không cần tạo instance của class provider. Chúng thường được sử dụng để cung cấp các giá trị đơn giản như chuỗi, số hoặc hằng số.

```ts
import { Module } from "@nestjs/common";

@Module({
  providers: [
    {
      provide: "API_KEY",
      useValue: "your-api-key",
    },
    {
      provide: "MAX_RETRIES",
      useValue: 5,
    },
  ],
})
export class AppModule {}
```

Sử dụng

```ts
import { Controller, Get, Inject } from "@nestjs/common";

@Controller("cats")
export class CatsController {
  constructor(
    @Inject("API_KEY") private apiKey: string,
    @Inject("MAX_RETRIES") private maxRetries: number
  ) {}

  @Get()
  getCats() {
    console.log("API Key:", this.apiKey);
    console.log("Max Retries:", this.maxRetries);
    // Your controller logic here
  }
}
```

## Provider scope

Mỗi provider có một phạm vi sử dụng (scope) riêng, bao gồm `SINGLETON`, `TRANSIENT`, và `REQUEST`.
Ví dụ thì khi request tạo gửi tới scope `SINGLETON` thì sẽ dùng lại instance đã xài, còn `TRANSIENT` và `REQUEST` sẽ tạo mới instance.

**Singleton** (Mặc định): Mỗi provider chỉ được tạo duy nhất một lần và được chia sẻ cho tất cả các module và thành phần trong ứng dụng. Điều này đảm bảo rằng một instance của provider sẽ được sử dụng cho tất cả các yêu cầu trong ứng dụng.

```ts
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.DEFAULT }) // Hoặc không cần khai báo scope vì singleton là mặc định
```

**Transient**: Mỗi yêu cầu (request) sẽ tạo ra một instance riêng của provider. Điều này đảm bảo rằng mỗi yêu cầu sẽ có một instance độc lập của provider mà không ảnh hưởng đến các yêu cầu khác.

```ts
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
```

**Request**: Cơ chế này tạo ra một instance riêng của provider cho mỗi yêu cầu (request), nhưng khác với transient, các instance của request-scoped provider sẽ được chia sẻ trong suốt quá trình xử lý một yêu cầu duy nhất. Các yêu cầu khác sẽ có các instance khác nhau.

```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
```
