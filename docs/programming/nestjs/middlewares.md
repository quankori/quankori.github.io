---
title: Middlewares
---

## Concept

Trong NestJS, không có sự phân chia cụ thể giữa "middleware cho response" và "middleware cho request". Middleware trong NestJS thường được sử dụng để thực hiện xử lý trước khi yêu cầu đến tới route handlers, bất kể xử lý đó liên quan đến request hay response.

Tuy nhiên, bạn có thể định hình logic xử lý trong middleware để tùy chỉnh việc thực hiện xử lý trước hoặc sau khi route handler được gọi. Bạn có thể làm điều này bằng cách đặt hàm next() ở vị trí phù hợp trong middleware. Nếu bạn đặt next() ngay sau khi hoàn thành xử lý yêu cầu, thì middleware sẽ hoàn thành trước khi route handler được gọi.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/nestjs/2.png)

## Code

```ts
@Injectable()
export class CustomMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    try {
      console.log("Middleware for request"); // Xử lý trước khi route handler được gọi
      next(); // Chuyển quyền kiểm soát cho route handler
      console.log("Middleware for response"); // Xử lý sau khi route handler đã hoàn thành
      throw new Error("An error occurred in middleware");
    } catch (error) {
      // Xử lý lỗi trong khối catch
      console.error("Error in middleware:", error.message);
      // Trả về một phản hồi lỗi (optional)
      res.status(400).send("Internal Server Error");
    }
  }
}
```

Trong ví dụ trên, middleware `CustomMiddleware` được thực thi trước khi route handler được gọi. Sau khi route handler hoàn thành, middleware còn lại của `CustomMiddleware` sẽ được thực thi. Điều này cho phép bạn tùy chỉnh thứ tự xử lý trước và sau khi route handler.

Cách triển khai Middleware trong NestJS

**Cách 1**

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CustomMiddleware } from "./custom.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(CustomMiddleware); // Sử dụng middleware

  await app.listen(3000);
}
bootstrap();
```

**Cách 2** (thường xài nhất vì linh hoạt)

```ts
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { CustomMiddleware } from "./custom.middleware";
import { MyController } from "./my.controller";

@Module({
  controllers: [MyController],
  providers: [CustomMiddleware], // Đăng ký middleware ở đây
})
export class MyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CustomMiddleware) // Sử dụng middleware cho controllers
      .forRoutes("*"); // Áp dụng cho tất cả các routes trong module
  }
}
```
