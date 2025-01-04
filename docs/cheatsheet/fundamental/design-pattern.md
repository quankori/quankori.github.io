---
title: Design Pattern CheatSheet
---

1. **Creational Patterns:** Deal with object creation mechanisms.
2. **Structural Patterns:** Concerned with object composition and relationships.
3. **Behavioral Patterns:** Focus on communication and responsibility between objects.

---

## **1. Creational Design Patterns**

### **a. Singleton Pattern**

- **Purpose:**  
  Ensure a class has only one instance and provide a global point of access to it.

- **Real-World Use Case:**  
  Managing a single database connection throughout the application.

- **NestJS Example:**  
  Creating a singleton service for database connection.

  ```typescript
  // database.service.ts
  import { Injectable } from "@nestjs/common";

  @Injectable()
  export class DatabaseService {
    private static instance: DatabaseService;

    private constructor() {
      // Initialize database connection
      console.log("Database connection established.");
    }

    static getInstance(): DatabaseService {
      if (!DatabaseService.instance) {
        DatabaseService.instance = new DatabaseService();
      }
      return DatabaseService.instance;
    }

    query(sql: string) {
      // Execute SQL query
      console.log(`Executing query: ${sql}`);
    }
  }

  // app.module.ts
  import { Module } from "@nestjs/common";
  import { DatabaseService } from "./database.service";

  @Module({
    providers: [
      {
        provide: DatabaseService,
        useFactory: () => DatabaseService.getInstance(),
      },
    ],
    exports: [DatabaseService],
  })
  export class DatabaseModule {}
  ```

### **b. Factory Method Pattern**

- **Purpose:**  
  Define an interface for creating an object but let subclasses alter the type of objects that will be created.

- **Real-World Use Case:**  
  Creating different types of notifications (Email, SMS) based on user preference.

- **NestJS Example:**  
  Implementing a notification factory.

  ```typescript
  // notifications/notification.interface.ts
  export interface Notification {
    send(message: string): void;
  }

  // notifications/email.notification.ts
  import { Notification } from "./notification.interface";

  export class EmailNotification implements Notification {
    send(message: string): void {
      console.log(`Sending Email: ${message}`);
    }
  }

  // notifications/sms.notification.ts
  import { Notification } from "./notification.interface";

  export class SmsNotification implements Notification {
    send(message: string): void {
      console.log(`Sending SMS: ${message}`);
    }
  }

  // notifications/notification.factory.ts
  import { Injectable } from "@nestjs/common";
  import { Notification } from "./notification.interface";
  import { EmailNotification } from "./email.notification";
  import { SmsNotification } from "./sms.notification";

  @Injectable()
  export class NotificationFactory {
    createNotification(type: string): Notification {
      switch (type) {
        case "email":
          return new EmailNotification();
        case "sms":
          return new SmsNotification();
        default:
          throw new Error("Invalid notification type");
      }
    }
  }

  // notifications/notification.service.ts
  import { Injectable } from "@nestjs/common";
  import { NotificationFactory } from "./notification.factory";

  @Injectable()
  export class NotificationService {
    constructor(private readonly factory: NotificationFactory) {}

    notify(type: string, message: string) {
      const notification = this.factory.createNotification(type);
      notification.send(message);
    }
  }

  // notifications/notifications.module.ts
  import { Module } from "@nestjs/common";
  import { NotificationFactory } from "./notification.factory";
  import { NotificationService } from "./notification.service";

  @Module({
    providers: [NotificationFactory, NotificationService],
    exports: [NotificationService],
  })
  export class NotificationsModule {}
  ```

### **c. Abstract Factory Pattern**

- **Purpose:**  
  Provide an interface for creating families of related or dependent objects without specifying their concrete classes.

- **Real-World Use Case:**  
  Creating UI components for different themes (Light, Dark).

- **NestJS Example:**  
  Implementing a UI component factory.

  ```typescript
  // ui/components/button.interface.ts
  export interface Button {
    render(): void;
  }

  // ui/components/light.button.ts
  import { Button } from "./button.interface";

  export class LightButton implements Button {
    render(): void {
      console.log("Rendering Light Button");
    }
  }

  // ui/components/dark.button.ts
  import { Button } from "./button.interface";

  export class DarkButton implements Button {
    render(): void {
      console.log("Rendering Dark Button");
    }
  }

  // ui/components/textbox.interface.ts
  export interface TextBox {
    render(): void;
  }

  // ui/components/light.textbox.ts
  import { TextBox } from "./textbox.interface";

  export class LightTextBox implements TextBox {
    render(): void {
      console.log("Rendering Light TextBox");
    }
  }

  // ui/components/dark.textbox.ts
  import { TextBox } from "./textbox.interface";

  export class DarkTextBox implements TextBox {
    render(): void {
      console.log("Rendering Dark TextBox");
    }
  }

  // ui/factories/ui.factory.interface.ts
  import { Button } from "../components/button.interface";
  import { TextBox } from "../components/textbox.interface";

  export interface UIFactory {
    createButton(): Button;
    createTextBox(): TextBox;
  }

  // ui/factories/light.factory.ts
  import { Injectable } from "@nestjs/common";
  import { UIFactory } from "./ui.factory.interface";
  import { LightButton } from "../components/light.button";
  import { LightTextBox } from "../components/light.textbox";

  @Injectable()
  export class LightFactory implements UIFactory {
    createButton(): Button {
      return new LightButton();
    }

    createTextBox(): TextBox {
      return new LightTextBox();
    }
  }

  // ui/factories/dark.factory.ts
  import { Injectable } from "@nestjs/common";
  import { UIFactory } from "./ui.factory.interface";
  import { DarkButton } from "../components/dark.button";
  import { DarkTextBox } from "../components/dark.textbox";

  @Injectable()
  export class DarkFactory implements UIFactory {
    createButton(): Button {
      return new DarkButton();
    }

    createTextBox(): TextBox {
      return new DarkTextBox();
    }
  }

  // ui/ui.service.ts
  import { Injectable } from "@nestjs/common";
  import { UIFactory } from "./factories/ui.factory.interface";

  @Injectable()
  export class UIService {
    constructor(private readonly factory: UIFactory) {}

    renderUI() {
      const button = this.factory.createButton();
      const textbox = this.factory.createTextBox();
      button.render();
      textbox.render();
    }
  }

  // ui/ui.module.ts
  import { Module } from "@nestjs/common";
  import { UIService } from "./ui.service";
  import { LightFactory } from "./factories/light.factory";
  import { DarkFactory } from "./factories/dark.factory";

  @Module({
    providers: [
      UIService,
      {
        provide: "UIFactory",
        useClass: LightFactory, // Switch to DarkFactory for dark theme
      },
      LightFactory,
      DarkFactory,
    ],
    exports: [UIService],
  })
  export class UIModule {}
  ```

### **d. Builder Pattern**

- **Purpose:**  
  Separate the construction of a complex object from its representation, allowing the same construction process to create different representations.

- **Real-World Use Case:**  
  Building complex objects like user profiles with optional fields.

- **NestJS Example:**  
  Implementing a user profile builder.

  ```typescript
  // builder/user.builder.ts
  export class User {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  }

  export interface UserBuilder {
    setName(name: string): UserBuilder;
    setEmail(email: string): UserBuilder;
    setPhone(phone: string): UserBuilder;
    setAddress(address: string): UserBuilder;
    build(): User;
  }

  export class ConcreteUserBuilder implements UserBuilder {
    private user: User = new User();

    setName(name: string): UserBuilder {
      this.user.name = name;
      return this;
    }

    setEmail(email: string): UserBuilder {
      this.user.email = email;
      return this;
    }

    setPhone(phone: string): UserBuilder {
      this.user.phone = phone;
      return this;
    }

    setAddress(address: string): UserBuilder {
      this.user.address = address;
      return this;
    }

    build(): User {
      return this.user;
    }
  }

  // builder/user.director.ts
  import { Injectable } from "@nestjs/common";
  import { UserBuilder } from "./user.builder";

  @Injectable()
  export class UserDirector {
    constructor(private readonly builder: UserBuilder) {}

    constructBasicUser(name: string, email: string): User {
      return this.builder.setName(name).setEmail(email).build();
    }

    constructFullUser(
      name: string,
      email: string,
      phone: string,
      address: string
    ): User {
      return this.builder
        .setName(name)
        .setEmail(email)
        .setPhone(phone)
        .setAddress(address)
        .build();
    }
  }

  // user.service.ts
  import { Injectable } from "@nestjs/common";
  import { ConcreteUserBuilder, UserDirector } from "./builder/user.director";

  @Injectable()
  export class UserService {
    private director: UserDirector;

    constructor() {
      const builder = new ConcreteUserBuilder();
      this.director = new UserDirector(builder);
    }

    createBasicUser(name: string, email: string) {
      return this.director.constructBasicUser(name, email);
    }

    createFullUser(
      name: string,
      email: string,
      phone: string,
      address: string
    ) {
      return this.director.constructFullUser(name, email, phone, address);
    }
  }

  // user.controller.ts
  import { Controller, Post, Body } from "@nestjs/common";
  import { UserService } from "./user.service";

  @Controller("users")
  export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("basic")
    createBasicUser(@Body() body: { name: string; email: string }) {
      const user = this.userService.createBasicUser(body.name, body.email);
      return user;
    }

    @Post("full")
    createFullUser(
      @Body()
      body: {
        name: string;
        email: string;
        phone: string;
        address: string;
      }
    ) {
      const user = this.userService.createFullUser(
        body.name,
        body.email,
        body.phone,
        body.address
      );
      return user;
    }
  }

  // user.module.ts
  import { Module } from "@nestjs/common";
  import { UserService } from "./user.service";
  import { UserController } from "./user.controller";

  @Module({
    providers: [UserService],
    controllers: [UserController],
  })
  export class UserModule {}
  ```

