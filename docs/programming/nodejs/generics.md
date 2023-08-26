---
title: Generics
---

## Basic Usage

Trong hàm đồng nhất (identity function), T là một biến kiểu (type variable). Khi chúng ta gọi hàm với một chuỗi, T sẽ được thay thế bằng chuỗi. Khi chúng ta gọi nó với một số, T sẽ được thay thế bằng số.

```ts
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("Hello World");
let output2 = identity<number>(42);
```

## Generic Interfaces

```ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

## Generic Classes

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
```

## Constraints

Đôi khi, bạn muốn hạn chế các loại kiểu có thể được phép trong một ngữ cảnh cụ thể. Bạn có thể làm điều này bằng một khái niệm gọi là "ràng buộc" (constraints).

Dưới đây là một ví dụ trong đó chúng ta ràng buộc kiểu chung đến các loại có thuộc tính .length:

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // We can access `.length` because of the constraint
  return arg;
}
```

Bây giờ, nếu bạn cố gọi loggingIdentity với số hoặc bất kỳ loại nào không có thuộc tính .length, TypeScript sẽ tạo ra một lỗi.
