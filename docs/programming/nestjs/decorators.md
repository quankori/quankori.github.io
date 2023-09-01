---
title: Decorators
---

## Concept

Decorators trong TypeScript cho phép bạn thay đổi hoặc bổ sung metadata và logic cho các đối tượng như classes, properties, methods, hay parameters. Khi code của bạn chạy, TypeScript sẽ gọi tới decorator functions hoặc classes và truyền thông tin liên quan đến đối tượng cần thay đổi.

Decorator function/class nhận các tham số tùy thuộc vào loại của đối tượng mà bạn đang đánh dấu. Đối với class decorator, tham số là constructor của class. Đối với method decorator, tham số là prototype của class và tên của method. Đối với parameter decorator, tham số là prototype của class, tên của method, và vị trí của parameter.

## Code

```ts
import { SetMetadata } from "@nestjs/common";
export const IS_ROLES = "roles";
export const Roles = (...roles: string[]) => SetMetadata(IS_ROLES, roles);
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

Trong NestJS, Reflector được sử dụng để tìm thông tin metadata của một phần tử, chẳng hạn như một class, một controller, một handler, v.v. Metadata là các dữ liệu được gắn kết với một phần tử trong mã nguồn và thường được sử dụng để thêm thông tin mô tả hoặc cấu hình cho phần tử đó.

Trong NestJS, Reflector giúp bạn truy xuất và quản lý metadata của các phần tử. Ví dụ, bạn có thể sử dụng Reflector để lấy thông tin về các decorator đã được áp dụng cho một class, một method hoặc một tham số của một function.

```ts
@Injectable()
export class JwtAccessTokenGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
```