### **e. Prototype Pattern**

- **Purpose:**  
  Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.

- **Real-World Use Case:**  
  Cloning objects such as user settings or templates to create new instances with similar configurations.

- **NestJS Example:**  
  Implementing a prototype for user settings.

  ```typescript
  // prototype/user-settings.interface.ts
  export interface UserSettings {
    theme: string;
    notifications: boolean;
    layout: string;
    clone(): UserSettings;
  }

  // prototype/standard-settings.ts
  import { UserSettings } from "./user-settings.interface";

  export class StandardSettings implements UserSettings {
    theme = "light";
    notifications = true;
    layout = "grid";

    clone(): UserSettings {
      return new StandardSettings();
    }
  }

  // prototype/custom-settings.ts
  import { UserSettings } from "./user-settings.interface";

  export class CustomSettings implements UserSettings {
    theme: string;
    notifications: boolean;
    layout: string;

    constructor(theme: string, notifications: boolean, layout: string) {
      this.theme = theme;
      this.notifications = notifications;
      this.layout = layout;
    }

    clone(): UserSettings {
      return new CustomSettings(this.theme, this.notifications, this.layout);
    }
  }

  // prototype/settings.service.ts
  import { Injectable } from "@nestjs/common";
  import { UserSettings } from "./user-settings.interface";
  import { StandardSettings } from "./standard-settings";
  import { CustomSettings } from "./custom-settings";

  @Injectable()
  export class SettingsService {
    private standardSettings: UserSettings = new StandardSettings();

    getStandardSettings(): UserSettings {
      return this.standardSettings.clone();
    }

    createCustomSettings(
      theme: string,
      notifications: boolean,
      layout: string
    ): UserSettings {
      const custom = new CustomSettings(theme, notifications, layout);
      return custom.clone();
    }
  }

  // settings.controller.ts
  import { Controller, Get, Post, Body } from "@nestjs/common";
  import { SettingsService } from "./settings.service";

  @Controller("settings")
  export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Get("standard")
    getStandardSettings() {
      return this.settingsService.getStandardSettings();
    }

    @Post("custom")
    createCustomSettings(
      @Body() body: { theme: string; notifications: boolean; layout: string }
    ) {
      const settings = this.settingsService.createCustomSettings(
        body.theme,
        body.notifications,
        body.layout
      );
      return settings;
    }
  }

  // settings.module.ts
  import { Module } from "@nestjs/common";
  import { SettingsService } from "./settings.service";
  import { SettingsController } from "./settings.controller";

  @Module({
    providers: [SettingsService],
    controllers: [SettingsController],
  })
  export class SettingsModule {}
  ```

### **f. Object Pool Pattern**

- **Purpose:**  
  Manage the reuse of expensive-to-create objects by keeping a pool of ready-to-use objects.

- **Real-World Use Case:**  
  Managing database connections or thread pools to optimize resource usage.

- **NestJS Example:**  
  Implementing a simple object pool for database connections.

  ```typescript
  // pool/connection.ts
  export class Connection {
    constructor(public id: number) {}

    execute(query: string) {
      console.log(`Connection ${this.id}: Executing query "${query}"`);
    }
  }

  // pool/connection.pool.ts
  import { Injectable } from "@nestjs/common";
  import { Connection } from "./connection";

  @Injectable()
  export class ConnectionPool {
    private pool: Connection[] = [];
    private maxConnections = 5;
    private currentId = 1;

    constructor() {
      for (let i = 0; i < this.maxConnections; i++) {
        this.pool.push(new Connection(this.currentId++));
      }
    }

    acquire(): Connection {
      if (this.pool.length === 0) {
        throw new Error("No available connections");
      }
      return this.pool.pop();
    }

    release(connection: Connection) {
      this.pool.push(connection);
    }
  }

  // pool/database.service.ts
  import { Injectable } from "@nestjs/common";
  import { ConnectionPool } from "./connection.pool";
  import { Connection } from "./connection";

  @Injectable()
  export class DatabaseService {
    constructor(private readonly pool: ConnectionPool) {}

    executeQuery(query: string) {
      const connection: Connection = this.pool.acquire();
      try {
        connection.execute(query);
      } finally {
        this.pool.release(connection);
      }
    }
  }

  // pool/database.controller.ts
  import { Controller, Post, Body } from "@nestjs/common";
  import { DatabaseService } from "./database.service";

  @Controller("database")
  export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Post("query")
    executeQuery(@Body() body: { query: string }) {
      this.databaseService.executeQuery(body.query);
      return { message: "Query executed" };
    }
  }

  // pool/pool.module.ts
  import { Module } from "@nestjs/common";
  import { ConnectionPool } from "./connection.pool";
  import { DatabaseService } from "./database.service";
  import { DatabaseController } from "./database.controller";

  @Module({
    providers: [ConnectionPool, DatabaseService],
    controllers: [DatabaseController],
  })
  export class PoolModule {}
  ```

---

## **2. Structural Design Patterns**

### **a. Adapter Pattern**

- **Purpose:**  
  Convert the interface of a class into another interface clients expect, allowing incompatible interfaces to work together.

- **Real-World Use Case:**  
  Integrating a third-party library with a different interface into your application.

- **NestJS Example:**  
  Adapting a legacy logging service to a new logging interface.

  ```typescript
  // legacy/legacy-logger.ts
  export class LegacyLogger {
    logMessage(msg: string) {
      console.log(`LegacyLogger: ${msg}`);
    }
  }

  // adapters/logger.adapter.ts
  import { Injectable } from "@nestjs/common";
  import { LegacyLogger } from "../legacy/legacy-logger";
  import { LoggerService } from "./logger.service.interface";

  @Injectable()
  export class LoggerAdapter implements LoggerService {
    private legacyLogger = new LegacyLogger();

    log(msg: string): void {
      this.legacyLogger.logMessage(msg);
    }
  }

  // adapters/logger.service.interface.ts
  export interface LoggerService {
    log(msg: string): void;
  }

  // app.service.ts
  import { Injectable } from "@nestjs/common";
  import { LoggerService } from "./adapters/logger.service.interface";

  @Injectable()
  export class AppService {
    constructor(private readonly logger: LoggerService) {}

    doSomething() {
      this.logger.log("Doing something important...");
    }
  }

  // app.module.ts
  import { Module } from "@nestjs/common";
  import { AppService } from "./app.service";
  import { LoggerAdapter } from "./adapters/logger.adapter";

  @Module({
    providers: [
      AppService,
      {
        provide: "LoggerService",
        useClass: LoggerAdapter,
      },
    ],
  })
  export class AppModule {}
  ```

### **b. Bridge Pattern**

- **Purpose:**  
  Decouple an abstraction from its implementation so that the two can vary independently.

- **Real-World Use Case:**  
  Separating the abstraction of a remote control from the device it controls (e.g., TV, Radio).

- **NestJS Example:**  
  Implementing a remote control abstraction that can work with different devices.

  ```typescript
  // bridge/devices/device.interface.ts
  export interface Device {
    turnOn(): void;
    turnOff(): void;
  }

  // bridge/devices/tv.device.ts
  import { Device } from "./device.interface";

  export class TV implements Device {
    turnOn(): void {
      console.log("TV is turned on.");
    }

    turnOff(): void {
      console.log("TV is turned off.");
    }
  }

  // bridge/devices/radio.device.ts
  import { Device } from "./device.interface";

  export class Radio implements Device {
    turnOn(): void {
      console.log("Radio is turned on.");
    }

    turnOff(): void {
      console.log("Radio is turned off.");
    }
  }

  // bridge/remote.control.ts
  export abstract class RemoteControl {
    protected device: Device;

    constructor(device: Device) {
      this.device = device;
    }

    abstract pressPower(): void;
  }

  // bridge/basic.remote.control.ts
  import { RemoteControl } from "./remote.control";

  export class BasicRemoteControl extends RemoteControl {
    pressPower(): void {
      console.log("BasicRemoteControl: Pressing power button.");
      // Toggle device power
      // For simplicity, just turn on
      this.device.turnOn();
    }
  }

  // bridge/advanced.remote.control.ts
  import { RemoteControl } from "./remote.control";

  export class AdvancedRemoteControl extends RemoteControl {
    pressPower(): void {
      console.log("AdvancedRemoteControl: Pressing power button.");
      this.device.turnOn();
    }

    mute(): void {
      console.log("AdvancedRemoteControl: Muting device.");
      // Implement mute functionality if supported
    }
  }

  // bridge/remote.module.ts
  import { Module } from "@nestjs/common";
  import { BasicRemoteControl } from "./basic.remote.control";
  import { AdvancedRemoteControl } from "./advanced.remote.control";
  import { TV } from "./devices/tv.device";
  import { Radio } from "./devices/radio.device";

  @Module({
    providers: [BasicRemoteControl, AdvancedRemoteControl, TV, Radio],
    exports: [BasicRemoteControl, AdvancedRemoteControl],
  })
  export class RemoteModule {}
  ```

