---
title: Generics
---

## Basic Usage

In the identity function, T is a type variable. When we call the function with a string, T is replaced with string. When we call it with a number, T is replaced with number

```ts
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("Hello World");
let output2 = identity<number>(42);
```

## Generic Interfaces

You can also have generic interfaces

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

Classes can also be generic

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

Sometimes, you'll want to restrict the kinds of types that can be allowed in a given context. You can do this with a concept called "constraints".

Here's an example where we constrain the generic type to types that have a .length property:

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // We can access `.length` because of the constraint
  return arg;
}
```

Now, if you try to call loggingIdentity with numbers or any type that doesn't have a .length property, TypeScript will raise an error.
