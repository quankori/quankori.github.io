---
title: Slices & Array
---

Slices and Arrays are two data structures in Go related to storing elements of the same data type. However, they have significant differences in terms of the ability to change size and how they operate.

## Slices

Slices in Go are a flexible data structure that allows you to work with dynamic arrays. A slice is a flexible 'view' of the original array, allowing you to change the size of the array without creating a new one. Slices make managing and accessing arrays easier.

Here is an easy-to-understand example of how to use slices:

```go
package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Println("Original slice:", numbers)

    numbers[0] = 10

    numbers = append(numbers, 6)

    subset := numbers[1:4]

    fmt.Println("Modified slice:", numbers)
    fmt.Println("Subset slice:", subset)
}

// Original slice: [1 2 3 4 5]
// Modified slice: [10 2 3 4 5 6]
// Subset slice: [2 3 4]
```

### Length

**Definition**:

- The length of a slice is the number of elements it contains.

**Characteristics**:

- The length is dynamic and can change when elements are added or removed.
- The length of a slice can be obtained using the built-in `len` function.

**Example**:

```go
s := []int{1, 2, 3, 4, 5}
fmt.Println(len(s))  // Output: 5
```

### Capacity

**Definition**:

- The capacity of a slice is the number of elements it can hold before needing to allocate more memory.

**Characteristics**:

- The capacity is always greater than or equal to the length.
- The capacity of a slice can be obtained using the built-in `cap` function.
- When a slice grows beyond its capacity, Go allocates a new underlying array with more capacity.

**Example**:

```go
s := []int{1, 2, 3, 4, 5}
fmt.Println(cap(s))  // Output: 5
```

### Creating Slices

**From an Array**:
When a slice is created from an array, the length is the number of elements in the slice, and the capacity is the number of elements from the start of the slice to the end of the array.

```go
arr := [5]int{1, 2, 3, 4, 5}
s := arr[1:4]  // Slice from index 1 to 3
fmt.Println(len(s))  // Output: 3
fmt.Println(cap(s))  // Output: 4
```

**Using `make`**:
When creating a slice using the `make` function, you can specify the length and capacity.

```go
s := make([]int, 3, 5)  // Slice with length 3 and capacity 5
fmt.Println(len(s))  // Output: 3
fmt.Println(cap(s))  // Output: 5
```

### Reslicing

You can create a new slice from an existing slice, which can change the length but not the capacity.

```go
s := []int{1, 2, 3, 4, 5}
s1 := s[:3]
fmt.Println(len(s1))  // Output: 3
fmt.Println(cap(s1))  // Output: 5

s2 := s[2:]
fmt.Println(len(s2))  // Output: 3
fmt.Println(cap(s2))  // Output: 3
```

### Appending Elements

When you append elements to a slice, if the length exceeds the capacity, Go allocates a new underlying array with a larger capacity.

```go
s := []int{1, 2, 3}
fmt.Println(len(s))  // Output: 3
fmt.Println(cap(s))  // Output: 3

s = append(s, 4, 5)
fmt.Println(len(s))  // Output: 5
fmt.Println(cap(s))  // Output: 6 (or more, depending on Go's allocation strategy)
```

### Example Code

Here is a complete example demonstrating length and capacity in Go slices:

```go
package main

import (
	"fmt"
)

func main() {
	// Creating a slice from an array
	arr := [5]int{1, 2, 3, 4, 5}
	s1 := arr[1:4]
	fmt.Printf("s1: len=%d cap=%d %v\n", len(s1), cap(s1), s1)

	// Creating a slice using make
	s2 := make([]int, 3, 5)
	fmt.Printf("s2: len=%d cap=%d %v\n", len(s2), cap(s2), s2)

	// Reslicing
	s3 := s1[:2]
	fmt.Printf("s3: len=%d cap=%d %v\n", len(s3), cap(s3), s3)

	// Appending elements
	s4 := []int{1, 2, 3}
	fmt.Printf("s4: len=%d cap=%d %v\n", len(s4), cap(s4), s4)
	s4 = append(s4, 4, 5)
	fmt.Printf("s4 after append: len=%d cap=%d %v\n", len(s4), cap(s4), s4)
}
```

### Output

```plaintext
s1: len=3 cap=4 [2 3 4]
s2: len=3 cap=5 [0 0 0]
s3: len=2 cap=4 [2 3]
s4: len=3 cap=3 [1 2 3]
s4 after append: len=5 cap=6 [1 2 3 4 5]
```

## Arrays

An array is a fundamental data structure in Go used to store elements of the same data type. The size of an array is determined when it is declared and cannot be changed afterward. This imposes a limitation on the ability to change the size of the array.

```go
primes := [6]int{2, 3, 5, 7, 11, 13}
```

However, arrays in Go have limitations on the ability to change their size and are not as flexible as slices. Therefore, in most situations, programmers often prefer to use slices rather than arrays to manage data.

## Summary

- **Length (`len`)**:

  - Represents the number of elements in the slice.
  - Changes as elements are added or removed.

- **Capacity (`cap`)**:
  - Represents the maximum number of elements the slice can hold before needing to allocate more memory.
  - Changes when the underlying array is resized.
