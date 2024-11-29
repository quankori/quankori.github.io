---
title: Cheatsheet Nest.js
---

### Schematics 

### Lazy-loading Module

```ts
@Controller()
export class AppController {
  constructor(private readonly lazyModuleLoader: LazyModuleLoader) {}

  @Get()
  async getLazyReport(): Promise<string> {
    console.time();
    const moduleRef = await this.lazyModuleLoader.load(() => ReportsModule);
    const reportsService = moduleRef.get(ReportsService);
    console.timeEnd();
    return reportsService.getReport();
  }
}
```

### Accessing IoC container

- ModuleRef

### Reflector 

### Circuit Breaker 

### Composition with Mixins

### Datbase