---
title: Bitwise
---

## Bitwise Operations

Bitwise operations are low-level operations that directly manipulate bits in binary numbers. They are commonly used in programming for tasks that require direct manipulation of bits, such as setting or clearing individual bits, and performing binary arithmetic.

## Types of Bitwise Operations

1. **AND (`&`)**
2. **OR (`|`)**
3. **XOR (`^`)**
4. **NOT (`~`)**
5. **Left Shift (`<<`)**
6. **Right Shift (`>>`)**

## Detailed Explanation

### 1. Bitwise AND (`&`)

Performs a logical AND operation on each pair of corresponding bits of two numbers.

Example:

```plaintext
  5:  0101
& 3:  0011
------------
  1:  0001
```

In Go:

```go
a := 5  // 0101
b := 3  // 0011
c := a & b  // 0001
fmt.Println(c)  // Output: 1
```

### 2. Bitwise OR (`|`)

Performs a logical OR operation on each pair of corresponding bits of two numbers.

Example:

```plaintext
  5:  0101
| 3:  0011
------------
  7:  0111
```

In Go:

```go
a := 5  // 0101
b := 3  // 0011
c := a | b  // 0111
fmt.Println(c)  // Output: 7
```

### 3. Bitwise XOR (`^`)

Performs a logical XOR (exclusive OR) operation on each pair of corresponding bits of two numbers.

Example:

```plaintext
  5:  0101
^ 3:  0011
------------
  6:  0110
```

In Go:

```go
a := 5  // 0101
b := 3  // 0011
c := a ^ b  // 0110
fmt.Println(c)  // Output: 6
```

### 4. Bitwise NOT (`~`)

Performs a logical NOT operation on each bit of a number, flipping 0 to 1 and 1 to 0.

Example (8-bit representation):

```plaintext
  5:  00000101
~5:  11111010
```

In Go:

```go
a := 5  // 00000101
c := ^a  // 11111010 (in 8-bit, this would be -6 due to two's complement representation)
fmt.Println(c)  // Output: -6
```

### 5. Left Shift (`<<`)

Shifts the bits of the first operand left by the number of positions specified by the second operand. This is equivalent to multiplying the number by 2 raised to the power of the second operand.

Example:

```plaintext
  5:  0101
<<1: 1010
```

In Go:

```go
a := 5  // 0101
c := a << 1  // 1010
fmt.Println(c)  // Output: 10
```

### 6. Right Shift (`>>`)

Shifts the bits of the first operand right by the number of positions specified by the second operand. This is equivalent to dividing the number by 2 raised to the power of the second operand.

Example:

```plaintext
  5:  0101
>>1: 0010
```

In Go:

```go
a := 5  // 0101
c := a >> 1  // 0010
fmt.Println(c)  // Output: 2
```

## Practical Uses of Bitwise Operations

1. **Setting a Bit**: Use OR to set a specific bit.

   ```go
   var a int = 0  // 0000
   a = a | (1 << 1)  // Set the second bit: 0010
   fmt.Println(a)  // Output: 2
   ```

2. **Clearing a Bit**: Use AND with NOT to clear a specific bit.

   ```go
   var a int = 3  // 0011
   a = a &^ (1 << 1)  // Clear the second bit: 0001
   fmt.Println(a)  // Output: 1
   ```

3. **Toggling a Bit**: Use XOR to toggle a specific bit.

   ```go
   var a int = 3  // 0011
   a = a ^ (1 << 1)  // Toggle the second bit: 0001
   fmt.Println(a)  // Output: 1
   ```

4. **Checking a Bit**: Use AND to check if a specific bit is set.
   ```go
   var a int = 3  // 0011
   bit := (a & (1 << 1)) != 0  // Check the second bit
   fmt.Println(bit)  // Output: true
   ```

## Summary

- **Bitwise AND (`&`)**: Sets each bit to 1 if both bits are 1.
- **Bitwise OR (`|`)**: Sets each bit to 1 if one of the bits is 1.
- **Bitwise XOR (`^`)**: Sets each bit to 1 if only one of the bits is 1.
- **Bitwise NOT (`~`)**: Inverts all the bits.
- **Left Shift (`<<`)**: Shifts bits to the left, filling with 0s.
- **Right Shift (`>>`)**: Shifts bits to the right, discarding bits shifted off.