### **c. Composite Pattern**

- **Purpose:**  
  Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions uniformly.

- **Real-World Use Case:**  
  Representing a file system where files and directories are treated uniformly.

- **NestJS Example:**  
  Implementing a file system structure with files and directories.

  ```typescript
  // composite/file.component.ts
  export interface FileComponent {
    getName(): string;
    display(indent: string): void;
  }

  // composite/file.ts
  import { FileComponent } from "./file.component";

  export class File implements FileComponent {
    constructor(private name: string) {}

    getName(): string {
      return this.name;
    }

    display(indent: string): void {
      console.log(`${indent}- File: ${this.name}`);
    }
  }

  // composite/directory.ts
  import { FileComponent } from "./file.component";

  export class Directory implements FileComponent {
    private children: FileComponent[] = [];

    constructor(private name: string) {}

    add(component: FileComponent): void {
      this.children.push(component);
    }

    remove(component: FileComponent): void {
      const index = this.children.indexOf(component);
      if (index !== -1) {
        this.children.splice(index, 1);
      }
    }

    getName(): string {
      return this.name;
    }

    display(indent: string): void {
      console.log(`${indent}+ Directory: ${this.name}`);
      this.children.forEach((child) => child.display(indent + "  "));
    }
  }

  // composite/filesystem.service.ts
  import { Injectable } from "@nestjs/common";
  import { Directory } from "./directory";
  import { File } from "./file";

  @Injectable()
  export class FilesystemService {
    buildFileSystem(): Directory {
      const root = new Directory("root");
      const bin = new Directory("bin");
      const etc = new Directory("etc");
      const usr = new Directory("usr");

      bin.add(new File("bash"));
      bin.add(new File("ls"));

      etc.add(new File("config.yaml"));

      usr.add(new File("readme.md"));
      usr.add(new File("app.js"));

      root.add(bin);
      root.add(etc);
      root.add(usr);

      return root;
    }
  }

  // composite/filesystem.controller.ts
  import { Controller, Get } from "@nestjs/common";
  import { FilesystemService } from "./filesystem.service";

  @Controller("filesystem")
  export class FilesystemController {
    constructor(private readonly fsService: FilesystemService) {}

    @Get("display")
    displayFileSystem() {
      const root = this.fsService.buildFileSystem();
      root.display("");
      return { message: "File system displayed in console." };
    }
  }

  // composite/filesystem.module.ts
  import { Module } from "@nestjs/common";
  import { FilesystemService } from "./filesystem.service";
  import { FilesystemController } from "./filesystem.controller";

  @Module({
    providers: [FilesystemService],
    controllers: [FilesystemController],
  })
  export class FilesystemModule {}
  ```

### **d. Decorator Pattern**

- **Purpose:**  
  Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

- **Real-World Use Case:**  
  Adding logging or authentication to existing services without modifying their code.

- **NestJS Example:**  
  Implementing a logging decorator for services.

  ```typescript
  // decorator/logging.decorator.ts
  import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from "@nestjs/common";
  import { Observable } from "rxjs";
  import { tap } from "rxjs/operators";

  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const now = Date.now();
      console.log("Before...");
      return next
        .handle()
        .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    }
  }

  // app.service.ts
  import { Injectable, UseInterceptors } from "@nestjs/common";
  import { LoggingInterceptor } from "./decorator/logging.decorator";

  @Injectable()
  @UseInterceptors(LoggingInterceptor)
  export class AppService {
    getHello(): string {
      return "Hello World!";
    }
  }

  // app.controller.ts
  import { Controller, Get } from "@nestjs/common";
  import { AppService } from "./app.service";

  @Controller()
  export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
      return this.appService.getHello();
    }
  }

  // app.module.ts
  import { Module } from "@nestjs/common";
  import { AppController } from "./app.controller";
  import { AppService } from "./app.service";
  import { APP_INTERCEPTOR } from "@nestjs/core";
  import { LoggingInterceptor } from "./decorator/logging.decorator";

  @Module({
    imports: [],
    controllers: [AppController],
    providers: [
      AppService,
      {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      },
    ],
  })
  export class AppModule {}
  ```

### **e. Facade Pattern**

- **Purpose:**  
  Provide a simplified interface to a complex subsystem, making it easier to use.

- **Real-World Use Case:**  
  Simplifying interactions with multiple services, such as user management, authentication, and notifications.

- **NestJS Example:**  
  Implementing a facade for user operations.

  ```typescript
  // facade/user.facade.ts
  import { Injectable } from "@nestjs/common";
  import { UserService } from "../user/user.service";
  import { AuthService } from "../auth/auth.service";
  import { NotificationService } from "../notifications/notification.service";

  @Injectable()
  export class UserFacade {
    constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService,
      private readonly notificationService: NotificationService
    ) {}

    async registerUser(email: string, password: string) {
      const user = await this.userService.createUser(email, password);
      await this.authService.register(user);
      this.notificationService.notify("email", `Welcome ${email}!`);
      return user;
    }
  }

  // user.service.ts
  import { Injectable } from "@nestjs/common";

  @Injectable()
  export class UserService {
    private users = [];

    async createUser(email: string, password: string): Promise<any> {
      const user = { id: Date.now().toString(), email, password };
      this.users.push(user);
      return user;
    }
  }

  // auth.service.ts
  import { Injectable } from "@nestjs/common";

  @Injectable()
  export class AuthService {
    async register(user: any): Promise<void> {
      console.log(`AuthService: Registering user ${user.email}`);
      // Registration logic
    }
  }

  // notifications/notification.service.ts
  import { Injectable } from "@nestjs/common";

  @Injectable()
  export class NotificationService {
    notify(type: string, message: string): void {
      console.log(
        `NotificationService: Sending ${type} notification: ${message}`
      );
      // Notification logic
    }
  }

  // facade/facade.module.ts
  import { Module } from "@nestjs/common";
  import { UserFacade } from "./user.facade";
  import { UserService } from "../user/user.service";
  import { AuthService } from "../auth/auth.service";
  import { NotificationService } from "../notifications/notification.service";

  @Module({
    providers: [UserFacade, UserService, AuthService, NotificationService],
    exports: [UserFacade],
  })
  export class FacadeModule {}
  ```

### **f. Flyweight Pattern**

- **Purpose:**  
  Use sharing to support large numbers of fine-grained objects efficiently.

- **Real-World Use Case:**  
  Managing a large number of similar objects, such as characters in a text editor.

- **NestJS Example:**  
  Implementing a flyweight for character objects.

  ```typescript
  // flyweight/character.ts
  export interface Character {
    charCode: string;
    display(font: string): void;
  }

  // flyweight/concrete.character.ts
  import { Character } from "./character";

  export class ConcreteCharacter implements Character {
    constructor(public charCode: string) {}

    display(font: string): void {
      console.log(`Character: ${this.charCode}, Font: ${font}`);
    }
  }

  // flyweight/flyweight.factory.ts
  import { Injectable } from "@nestjs/common";
  import { Character } from "./character";
  import { ConcreteCharacter } from "./concrete.character";

  @Injectable()
  export class FlyweightFactory {
    private characters: Map<string, Character> = new Map();

    getCharacter(charCode: string): Character {
      if (!this.characters.has(charCode)) {
        this.characters.set(charCode, new ConcreteCharacter(charCode));
      }
      return this.characters.get(charCode);
    }
  }

  // flyweight/text.service.ts
  import { Injectable } from "@nestjs/common";
  import { FlyweightFactory } from "./flyweight.factory";

  @Injectable()
  export class TextService {
    constructor(private readonly factory: FlyweightFactory) {}

    renderText(text: string, font: string) {
      for (const char of text) {
        const character = this.factory.getCharacter(char);
        character.display(font);
      }
    }
  }

  // flyweight/text.controller.ts
  import { Controller, Post, Body } from "@nestjs/common";
  import { TextService } from "./text.service";

  @Controller("text")
  export class TextController {
    constructor(private readonly textService: TextService) {}

    @Post("render")
    renderText(@Body() body: { text: string; font: string }) {
      this.textService.renderText(body.text, body.font);
      return { message: "Text rendered in console." };
    }
  }

  // flyweight/flyweight.module.ts
  import { Module } from "@nestjs/common";
  import { FlyweightFactory } from "./flyweight.factory";
  import { TextService } from "./text.service";
  import { TextController } from "./text.controller";

  @Module({
    providers: [FlyweightFactory, TextService],
    controllers: [TextController],
  })
  export class FlyweightModule {}
  ```

### **g. Proxy Pattern**

- **Purpose:**  
  Provide a surrogate or placeholder for another object to control access to it.

- **Real-World Use Case:**  
  Implementing lazy initialization, access control, or logging for service methods.

