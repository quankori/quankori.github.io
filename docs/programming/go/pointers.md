---
title: Pointers
---

## Pointers

Pointers in Go are an important concept that allows you to reference and work directly with a variable's memory location. Instead of passing the value of a variable, you pass the address of the variable to reference the actual data storage location. This enables you to modify the value of the original variable through the address pointed to by the pointer.

Here's an easy-to-understand example of how to use pointers in Go:

```go
package main

import "fmt"

func main() {
    num := 42
    fmt.Println("Value of num:", num)

    var ptr *int
    ptr = &num

    fmt.Printf("Address of num: %p\n", &num)
    fmt.Printf("Value stored in ptr: %p\n", ptr)

    *ptr = 99

    fmt.Println("Value of num after using pointer:", num)
}

```

In this example:

1. We declare a variable num with an initial value of 42.
2. We declare a pointer ptr of type *int to point to the variable num.
3. We print the address of the variable num using %p in the Printf function.
4. We print the value stored in the ptr pointer, also using %p in Printf.
5. By using the pointer, we change the value of the num variable to 99 using the * operator.

```
Value of num: 42
Address of num: 0xc000090000
Value stored in ptr: 0xc000090000
Value of num after using pointer: 99
```

In this example, we see how the ptr pointer points to the num variable and how it allows us to change the value of num through the pointer. This illustrates how pointers enable access to and modification of the value of the original variable through its address.

## Pass variables

In Go, when you pass a variable to a function, you encounter two important concepts: pass by value and pass by reference. However, Go only supports passing variables by value and does not support passing by reference directly, unlike some other languages like C++ or Java.

**Pass By Value**

When you pass a variable into a function in Go, you essentially create a copy of the value of that variable and pass this copy into the function. Regardless of whether you modify the value of the variable inside the function or not, the original variable outside the function remains unaffected.

```go
package main

import "fmt"

func modifyValue(x int) {
    x = 20
    fmt.Println("Inside function:", x)
}

func main() {
    num := 10
    modifyValue(num)
    fmt.Println("Outside function:", num)
}

// Inside function: 20
// Outside function: 10
```

**Pass By Reference**

```go
package main

import "fmt"

func modifyValueByReference(x *int) {
    *x = 20
    fmt.Println("Inside function:", *x)
}

func main() {
    num := 10
    modifyValueByReference(&num)
    fmt.Println("Outside function:", num)
}

// Inside function: 20
// Outside function: 20
```

In the example above, we pass a pointer to the variable num to the function, allowing the function to change the value of the original variable by referencing its address.

**Specials case**

In Go, even though we pass variables by value, in some special cases, we can still modify the value of the original variable through pass by value. This occurs when we pass a variable of a data type that has the ability to change.

One of the classic examples of this is when passing a slice into a function. Even though the slice is passed by value, changing the value of an element within the slice inside the function affects the original slice.

```go
package main

import "fmt"

func modifySlice(s []int) {
    s[0] = 100
    fmt.Println("Inside function:", s)
}

func main() {
    numbers := []int{1, 2, 3}
    modifySlice(numbers)
    fmt.Println("Outside function:", numbers)
}

// Inside function: [100 2 3]
// Outside function: [100 2 3]
```

In this example, although we pass the numbers slice into the modifySlice function by value, changing the value of an element within the slice inside the function has affected the original slice.

Other data types such as maps, channels, and pointers can also create a similar effect when passed by value but still allow modification of the original variable's data through pass by value. However, this is not the typical case and depends on how the data type is implemented within Go.
