---
title: Types and Interfaces Typescript
---

In TypeScript, both data types (type) and interfaces (interface) are powerful ways to define the shape of an object or data structure. However, there are differences in capabilities, usage, and when to choose one over the other.

```ts
type User = {
  id: string;
  name: string;
} | null;
```

```ts
interface User {
  id: string;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}
```

Comparison and Use Cases:

**For object shapes**: Both `type` and `interface` can be used, but if you expect consumers of your code (like other developers) to extend, modify, or implement object shapes, `interface` is often preferred due to its extensibility.

**Extending**: `interface` supports inheritance from other interface using the `extends` keyword. While you can achieve a similar effect using intersection types with type, `interface` provides a more reasonable approach to object-oriented programming (OOP) modeling.

**Union Types**: If you need types (e.g., string | number), `type` is the only choice.

**Declaration Merging**: Only `interface` supports declaration merging. This is useful when you want to gradually or incrementally add to the shape of an object across multiple files or locations in your source code.

**Implementing in Classes**: If you are defining a structure that a class will adhere to, use `interface`. This allows you to use the `implements` keyword with classes.

**Performance**: During compilation, `interface` is slightly faster because it requires less computation compared to `type`. However, this difference is often negligible for most projects.

In summary, while there is some overlap in many of their capabilities, the choice between `type` and `interface` depends on the specific use case. As a general rule, for object shapes, especially shapes that may be extended or implemented, interface is often preferred. For `type` definitions, unions, intersections, or mapped types, type is the top choice.

## Any and Unknown

## Intersection 