- **NestJS Example:**  
  Implementing a proxy for a payment service to add logging.

  ```typescript
  // proxy/payment.interface.ts
  export interface PaymentService {
    processPayment(amount: number): void;
  }

  // proxy/payment.service.ts
  import { Injectable } from "@nestjs/common";
  import { PaymentService } from "./payment.interface";

  @Injectable()
  export class RealPaymentService implements PaymentService {
    processPayment(amount: number): void {
      console.log(`RealPaymentService: Processing payment of $${amount}`);
      // Payment processing logic
    }
  }

  // proxy/payment.proxy.ts
  import { Injectable } from "@nestjs/common";
  import { PaymentService } from "./payment.interface";
  import { RealPaymentService } from "./payment.service";

  @Injectable()
  export class PaymentProxy implements PaymentService {
    private realPaymentService: RealPaymentService;

    constructor() {
      // Lazy initialization
      // this.realPaymentService = new RealPaymentService();
    }

    processPayment(amount: number): void {
      if (!this.realPaymentService) {
        this.realPaymentService = new RealPaymentService();
      }
      console.log("PaymentProxy: Logging payment process.");
      this.realPaymentService.processPayment(amount);
    }
  }

  // proxy/payment.module.ts
  import { Module } from "@nestjs/common";
  import { PaymentProxy } from "./payment.proxy";
  import { RealPaymentService } from "./payment.service";
  import { PaymentController } from "./payment.controller";

  @Module({
    providers: [
      RealPaymentService,
      {
        provide: "PaymentService",
        useClass: PaymentProxy,
      },
    ],
    controllers: [PaymentController],
  })
  export class PaymentModule {}

  // proxy/payment.controller.ts
  import { Controller, Post, Body, Inject } from "@nestjs/common";
  import { PaymentService } from "./payment.interface";

  @Controller("payment")
  export class PaymentController {
    constructor(
      @Inject("PaymentService") private readonly paymentService: PaymentService
    ) {}

    @Post("process")
    processPayment(@Body() body: { amount: number }) {
      this.paymentService.processPayment(body.amount);
      return { message: "Payment processed." };
    }
  }
  ```

---

## **3. Behavioral Design Patterns**

### **a. Chain of Responsibility Pattern**

- **Purpose:**  
  Pass a request along a chain of handlers where each handler can either process the request or pass it to the next handler in the chain.

- **Real-World Use Case:**  
  Implementing middleware chains for processing HTTP requests, such as authentication, authorization, and logging.

- **NestJS Example:**  
  Implementing a middleware chain with authentication, authorization, and logging handlers.

  ```typescript
  // handlers/handler.interface.ts
  export interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: any): any;
  }
  ```

  ```typescript
  // handlers/base.handler.ts
  export abstract class BaseHandler implements Handler {
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
    }

    public handle(request: any): any {
      if (this.nextHandler) {
        return this.nextHandler.handle(request);
      }
      return null;
    }
  }
  ```

  ```typescript
  // handlers/authentication.handler.ts
  import { Injectable } from "@nestjs/common";
  import { Handler } from "./handler.interface";
  import { BaseHandler } from "./base.handler";

  @Injectable()
  export class AuthenticationHandler extends BaseHandler {
    public handle(request: any): any {
      if (!request.headers.authorization) {
        return { status: 401, message: "Unauthorized" };
      }
      console.log("AuthenticationHandler: Authenticated");
      return super.handle(request);
    }
  }
  ```

  ```typescript
  // handlers/authorization.handler.ts
  import { Injectable } from "@nestjs/common";
  import { Handler } from "./handler.interface";
  import { BaseHandler } from "./base.handler";

  @Injectable()
  export class AuthorizationHandler extends BaseHandler {
    public handle(request: any): any {
      if (!request.user.isAdmin) {
        return { status: 403, message: "Forbidden" };
      }
      console.log("AuthorizationHandler: Authorized");
      return super.handle(request);
    }
  }
  ```

  ```typescript
  // handlers/logging.handler.ts
  import { Injectable } from "@nestjs/common";
  import { Handler } from "./handler.interface";
  import { BaseHandler } from "./base.handler";

  @Injectable()
  export class LoggingHandler extends BaseHandler {
    public handle(request: any): any {
      console.log("LoggingHandler: Logging request");
      return super.handle(request);
    }
  }
  ```

  ```typescript
  // handlers/handler.chain.service.ts
  import { Injectable } from "@nestjs/common";
  import { Handler } from "./handler.interface";
  import { AuthenticationHandler } from "./authentication.handler";
  import { AuthorizationHandler } from "./authorization.handler";
  import { LoggingHandler } from "./logging.handler";

  @Injectable()
  export class HandlerChainService {
    private chain: Handler;

    constructor(
      private authHandler: AuthenticationHandler,
      private authorizationHandler: AuthorizationHandler,
      private loggingHandler: LoggingHandler
    ) {
      this.chain = this.authHandler;
      this.authHandler
        .setNext(this.authorizationHandler)
        .setNext(this.loggingHandler);
    }

    public handle(request: any): any {
      return this.chain.handle(request);
    }
  }
  ```

  ```typescript
  // middleware/handler.middleware.ts
  import { Injectable, NestMiddleware } from "@nestjs/common";
  import { Request, Response, NextFunction } from "express";
  import { HandlerChainService } from "../handlers/handler.chain.service";

  @Injectable()
  export class HandlerMiddleware implements NestMiddleware {
    constructor(private handlerChain: HandlerChainService) {}

    use(req: Request, res: Response, next: NextFunction) {
      const result = this.handlerChain.handle(req);
      if (result) {
        res.status(result.status).json({ message: result.message });
      } else {
        next();
      }
    }
  }
  ```

  ```typescript
  // user.controller.ts
  import { Controller, Get } from "@nestjs/common";

  @Controller("users")
  export class UserController {
    @Get("profile")
    getProfile() {
      return { message: "User profile data" };
    }
  }
  ```

  ```typescript
  // user.module.ts
  import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
  import { AuthenticationHandler } from "./handlers/authentication.handler";
  import { AuthorizationHandler } from "./handlers/authorization.handler";
  import { LoggingHandler } from "./handlers/logging.handler";
  import { HandlerChainService } from "./handlers/handler.chain.service";
  import { HandlerMiddleware } from "./middleware/handler.middleware";
  import { UserController } from "./user.controller";
  import { UserService } from "./user.service";

  @Module({
    providers: [
      AuthenticationHandler,
      AuthorizationHandler,
      LoggingHandler,
      HandlerChainService,
      UserService,
    ],
    controllers: [UserController],
  })
  export class UserModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(HandlerMiddleware)
        .forRoutes({ path: "users/*", method: RequestMethod.ALL });
    }
  }
  ```

### **b. Command Pattern**

- **Purpose:**  
  Encapsulate a request as an object, allowing parameterization and queuing of requests. It decouples the object that invokes the operation from the one that knows how to perform it.

- **Real-World Use Case:**  
  Managing operations like creating users or processing orders with the ability to log or undo actions, often implemented using CQRS (Command Query Responsibility Segregation).

- **NestJS Example:**  
  Implementing user creation with CQRS, handling commands and events.

  ```typescript
  // commands/create-user.command.ts
  export class CreateUserCommand {
    constructor(
      public readonly email: string,
      public readonly password: string
    ) {}
  }
  ```

  ```typescript
  // handlers/create-user.handler.ts
  import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
  import { CreateUserCommand } from "../commands/create-user.command";
  import { UserCreatedEvent } from "../events/user-created.event";

  @CommandHandler(CreateUserCommand)
  export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    private users = [];

    constructor(private eventBus: EventBus) {}

    async execute(command: CreateUserCommand): Promise<any> {
      const user = {
        id: Date.now().toString(),
        email: command.email,
        password: command.password,
      };
      this.users.push(user);
      this.eventBus.publish(new UserCreatedEvent(user.id, user.email));
      return user;
    }
  }
  ```

  ```typescript
  // events/user-created.event.ts
  export class UserCreatedEvent {
    constructor(
      public readonly userId: string,
      public readonly email: string
    ) {}
  }
  ```

  ```typescript
  // listeners/welcome-email.handler.ts
  import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
  import { UserCreatedEvent } from "../events/user-created.event";

  @EventsHandler(UserCreatedEvent)
  export class WelcomeEmailHandler implements IEventHandler<UserCreatedEvent> {
    handle(event: UserCreatedEvent) {
      console.log(
        `WelcomeEmailHandler: Sending welcome email to ${event.email}`
      );
      // Logic to send welcome email
    }
  }
  ```

  ```typescript
  // listeners/registration-logger.handler.ts
  import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
  import { UserCreatedEvent } from "../events/user-created.event";

  @EventsHandler(UserCreatedEvent)
  export class RegistrationLoggerHandler
    implements IEventHandler<UserCreatedEvent>
  {
    handle(event: UserCreatedEvent) {
      console.log(
        `RegistrationLoggerHandler: User registered with ID ${event.userId} and Email ${event.email}`
      );
      // Logic to log registration
    }
  }
  ```

  ```typescript
  // user.service.ts
  import { Injectable } from "@nestjs/common";
  import { CommandBus } from "@nestjs/cqrs";
  import { CreateUserCommand } from "./commands/create-user.command";

  @Injectable()
  export class UserService {
    constructor(private commandBus: CommandBus) {}

    async createUser(email: string, password: string): Promise<any> {
      return this.commandBus.execute(new CreateUserCommand(email, password));
    }
  }
  ```

  ```typescript
  // user.controller.ts
  import { Controller, Post, Body } from "@nestjs/common";
  import { UserService } from "./user.service";

  @Controller("users")
  export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("create")
    async createUser(@Body() body: { email: string; password: string }) {
      const user = await this.userService.createUser(body.email, body.password);
      return { message: "User created successfully", userId: user.id };
    }
  }
  ```

  ```typescript
  // user.module.ts
  import { Module } from "@nestjs/common";
  import { CqrsModule } from "@nestjs/cqrs";
  import { CreateUserHandler } from "./handlers/create-user.handler";
  import { WelcomeEmailHandler } from "./listeners/welcome-email.handler";
  import { RegistrationLoggerHandler } from "./listeners/registration-logger.handler";
  import { UserController } from "./user.controller";
  import { UserService } from "./user.service";

  @Module({
    imports: [CqrsModule],
    providers: [
      UserService,
      CreateUserHandler,
      WelcomeEmailHandler,
      RegistrationLoggerHandler,
    ],
    controllers: [UserController],
  })
  export class UserModule {}
  ```

