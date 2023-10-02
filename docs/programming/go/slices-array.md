---
title: Slices & Array
---

Slices and Arrays are two data structures in Go related to storing elements of the same data type. However, they have significant differences in terms of the ability to change size and how they operate.

**Slices trong Go**:

Slices in Go are a flexible data structure that allows you to work with dynamic arrays. A slice is a flexible 'view' of the original array, allowing you to change the size of the array without creating a new one. Slices make managing and accessing arrays easier.

Here is an easy-to-understand example of how to use slices:

```go
package main

import "fmt"

func main() {
    // Tạo một slice từ mảng
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Println("Original slice:", numbers)

    // Thay đổi giá trị phần tử trong slice
    numbers[0] = 10

    // Thêm phần tử vào slice
    numbers = append(numbers, 6)

    // Tạo slice con từ slice ban đầu
    subset := numbers[1:4]

    fmt.Println("Modified slice:", numbers)
    fmt.Println("Subset slice:", subset)
}

// Original slice: [1 2 3 4 5]
// Modified slice: [10 2 3 4 5 6]
// Subset slice: [2 3 4]
```

**Array trong Go**:

An array is a fundamental data structure in Go used to store elements of the same data type. The size of an array is determined when it is declared and cannot be changed afterward. This imposes a limitation on the ability to change the size of the array.

```go
primes := [6]int{2, 3, 5, 7, 11, 13}
```

However, arrays in Go have limitations on the ability to change their size and are not as flexible as slices. Therefore, in most situations, programmers often prefer to use slices rather than arrays to manage data.
