---
title: JavaScript CheatSheet
---

## Remove Duplicate

### Sets

```js
const array = [1, 1, 1, 3, 3, 2, 2];
const unique = [...new Set(array)];
console.log(unique); //return [1, 3, 2]
```

```js
const arr = [
  { id: 1, name: "apple" },
  { id: 2, name: "banana" },
  { id: 1, name: "apple" },
  { id: 3, name: "cherry" },
];

const uniqueKeys = new Set();
const uniqueArr = arr.filter((obj) => {
  if (uniqueKeys.has(obj.id)) {
    return false;
  }
  uniqueKeys.add(obj.id);
  return true;
});

console.log(uniqueArr);
```

### Filter

```js
const arr = [
  { id: 1, name: "apple" },
  { id: 2, name: "banana" },
  { id: 1, name: "apple" },
  { id: 3, name: "cherry" },
];

const uniqueKeys = new Set();
const uniqueArr = arr.filter((obj) => {
  if (uniqueKeys.has(obj.id)) {
    return false;
  }
  uniqueKeys.add(obj.id);
  return true;
});

console.log(uniqueArr);
```

```js
const array = [1, 1, 1, 3, 3, 2, 2];
const unique = array.filter((element, index) => {
  return array.indexOf(element) === index;
});
console.log(unique); //return [1, 3, 2]
```

### Reduce

```js
const arr = [
  { id: 1, name: "apple" },
  { id: 2, name: "banana" },
  { id: 1, name: "apple" },
  { id: 3, name: "cherry" },
];

const uniqueArr = arr.reduce((acc, curr) => {
  const exists = acc.find((x) => x.id === curr.id);
  if (!exists) {
    acc.push(curr);
  }
  return acc;
}, []);

console.log(uniqueArr);
```

```js
const array = [1, 1, 1, 3, 3, 2, 2];
const unique = array.reduce((result, element) => {
  return result.includes(element) ? result : [...result, element];
}, []);
console.log(unique); //return [1, 3, 2]
```