### **c. Interpreter Pattern**

- **Purpose:**  
  Define a grammatical representation for a language and provide an interpreter to deal with it. Useful for parsing and interpreting expressions or commands in a specific language.

- **Real-World Use Case:**  
  Parsing and evaluating mathematical expressions or custom query languages from user input.

- **NestJS Example:**  
  Implementing a mathematical expression evaluator that interprets expressions like "5 3 + 2 -".

  ```typescript
  // interpreter/expression.interface.ts
  export interface Expression {
    interpret(): number;
  }
  ```

  ```typescript
  // interpreter/number.expression.ts
  import { Expression } from "./expression.interface";

  export class NumberExpression implements Expression {
    constructor(private number: number) {}

    interpret(): number {
      return this.number;
    }
  }
  ```

  ```typescript
  // interpreter/add.expression.ts
  import { Expression } from "./expression.interface";

  export class AddExpression implements Expression {
    constructor(private left: Expression, private right: Expression) {}

    interpret(): number {
      return this.left.interpret() + this.right.interpret();
    }
  }
  ```

  ```typescript
  // interpreter/subtract.expression.ts
  import { Expression } from "./expression.interface";

  export class SubtractExpression implements Expression {
    constructor(private left: Expression, private right: Expression) {}

    interpret(): number {
      return this.left.interpret() - this.right.interpret();
    }
  }
  ```

  ```typescript
  // interpreter/parser.ts
  import { Expression } from "./expression.interface";
  import { NumberExpression } from "./number.expression";
  import { AddExpression } from "./add.expression";
  import { SubtractExpression } from "./subtract.expression";

  export class Parser {
    parse(expression: string): Expression {
      const tokens = expression.split(" ");
      const stack: Expression[] = [];

      for (const token of tokens) {
        if (!isNaN(Number(token))) {
          stack.push(new NumberExpression(Number(token)));
        } else {
          const right = stack.pop();
          const left = stack.pop();
          if (token === "+") {
            stack.push(new AddExpression(left, right));
          } else if (token === "-") {
            stack.push(new SubtractExpression(left, right));
          }
        }
      }

      return stack.pop();
    }
  }
  ```

  ```typescript
  // math.controller.ts
  import { Controller, Post, Body } from "@nestjs/common";
  import { Parser } from "./interpreter/parser";

  @Controller("math")
  export class MathController {
    private parser: Parser = new Parser();

    @Post("evaluate")
    evaluate(@Body() body: { expression: string }) {
      const expression = this.parser.parse(body.expression);
      const result = expression.interpret();
      return { expression: body.expression, result };
    }
  }
  ```

  ```typescript
  // math.module.ts
  import { Module } from "@nestjs/common";
  import { MathController } from "./math.controller";

  @Module({
    controllers: [MathController],
  })
  export class MathModule {}
  ```

### **d. Iterator Pattern**

- **Purpose:**  
  Provide a way to access elements of a collection sequentially without exposing its underlying representation.

- **Real-World Use Case:**  
  Iterating through user lists or product catalogs without exposing internal data structures.

- **NestJS Example:**  
  Implementing an iterator to traverse a list of users.

  ```typescript
  // iterator/iterator.interface.ts
  export interface Iterator<T> {
    next(): T;
    hasNext(): boolean;
  }
  ```

  ```typescript
  // iterator/aggregate.interface.ts
  import { Iterator } from "./iterator.interface";

  export interface Aggregate<T> {
    createIterator(): Iterator<T>;
  }
  ```

  ```typescript
  // iterator/user.iterator.ts
  import { Iterator } from "./iterator.interface";

  export class UserIterator implements Iterator<any> {
    private current = 0;

    constructor(private users: any[]) {}

    next(): any {
      const user = this.users[this.current];
      this.current++;
      return user;
    }

    hasNext(): boolean {
      return this.current < this.users.length;
    }
  }
  ```

  ```typescript
  // iterator/user.aggregate.ts
  import { Aggregate } from "./aggregate.interface";
  import { Iterator } from "./iterator.interface";
  import { UserIterator } from "./user.iterator";

  export class UserAggregate implements Aggregate<any> {
    constructor(private users: any[]) {}

    createIterator(): Iterator<any> {
      return new UserIterator(this.users);
    }
  }
  ```

  ```typescript
  // user.service.ts
  import { Injectable } from "@nestjs/common";

  @Injectable()
  export class UserService {
    private users = [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" },
      { id: "3", name: "Alice Johnson" },
    ];

    getUsers(): any[] {
      return this.users;
    }
  }
  ```

  ```typescript
  // user.controller.ts
  import { Controller, Get } from "@nestjs/common";
  import { UserService } from "./user.service";
  import { UserAggregate } from "./iterator/user.aggregate";

  @Controller("users")
  export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("list")
    listUsers() {
      const users = this.userService.getUsers();
      const aggregate = new UserAggregate(users);
      const iterator = aggregate.createIterator();

      const userList = [];
      while (iterator.hasNext()) {
        const user = iterator.next();
        userList.push(user);
      }

      return userList;
    }
  }
  ```

  ```typescript
  // user.module.ts
  import { Module } from "@nestjs/common";
  import { UserService } from "./user.service";
  import { UserController } from "./user.controller";

  @Module({
    providers: [UserService],
    controllers: [UserController],
  })
  export class UserModule {}
  ```

### **e. Mediator Pattern**

- **Purpose:**  
  Define an object that encapsulates how a set of objects interact, promoting loose coupling by keeping objects from referring to each other explicitly.

- **Real-World Use Case:**  
  Coordinating interactions between services like `OrderService` and `InventoryService`.

- **NestJS Example:**  
  Implementing a mediator to handle interactions between order and inventory services.

  ```typescript
  // mediator/mediator.interface.ts
  export interface Mediator {
    notify(sender: any, event: string, data?: any): void;
  }
  ```

  ```typescript
  // mediator/mediator.service.ts
  import { Injectable } from "@nestjs/common";
  import { Mediator } from "./mediator.interface";
  import { OrderService } from "../order/order.service";
  import { InventoryService } from "../inventory/inventory.service";

  @Injectable()
  export class MediatorService implements Mediator {
    constructor(
      private readonly orderService: OrderService,
      private readonly inventoryService: InventoryService
    ) {}

    notify(sender: any, event: string, data?: any): void {
      if (event === "order.created") {
        this.inventoryService.updateInventory(data.productId, data.quantity);
      } else if (event === "inventory.updated") {
        this.orderService.notifyOrderStatus(data.orderId, "Inventory Updated");
      }
    }
  }
  ```

  ```typescript
  // order/order.service.ts
  import { Injectable, Inject } from "@nestjs/common";
  import { Mediator } from "../mediator/mediator.interface";

  @Injectable()
  export class OrderService {
    constructor(@Inject("Mediator") private readonly mediator: Mediator) {}

    createOrder(productId: string, quantity: number) {
      const orderId = Date.now().toString();
      console.log(
        `OrderService: Order ${orderId} created for product ${productId} (Quantity: ${quantity})`
      );
      // Create order logic...
      this.mediator.notify(this, "order.created", {
        orderId,
        productId,
        quantity,
      });
    }

    notifyOrderStatus(orderId: string, status: string) {
      console.log(`OrderService: Order ${orderId} status updated to ${status}`);
      // Update order status logic...
    }
  }
  ```

  ```typescript
  // inventory/inventory.service.ts
  import { Injectable, Inject } from "@nestjs/common";
  import { Mediator } from "../mediator/mediator.interface";

  @Injectable()
  export class InventoryService {
    constructor(@Inject("Mediator") private readonly mediator: Mediator) {}

    updateInventory(productId: string, quantity: number) {
      console.log(
        `InventoryService: Updating inventory for product ${productId} by ${quantity}`
      );
      // Update inventory logic...
      this.mediator.notify(this, "inventory.updated", {
        orderId: "12345",
        status: "Inventory Updated",
      });
    }
  }
  ```

  ```typescript
  // order/order.controller.ts
  import { Controller, Post, Body } from "@nestjs/common";
  import { OrderService } from "./order.service";

  @Controller("orders")
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post("create")
    createOrder(@Body() body: { productId: string; quantity: number }) {
      this.orderService.createOrder(body.productId, body.quantity);
      return { message: "Order created successfully" };
    }
  }
  ```

  ```typescript
  // order/order.module.ts
  import { Module } from "@nestjs/common";
  import { OrderService } from "./order.service";
  import { MediatorService } from "../mediator/mediator.service";
  import { InventoryService } from "../inventory/inventory.service";
  import { OrderController } from "./order.controller";

  @Module({
    providers: [
      OrderService,
      MediatorService,
      InventoryService,
      {
        provide: "Mediator",
        useExisting: MediatorService,
      },
    ],
    controllers: [OrderController],
    exports: [OrderService],
  })
  export class OrderModule {}
  ```

  ```typescript
  // inventory/inventory.module.ts
  import { Module } from "@nestjs/common";
  import { InventoryService } from "./inventory.service";

  @Module({
    providers: [InventoryService],
    exports: [InventoryService],
  })
  export class InventoryModule {}
  ```

  ```typescript
  // app.module.ts
  import { Module } from "@nestjs/common";
  import { OrderModule } from "./order/order.module";
  import { InventoryModule } from "./inventory/inventory.module";
  import { OrderController } from "./order/order.controller";

  @Module({
    imports: [OrderModule, InventoryModule],
    controllers: [OrderController],
  })
  export class AppModule {}
  ```

