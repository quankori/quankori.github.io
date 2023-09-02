---
title: Slices & Array
---

Slices và Arrays là hai cấu trúc dữ liệu trong Go liên quan đến việc lưu trữ các phần tử có cùng kiểu dữ liệu. Tuy nhiên, chúng có sự khác biệt quan trọng về khả năng thay đổi kích thước và cách hoạt động.

**Slices trong Go**:

Slices trong Go là một cấu trúc dữ liệu linh hoạt giúp bạn làm việc với mảng động. Một slice là một "view" linh hoạt của mảng gốc, cho phép bạn thay đổi kích thước của mảng mà không cần phải tạo mảng mới. Slices giúp quản lý và truy cập mảng dễ dàng hơn.

Dưới đây là một ví dụ dễ hiểu về cách sử dụng slices:

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

Mảng (array) là một cấu trúc dữ liệu cơ bản trong Go dùng để lưu trữ các phần tử có cùng kiểu dữ liệu. Kích thước của mảng được xác định khi khai báo và không thay đổi sau đó. Điều này tạo ra một hạn chế về khả năng thay đổi kích thước của mảng.

```go
primes := [6]int{2, 3, 5, 7, 11, 13}
```

Tuy nhiên, mảng trong Go có hạn chế về khả năng thay đổi kích thước và không linh hoạt như slices. Do đó, trong hầu hết các tình huống, người lập trình viên thường ưu tiên sử dụng slices hơn là mảng để quản lý dữ liệu.
