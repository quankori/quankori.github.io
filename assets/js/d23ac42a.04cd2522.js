"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[884],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>g});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),c=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=c(e.components);return r.createElement(s.Provider,{value:n},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=c(t),u=a,g=m["".concat(s,".").concat(u)]||m[u]||p[u]||i;return t?r.createElement(g,o(o({ref:n},d),{},{components:t})):r.createElement(g,o({ref:n},d))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=u;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[m]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=t[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},8547:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=t(7462),a=(t(7294),t(3905));const i={title:"MongoDB"},o=void 0,l={unversionedId:"blog/database/mongodb",id:"blog/database/mongodb",title:"MongoDB",description:"Overview: MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like BSON documents, offering scalability, high availability, and performance for modern applications.",source:"@site/docs/blog/database/mongodb.md",sourceDirName:"blog/database",slug:"/blog/database/mongodb",permalink:"/blog/database/mongodb",draft:!1,tags:[],version:"current",frontMatter:{title:"MongoDB"}},s={},c=[{value:"Scaling",id:"scaling",level:2},{value:"Sharding Service",id:"sharding-service",level:3},{value:"Replica Sets Service",id:"replica-sets-service",level:3},{value:"Core Features",id:"core-features",level:2},{value:"Core Features Service",id:"core-features-service",level:3},{value:"Performance",id:"performance",level:2},{value:"Performance Service",id:"performance-service",level:3},{value:"Consistency",id:"consistency",level:2},{value:"Consistency Service",id:"consistency-service",level:3}],d={toc:c},m="wrapper";function p(e){let{components:n,...t}=e;return(0,a.kt)(m,(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Overview"),": MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like BSON documents, offering scalability, high availability, and performance for modern applications."),(0,a.kt)("h2",{id:"scaling"},"Scaling"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Scaling"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Sharding"),": Distributes data across multiple servers for horizontal scaling."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Replica sets"),": Ensures high availability with primary-secondary replication.")),(0,a.kt)("h3",{id:"sharding-service"},"Sharding Service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// src/scaling/sharding.service.ts (**Sharding**)\nimport { Injectable, OnModuleInit } from "@nestjs/common";\nimport { MongoClient } from "mongodb";\n\n@Injectable()\nexport class ShardingService implements OnModuleInit {\n  private client: MongoClient;\n  private db;\n\n  constructor() {\n    this.client = new MongoClient("mongodb://localhost:27017");\n  }\n\n  async onModuleInit() {\n    await this.client.connect();\n    this.db = this.client.db("mydb");\n    // Note: Sharding requires a MongoDB sharded cluster setup externally\n    // Example command: await this.db.admin().command({ shardCollection: \'mydb.users\', key: { id: \'hashed\' } });\n    console.log("Connected to MongoDB for sharding");\n  }\n\n  async addUser(id: number, name: string): Promise<void> {\n    const collection = this.db.collection("users");\n    await collection.insertOne({ id, name });\n    console.log(`User added with sharding potential: ${id}, ${name}`);\n  }\n}\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Sharding Service Details"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Purpose"),": Demonstrates adding data to a MongoDB collection with sharding potential."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Explanation"),": Initializes a MongoDB client, connects on module init, and ",(0,a.kt)("inlineCode",{parentName:"li"},"addUser")," inserts a document into the ",(0,a.kt)("inlineCode",{parentName:"li"},"users")," collection. Sharding isn\u2019t directly implemented here (requires external cluster setup), but the service assumes a sharded environment, logging the action."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Sharding Details"),":",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Horizontal Scaling"),": Data is split across multiple servers (shards) based on a shard key (e.g., hashed ",(0,a.kt)("inlineCode",{parentName:"li"},"id"),")."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Setup"),": Requires a sharded cluster (e.g., ",(0,a.kt)("inlineCode",{parentName:"li"},"mongos"),", shard servers), not coded but noted in comments.")))),(0,a.kt)("h3",{id:"replica-sets-service"},"Replica Sets Service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// src/scaling/replicasets.service.ts (**Replica sets**)\nimport { Injectable, OnModuleInit } from "@nestjs/common";\nimport { MongoClient } from "mongodb";\n\n@Injectable()\nexport class ReplicaSetsService implements OnModuleInit {\n  private client: MongoClient;\n  private db;\n\n  constructor() {\n    // Assumes replica set configured (e.g., mongodb://localhost:27017,localhost:27018)\n    this.client = new MongoClient("mongodb://localhost:27017", {\n      replicaSet: "rs0",\n    });\n  }\n\n  async onModuleInit() {\n    await this.client.connect();\n    this.db = this.client.db("mydb");\n    console.log("Connected to MongoDB replica set");\n  }\n\n  async writeToPrimary(id: number, name: string): Promise<void> {\n    const collection = this.db.collection("users");\n    await collection.insertOne(\n      { id, name },\n      { writeConcern: { w: "majority" } }\n    );\n    console.log(`Wrote to primary: ${id}, ${name}`);\n  }\n\n  async readFromSecondary(id: number): Promise<any> {\n    const collection = this.db.collection("users");\n    const result = await collection.findOne(\n      { id },\n      { readPreference: "secondaryPreferred" }\n    );\n    console.log(`Read from secondary: ${JSON.stringify(result)}`);\n    return result;\n  }\n}\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Replica Sets Service Details"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Purpose"),": Shows writing to the primary and reading from a secondary in a replica set."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Explanation"),": Connects to a MongoDB replica set (assumed configured externally), ",(0,a.kt)("inlineCode",{parentName:"li"},"writeToPrimary")," inserts with majority write concern, and ",(0,a.kt)("inlineCode",{parentName:"li"},"readFromSecondary")," reads with secondary preference, logging actions to illustrate high availability."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Replica Sets Details"),":",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"High Availability"),": Primary handles writes; secondaries replicate for reads and failover."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Replication"),": Data syncs asynchronously from primary to secondaries.")))),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"core-features"},"Core Features"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Core features"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Schema-less design"),": Allows dynamic, flexible data structures without predefined schemas."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Document model"),": Uses JSON/BSON for data storage, enabling rich structures."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Embedded documents & arrays"),": Supports nesting data within documents for efficient queries.")),(0,a.kt)("h3",{id:"core-features-service"},"Core Features Service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// src/core/features.service.ts (**Core features**)\nimport { Injectable, OnModuleInit } from "@nestjs/common";\nimport { MongoClient } from "mongodb";\n\n@Injectable()\nexport class FeaturesService implements OnModuleInit {\n  private client: MongoClient;\n  private db;\n\n  constructor() {\n    this.client = new MongoClient("mongodb://localhost:27017");\n  }\n\n  async onModuleInit() {\n    await this.client.connect();\n    this.db = this.client.db("mydb");\n    console.log("Connected to MongoDB for core features");\n  }\n\n  async addFlexibleDocument(id: number, data: any): Promise<void> {\n    const collection = this.db.collection("users");\n    await collection.insertOne({ id, ...data });\n    console.log(`Added flexible document: ${id}, ${JSON.stringify(data)}`);\n  }\n\n  async queryEmbeddedData(id: number): Promise<any> {\n    const collection = this.db.collection("users");\n    const result = await collection.findOne({ id });\n    console.log(`Queried embedded data: ${JSON.stringify(result)}`);\n    return result;\n  }\n}\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Core Features Service Details"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Purpose"),": Demonstrates schema-less design and embedded document querying."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Explanation"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"addFlexibleDocument")," inserts a document with arbitrary fields (schema-less), and ",(0,a.kt)("inlineCode",{parentName:"li"},"queryEmbeddedData")," retrieves it, showcasing MongoDB\u2019s flexibility and support for nested data (e.g., embedded documents or arrays), logged for visibility."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Core Features Details"),":",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Schema-less Design"),": No fixed schema; ",(0,a.kt)("inlineCode",{parentName:"li"},"data")," can vary per document."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Document Model"),": BSON stores JSON-like structures (e.g., ",(0,a.kt)("inlineCode",{parentName:"li"},"{ id: 1, details: { age: 30 } }"),")."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Embedded Documents & Arrays"),": Nests data (e.g., ",(0,a.kt)("inlineCode",{parentName:"li"},"details")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"tags: ['a', 'b']"),") for efficient queries.")))),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"performance"},"Performance"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Performance"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Indexing"),": Enhances query speed with single, compound, or geospatial indexes."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Aggregation pipeline"),": Processes and transforms data with a powerful pipeline."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Write concern vs read preference"),": Balances durability and performance in reads/writes.")),(0,a.kt)("h3",{id:"performance-service"},"Performance Service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// src/performance/performance.service.ts (**Performance**)\nimport { Injectable, OnModuleInit } from "@nestjs/common";\nimport { MongoClient } from "mongodb";\n\n@Injectable()\nexport class PerformanceService implements OnModuleInit {\n  private client: MongoClient;\n  private db;\n\n  constructor() {\n    this.client = new MongoClient("mongodb://localhost:27017");\n  }\n\n  async onModuleInit() {\n    await this.client.connect();\n    this.db = this.client.db("mydb");\n    await this.db.collection("users").createIndex({ id: 1 });\n    console.log("Connected to MongoDB with index");\n  }\n\n  async indexedQuery(id: number): Promise<any> {\n    const collection = this.db.collection("users");\n    const result = await collection.findOne({ id });\n    console.log(`Indexed query result: ${JSON.stringify(result)}`);\n    return result;\n  }\n\n  async aggregateData(): Promise<any[]> {\n    const collection = this.db.collection("users");\n    const result = await collection\n      .aggregate([\n        { $match: { "details.age": { $gt: 25 } } },\n        { $group: { _id: "$details.age", count: { $sum: 1 } } },\n      ])\n      .toArray();\n    console.log(`Aggregation result: ${JSON.stringify(result)}`);\n    return result;\n  }\n}\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Performance Service Details"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Purpose"),": Shows indexing and aggregation for performance optimization."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Explanation"),": Initializes a MongoDB client, creates an index on ",(0,a.kt)("inlineCode",{parentName:"li"},"id")," during startup, ",(0,a.kt)("inlineCode",{parentName:"li"},"indexedQuery")," uses the index for fast retrieval, and ",(0,a.kt)("inlineCode",{parentName:"li"},"aggregateData")," runs an aggregation pipeline to filter and group data, logging results."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Performance Details"),":",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Indexing"),": Single index on ",(0,a.kt)("inlineCode",{parentName:"li"},"id")," speeds up queries (compound/geospatial possible)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Aggregation Pipeline"),": Filters (",(0,a.kt)("inlineCode",{parentName:"li"},"$match"),") and groups (",(0,a.kt)("inlineCode",{parentName:"li"},"$group"),") data efficiently."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Write Concern vs Read Preference"),": Not coded but adjustable (e.g., ",(0,a.kt)("inlineCode",{parentName:"li"},"{ w: 'majority' }")," for durability).")))),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"consistency"},"Consistency"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Consistency"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"BASE model"),": Prioritizes availability and eventual consistency over strict ACID."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Tunable consistency"),": Adjusts read/write consistency via concern settings.")),(0,a.kt)("h3",{id:"consistency-service"},"Consistency Service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// src/consistency/consistency.service.ts (**Consistency**)\nimport { Injectable, OnModuleInit } from "@nestjs/common";\nimport { MongoClient } from "mongodb";\n\n@Injectable()\nexport class ConsistencyService implements OnModuleInit {\n  private client: MongoClient;\n  private db;\n\n  constructor() {\n    this.client = new MongoClient("mongodb://localhost:27017");\n  }\n\n  async onModuleInit() {\n    await this.client.connect();\n    this.db = this.client.db("mydb");\n    console.log("Connected to MongoDB for consistency");\n  }\n\n  async writeWithTunableConsistency(id: number, name: string): Promise<void> {\n    const collection = this.db.collection("users");\n    await collection.insertOne(\n      { id, name },\n      { writeConcern: { w: "majority" } }\n    );\n    console.log(`Wrote with majority consistency: ${id}, ${name}`);\n  }\n\n  async readWithPreference(id: number): Promise<any> {\n    const collection = this.db.collection("users");\n    const result = await collection.findOne(\n      { id },\n      { readPreference: "secondaryPreferred" }\n    );\n    console.log(`Read with secondary preference: ${JSON.stringify(result)}`);\n    return result;\n  }\n}\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Consistency Service Details"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Purpose"),": Demonstrates tunable consistency with write concern and read preference."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Explanation"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"writeWithTunableConsistency")," inserts with a 'majority' write concern for durability, ",(0,a.kt)("inlineCode",{parentName:"li"},"readWithPreference")," reads with 'secondaryPreferred' for availability, logging actions to show consistency tuning."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Consistency Details"),":",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"BASE Model"),": Prioritizes availability and eventual consistency (vs. ACID)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Tunable Consistency"),": Write concern (e.g., ",(0,a.kt)("inlineCode",{parentName:"li"},"w: 'majority'"),") ensures durability; read preference (e.g., ",(0,a.kt)("inlineCode",{parentName:"li"},"secondaryPreferred"),") balances freshness and speed.")))))}p.isMDXComponent=!0}}]);