### **f. Memento Pattern**

- **Purpose:**  
  Capture and externalize an object's internal state without violating encapsulation, allowing the object to be restored to this state later.

- **Real-World Use Case:**  
  Implementing undo functionality for user data changes or transactional operations.

- **NestJS Example:**  
  Implementing undo functionality for user profile updates.

  ```typescript
  // memento/memento.ts
  export class Memento {
    constructor(public readonly state: any) {}
  }
  ```

  ```typescript
  // memento/user.originator.ts
  import { Memento } from "./memento";

  export class UserOriginator {
    private state: any;

    setState(state: any) {
      this.state = state;
      console.log(`UserOriginator: State set to ${JSON.stringify(this.state)}`);
    }

    getState(): any {
      return this.state;
    }

    saveState(): Memento {
      console.log(`UserOriginator: Saving state`);
      return new Memento(this.state);
    }

    restoreState(memento: Memento) {
      this.state = memento.state;
      console.log(
        `UserOriginator: State restored to ${JSON.stringify(this.state)}`
      );
    }
  }
  ```

  ```typescript
  // memento/caretaker.ts
  import { Memento } from "./memento";

  export class Caretaker {
    private mementos: Memento[] = [];

    addMemento(memento: Memento) {
      this.mementos.push(memento);
      console.log(`Caretaker: Memento added`);
    }

    getMemento(index: number): Memento {
      return this.mementos[index];
    }
  }
  ```

  ```typescript
  // user/user.service.ts
  import { Injectable } from "@nestjs/common";
  import { UserOriginator } from "../memento/user.originator";
  import { Caretaker } from "../memento/caretaker";

  @Injectable()
  export class UserService {
    private originator: UserOriginator;
    private caretaker: Caretaker;

    constructor() {
      this.originator = new UserOriginator();
      this.caretaker = new Caretaker();
    }

    updateUserProfile(profile: any) {
      this.caretaker.addMemento(this.originator.saveState());
      this.originator.setState(profile);
    }

    undo() {
      const memento = this.caretaker.getMemento(
        this.caretaker["mementos"].length - 1
      );
      this.originator.restoreState(memento);
    }

    getUserProfile() {
      return this.originator.getState();
    }
  }
  ```

  ```typescript
  // user.controller.ts
  import { Controller, Post, Get, Body } from "@nestjs/common";
  import { UserService } from "./user.service";

  @Controller("users")
  export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("update")
    updateProfile(@Body() body: any) {
      this.userService.updateUserProfile(body);
      return { message: "User profile updated" };
    }

    @Post("undo")
    undoUpdate() {
      this.userService.undo();
      return { message: "Undo successful" };
    }

    @Get("profile")
    getProfile() {
      const profile = this.userService.getUserProfile();
      return { profile };
    }
  }
  ```

  ```typescript
  // user.module.ts
  import { Module } from "@nestjs/common";
  import { UserService } from "./user.service";
  import { UserController } from "./user.controller";

  @Module({
    providers: [UserService],
    controllers: [UserController],
  })
  export class UserModule {}
  ```

### **g. Observer Pattern**

- **Purpose:**  
  Establish a one-to-many dependency so that when one object changes state, all its dependents are notified and updated automatically.

- **Real-World Use Case:**  
  Using event-driven architecture to trigger actions like sending notifications or logging when certain events occur (e.g., user creation).

- **NestJS Example:**  
  Implementing event listeners for user registration events.

  ```typescript
  // events/user-created.event.ts
  export class UserCreatedEvent {
    constructor(
      public readonly userId: string,
      public readonly email: string
    ) {}
  }
  ```

  ```typescript
  // listeners/welcome-email.listener.ts
  import { Injectable } from "@nestjs/common";
  import { OnEvent } from "@nestjs/event-emitter";
  import { UserCreatedEvent } from "../events/user-created.event";

  @Injectable()
  export class WelcomeEmailListener {
    @OnEvent("user.created")
    handleUserCreatedEvent(event: UserCreatedEvent) {
      console.log(
        `WelcomeEmailListener: Sending welcome email to ${event.email}`
      );
      // Logic to send welcome email
    }
  }
  ```

  ```typescript
  // listeners/registration-logger.listener.ts
  import { Injectable } from "@nestjs/common";
  import { OnEvent } from "@nestjs/event-emitter";
  import { UserCreatedEvent } from "../events/user-created.event";

  @Injectable()
  export class RegistrationLoggerListener {
    @OnEvent("user.created")
    handleUserCreatedEvent(event: UserCreatedEvent) {
      console.log(
        `RegistrationLoggerListener: User registered with ID ${event.userId} and Email ${event.email}`
      );
      // Logic to log registration
    }
  }
  ```

  ```typescript
  // user.service.ts
  import { Injectable } from "@nestjs/common";
  import { EventEmitter2 } from "@nestjs/event-emitter";
  import { UserCreatedEvent } from "./events/user-created.event";

  @Injectable()
  export class UserService {
    private users = [];

    constructor(private eventEmitter: EventEmitter2) {}

    async registerUser(email: string, password: string): Promise<any> {
      const user = { id: Date.now().toString(), email, password };
      this.users.push(user);
      this.eventEmitter.emit(
        "user.created",
        new UserCreatedEvent(user.id, user.email)
      );
      return { message: "User registered successfully", userId: user.id };
    }
  }
  ```

  ```typescript
  // user.controller.ts
  import { Controller, Post, Body } from "@nestjs/common";
  import { UserService } from "./user.service";

  @Controller("users")
  export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("register")
    async register(@Body() body: { email: string; password: string }) {
      const result = await this.userService.registerUser(
        body.email,
        body.password
      );
      return result;
    }
  }
  ```

  ```typescript
  // user.module.ts
  import { Module } from "@nestjs/common";
  import { EventEmitterModule } from "@nestjs/event-emitter";
  import { UserService } from "./user.service";
  import { UserController } from "./user.controller";
  import { WelcomeEmailListener } from "./listeners/welcome-email.listener";
  import { RegistrationLoggerListener } from "./listeners/registration-logger.listener";

  @Module({
    imports: [EventEmitterModule.forRoot()],
    providers: [UserService, WelcomeEmailListener, RegistrationLoggerListener],
    controllers: [UserController],
  })
  export class UserModule {}
  ```

### **h. State Pattern**

- **Purpose:**  
  Allow an object to alter its behavior when its internal state changes, making the object appear to change its class.

- **Real-World Use Case:**  
  Managing different states of an order (e.g., new, processed, completed) with corresponding behaviors.

