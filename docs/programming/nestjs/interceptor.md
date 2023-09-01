---
title: Interceptor
---

## Concept

Trong NestJS, Interceptor là một phần của middleware pipeline và cho phép bạn thực hiện các thay đổi hoặc xử lý trước và sau khi yêu cầu đi qua controller trước khi đến response. Interceptor thường được sử dụng để thực hiện các tác vụ như logging, transform dữ liệu, validate, gắn metadata, và nhiều công việc xử lý khác.

Interceptors giúp tách logic xử lý ứng dụng thành các lớp riêng biệt và thực hiện các tác vụ xử lý khác nhau trước và sau khi xử lý request, giúp tăng khả năng quản lý và tái sử dụng code.

**Workflow của Interceptor trong ứng dụng thực tế:**

1. Yêu cầu gửi từ client đến server.
2. Interceptor trước request chạy (nếu có). Chẳng hạn, logging request, validate dữ liệu, gắn metadata, v.v.
3. Yêu cầu tiếp tục vào controller để xử lý.
4. Controller xử lý yêu cầu.
5. Interceptor sau request chạy (nếu có). Chẳng hạn, logging response, transform dữ liệu, gắn headers, v.v.
6. Response được trả về cho client.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/nestjs/6.png)

## Code

Triển khai Interceptor

```ts
export interface Response<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class TestInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<Response<T>> {
    console.log("Before request handled by controller");

    return next.handle().pipe(
      map((data) => {
        console.log("After request handled by controller");
        return {
          data: data,
          message: "Test",
          code: context.switchToHttp().getResponse().statusCode,
        };
      })
    );
  }
}
```

Sử dụng TransformInterceptor

```ts
import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { TransformInterceptor } from "./transform.interceptor";

@Controller("app")
@UseInterceptors(TransformInterceptor)
export class AppController {
  @Get()
  getHello(): string {
    return "Hello World";
  }
}
```

Hoặc sử dụng global

```ts
app.useGlobalInterceptors(new TestInterceptor(new Reflector()));
```

**Observer**

Trong RxJS, Observable là một kiểu dữ liệu biểu diễn một luồng dữ liệu không đồng bộ. Nó cho phép bạn theo dõi các sự kiện, thay đổi, hoặc giá trị trong thời gian và thực hiện các xử lý tương ứng khi có sự thay đổi. Điều này rất hữu ích để xử lý các tác vụ không đồng bộ như tương tác với API, xử lý dữ liệu từ cơ sở dữ liệu, và nhiều tác vụ khác.

Một Observable có thể phát ra các giá trị (data), thông báo lỗi (error), hoặc thông báo hoàn thành (complete) để kết thúc luồng dữ liệu. Bạn có thể áp dụng các operator của RxJS để biến đổi, lọc, kết hợp, và xử lý dữ liệu trong luồng Observable
