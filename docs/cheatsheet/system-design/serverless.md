---
title: Serverless Architecture
---

## Serverless Architecture

**Overview**: Serverless Architecture allows developers to build and run applications without managing servers, leveraging cloud providers for execution, scaling, and infrastructure, focusing on code and events.

**Functions as a service**: Event-triggered, short-lived code execution (e.g., AWS Lambda).

**Backend as a service**: Pre-built backend features (e.g., Firebase authentication, database).

**API gateway**: Manages and routes API requests to serverless functions.

**Storage services**: Scalable, managed storage (e.g., AWS S3, DynamoDB).

**Source Tree**:

```
src/
├── functions/
│   └── user.function.ts
├── baas/
│   └── auth.service.ts
├── gateway/
│   └── api.handler.ts
├── storage/
│   └── s3.service.ts
└── app.module.ts
```

**NestJS Example**:

```typescript
// src/functions/user.function.ts (**Functions as a service**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserFunction {
  async handleEvent(event: any): Promise<any> {
    // Simulate Lambda-like event handling
    const userId = event.userId || 1;
    return { id: userId, name: "John", status: "Created" };
  }
}

// src/baas/auth.service.ts (**Backend as a service**)
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  async login(email: string, password: string): Promise<string> {
    // Simulate Firebase-like auth
    if (email === "test@example.com" && password === "password") {
      return "mock-token";
    }
    throw new Error("Invalid credentials");
  }
}

// src/gateway/api.handler.ts (**API gateway**)
import { Injectable } from "@nestjs/common";
import { UserFunction } from "../functions/user.function";

@Injectable()
export class ApiHandler {
  constructor(private userFunction: UserFunction) {}

  async handleRequest(event: any): Promise<any> {
    // Simulate API Gateway routing
    if (event.path === "/users" && event.httpMethod === "POST") {
      return this.userFunction.handleEvent(event.body);
    }
    return { status: "Not Found" };
  }
}

// src/storage/s3.service.ts (**Storage services**)
import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";

@Injectable()
export class S3Service {
  private s3 = new S3({ region: "us-east-1" });

  async uploadFile(key: string, data: string): Promise<void> {
    await this.s3
      .putObject({
        Bucket: "my-bucket",
        Key: key,
        Body: data,
      })
      .promise();
    console.log(`Uploaded ${key} to S3`);
  }

  async getFile(key: string): Promise<string> {
    const result = await this.s3
      .getObject({
        Bucket: "my-bucket",
        Key: key,
      })
      .promise();
    return result.Body.toString();
  }
}

// src/app.module.ts
import { Module } from "@nestjs/common";
import { UserFunction } from "./functions/user.function";
import { AuthService } from "./baas/auth.service";
import { ApiHandler } from "./gateway/api.handler";
import { S3Service } from "./storage/s3.service";

@Module({
  providers: [UserFunction, AuthService, ApiHandler, S3Service],
})
export class AppModule {}

// src/main.ts (Simulated Serverless Entry)
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UserFunction } from "./functions/user.function";
import { AuthService } from "./baas/auth.service";
import { ApiHandler } from "./gateway/api.handler";
import { S3Service } from "./storage/s3.service";

// Simulate AWS Lambda handler
export async function handler(event: any) {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userFunction = app.get(UserFunction);
  const authService = app.get(AuthService);
  const apiHandler = app.get(ApiHandler);
  const s3Service = app.get(S3Service);

  // FaaS: Handle event
  const faasResult = await userFunction.handleEvent(event);

  // BaaS: Simulate login
  const token = await authService.login("test@example.com", "password");

  // API Gateway: Route request
  const apiResult = await apiHandler.handleRequest({
    path: "/users",
    httpMethod: "POST",
    body: event,
  });

  // Storage: Upload to S3
  await s3Service.uploadFile(
    `user-${faasResult.id}.txt`,
    JSON.stringify(faasResult)
  );

  return { faasResult, token, apiResult };
}

// Example invocation
handler({ userId: 1 }).then(console.log);
```

**Notes**:

- Install AWS SDK: `npm install aws-sdk`.
- Requires AWS credentials and an S3 bucket (`my-bucket`) configured.
- This simulates a serverless setup; for real deployment, use AWS Lambda with a framework like `serverless` and `nestia`.

---

## Key Differences

- **Functions as a Service**: Executes code on-demand, no server management (e.g., Lambda).
- **Backend as a Service**: Provides ready-made backend features (e.g., Firebase).
- **API Gateway**: Centralizes request routing and management (e.g., AWS API Gateway).
- **Storage Services**: Offers scalable, managed storage (e.g., S3).
