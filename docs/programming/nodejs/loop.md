---
title: Loop
---


**For Loop**: 

```js
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

**For-Of Loop**: 

```js
for (const item of arr) {
  console.log(item);
}
```

**forEach Method**: 

```js
arr.forEach(function (item) {
  console.log(item);
});
```

**Map Method**: Create a new array by applying a function to each element of the original array.

```js
const newArr = arr.map((item) => item * 2);
```

**Filter Method**: Create a new array with elements that satisfy a certain condition.

```js
const filtered = arr.filter((item) => item > 2);
```

**Reduce Method**: Compute an aggregated value from the array.

```js
const sum = arr.reduce((acc, item) => acc + item, 0);
```

Regarding Performance:

- The classic for loop is often the fastest choice, especially when you need to access the indices of elements in the array.
- for-of and .forEach() may be slightly slower and should be used for easier-to-read code or when the index is not needed.
  
If performance is a top priority and your array is very large, using the classic for loop is probably the best choice. However, in many cases, the performance difference between these methods is negligible, and the choice often depends on code clarity and readability.

However, the performance difference between these methods is usually insignificant in most common applications. In fact, in some cases, the JavaScript virtual machine can optimize code using map, reduce, or filter to the point where they run as fast as classic for loops.