"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[335],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,g=u["".concat(l,".").concat(d)]||u[d]||m[d]||s;return n?r.createElement(g,i(i({ref:t},c),{},{components:n})):r.createElement(g,i({ref:t},c))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[u]="string"==typeof e?e:a,i[1]=o;for(var p=2;p<s;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7794:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const s={title:"Redis"},i=void 0,o={unversionedId:"cheatsheet/database/redis",id:"cheatsheet/database/redis",title:"Redis",description:"Redis",source:"@site/docs/cheatsheet/database/redis.md",sourceDirName:"cheatsheet/database",slug:"/cheatsheet/database/redis",permalink:"/docs/cheatsheet/database/redis",draft:!1,tags:[],version:"current",frontMatter:{title:"Redis"},sidebar:"cheatsheet",previous:{title:"MongoDB",permalink:"/docs/cheatsheet/database/mongodb"},next:{title:"English CheatSheet",permalink:"/docs/cheatsheet/english/cheatsheet"}},l={},p=[{value:"Redis",id:"redis",level:2},{value:"Key Differences",id:"key-differences",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"redis"},"Redis"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Overview"),": Redis is an in-memory, NoSQL key-value store known for its high performance, versatile data structures, and support for caching, messaging, and real-time applications, with options for persistence and scaling."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Core features"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"In-memory storage"),": Stores data in RAM for ultra-fast access."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Data structures"),": Supports Strings, Lists, Sets, Hashes, and more."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Pub/sub messaging"),": Enables real-time publish-subscribe communication.")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Performance"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Read/write performance"),": Delivers sub-millisecond latency due to in-memory nature."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Persistence options"),": RDB (snapshot) and AOF (log) for data durability."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Pipelining"),": Sends multiple commands in one go to reduce latency.")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Scaling"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Replication"),": Master-Slave setup for read scaling and failover.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Asynchronous replication"),": Replicates data to slaves asynchronously."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"High availability with sentinel"),": Uses Sentinel for automatic failover."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Sharding"),": Distributes data across nodes via Redis Cluster.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Consistent hashing"),": Maps keys to nodes consistently."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Slot distribution"),": Divides key space into 16,384 slots.")))),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Consistency"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Eventual consistency"),": Achieved with replication across nodes."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Strong consistency"),": Guaranteed in a single-node setup.")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Design patterns"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Write-through/write-behind"),": Updates cache and DB simultaneously or lazily."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Cache aside"),": Application manages cache, fetching from DB on miss."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Rate limiting"),": Controls request rates using Redis counters.")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Source Tree"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"src/\n\u251c\u2500\u2500 redis/\n\u2502   \u251c\u2500\u2500 redis.service.ts\n\u2502   \u2514\u2500\u2500 redis.module.ts\n\u2514\u2500\u2500 main.ts\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Bash Scripts & Redis CLI Commands"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Setup Master-Slave Replication (Bash Script)"),":"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"#!/bin/bash\n# Start Redis master\nredis-server --port 6379 --dir data/master --dbfilename master.rdb --daemonize yes\n\n# Start Redis slave\nredis-server --port 6380 --dir data/slave --dbfilename slave.rdb --slaveof localhost 6379 --daemonize yes\n\n# Verify replication\nredis-cli -p 6379 info replication\n"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Setup Redis Sentinel (Bash Script)"),":"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'#!/bin/bash\n# Start Sentinel\necho "sentinel monitor mymaster 127.0.0.1 6379 2" > sentinel.conf\nredis-sentinel sentinel.conf --port 26379 --daemonize yes\n'))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Setup Redis Cluster (Bash Script)"),":"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"#!/bin/bash\n# Start multiple Redis nodes (simplified)\nfor port in 7000 7001 7002; do\n  redis-server --port $port --cluster-enabled yes --dir data/cluster$port --daemonize yes\ndone\n\n# Create cluster\nredis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 --cluster-replicas 0\n"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Redis CLI Commands"),":"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'# **In-memory storage** & **Data structures**\nSET user:1 "John"              # String\nLPUSH mylist "item1" "item2"  # List\nSADD myset "a" "b"            # Set\nHSET user:2 name "Jane" age "30"  # Hash\n\n# **Pub/sub messaging**\nSUBSCRIBE channel1\nPUBLISH channel1 "Hello"\n\n# **Persistence options**\nSAVE  # RDB snapshot\nCONFIG SET appendonly yes  # Enable AOF\n\n# **Pipelining**\nredis-cli --pipe <<EOF\nSET key1 value1\nSET key2 value2\nEOF\n\n# **Rate limiting**\nINCR rate:ip:127.0.0.1\nEXPIRE rate:ip:127.0.0.1 60  # Reset after 60s\n'))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"NestJS Example"),":"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// src/redis/redis.service.ts\nimport { Injectable, OnModuleInit } from "@nestjs/common";\nimport { Redis } from "ioredis";\n\n@Injectable()\nexport class RedisService implements OnModuleInit {\n  private redis: Redis;\n\n  constructor() {\n    this.redis = new Redis({ host: "localhost", port: 6379 });\n  }\n\n  async onModuleInit() {\n    // **Replication**: Assumes master-slave setup (slave connects via SLAVEOF)\n    // **Sharding**: Assumes Redis Cluster (connect with cluster options if needed)\n  }\n\n  // **In-memory storage** & **Data structures**\n  async setUser(userId: number, name: string) {\n    await this.redis.set(`user:${userId}`, name); // String\n    await this.redis.lpush(`user:${userId}:actions`, "login"); // List\n    await this.redis.hset(\n      `user:${userId}:details`,\n      "name",\n      name,\n      "age",\n      "30"\n    ); // Hash\n  }\n\n  // **Read/write performance**\n  async getUser(userId: number) {\n    return this.redis.get(`user:${userId}`); // Sub-millisecond latency\n  }\n\n  // **Pub/sub messaging**\n  async publishMessage(channel: string, message: string) {\n    await this.redis.publish(channel, message);\n  }\n\n  async subscribeToChannel(channel: string) {\n    const subscriber = new Redis({ host: "localhost", port: 6379 });\n    subscriber.subscribe(channel);\n    subscriber.on("message", (ch, msg) =>\n      console.log(`Received: ${msg} on ${ch}`)\n    );\n  }\n\n  // **Persistence options**\n  async enablePersistence() {\n    await this.redis.config("SET", "appendonly", "yes"); // Enable AOF\n  }\n\n  // **Design patterns**\n  async cacheAside(userId: number, fetchFromDb: () => Promise<string>) {\n    const cached = await this.redis.get(`user:${userId}`);\n    if (cached) return cached; // Cache hit\n    const data = await fetchFromDb(); // Cache miss\n    await this.redis.set(`user:${userId}`, data, "EX", 3600); // Cache for 1 hour\n    return data;\n  }\n\n  async rateLimit(ip: string, limit: number, window: number) {\n    const key = `rate:${ip}`;\n    const count = await this.redis.incr(key);\n    if (count === 1) await this.redis.expire(key, window); // Set TTL on first request\n    return count <= limit; // True if within limit\n  }\n}\n\n// src/redis/redis.module.ts\nimport { Module } from "@nestjs/common";\nimport { RedisService } from "./redis.service";\n\n@Module({\n  providers: [RedisService],\n  exports: [RedisService],\n})\nexport class RedisModule {}\n\n// src/main.ts\nimport { NestFactory } from "@nestjs/core";\nimport { Module } from "@nestjs/common";\nimport { RedisModule } from "./redis/redis.module";\nimport { RedisService } from "./redis/redis.service";\n\n@Module({\n  imports: [RedisModule],\n})\nexport class AppModule {}\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  const redisService = app.get(RedisService);\n\n  // Set user data (**Core features**)\n  await redisService.setUser(1, "John");\n  console.log(await redisService.getUser(1)); // **Performance**\n\n  // Pub/Sub (**Core features**)\n  await redisService.subscribeToChannel("updates");\n  await redisService.publishMessage("updates", "New user added");\n\n  // Cache Aside (**Design patterns**)\n  const fetchFromDb = async () => "John from DB";\n  console.log(await redisService.cacheAside(1, fetchFromDb));\n\n  // Rate Limiting (**Design patterns**)\n  console.log(await redisService.rateLimit("127.0.0.1", 5, 60)); // 5 requests per minute\n\n  await app.listen(3000);\n}\nbootstrap();\n')))),(0,a.kt)("h2",{id:"key-differences"},"Key Differences"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Core Features"),": Fast in-memory storage with versatile data types and messaging."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Performance"),": Sub-millisecond reads/writes, with persistence and pipelining options."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Scaling"),": Replication for HA, Sharding via Cluster for distribution."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Consistency"),": Eventual with replication, Strong in single-node mode."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Design Patterns"),": Supports caching and rate limiting strategies.")))}m.isMDXComponent=!0}}]);