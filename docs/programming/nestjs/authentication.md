---
title: Authentication
---

## Concept

**Passport Strategy**

Passport là một thư viện xác thực mạnh mẽ cho Node.js, cho phép bạn xác thực người dùng thông qua nhiều phương thức như JWT, OAuth, Local, etc. Passport Strategy là một phần của Passport chịu trách nhiệm xác thực người dùng dựa trên một cách cụ thể (ví dụ: JWTStrategy để xác thực JWT).

Khi một request đến, JWTStrategy (một Passport Strategy) sẽ được kích hoạt bởi JwtAuthGuard (một Guard) để kiểm tra xem token trong request có hợp lệ không. Nếu token hợp lệ, validate method trong JWTStrategy sẽ được gọi để xác thực người dùng và trả về thông tin người dùng (ví dụ: userId, username). Sau đó, thông tin này có thể được sử dụng trong route handler.

**Guards**

Guards trong NestJS là các interceptor để bảo vệ các endpoint khỏi việc truy cập trái phép. Mỗi request sẽ được kiểm tra bởi guards trước khi nó đến tới route handler. Guards kiểm tra xem người dùng có quyền truy cập hay không bằng cách sử dụng xác thực (authentication) hoặc các logic tùy chỉnh khác.

## Explain code  

**Sign & verify token**

```ts
jwt.sign(payload, secretKey, options);
```

```ts
jwt.verify(payload, secretKey);
```

**Strategy**

Tạo một Passport Strategy (ví dụ: JWTStrategy) để xác thực user dựa trên JWT

```ts
// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

**Guards**

Tạo một Guard để sử dụng Strategy đã tạo và kiểm tra xem nó có hợp lệ không. Nếu hợp lệ thì gửi qua cho JwtStrategy

```ts
// jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**Router**

Khai báo guard trong router 

```ts
// app.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('protected')
export class AppController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedData() {
    return { message: 'This is protected data.' };
  }
}
```