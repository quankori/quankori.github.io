---
title: Copy in JavaScript
---

## Shallow copy

A shallow copy of an object or array is a copy where the top-level elements are duplicated, but the nested objects and arrays are not. Instead, references to these nested objects or arrays are copied. As a result, if you modify a nested object or array in the copied object, the original object will also reflect those changes.

```js
let original = {
  name: "John",
  address: {
    city: "New York",
    zip: "10001",
  },
};

let shallowCopy = Object.assign({}, original);
shallowCopy.address.city = "Los Angeles";

console.log(original.address.city); // Outputs: 'Los Angeles'
```

In the example above, the nested address object is shared between the original and the shallow copy. When we change a property in the address of the shallowCopy, it also changes in the original.

## Deep copying

A deep copy duplicates an object or array, including all of its nested structures. Changes made to the nested structures in the copied object will not affect the original object (and vice versa).

There's no built-in method in JavaScript to deep copy objects, but you can use various techniques, like stringifying and then parsing the object using JSON methods:

```js
let deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "San Francisco";

console.log(original.address.city); // Outputs: 'Los Angeles'
console.log(deepCopy.address.city); // Outputs: 'San Francisco'
```

However, this JSON method has its limitations: it only works with JSON-safe objects (so functions, undefined, Symbol, and some other types can't be copied this way).

## Object.assign()

The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object. This method performs a shallow copy, as illustrated in the previous example.

```js
let obj1 = { a: 1, b: 2 };
let obj2 = { b: 3, c: 4 };

let combined = Object.assign({}, obj1, obj2);
console.log(combined); // Outputs: { a: 1, b: 3, c: 4 }
```

In the example, obj2 overwrites the b property from obj1 in the combined object.

When working with objects and arrays, understanding the differences between deep and shallow copying is essential to prevent unintended side effects.
