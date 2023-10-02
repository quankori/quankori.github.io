---
title: Generics
---

## Basic Usage

In the identity function, T is a type variable. When we call the function with a string, T will be replaced by a string. When we call it with a number, T will be replaced by a number.

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

Sometimes, you may want to restrict the types that are allowed in a specific context. You can do this using a concept called "constraints."

Here is an example where we constrain the generic type to types that have the .length property:


```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // We can access `.length` because of the constraint
  return arg;
}
```

Now, if you try to call loggingIdentity with a number or any type that doesn't have the .length property, TypeScript will produce an error.