- **NestJS Example:**  
  Implementing state management for order processing.

  ```typescript
  // state/order-state.interface.ts
  export interface OrderState {
    handle(): string;
  }
  ```

  ```typescript
  // state/new-order.state.ts
  import { OrderState } from "./order-state.interface";

  export class NewOrderState implements OrderState {
    handle(): string {
      return "New Order: Awaiting processing";
    }
  }
  ```

  ```typescript
  // state/processed-order.state.ts
  import { OrderState } from "./order-state.interface";

  export class ProcessedOrderState implements OrderState {
    handle(): string {
      return "Processed Order: Preparing for shipment";
    }
  }
  ```

  ```typescript
  // state/completed-order.state.ts
  import { OrderState } from "./order-state.interface";

  export class CompletedOrderState implements OrderState {
    handle(): string {
      return "Completed Order: Shipped to customer";
    }
  }
  ```

  ```typescript
  // state/order.context.ts
  import { OrderState } from "./order-state.interface";

  export class OrderContext {
    private state: OrderState;

    constructor(initialState: OrderState) {
      this.state = initialState;
    }

    setState(state: OrderState) {
      this.state = state;
    }

    getStatus(): string {
      return this.state.handle();
    }
  }
  ```

  ```typescript
  // order.service.ts
  import { Injectable } from "@nestjs/common";
  import { OrderContext } from "../state/order.context";
  import { NewOrderState } from "../state/new-order.state";
  import { ProcessedOrderState } from "../state/processed-order.state";
  import { CompletedOrderState } from "../state/completed-order.state";

  @Injectable()
  export class OrderService {
    private orders: any[] = [];

    createOrder(orderData: any) {
      const order = {
        id: Date.now().toString(),
        data: orderData,
        context: new OrderContext(new NewOrderState()),
      };
      this.orders.push(order);
      console.log(`OrderService: Created order ${order.id}`);
      return order;
    }

    processOrder(orderId: string) {
      const order = this.orders.find((o) => o.id === orderId);
      if (order) {
        order.context.setState(new ProcessedOrderState());
        console.log(`OrderService: Processed order ${order.id}`);
        return order;
      }
      throw new Error("Order not found");
    }

    completeOrder(orderId: string) {
      const order = this.orders.find((o) => o.id === orderId);
      if (order) {
        order.context.setState(new CompletedOrderState());
        console.log(`OrderService: Completed order ${order.id}`);
        return order;
      }
      throw new Error("Order not found");
    }

    getOrderStatus(orderId: string) {
      const order = this.orders.find((o) => o.id === orderId);
      if (order) {
        return order.context.getStatus();
      }
      throw new Error("Order not found");
    }
  }
  ```

  ```typescript
  // order.controller.ts
  import { Controller, Post, Get, Param, Body } from "@nestjs/common";
  import { OrderService } from "./order.service";

  @Controller("orders")
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post("create")
    createOrder(@Body() body: any) {
      const order = this.orderService.createOrder(body);
      return { message: "Order created", orderId: order.id };
    }

    @Post(":id/process")
    processOrder(@Param("id") id: string) {
      const order = this.orderService.processOrder(id);
      return { message: "Order processed", status: order.context.getStatus() };
    }

    @Post(":id/complete")
    completeOrder(@Param("id") id: string) {
      const order = this.orderService.completeOrder(id);
      return { message: "Order completed", status: order.context.getStatus() };
    }

    @Get(":id/status")
    getStatus(@Param("id") id: string) {
      const status = this.orderService.getOrderStatus(id);
      return { orderId: id, status };
    }
  }
  ```

  ```typescript
  // order.module.ts
  import { Module } from "@nestjs/common";
  import { OrderService } from "./order.service";
  import { OrderController } from "./order.controller";

  @Module({
    providers: [OrderService],
    controllers: [OrderController],
  })
  export class OrderModule {}
  ```

### **i. Strategy Pattern**

- **Purpose:**  
  Define a family of interchangeable algorithms, encapsulate each one, and make them interchangeable. It allows algorithms to vary independently from clients that use them.

- **Real-World Use Case:**  
  Managing different authentication strategies (e.g., JWT, OAuth) in an application.

- **NestJS Example:**  
  Implementing interchangeable authentication strategies using JWT and OAuth.

  ```typescript
  // strategies/auth.strategy.interface.ts
  export interface AuthStrategy {
    validate(token: string): Promise<any>;
  }
  ```

  ```typescript
  // strategies/jwt.strategy.ts
  import { Injectable } from "@nestjs/common";
  import { AuthStrategy } from "./auth.strategy.interface";

  @Injectable()
  export class JwtStrategy implements AuthStrategy {
    async validate(token: string): Promise<any> {
      console.log("JwtStrategy: Validating JWT token");
      // Implement JWT validation logic
      return { userId: "123", username: "john_doe" };
    }
  }
  ```

  ```typescript
  // strategies/oauth.strategy.ts
  import { Injectable } from "@nestjs/common";
  import { AuthStrategy } from "./auth.strategy.interface";

  @Injectable()
  export class OauthStrategy implements AuthStrategy {
    async validate(token: string): Promise<any> {
      console.log("OauthStrategy: Validating OAuth token");
      // Implement OAuth validation logic
      return { userId: "456", username: "jane_doe" };
    }
  }
  ```

  ```typescript
  // strategies/auth.context.ts
  import { Injectable, Inject } from "@nestjs/common";
  import { AuthStrategy } from "./auth.strategy.interface";

  @Injectable()
  export class AuthContext {
    constructor(
      @Inject("AuthStrategy") private readonly strategy: AuthStrategy
    ) {}

    async authenticate(token: string): Promise<any> {
      return this.strategy.validate(token);
    }

    setStrategy(strategy: AuthStrategy) {
      this.strategy = strategy;
    }
  }
  ```

  ```typescript
  // auth.service.ts
  import { Injectable } from "@nestjs/common";
  import { AuthContext } from "./strategies/auth.context";
  import { JwtStrategy } from "./strategies/jwt.strategy";
  import { OauthStrategy } from "./strategies/oauth.strategy";

  @Injectable()
  export class AuthService {
    constructor(
      private readonly authContext: AuthContext,
      private readonly jwtStrategy: JwtStrategy,
      private readonly oauthStrategy: OauthStrategy
    ) {}

    async authenticateWithJwt(token: string): Promise<any> {
      this.authContext.setStrategy(this.jwtStrategy);
      return this.authContext.authenticate(token);
    }

    async authenticateWithOauth(token: string): Promise<any> {
      this.authContext.setStrategy(this.oauthStrategy);
      return this.authContext.authenticate(token);
    }
  }
  ```

  ```typescript
  // auth.controller.ts
  import { Controller, Post, Body } from "@nestjs/common";
  import { AuthService } from "./auth.service";

  @Controller("auth")
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login-jwt")
    async loginWithJwt(@Body() body: { token: string }) {
      const user = await this.authService.authenticateWithJwt(body.token);
      return { message: "Authenticated with JWT", user };
    }

    @Post("login-oauth")
    async loginWithOauth(@Body() body: { token: string }) {
      const user = await this.authService.authenticateWithOauth(body.token);
      return { message: "Authenticated with OAuth", user };
    }
  }
  ```

  ```typescript
  // auth.module.ts
  import { Module } from "@nestjs/common";
  import { AuthService } from "./auth.service";
  import { AuthContext } from "./strategies/auth.context";
  import { JwtStrategy } from "./strategies/jwt.strategy";
  import { OauthStrategy } from "./strategies/oauth.strategy";
  import { AuthController } from "./auth.controller";

  @Module({
    providers: [
      AuthService,
      AuthContext,
      JwtStrategy,
      OauthStrategy,
      {
        provide: "AuthStrategy",
        useClass: JwtStrategy, // Default strategy
      },
    ],
    controllers: [AuthController],
  })
  export class AuthModule {}
  ```

### **j. Template Method Pattern**

- **Purpose:**  
  Define the skeleton of an algorithm in a method, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing its structure.

- **Real-World Use Case:**  
  Structuring order processing workflows with customizable steps, such as validation, payment processing, inventory update, and sending confirmation.

- **NestJS Example:**  
  Implementing a template method for processing orders in an e-commerce application.

  ```typescript
  // template/order-processing.template.ts
  export abstract class OrderProcessingTemplate {
    processOrder(order: any): any {
      this.validateOrder(order);
      this.processPayment(order);
      this.updateInventory(order);
      this.sendConfirmation(order);
      return { message: "Order processed successfully" };
    }

    protected abstract validateOrder(order: any): void;
    protected abstract processPayment(order: any): void;
    protected abstract updateInventory(order: any): void;
    protected abstract sendConfirmation(order: any): void;
  }
  ```

  ```typescript
  // template/ecommerce-order-processing.ts
  import { Injectable } from "@nestjs/common";
  import { OrderProcessingTemplate } from "./order-processing.template";

  @Injectable()
  export class EcommerceOrderProcessing extends OrderProcessingTemplate {
    protected validateOrder(order: any): void {
      console.log("Ecommerce: Validating order");
      // Validation logic
    }

    protected processPayment(order: any): void {
      console.log("Ecommerce: Processing payment");
      // Payment processing logic
    }

    protected updateInventory(order: any): void {
      console.log("Ecommerce: Updating inventory");
      // Inventory update logic
    }

    protected sendConfirmation(order: any): void {
      console.log("Ecommerce: Sending confirmation email");
      // Send confirmation logic
    }
  }
  ```

  ```typescript
  // order.service.ts
  import { Injectable } from "@nestjs/common";
  import { EcommerceOrderProcessing } from "../template/ecommerce-order-processing";

  @Injectable()
  export class OrderService {
    constructor(private readonly orderProcessor: EcommerceOrderProcessing) {}

    handleOrder(order: any) {
      return this.orderProcessor.processOrder(order);
    }
  }
  ```

  ```typescript
  // order.controller.ts
  import { Controller, Post, Body } from "@nestjs/common";
  import { OrderService } from "./order.service";

  @Controller("orders")
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post("process")
    processOrder(@Body() body: any) {
      const result = this.orderService.handleOrder(body);
      return result;
    }
  }
  ```

  ```typescript
  // order.module.ts
  import { Module } from "@nestjs/common";
  import { OrderService } from "./order.service";
  import { OrderController } from "./order.controller";
  import { EcommerceOrderProcessing } from "../template/ecommerce-order-processing";

  @Module({
    providers: [OrderService, EcommerceOrderProcessing],
    controllers: [OrderController],
  })
  export class OrderModule {}
  ```

### **k. Visitor Pattern**

- **Purpose:**  
  Represent an operation to be performed on elements of an object structure, allowing new operations without modifying the elements.

- **Real-World Use Case:**  
  Performing operations on complex object structures like geometric shapes or hierarchical data without altering the classes of the elements.

