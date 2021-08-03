# Golang Concurrency

- Gorountines

1. Goroutines are extremely lightweight as compared to OS threads.
2. stack size is very small of 2KB as opposed to 8MB of stack size for the OS threads.
3. Context switching is very cheap as it happens in the user space.
4. Goroutines have a very less state to be stored.
5. Hundreds of thousands of goroutines can be created on single machhine

```go
func fun(s string) {
	for i := 0; i < 3; i++ {
		fmt.Println(s)
		time.Sleep(1 * time.Millisecond)
	}
}

func main() {
	// Direct call
	fun("Hello, world")

	// goroutine function call
	go fun("goroutine-1")

	// goroutine with anonymous function
	go func() {
		fun("goroutine-2")
	}()

	// goroutine with function value call
	fv := fun
	go fv("goroutine-3")

	// wait for goroutines to end
	fmt.Println("waiting for goroutines to complete..")
	time.Sleep(1 * time.Second)

	fmt.Println("done..")
}
```
