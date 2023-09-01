---
title: Pipes
---

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/nestjs/4.png)

## Concept

Trong NestJS, pipes là một phần quan trọng của việc xử lý và kiểm tra dữ liệu trước khi chúng được truyền vào các route handler (controller methods) để xử lý. Pipes giúp kiểm tra, biến đổi và xác thực dữ liệu trước khi nó được sử dụng trong phần còn lại của ứng dụng. NestJS cung cấp một số loại pipes khác nhau để đáp ứng các yêu cầu khác nhau của ứng dụng. Dưới đây là một số loại pipes cơ bản trong NestJS

**Validation Pipe**:
Validation Pipe được sử dụng để kiểm tra và xác thực dữ liệu dựa trên các decorator như @Body(), @Query(), @Param(), @Headers() và @Request(). Nó sử dụng class-validator để thực hiện kiểm tra dữ liệu và trả về các lỗi nếu có.

**ParseInt Pipe**:
ParseInt Pipe được sử dụng để chuyển đổi các tham số route hoặc query params thành kiểu số nguyên.

**ParseBool Pipe**:
ParseBool Pipe được sử dụng để chuyển đổi các giá trị boolean từ các tham số route hoặc query params.

**DefaultValue Pipe**:
DefaultValue Pipe cho phép bạn cung cấp giá trị mặc định cho các tham số route hoặc query params khi giá trị không được cung cấp.

Và còn nhiều loại pipes khác nhau tùy thuộc vào yêu cầu cụ thể của ứng dụng.

## Code

Tạo và áp dụng global Pipes

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      let arrayError = [];
      validationErrors.forEach((element: ValidationError) => {
        arrayError.push({
          field: element.property,
          message: Object.values(element.constraints)[0],
        });
      });
      return new UnprocessableEntityException(arrayError);
    },
  })
);
```

Tạo class Pipes

```ts
import {
  ValidationPipe,
  ValidationError,
  UnprocessableEntityException,
} from "@nestjs/common";

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const arrayError = validationErrors.map((element: ValidationError) => ({
          field: element.property,
          message: Object.values(element.constraints)[0],
        }));
        return new UnprocessableEntityException(arrayError);
      },
    });
  }
}
```

Sử dụng trong router

```ts
import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto";
import { ValidationPipe } from "./validation.pipe";

@Controller("users")
export class UsersController {
  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    // Xử lý logic tạo người dùng
  }
}
```
