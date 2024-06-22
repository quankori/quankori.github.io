---
title: Types and Interfaces Typescript
---

## Types & Interfaces

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

## Types: `any`, `unknown`, and Intersection Types

TypeScript is a statically typed superset of JavaScript that adds static types to the language. Understanding the differences between `any` and `unknown`, as well as how intersection types work, is crucial for writing robust and type-safe TypeScript code.

### `any` Type

**Definition**:

- The `any` type in TypeScript is a type that can represent any JavaScript value. It effectively disables type checking for the variable it is assigned to.

**Characteristics**:

- **Opt-Out of Type Checking**: Using `any` means that the compiler will not perform type checking on the variable.
- **Implicit Any**: If a variable is declared without a type and without being initialized, it implicitly has the `any` type.

**Pros**:

- Useful when you are migrating JavaScript code to TypeScript.
- Helps when working with third-party libraries that do not have type definitions.

**Cons**:

- Reduces type safety because it disables the benefits of TypeScript’s type checking.
- Can lead to runtime errors if used excessively or improperly.

**Example**:

```typescript
let value: any;
value = 5; // OK
value = "hello"; // OK
value = true; // OK
value.foo.bar(); // OK at compile-time, but may cause runtime errors
```

### `unknown` Type

**Definition**:

- The `unknown` type in TypeScript is a type-safe counterpart to `any`. It can hold any value but requires type checking before performing operations on the variable.

**Characteristics**:

- **Type-Safe `any`**: You must perform some form of type assertion or checking before using it.
- **Type Narrowing**: Use type assertions or type guards to narrow down the type.

**Pros**:

- Encourages type safety by requiring explicit type checks.
- Prevents many of the pitfalls associated with `any`.

**Cons**:

- Requires more boilerplate code for type assertions and checks.

**Example**:

```typescript
let value: unknown;
value = 5; // OK
value = "hello"; // OK

// Type assertion
let str: string = value as string;

// Type guard
if (typeof value === "string") {
  console.log(value.toUpperCase()); // OK
} else {
  console.log("Value is not a string");
}

// This would cause a compile-time error:
// value.foo.bar();
```

### Intersection Types

**Definition**:

- Intersection types in TypeScript allow you to combine multiple types into one. An intersection type represents an object that includes all the properties and methods of the intersected types.

**Characteristics**:

- **Combining Types**: Combines properties of multiple types into a single type.
- **Type Safety**: Ensures that the resulting type has all the properties of the combined types.

**Pros**:

- Useful for creating complex types by combining simpler ones.
- Helps in creating types that are more descriptive and specific.

**Cons**:

- Can lead to complex types that are harder to read and understand.

**Example**:

```typescript
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "John Doe",
  employeeId: 12345,
};

// Using the properties from both types
console.log(employee.name); // John Doe
console.log(employee.employeeId); // 12345
```

### Practical Example

Let's combine `unknown` and intersection types in a practical scenario:

```typescript
function logDetails(value: unknown): void {
  if (typeof value === "string") {
    console.log(`String: ${value.toUpperCase()}`);
  } else if (typeof value === "number") {
    console.log(`Number: ${value.toFixed(2)}`);
  } else if (typeof value === "object" && value !== null) {
    console.log("Object: ", value);
  } else {
    console.log("Unknown type");
  }
}

interface Name {
  name: string;
}

interface Age {
  age: number;
}

type PersonWithAge = Name & Age;

const person: PersonWithAge = { name: "Alice", age: 30 };
logDetails(person); // Object:  { name: 'Alice', age: 30 }
```

### Summary

- **`any` Type**:

  - **Definition**: Represents any value without type checking.
  - **Usage**: Useful for migrating JavaScript code and dealing with third-party libraries.
  - **Pros**: Flexibility.
  - **Cons**: Lack of type safety, potential runtime errors.

- **`unknown` Type**:

  - **Definition**: Represents any value with type safety.
  - **Usage**: Requires type checking or assertions before use.
  - **Pros**: Type safety.
  - **Cons**: Requires more code for type checks.

- **Intersection Types**:
  - **Definition**: Combines multiple types into one.
  - **Usage**: Creating complex types from simpler ones.
  - **Pros**: Descriptive, specific types.
  - **Cons**: Can become complex and harder to read.
