---
title: Big O Notation
---

## Concept

Big O notation describes the performance or complexity of an algorithm. It provides a way to express the growth rate of the execution time or memory usage of an algorithm as the input size increases.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/5.png)

**O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)**

O(1): Constant time - the execution time does not change with the input size.

```go
func getFirstElement(arr []int) int {
    return arr[0]
}
```

O(log n): Logarithmic time - the execution time grows logarithmically with the input size (e.g., binary search).

```go
func binarySearch(arr []int, target int) bool {
    left, right := 0, len(arr)-1
    for left <= right {
        mid := (left + right) / 2
        if arr[mid] == target {
            return true
        } else if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return false
}
```

O(n): Linear time - the execution time grows linearly with the input size (e.g., traversing an array).

```go
func findMax(arr []int) int {
    maxVal := arr[0]
    for _, val := range arr {
        if val > maxVal {
            maxVal = val
        }
    }
    return maxVal
}
```

O(n log n): Linearithmic time - the execution time grows in a combination of linear and logarithmic times (e.g., merge sort, quicksort).

```go
func mergeSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    return merge(left, right)
}

func merge(left, right []int) []int {
    result := make([]int, 0)
    i, j := 0, 0
    for i < len(left) && j < len(right) {
        if left[i] < right[j] {
            result = append(result, left[i])
            i++
        } else {
            result = append(result, right[j])
            j++
        }
    }
    result = append(result, left[i:]...)
    result = append(result, right[j:]...)
    return result
}
```

O(n^2): Quadratic time - the execution time grows quadratically with the input size (e.g., bubble sort, selection sort).

```go
func bubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i < n; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}
```

O(2^n): Exponential time - the execution time grows exponentially with the input size (e.g., some recursive algorithms).

```go
func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}
```

O(n!): Factorial time - the execution time grows factorially with the input size (e.g., backtracking algorithms for permutations).

```go
func permutations(str string) []string {
    if len(str) == 0 {
        return []string{""}
    }
    var result []string
    for i := 0; i < len(str); i++ {
        remaining := str[:i] + str[i+1:]
        for _, perm := range permutations(remaining) {
            result = append(result, string(str[i])+perm)
        }
    }
    return result
}
```
