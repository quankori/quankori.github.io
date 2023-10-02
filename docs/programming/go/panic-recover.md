---
title: Panic & Recover
---

In the Go (Golang) language, panic and recover are two mechanisms used to handle unexpected situations and recover from errors in source code.

**Panic**:

Panic is a function used to trigger an unrecoverable situation in a program. When panic is triggered, the program's execution is halted, and an error message is printed. Using panic is generally considered undesirable and should only be used in situations where recovery is impossible, such as encountering a severe error that the program cannot continue to handle.

**Recover**:

Recover is a function used to recover from a panic situation and continue program execution. The recover function is typically used within a defer block and can only operate within a goroutine function. When recover is called within a defer block and a panic occurs in that function or in one of its parent calling functions, recover will return the panic value, and the program will continue execution from the point where recover was called.


```go
func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r)
        }
    }()

    fmt.Println("Start")
    panic("Something went wrong")
    fmt.Println("End") // Không được thực thi do panic đã xảy ra
}
```

In the example above, after a panic occurs, the defer block uses recover to recover from the panic situation and print the message "Recovered: Something went wrong." The statement after panic (fmt.Println("End")) will not be executed because the program was halted when the panic occurred.

In summary, panic and recover are mechanisms that allow you to handle unexpected situations and potentially recover from panic situations in Go source code. However, their usage should be done carefully and only when truly necessary.