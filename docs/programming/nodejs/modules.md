---
title: Modules
---

## CommonJS

Đây là hệ thống module được sử dụng trong Node.js. Nó là đồng bộ và chủ yếu được thiết kế cho môi trường máy chủ.

```js
// greet.js
module.exports = function () {
  console.log("Hello, World!");
};

// app.js
const greet = require("./greet");
greet();
```

## Namespace

Namespaces là một cách cụ thể của TypeScript để tổ chức mã, sử dụng từ khóa namespace. Mặc dù namespaces có thể giúp ngăn va chạm tên, nhưng chúng đã trở nên ít phổ biến hơn với sự xuất hiện của ES Modules.

```ts
namespace MyNamespace {
  export function greet() {
    console.log("Hello from namespace!");
  }
}
```

## External Modules (ES Modules)

Hệ thống module được giới thiệu trong ES6 (ES2015) cho JavaScript. Nó đã trở thành tiêu chuẩn cho các module phía máy khách và hiện tại cũng được hỗ trợ trong Node.js.

```ts
// module.ts
export function greet() {
  console.log("Hello from module!");
}

// main.ts
import { greet } from "./module";
greet();
```
