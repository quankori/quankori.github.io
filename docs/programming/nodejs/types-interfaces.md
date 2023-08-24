---
title: Types and Interfaces Typescript
---

In TypeScript, both type and interface are powerful ways to define the shape of an object or the structure of a piece of data. However, there are differences in their capabilities, usage, and when you might choose one over the other.

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
**For object shapes**: Both type and interface can be used, but if you expect consumers of your code (like other developers) to extend, modify, or implement the object shape, interface is generally preferred due to its extensibility.

**Extending**: interface supports extending other interfaces using the extends keyword. While you can achieve a similar effect using intersection types with type, interface provides a more idiomatic OOP approach.

**Union Types**: If you need union types (like string | number), type is your only option.

**Declaration Merging**: Only interface supports declaration merging. This is useful when you want to piecemeal or gradually add to the shape of an object over multiple files or locations in a codebase.

**Implementing in Classes**: If you're defining a structure that a class will adhere to, use interface. This allows you to use the implements keyword with classes.

**Performance**: During compile time, interface is a bit faster because it doesn't require as much computational effort as type. This difference, however, is negligible for most projects.

In conclusion, while there's an overlap in many of their capabilities, the choice between type and interface depends on the specific use case. As a rule of thumb, for object shapes, especially ones that might be extended or implemented, interface is typically preferred. For more complex type definitions, unions, intersections, or mapped types, type is the go-to.