- **NestJS Example:**  
  Implementing an area calculator for different geometric shapes.

  ```typescript
  // visitor/visitor.interface.ts
  export interface Visitor {
    visitCircle(circle: Circle): void;
    visitRectangle(rectangle: Rectangle): void;
  }
  ```

  ```typescript
  // visitor/element.interface.ts
  import { Visitor } from "./visitor.interface";

  export interface Element {
    accept(visitor: Visitor): void;
  }
  ```

  ```typescript
  // visitor/circle.ts
  import { Element } from "./element.interface";
  import { Visitor } from "./visitor.interface";

  export class Circle implements Element {
    constructor(public radius: number) {}

    accept(visitor: Visitor): void {
      visitor.visitCircle(this);
    }
  }
  ```

  ```typescript
  // visitor/rectangle.ts
  import { Element } from "./element.interface";
  import { Visitor } from "./visitor.interface";

  export class Rectangle implements Element {
    constructor(public width: number, public height: number) {}

    accept(visitor: Visitor): void {
      visitor.visitRectangle(this);
    }
  }
  ```

  ```typescript
  // visitor/area-calculator.visitor.ts
  import { Injectable } from "@nestjs/common";
  import { Visitor } from "./visitor.interface";
  import { Circle } from "./circle";
  import { Rectangle } from "./rectangle";

  @Injectable()
  export class AreaCalculatorVisitor implements Visitor {
    private area: number = 0;

    visitCircle(circle: Circle): void {
      this.area += Math.PI * circle.radius * circle.radius;
      console.log(
        `AreaCalculatorVisitor: Calculated area of Circle with radius ${circle.radius}`
      );
    }

    visitRectangle(rectangle: Rectangle): void {
      this.area += rectangle.width * rectangle.height;
      console.log(
        `AreaCalculatorVisitor: Calculated area of Rectangle with width ${rectangle.width} and height ${rectangle.height}`
      );
    }

    getTotalArea(): number {
      return this.area;
    }
  }
  ```

  ```typescript
  // shape.service.ts
  import { Injectable } from "@nestjs/common";
  import { Element } from "../visitor/element.interface";
  import { Circle } from "../visitor/circle";
  import { Rectangle } from "../visitor/rectangle";
  import { AreaCalculatorVisitor } from "../visitor/area-calculator.visitor";

  @Injectable()
  export class ShapeService {
    calculateArea(): number {
      const shapes: Element[] = [
        new Circle(5),
        new Rectangle(10, 20),
        new Circle(3),
      ];

      const visitor = new AreaCalculatorVisitor();
      shapes.forEach((shape) => shape.accept(visitor));

      return visitor.getTotalArea();
    }
  }
  ```

  ```typescript
  // shape.controller.ts
  import { Controller, Get } from "@nestjs/common";
  import { ShapeService } from "./shape.service";

  @Controller("shapes")
  export class ShapeController {
    constructor(private readonly shapeService: ShapeService) {}

    @Get("area")
    calculateArea() {
      const totalArea = this.shapeService.calculateArea();
      return { totalArea };
    }
  }
  ```

  ```typescript
  // shape.module.ts
  import { Module } from "@nestjs/common";
  import { ShapeService } from "./shape.service";
  import { ShapeController } from "./shape.controller";
  import { AreaCalculatorVisitor } from "../visitor/area-calculator.visitor";

  @Module({
    providers: [ShapeService, AreaCalculatorVisitor],
    controllers: [ShapeController],
  })
  export class ShapeModule {}
  ```

---

## **4. Summary of All Design Patterns**

| **Category**   | **Pattern**                 | **Purpose**                                                                                       | **Real-World Use Case**                                     | **NestJS Example**                                                                                                                                   |
| -------------- | --------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Creational** | **Singleton**               | Ensure a class has only one instance and provide a global access point.                           | Managing a single database connection.                      | `DatabaseService` managing a single connection instance.                                                                                             |
| **Creational** | **Factory Method**          | Define an interface for creating an object, but let subclasses decide which class to instantiate. | Creating different types of notifications (Email, SMS).     | `NotificationFactory` creating `EmailNotification` or `SmsNotification` based on type.                                                               |
| **Creational** | **Abstract Factory**        | Provide an interface for creating families of related objects without specifying their classes.   | Creating UI components for different themes (Light, Dark).  | `UIFactory` with `LightFactory` and `DarkFactory` creating themed buttons and textboxes.                                                             |
| **Creational** | **Builder**                 | Separate the construction of a complex object from its representation.                            | Building user profiles with optional fields.                | `UserBuilder` constructing `User` objects with varying configurations.                                                                               |
| **Creational** | **Prototype**               | Create new objects by copying an existing object, known as the prototype.                         | Cloning user settings or templates.                         | `UserSettings` cloning `StandardSettings` or `CustomSettings`.                                                                                       |
| **Creational** | **Object Pool**             | Reuse a set of initialized objects instead of creating and destroying them on demand.             | Managing database connections efficiently.                  | `ConnectionPool` managing reusable `Connection` objects.                                                                                             |
| **Structural** | **Adapter**                 | Convert the interface of a class into another interface clients expect.                           | Integrating a legacy logging service.                       | `LoggerAdapter` adapting `LegacyLogger` to `LoggerService` interface.                                                                                |
| **Structural** | **Bridge**                  | Decouple an abstraction from its implementation so that the two can vary independently.           | Remote control abstraction for different devices.           | `RemoteControl` abstraction working with `TV` and `Radio` devices.                                                                                   |
| **Structural** | **Composite**               | Compose objects into tree structures to represent part-whole hierarchies.                         | Representing a file system with files and directories.      | `File` and `Directory` classes forming a hierarchical file system structure.                                                                         |
| **Structural** | **Decorator**               | Attach additional responsibilities to an object dynamically.                                      | Adding logging to service methods without modifying them.   | `LoggingInterceptor` adding logging to `AppService` methods.                                                                                         |
| **Structural** | **Facade**                  | Provide a unified interface to a set of interfaces in a subsystem.                                | Simplifying user operations by combining multiple services. | `UserFacade` coordinating `UserService`, `AuthService`, and `NotificationService`.                                                                   |
| **Structural** | **Flyweight**               | Use sharing to support large numbers of fine-grained objects efficiently.                         | Managing numerous character objects in a text editor.       | `FlyweightFactory` managing shared `Character` objects for rendering text.                                                                           |
| **Structural** | **Proxy**                   | Provide a surrogate or placeholder for another object to control access to it.                    | Adding access control or lazy initialization to services.   | `PaymentProxy` controlling access to `RealPaymentService` with added logging.                                                                        |
| **Behavioral** | **Chain of Responsibility** | Pass a request along a chain of handlers until one handles it.                                    | Middleware chains (authentication, authorization).          | Middleware with `AuthenticationHandler`, `AuthorizationHandler`, `LoggingHandler` processing HTTP requests.                                          |
| **Behavioral** | **Command**                 | Encapsulate a request as an object, allowing parameterization and queuing of requests.            | Managing user creation with CQRS.                           | `CreateUserCommand` and `CreateUserHandler` managing user creation and emitting events.                                                              |
| **Behavioral** | **Interpreter**             | Define a grammatical representation and interpret it.                                             | Evaluating mathematical expressions.                        | `Parser` interpreting expressions like "5 3 + 2 -" using expression classes.                                                                         |
| **Behavioral** | **Iterator**                | Provide a way to access elements of a collection sequentially without exposing its structure.     | Iterating through user lists or product catalogs.           | `UserIterator` traversing `UserAggregate` without exposing the underlying array structure.                                                           |
| **Behavioral** | **Mediator**                | Encapsulate how a set of objects interact, promoting loose coupling.                              | Coordinating `OrderService` and `InventoryService`.         | `MediatorService` orchestrating interactions between `OrderService` and `InventoryService`.                                                          |
| **Behavioral** | **Memento**                 | Capture and restore an object's state without violating encapsulation.                            | Implementing undo functionality for user profiles.          | `UserOriginator` and `Caretaker` managing `Memento` objects for user profile state restoration.                                                      |
| **Behavioral** | **Observer**                | Establish a one-to-many dependency for automatic notifications.                                   | Event-driven notifications on user registration.            | `EventEmitter` with `UserCreatedEvent`, `WelcomeEmailListener`, and `RegistrationLoggerListener`.                                                    |
| **Behavioral** | **State**                   | Alter an object's behavior when its internal state changes.                                       | Managing order states (new, processed, completed).          | `OrderContext` managing states like `NewOrderState`, `ProcessedOrderState`, `CompletedOrderState`.                                                   |
| **Behavioral** | **Strategy**                | Define a family of interchangeable algorithms.                                                    | Managing different authentication strategies (JWT, OAuth).  | `AuthStrategy` interface with `JwtStrategy` and `OauthStrategy` used by `AuthContext` and `AuthService`.                                             |
| **Behavioral** | **Template Method**         | Define the skeleton of an algorithm, allowing subclasses to customize steps.                      | Structuring order processing workflows.                     | `OrderProcessingTemplate` with `EcommerceOrderProcessing` defining steps like validation, payment, inventory update, and sending confirmation email. |
| **Behavioral** | **Visitor**                 | Add operations to objects without modifying their classes.                                        | Performing operations on geometric shapes.                  | `Visitor` interface with `AreaCalculatorVisitor`, `Circle`, `Rectangle` used by `ShapeService` to calculate areas.                                   |
