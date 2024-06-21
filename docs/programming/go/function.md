---
title: Function
---

"Closures" and "Anonymous Functions" are two important concepts in Go (Golang) programming related to handling functions and variable scope.

**Closures trong Golang**:

Closures in Go refer to the ability of a function (nested function) to access and use variables outside of its scope. Closures allow you to pass variables to a nested function and retain the state of those variables even after the parent function has finished executing.

```go
func main() {
    x := 10

    add := func(y int) int {
        return x + y
    }

    result := add(5) // result = 10 + 5 = 15
    fmt.Println(result)
}
```

In the example above, the "add" function is a closure that can access the variable "x" outside its scope.

**Anonymous Functions trong Golang**:

Anonymous Functions, also known as lambda functions, are unnamed functions defined and used at the place where they are created. In Go, you can declare and use anonymous functions directly.

```go
func main() {
    add := func(x, y int) int {
        return x + y
    }

    result := add(5, 3) // result = 5 + 3 = 8
    fmt.Println(result)
}
```

In this example, the "add" function is an anonymous function assigned to the "add" variable and used right on the spot.

Both closures and anonymous functions in Go provide the ability to create more flexible source code and optimize the programming process by efficiently using functions in specific situations.
