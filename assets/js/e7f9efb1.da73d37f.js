"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[571],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>g});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},l=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),m=p(t),d=a,g=m["".concat(c,".").concat(d)]||m[d]||u[d]||o;return t?r.createElement(g,s(s({ref:n},l),{},{components:t})):r.createElement(g,s({ref:n},l))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=d;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i[m]="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=t[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},6732:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=t(7462),a=(t(7294),t(3905));const o={title:"Design Pattern"},s=void 0,i={unversionedId:"cheatsheet/fundamental/design-pattern",id:"cheatsheet/fundamental/design-pattern",title:"Design Pattern",description:"Design Pattern",source:"@site/docs/cheatsheet/fundamental/design-pattern.md",sourceDirName:"cheatsheet/fundamental",slug:"/cheatsheet/fundamental/design-pattern",permalink:"/docs/cheatsheet/fundamental/design-pattern",draft:!1,tags:[],version:"current",frontMatter:{title:"Design Pattern"},sidebar:"cheatsheet",previous:{title:"Computer Science",permalink:"/docs/cheatsheet/fundamental/computer-science"},next:{title:"Programming Design Pattern",permalink:"/docs/cheatsheet/fundamental/programming-design-pattern"}},c={},p=[{value:"Design Pattern",id:"design-pattern",level:2},{value:"Key Differences",id:"key-differences",level:2}],l={toc:p},m="wrapper";function u(e){let{components:n,...t}=e;return(0,a.kt)(m,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"design-pattern"},"Design Pattern"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Overview"),": Design Patterns provide reusable solutions to common software design problems, enhancing modularity, scalability, and maintainability across various architectural styles and paradigms."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"CQRS"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Core concepts"),":",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Separation of database"),": Splits write (PostgreSQL) and read (snapshot) data stores."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Separation of concerns"),": Divides command (write) and query (read) logic."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Implementation"),":",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Commands"),": Modify state in PostgreSQL."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Queries"),": Retrieve data from snapshot."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Event sourcing integration"),": Uses events to update snapshots.")))),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Saga"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Distributed transactions"),": Manages transactions across services."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Choreography"),": Event-driven coordination using Kafka."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Orchestration"),": Centralized control with rollback."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Compensation transaction"),": Reverses actions on failure.")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Backends for frontend"),": Tailors backend APIs for frontends via GraphQL."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Transactional outbox and inbox"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Outbox pattern"),": Ensures reliable event publishing with DB transactions."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Inbox pattern"),": Guarantees idempotent event consumption.")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Fan-out/fan-in"),": Distributes tasks (fan-out) and aggregates results (fan-in)."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Shared database anti-pattern"),": Avoids single DB across services due to coupling."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Source Tree"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"src/\n\u251c\u2500\u2500 cqrs/\n\u2502   \u251c\u2500\u2500 commands/\n\u2502   \u2502   \u2514\u2500\u2500 create-user.command.ts\n\u2502   \u251c\u2500\u2500 queries/\n\u2502   \u2502   \u2514\u2500\u2500 get-user.query.ts\n\u2502   \u251c\u2500\u2500 snapshot.service.ts\n\u251c\u2500\u2500 saga/\n\u2502   \u251c\u2500\u2500 choreography.saga.ts\n\u2502   \u251c\u2500\u2500 orchestration.saga.ts\n\u2502   \u251c\u2500\u2500 kafka.service.ts\n\u251c\u2500\u2500 bff/\n\u2502   \u251c\u2500\u2500 graphql.module.ts\n\u2502   \u251c\u2500\u2500 user.resolver.ts\n\u251c\u2500\u2500 outbox-inbox/\n\u2502   \u251c\u2500\u2500 outbox.service.ts\n\u2502   \u251c\u2500\u2500 inbox.service.ts\n\u251c\u2500\u2500 fan/\n\u2502   \u2514\u2500\u2500 fan.service.ts\n\u2514\u2500\u2500 app.module.ts\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"NestJS Example"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// src/cqrs/commands/create-user.command.ts (**Commands**)\nimport { Injectable } from "@nestjs/common";\nimport { Pool } from "pg";\nimport { SnapshotService } from "../snapshot.service";\n\n@Injectable()\nexport class CreateUserCommand {\n  private pool = new Pool({\n    user: "postgres",\n    host: "localhost",\n    database: "mydb",\n    password: "password",\n    port: 5432,\n  });\n\n  constructor(private snapshotService: SnapshotService) {}\n\n  async execute(id: number, name: string): Promise<void> {\n    const client = await this.pool.connect();\n    try {\n      await client.query("BEGIN");\n      await client.query("INSERT INTO users (id, name) VALUES ($1, $2)", [\n        id,\n        name,\n      ]);\n      await client.query("COMMIT");\n      this.snapshotService.updateSnapshot(id, name); // Update read snapshot\n      console.log(`User ${id} created in PostgreSQL`);\n    } catch (e) {\n      await client.query("ROLLBACK");\n      throw e;\n    } finally {\n      client.release();\n    }\n  }\n}\n\n// src/cqrs/snapshot.service.ts (**Event sourcing integration**)\nimport { Injectable } from "@nestjs/common";\n\n@Injectable()\nexport class SnapshotService {\n  private users: { id: number; name: string }[] = [];\n\n  updateSnapshot(id: number, name: string) {\n    const existing = this.users.find((u) => u.id === id);\n    if (existing) {\n      existing.name = name;\n    } else {\n      this.users.push({ id, name });\n    }\n  }\n\n  getUser(id: number) {\n    return this.users.find((u) => u.id === id);\n  }\n}\n\n// src/cqrs/queries/get-user.query.ts (**Queries**)\nimport { Injectable } from "@nestjs/common";\nimport { SnapshotService } from "../snapshot.service";\n\n@Injectable()\nexport class GetUserQuery {\n  constructor(private snapshotService: SnapshotService) {}\n\n  async execute(id: number): Promise<{ id: number; name: string } | undefined> {\n    const user = this.snapshotService.getUser(id);\n    console.log(`Query: User ${id} from snapshot:`, user);\n    return user;\n  }\n}\n\n// src/saga/kafka.service.ts (Kafka Setup for Choreography)\nimport { Injectable, OnModuleInit } from "@nestjs/common";\nimport { Kafka, Producer, Consumer } from "kafkajs";\n\n@Injectable()\nexport class KafkaService implements OnModuleInit {\n  private kafka = new Kafka({\n    clientId: "my-app",\n    brokers: ["localhost:9092"],\n  });\n  private producer: Producer;\n  private consumer: Consumer;\n\n  constructor() {\n    this.producer = this.kafka.producer();\n    this.consumer = this.kafka.consumer({ groupId: "saga-group" });\n  }\n\n  async onModuleInit() {\n    await this.producer.connect();\n    await this.consumer.connect();\n    await this.consumer.subscribe({\n      topic: "order-events",\n      fromBeginning: true,\n    });\n  }\n\n  async emitEvent(event: { type: string; orderId: number }) {\n    await this.producer.send({\n      topic: "order-events",\n      messages: [{ value: JSON.stringify(event) }],\n    });\n  }\n\n  async subscribe(callback: (event: any) => void) {\n    await this.consumer.run({\n      eachMessage: async ({ message }) => {\n        const event = JSON.parse(message.value.toString());\n        callback(event);\n      },\n    });\n  }\n}\n\n// src/saga/choreography.saga.ts (**Choreography**)\nimport { Injectable } from "@nestjs/common";\nimport { KafkaService } from "./kafka.service";\n\n@Injectable()\nexport class ChoreographySaga {\n  constructor(private kafkaService: KafkaService) {\n    this.kafkaService.subscribe(async (event) => {\n      if (event.type === "OrderStarted") {\n        console.log(`[Choreography] Processing order ${event.orderId}`);\n        try {\n          // Simulate payment failure\n          throw new Error("Payment failed");\n        } catch (e) {\n          // **Compensation transaction**\n          await this.kafkaService.emitEvent({\n            type: "OrderCancelled",\n            orderId: event.orderId,\n          });\n          console.log(\n            `[Choreography] Compensating: Cancel order ${event.orderId}`\n          );\n        }\n      }\n    });\n  }\n\n  async startOrder(orderId: number) {\n    await this.kafkaService.emitEvent({ type: "OrderStarted", orderId });\n  }\n}\n\n// src/saga/orchestration.saga.ts (**Orchestration**)\nimport { Injectable } from "@nestjs/common";\n\n@Injectable()\nexport class OrchestrationSaga {\n  async processOrder(orderId: number) {\n    const steps: { action: string; rollback?: () => void }[] = [\n      {\n        action: "Create order",\n        rollback: () => console.log(`Rollback: Cancel order ${orderId}`),\n      },\n      {\n        action: "Process payment",\n        rollback: () => console.log(`Rollback: Refund payment ${orderId}`),\n      },\n    ];\n\n    console.log(`[Orchestration] Order ${orderId} started`);\n    for (const step of steps) {\n      try {\n        console.log(`[Orchestration] ${step.action}`);\n        if (step.action === "Process payment")\n          throw new Error("Payment failed");\n      } catch (e) {\n        // **Compensation transaction**\n        steps\n          .slice(0, steps.indexOf(step) + 1)\n          .reverse()\n          .forEach((s) => s.rollback && s.rollback());\n        throw e;\n      }\n    }\n  }\n}\n\n// src/bff/graphql.module.ts (**Backends for frontend** - GraphQL)\nimport { Module } from "@nestjs/common";\nimport { GraphQLModule } from "@nestjs/graphql";\nimport { ApolloDriver } from "@nestjs/apollo";\nimport { UserResolver } from "./user.resolver";\n\n@Module({\n  imports: [\n    GraphQLModule.forRoot({\n      driver: ApolloDriver,\n      autoSchemaFile: "schema.gql",\n    }),\n  ],\n  providers: [UserResolver],\n})\nexport class BffModule {}\n\n// src/bff/user.resolver.ts\nimport { Resolver, Query, Args } from "@nestjs/graphql";\n\n@Resolver("User")\nexport class UserResolver {\n  @Query(() => String)\n  async user(@Args("id") id: number) {\n    return JSON.stringify({ id, name: "John" }); // Same for mobile/web\n  }\n}\n\n// src/outbox-inbox/outbox.service.ts (**Outbox pattern**)\nimport { Injectable } from "@nestjs/common";\nimport { Pool } from "pg";\n\n@Injectable()\nexport class OutboxService {\n  private pool = new Pool({\n    user: "postgres",\n    host: "localhost",\n    database: "mydb",\n    password: "password",\n    port: 5432,\n  });\n\n  async publishEvent(event: { type: string; data: any }) {\n    const client = await this.pool.connect();\n    try {\n      await client.query("BEGIN");\n      await client.query(\n        "INSERT INTO outbox (event_type, payload) VALUES ($1, $2)",\n        [event.type, JSON.stringify(event.data)]\n      );\n      await client.query("COMMIT");\n      console.log("Event published to outbox:", event);\n    } catch (e) {\n      await client.query("ROLLBACK");\n      throw e;\n    } finally {\n      client.release();\n    }\n  }\n}\n\n// src/outbox-inbox/inbox.service.ts (**Inbox pattern**)\nimport { Injectable } from "@nestjs/common";\n\n@Injectable()\nexport class InboxService {\n  private processedEvents: Set<string> = new Set();\n\n  async processEvent(eventId: string, event: { type: string; data: any }) {\n    if (this.processedEvents.has(eventId)) {\n      console.log(`Event ${eventId} already processed (idempotent)`);\n      return;\n    }\n    console.log(`Processing event ${eventId}:`, event);\n    this.processedEvents.add(eventId);\n  }\n}\n\n// src/fan/fan.service.ts (**Fan-out/fan-in**)\nimport { Injectable } from "@nestjs/common";\n\n@Injectable()\nexport class FanService {\n  async processTasks(tasks: number[]) {\n    // Fan-out: Distribute tasks\n    const promises = tasks.map(async (task) => {\n      console.log(`Processing task ${task}`);\n      return task * 2;\n    });\n\n    // Fan-in: Aggregate results\n    const results = await Promise.all(promises);\n    console.log("Aggregated results:", results);\n    return results.reduce((sum, val) => sum + val, 0);\n  }\n}\n\n// src/app.module.ts\nimport { Module } from "@nestjs/common";\nimport { CreateUserCommand } from "./cqrs/commands/create-user.command";\nimport { GetUserQuery } from "./cqrs/queries/get-user.query";\nimport { SnapshotService } from "./cqrs/snapshot.service";\nimport { ChoreographySaga } from "./saga/choreography.saga";\nimport { OrchestrationSaga } from "./saga/orchestration.saga";\nimport { KafkaService } from "./saga/kafka.service";\nimport { BffModule } from "./bff/graphql.module";\nimport { OutboxService } from "./outbox-inbox/outbox.service";\nimport { InboxService } from "./outbox-inbox/inbox.service";\nimport { FanService } from "./fan/fan.service";\n\n@Module({\n  imports: [BffModule],\n  providers: [\n    CreateUserCommand,\n    GetUserQuery,\n    SnapshotService,\n    ChoreographySaga,\n    OrchestrationSaga,\n    KafkaService,\n    OutboxService,\n    InboxService,\n    FanService,\n  ],\n})\nexport class AppModule {}\n\n// src/main.ts\nimport { NestFactory } from "@nestjs/core";\nimport { AppModule } from "./app.module";\nimport { CreateUserCommand } from "./cqrs/commands/create-user.command";\nimport { GetUserQuery } from "./cqrs/queries/get-user.query";\nimport { ChoreographySaga } from "./saga/choreography.saga";\nimport { OrchestrationSaga } from "./saga/orchestration.saga";\nimport { OutboxService } from "./outbox-inbox/outbox.service";\nimport { InboxService } from "./outbox-inbox/inbox.service";\nimport { FanService } from "./fan/fan.service";\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  const commandService = app.get(CreateUserCommand);\n  const queryService = app.get(GetUserQuery);\n  const choreographySaga = app.get(ChoreographySaga);\n  const orchestrationSaga = app.get(OrchestrationSaga);\n  const outboxService = app.get(OutboxService);\n  const inboxService = app.get(InboxService);\n  const fanService = app.get(FanService);\n\n  // CQRS\n  await commandService.execute(1, "John"); // Write to PostgreSQL\n  console.log(await queryService.execute(1)); // Read from snapshot\n\n  // Saga\n  await choreographySaga.startOrder(1); // Kafka-based Choreography\n  try {\n    await orchestrationSaga.processOrder(2); // Orchestration\n  } catch (e) {\n    console.log(e.message);\n  }\n\n  // Outbox & Inbox\n  await outboxService.publishEvent({ type: "UserCreated", data: { id: 1 } });\n  await inboxService.processEvent("event-1", {\n    type: "UserCreated",\n    data: { id: 1 },\n  });\n  await inboxService.processEvent("event-1", {\n    type: "UserCreated",\n    data: { id: 1 },\n  }); // Idempotent\n\n  // Fan-Out/Fan-In\n  await fanService.processTasks([1, 2, 3]);\n\n  await app.listen(3000);\n}\nbootstrap();\n')),(0,a.kt)("h2",{id:"key-differences"},"Key Differences"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"CQRS"),": Separates writes (PostgreSQL) and reads (snapshot) with NestJS."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Saga"),": Choreography (Kafka) vs Orchestration with compensation in NestJS."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"BFF"),": GraphQL serves all frontends in NestJS."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Outbox/Inbox"),": Reliable, idempotent event handling in NestJS."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Fan-Out/Fan-In"),": Task distribution and aggregation in NestJS.")))}u.isMDXComponent=!0}}]);