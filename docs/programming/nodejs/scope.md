---
title: Scopes
---

## Global Scope

Một biến được khai báo bên ngoài bất kỳ hàm hoặc khối nào thuộc phạm vi toàn cầu (global scope). Mọi đoạn mã và hàm có thể truy cập vào nó.

```js
let globalVar = "I'm globally scoped";

function showGlobalVar() {
  console.log(globalVar); // Accessible here
}

showGlobalVar(); // Outputs: "I'm globally scoped"
```

## Local (or Function) Scope

Biến được khai báo bên trong một hàm sẽ có phạm vi cục bộ (local scope). Chúng không thể truy cập bên ngoài hàm đó.

```js
function localFunction() {
  let localVar = "I'm locally scoped";
  console.log(localVar); // Accessible here
}

localFunction(); // Outputs: "I'm locally scoped"
// console.log(localVar); // Error: localVar is not defined
```

## Block Scope (Introduced with ES6)

Với sự ra đời của let và const trong ES6, JavaScript đã có phạm vi theo khối. Điều này có nghĩa rằng các biến được khai báo với let hoặc const bên trong một khối (như bên trong câu lệnh if hoặc vòng lặp for) chỉ có thể truy cập trong khối đó.

```js
if (true) {
  let blockVar = "I'm block-scoped";
  console.log(blockVar); // Accessible here
}

// console.log(blockVar); // Error: blockVar is not defined
```

## Module Scope (With ES6 Modules)

Khi sử dụng các module ES6, các biến cấp cao (những biến không được xuất) có phạm vi module. Chúng cục bộ cho module và không thể truy cập vào các module khác trừ khi được xuất cụ thể.

```js
let moduleVar = "I'm module-scoped";
export function showVar() {
  console.log(moduleVar);
}

// Another file js

import { showVar } from "./moduleA";
showVar(); // Outputs: "I'm module-scoped"
// moduleVar isn't directly accessible here
```

## Lexical Scope (Closures)

Trong JavaScript, các hàm tạo thành các closure. Một closure là sự kết hợp của một hàm đóng gói cùng với các tham chiếu đến trạng thái xung quanh của nó (môi trường từ vựng). Nó cho phép bạn truy cập vào phạm vi của hàm bên ngoài từ một hàm bên trong.

```js
function outerFunction() {
  let outerVar = "I'm in the outer function";
  function innerFunction() {
    console.log(outerVar); // Accessible due to lexical scoping
  }
  innerFunction();
}

outerFunction(); // Outputs: "I'm in the outer function"
```
