---
title: Big O Notation
---

## Concept

Big O is a concept in the field of computing and algorithm analysis used to assess the performance of an algorithm based on the size of its input. Big O is often used to measure the time complexity of an algorithm, which means how the execution time of the algorithm increases as the input size grows.


![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/5.png)

**O(n)**: This is a linear time complexity, meaning the execution time of the algorithm increases linearly at a constant rate with the size of the input. For example, if you have a list with n elements and you need to iterate through each element, the execution time of the algorithm will increase linearly with n.

```python
def example_linear_time_algorithm(arr):
    total = 0
    for num in arr:
        total += num
    return total

arr = [1, 2, 3, 4, 5]
result = example_linear_time_algorithm(arr)
print(result)
```

**O(n^2)**: Quadratic time complexity, meaning the execution time of the algorithm increases quadratically with the size of the input. For example, the Bubble Sort algorithm.

```python
def example_quadratic_time_algorithm(arr):
    total = 0
    for i in arr:
        for j in arr:
            total += i * j
    return total

arr = [1, 2, 3, 4]
result = example_quadratic_time_algorithm(arr)
print(result)
```

**O(2^n)**: Exponential time complexity, where the execution time increases exponentially with the input size. For example, solving the Tower of Hanoi problem.

```python
def recursive_fibonacci(n):
    if n <= 1:
        return n
    else:
        return recursive_fibonacci(n-1) + recursive_fibonacci(n-2)

result = recursive_fibonacci(5)
print(result)
```

**O(n!)**: Factorial time complexity, where the execution time grows according to the factorial of the input size. For example, computing permutations of n elements.

**O(log n)**: This is logarithmic time complexity, meaning the execution time of the algorithm grows slower than the size of the input. It often occurs when an algorithm divides data efficiently and eliminates a portion of data in each step, such as the binary search algorithm in a sorted list. This means that doubling the size of the input may only increase the execution time by a constant factor compared to the previous execution time.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = 6
result = binary_search(arr, target)
print(result)
```

**O(n log n)**: This is a nearly linear time complexity, but it is faster than O(n^2) (quadratic) for sorting and processing large data. Merge Sort and Quick Sort algorithms are common examples of this complexity.

Now, to explain Logarithm (log) and why it's important in algorithm analysis:

**Logarithm (log)**: Logarithm is a mathematical operation used to find the exponent needed to raise a specific base to obtain a particular number. Specifically, the log with base a of number b (denoted as log_a(b)) is the exponent that a must be raised to in order to equal b.

For example, log_2(8) = 3, because 2^3 = 8

When it comes to algorithm analysis, log n is often associated with how efficiently an algorithm divides data and reduces the size of data to be processed after each step. This significantly reduces the execution time of the algorithm as the input size increases.

A specific example: The binary search algorithm uses log n. If you have a list of 1000 elements and you want to find an element in it, the binary search algorithm will take a maximum of about 10 steps (log_2(1000) ≈ 10) to find the result. In contrast, a linear search algorithm (O(n)) would require a maximum of 1000 steps.

In summary, log n and n log n are important complexity classes in algorithm analysis, playing a crucial role in evaluating and comparing the performance of different algorithms.

## Best Case and Worst Case

**Best Case Scenario (Best-Case Time Complexity)**: This represents the minimum amount of time an algorithm takes to complete its task for a given input. In other words, it describes the most favorable conditions for the algorithm. The best-case time complexity is denoted as O(f(n)), where f(n) represents the minimum number of basic operations (comparisons, assignments, etc.) required to solve the problem.

For example, consider a linear search algorithm that searches for a specific element in an array. In the best-case scenario, the element is found at the beginning of the array, and the algorithm only needs to make one comparison. Therefore, the best-case time complexity of this algorithm is O(1).

**Worst Case Scenario (Worst-Case Time Complexity)**: This represents the maximum amount of time an algorithm takes to complete its task for a given input. It describes the least favorable conditions for the algorithm. The worst-case time complexity is also denoted as O(g(n)), where g(n) represents the maximum number of basic operations required to solve the problem.

For example, consider the same linear search algorithm. In the worst-case scenario, the element is either not present in the array or is found at the end of the array. In this case, the algorithm must iterate through the entire array, making n comparisons. Therefore, the worst-case time complexity of this algorithm is O(n).

```python
# Binary Search Algorithm (Assumes sorted array)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1  # Element not found

arr = [1, 2, 3, 4, 5, 6]
target = 3

# Best Case: Element is found in the middle
best_case_result = binary_search(arr, 3)

# Worst Case: Element is not present or found at the ends
worst_case_result = binary_search(arr, 7)

print("Best Case Result:", best_case_result)  # O(1)
print("Worst Case Result:", worst_case_result)  # O(log n)
```


