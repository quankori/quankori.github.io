---
title: Decorators
---

Decorators trong TypeScript cho phép bạn thay đổi hoặc bổ sung metadata và logic cho các đối tượng như classes, properties, methods, hay parameters. Khi code của bạn chạy, TypeScript sẽ gọi tới decorator functions hoặc classes và truyền thông tin liên quan đến đối tượng cần thay đổi.

Decorator function/class nhận các tham số tùy thuộc vào loại của đối tượng mà bạn đang đánh dấu. Đối với class decorator, tham số là constructor của class. Đối với method decorator, tham số là prototype của class và tên của method. Đối với parameter decorator, tham số là prototype của class, tên của method, và vị trí của parameter.

```ts
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
```

Hoặc với Generic function kết hợp với Higher-Order function

```ts
function LogType<T>(type: T) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`Logged type: ${type}`);
  };
}

class Example {
  @LogType<number>(123)
  someMethod() {
    console.log("Executing someMethod...");
  }
}
```

**Reflector** 

