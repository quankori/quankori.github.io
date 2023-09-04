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

## Lexical Scope

Phạm vi từ vựng (lexical scope), còn được gọi là phạm vi tĩnh, là một khái niệm quan trọng trong lập trình, đặc biệt trong ngôn ngữ lập trình có tương tác với hàm như JavaScript. Lexical scope xác định quyền truy cập của biến hoặc hàm trong mã nguồn dựa trên cách chúng được khai báo và nhóm họp.

Khi một hàm được định nghĩa trong một ngữ cảnh (block hoặc hàm khác), nó sẽ được tạo ra với phạm vi từ vựng, có nghĩa là nó có thể truy cập vào các biến và hàm mà có sẵn trong cùng phạm vi mà nó được định nghĩa, cũng như các phạm vi bọc ngoài nó. Điều này dựa vào cách mã nguồn được viết và cấu trúc tĩnh của nó, chứ không phụ thuộc vào cách mã nguồn được gọi tại thời điểm thực thi.

```js
function outer() {
  const outerVar = "I'm from outer";

  function inner() {
    const innerVar = "I'm from inner";
    console.log(outerVar); // Truy cập được outerVar từ phạm vi bên ngoài
    console.log(innerVar); // Truy cập innerVar trong phạm vi hiện tại
  }

  inner();
}

outer();
```

Điều quan trọng cần nhớ về lexical scope là nó được xác định tại thời điểm định nghĩa hàm, không phải tại thời điểm gọi hàm. Điều này có nghĩa rằng, dù có thể gọi hàm từ một phạm vi khác, các biến và hàm mà hàm đó truy cập sẽ vẫn dựa vào phạm vi khi nó được định nghĩa.

## Closures

Trong JavaScript, closure là một tính năng ngôn ngữ cho phép một hàm có quyền truy cập vào các biến từ ngữ cảnh mà hàm đó được tạo ra. Closure xuất hiện khi một hàm (được gọi là hàm "inner") được định nghĩa trong một hàm khác (được gọi là hàm "outer") và hàm inner này truy cập các biến của hàm outer.

```js
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(`Outer Variable: ${outerVariable}`);
    console.log(`Inner Variable: ${innerVariable}`);
  };
}

const myClosure = outerFunction("outer"); // Tạo một closure

myClosure("inner"); // Sử dụng closure

// Outer Variable: outer
// Inner Variable: inner
```

## Private Scope và Public Scope

**Private Scope**: Trong phạm vi riêng tư, các biến và hàm chỉ có thể được truy cập và sử dụng bên trong cùng một "phạm vi" hoặc "đoạn mã" mà chúng được khai báo. Chúng không thể được truy cập từ các phạm vi khác, kể cả các đoạn mã khác trong cùng một tệp hoặc module, cho phép tương tác dễ dàng và chia sẻ dữ liệu và hàm giữa các phần khác nhau của chương trình.

```js
function Counter() {
  let count = 0; // Biến count chỉ có thể truy cập trong hàm Counter

  this.increment = function () {
    count++;
  };

  this.getCount = function () {
    return count;
  };
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount()); // Output: 1
console.log(counter.count); // Output: undefined (vì count là biến riêng tư)
```

**Public Scope**: Trong phạm vi công khai, các biến và hàm có thể được truy cập từ bất kỳ nơi nào trong chương trình, bao gồm cả từ các module khác, đảm bảo tính bảo mật và ngăn ngừa việc sửa đổi không cần thiết từ các phạm vi bên ngoài.

```js
let globalVar = 42; // Biến globalVar có phạm vi công khai và có thể truy cập ở mọi nơi

function printGlobal() {
  console.log(globalVar);
}

printGlobal(); // Output: 42
```