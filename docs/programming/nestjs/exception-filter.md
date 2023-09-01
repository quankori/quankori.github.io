---
title: Exception filter
---

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/nestjs/3.png)

## Concept

Exception filter trong NestJS là một cơ chế cho phép bạn xử lý các ngoại lệ (exceptions) một cách tùy chỉnh và định hình cách ứng dụng của bạn xử lý lỗi. Thay vì để các ngoại lệ lan tràn ra ngoài và trở thành lỗi không xử lý, bạn có thể sử dụng Exception filter để bắt và xử lý chúng theo cách mà bạn muốn.

`@Catch` là một decorator trong NestJS được sử dụng để áp dụng Exception filter lên một class (controller class hoặc custom filter class). Bạn có thể sử dụng `@Catch` để chỉ định loại ngoại lệ mà filter sẽ xử lý.

## Code

Tạo custom exception filter

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || "Internal server error";

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
```

Áp dụng CustomExceptionFilter lên một controller method bằng cách sử dụng @UseFilters decorator

```ts
import { Controller, Get, UseFilters } from "@nestjs/common";
import { CustomExceptionFilter } from "./custom-exception.filter";
import { CustomException } from "./custom.exception";

@Controller("cats")
@UseFilters(CustomExceptionFilter)
export class CatsController {
  @Get("error")
  throwError() {
    throw new CustomException("This is a custom exception.");
  }
}
```

Áp dụng trong global

```ts
app.useGlobalFilters(new CustomExceptionFilter());
```
