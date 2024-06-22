---
title: Nest.js Testing
---

## Comprehensive Testing in NestJS

Testing is a crucial part of software development, ensuring that applications work correctly and reliably. In NestJS, testing is streamlined and integrated seamlessly with tools like Jest, which is the default testing framework. Here’s a detailed overview of how testing works in NestJS, suitable for an interview setting.

## Types of Tests in NestJS

1. **Unit Tests**
2. **Integration Tests**
3. **End-to-End (E2E) Tests**

## 1. Unit Tests

**Definition**:

- Unit tests focus on individual components or services in isolation. They aim to verify that each part of the application behaves as expected.

**Key Points**:

- Mocking dependencies to isolate the unit under test.
- Fast and focused on specific functionalities.

**Example**:

- Testing a service method that adds two numbers.

**Implementation**:

1. **Setting Up**:

   - Use Jest’s mocking capabilities to isolate the service.
   - Use `@nestjs/testing` to create a testing module.

2. **Service Code** (`math.service.ts`):

   ```typescript
   import { Injectable } from "@nestjs/common";

   @Injectable()
   export class MathService {
     add(a: number, b: number): number {
       return a + b;
     }
   }
   ```

3. **Unit Test** (`math.service.spec.ts`):

   ```typescript
   import { Test, TestingModule } from "@nestjs/testing";
   import { MathService } from "./math.service";

   describe("MathService", () => {
     let service: MathService;

     beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
         providers: [MathService],
       }).compile();

       service = module.get<MathService>(MathService);
     });

     it("should add two numbers", () => {
       expect(service.add(2, 3)).toBe(5);
     });
   });
   ```

## 2. Integration Tests

**Definition**:

- Integration tests verify that different parts of the application work together correctly. They test the interaction between multiple components.

**Key Points**:

- May involve a real database or a test database.
- Test the interaction between services, controllers, and modules.

**Example**:

- Testing a service method that interacts with a database.

**Implementation**:

1. **Service Code** (`user.service.ts`):

   ```typescript
   import { Injectable } from "@nestjs/common";
   import { UserRepository } from "./user.repository";

   @Injectable()
   export class UserService {
     constructor(private readonly userRepository: UserRepository) {}

     async findAllUsers(): Promise<User[]> {
       return this.userRepository.findAll();
     }
   }
   ```

2. **Integration Test** (`user.service.spec.ts`):

   ```typescript
   import { Test, TestingModule } from "@nestjs/testing";
   import { UserService } from "./user.service";
   import { UserRepository } from "./user.repository";

   describe("UserService", () => {
     let service: UserService;
     let repository: UserRepository;

     beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
         providers: [UserService, UserRepository],
       }).compile();

       service = module.get<UserService>(UserService);
       repository = module.get<UserRepository>(UserRepository);
     });

     it("should return all users", async () => {
       const users = [{ id: 1, name: "John Doe" }];
       jest.spyOn(repository, "findAll").mockResolvedValue(users);

       expect(await service.findAllUsers()).toEqual(users);
     });
   });
   ```

## 3. End-to-End (E2E) Tests

**Definition**:

- E2E tests verify the application flow from start to finish. They simulate real user scenarios and test the entire system.

**Key Points**:

- Use tools like `supertest` to simulate HTTP requests.
- Test the application as a whole, including network, database, and other integrations.

**Example**:

- Testing an API endpoint that creates a new user.

**Implementation**:

1. **Controller Code** (`user.controller.ts`):

   ```typescript
   import { Controller, Post, Body } from "@nestjs/common";
   import { UserService } from "./user.service";
   import { CreateUserDto } from "./dto/create-user.dto";

   @Controller("users")
   export class UserController {
     constructor(private readonly userService: UserService) {}

     @Post()
     async create(@Body() createUserDto: CreateUserDto) {
       return this.userService.create(createUserDto);
     }
   }
   ```

2. **E2E Test** (`user.e2e-spec.ts`):

   ```typescript
   import { Test, TestingModule } from "@nestjs/testing";
   import { INestApplication } from "@nestjs/common";
   import * as request from "supertest";
   import { AppModule } from "../src/app.module";

   describe("UserController (e2e)", () => {
     let app: INestApplication;

     beforeAll(async () => {
       const moduleFixture: TestingModule = await Test.createTestingModule({
         imports: [AppModule],
       }).compile();

       app = moduleFixture.createNestApplication();
       await app.init();
     });

     it("/users (POST)", () => {
       return request(app.getHttpServer())
         .post("/users")
         .send({ name: "John Doe" })
         .expect(201)
         .expect(({ body }) => {
           expect(body).toHaveProperty("id");
           expect(body.name).toBe("John Doe");
         });
     });

     afterAll(async () => {
       await app.close();
     });
   });
   ```

## Summary

- **Unit Tests**:

  - Focus: Individual components/services.
  - Tools: Jest, @nestjs/testing.
  - Example: Testing a service method in isolation.

- **Integration Tests**:

  - Focus: Interaction between multiple components.
  - Tools: Jest, @nestjs/testing.
  - Example: Testing a service method with database interaction.

- **End-to-End (E2E) Tests**:
  - Focus: Application flow from start to finish.
  - Tools: Jest, Supertest.
  - Example: Testing API endpoints.
