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

## Export

**Named Export**: Trong JavaScript ES6, named export được sử dụng để xuất nhiều thứ từ một module bằng cách thêm keyword export vào khai báo của chúng. Những thứ được export sẽ được phân biệt bằng tên. Sau đó import những thứ chúng ta cần sử dụng bằng cách bao quanh chúng cặp dấu ngoặc nhọn { }. Tên của module đã nhập phải giống với tên của module đã xuất.

```js
//-------util.js------
export function addTwoNumbers(x, y) {
  return x + y;
}
export let students = ["wisdom", "bill", "fred", "grim"];
```

**Default Export**: trong Javascript ES6 chỉ cho phép xuất một mặc định cho mỗi file. Default Export có thể cho một function, class hoặc một object.

```js
//----myFunction.js ----
export default function () {
  alert("Hello Default Export");
}
```

## Import

```js
import * as util from "util";

console.log(util.addTwoNumbers(2, 13));
console.log(util.students);
```

Cú pháp ở đây khá đơn giản, nó dạng như thế này: `import * as name from "module-name"`

Ngoài ra bạn cũng có thể sử dụng alias "as" để định dạnh lại nếu chưa quen thuộc hoặc tuỳ theo dự án của mình. Nếu như bạn có một module export như thế này:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export { sayHi, sayBye }; // a list of exported variables
```

Thì việc định danh lại cũng không hề quá khó

```js
// main.js
import { sayHi as hi, sayBye as bye } from "./say.js";

hi("John"); // Hello, John!
bye("John"); // Bye, John!
```
