---
title: Fundamental CheatSheet
---

### Concurrency

- Goroutine: Lightweight threads managed by the Go runtime, enabling concurrent execution.
- Channel (chan): Facilitates communication and synchronization between goroutines by passing messages.
- Mutex (sync.Mutex): Ensures mutual exclusion, preventing concurrent access to shared resources.
- select Statement: Waits on multiple channel operations, proceeding with whichever is ready first.
- WaitGroup (sync.WaitGroup): Waits for a collection of goroutines to finish executing.

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	var wg sync.WaitGroup       // WaitGroup to wait for goroutines to finish
	var mu sync.Mutex           // Mutex to protect shared resource
	counter := 0                // Shared resource
	ch := make(chan int, 5)     // Buffered channel

	// Goroutine to send data to the channel
	wg.Add(1)
	go func() {
		defer wg.Done()
		for i := 1; i <= 5; i++ {
			ch <- i
			fmt.Printf("Sent: %d\n", i)
			time.Sleep(100 * time.Millisecond)
		}
		close(ch) // Close channel after sending all data
	}()

	// Goroutine to receive data from the channel
	wg.Add(1)
	go func() {
		defer wg.Done()
		for num := range ch {
			mu.Lock()
			counter += num
			fmt.Printf("Received: %d, Counter: %d\n", num, counter)
			mu.Unlock()
			time.Sleep(150 * time.Millisecond)
		}
	}()

	// Using select to handle channel operations
	wg.Add(1)
	go func() {
		defer wg.Done()
		for {
			select {
			case num, ok := <-ch:
				if !ok {
					return
				}
				fmt.Printf("Select received: %d\n", num)
			default:
				fmt.Println("No data available, doing other work...")
				time.Sleep(50 * time.Millisecond)
			}
		}
	}()

	// Wait for all goroutines to finish
	wg.Wait()
	fmt.Printf("Final Counter: %d\n", counter)
}

// Output:
// Sent: 1
// Received: 1, Counter: 1
// Select received: 1
// Sent: 2
// Received: 2, Counter: 3
// Select received: 2
// Sent: 3
// Received: 3, Counter: 6
// Select received: 3
// Sent: 4
// Received: 4, Counter: 10
// Select received: 4
// Sent: 5
// Received: 5, Counter: 15
// Select received: 5
// Final Counter: 15
```

### Context

The context package in Go provides a way to carry deadlines, cancellation signals, and other request-scoped values across API boundaries and goroutines.

- Background: The root context, typically used in main functions, initialization, and tests.
- TODO: A placeholder context, used when you're unsure which context to use.
- WithCancel: Derives a new context that can be canceled.
- WithDeadline: Derives a new context that will automatically be canceled at a specified time.
- WithTimeout: Derives a new context that will automatically be canceled after a specified duration.
- WithValue: Derives a new context that carries a key-value pair.

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	// 1. Background Context
	bg := context.Background()

	// 2. TODO Context
	todo := context.TODO()

	fmt.Println("Background Context:", bg)
	fmt.Println("TODO Context:", todo)

	// 3. WithCancel
	ctx, cancel := context.WithCancel(bg)
	go func() {
		time.Sleep(2 * time.Second)
		fmt.Println("Canceling context")
		cancel()
	}()

	select {
	case <-ctx.Done():
		fmt.Println("Context canceled:", ctx.Err())
	}

	// 4. WithTimeout
	ctxTimeout, cancelTimeout := context.WithTimeout(bg, 1*time.Second)
	defer cancelTimeout()

	select {
	case <-time.After(2 * time.Second):
		fmt.Println("Operation completed")
	case <-ctxTimeout.Done():
		fmt.Println("Timeout:", ctxTimeout.Err())
	}

	// 5. WithDeadline
	deadline := time.Now().Add(1 * time.Second)
	ctxDeadline, cancelDeadline := context.WithDeadline(bg, deadline)
	defer cancelDeadline()

	select {
	case <-time.After(2 * time.Second):
		fmt.Println("Operation completed")
	case <-ctxDeadline.Done():
		fmt.Println("Deadline reached:", ctxDeadline.Err())
	}

	// 6. WithValue
	type key string
	ctxValue := context.WithValue(bg, key("userID"), 42)
	processRequest(ctxValue)
}

func processRequest(ctx context.Context) {
	userID, ok := ctx.Value("userID").(int)
	if !ok {
		fmt.Println("No user ID found")
		return
	}
	fmt.Printf("Processing request for user ID: %d\n", userID)
}

// Output
// Background Context: context.Background
// TODO Context: context.TODO
// Canceling context
// Context canceled: context canceled
// Timeout: context deadline exceeded
// Deadline reached: context deadline exceeded
// Processing request for user ID: 42
```

### Garbage Collection

Go features an automatic garbage collector that manages memory by reclaiming memory occupied by objects that are no longer in use. This eliminates the need for manual memory management, reducing the likelihood of memory leaks and other related issues.

The runtime.GC() function is called to force garbage collection, reclaiming the memory occupied by the slice.

```go
package main

import (
	"fmt"
	"runtime"
	"time"
)

func main() {
	// Display memory stats before allocation
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	fmt.Printf("Before allocation: Alloc = %v KB\n", m.Alloc/1024)

	// Allocate memory
	allocateMemory()

	// Force garbage collection
	runtime.GC()

	// Display memory stats after GC
	runtime.ReadMemStats(&m)
	fmt.Printf("After GC: Alloc = %v KB\n", m.Alloc/1024)
}

func allocateMemory() {
	// Allocate a large slice to consume memory
	slice := make([]byte, 10*1024*1024) // 10 MB
	for i := range slice {
		slice[i] = byte(i % 256)
	}
	fmt.Println("Allocated 10 MB of memory")
	// The slice goes out of scope after this function
}

// Output:
// Before allocation: Alloc = 1234 KB
// Allocated 10 MB of memory
// After GC: Alloc = 1234 KB
```

### Pointer

```go
package main

import (
	"fmt"
)

func main() {
	a := 10
	fmt.Printf("Initial value of a: %d\n", a)

	// Create a pointer to a
	b := &a
	fmt.Printf("Pointer b points to a: %d\n", *b)

	// Modify a via pointer
	*b = 20
	fmt.Printf("After modifying via pointer, a: %d\n", a)

	// Pointer to a pointer
	c := &b
	fmt.Printf("Pointer c points to b: %p\n", c)
	fmt.Printf("Value pointed by c: %d\n", **c)

	// Passing pointer to a function
	increment(&a)
	fmt.Printf("After incrementing via function, a: %d\n", a)
}

func increment(n *int) {
	*n++
	fmt.Printf("Value inside increment function: %d\n", *n)
}

// Output:
// Initial value of a: 10
// Pointer b points to a: 10
// After modifying via pointer, a: 20
// Pointer c points to b: 0xc0000160b8
// Value pointed by c: 20
// Value inside increment function: 21
// After incrementing via function, a: 21
```

### Slice and Array

- Arrays: Fixed-size, ordered collections of elements of the same type. The size is part of the array's type.
- Slices: Dynamic, flexible views into arrays. They provide more powerful and convenient features compared to arrays, such as dynamic sizing.

```go
package main

import (
	"fmt"
)

func main() {
	// Arrays
	var array [3]string
	array[0] = "Apple"
	array[1] = "Banana"
	array[2] = "Cherry"
	fmt.Println("Array:", array)

	// Slices
	slice := []string{"Dog", "Elephant"}
	fmt.Println("Initial Slice:", slice)

	// Append to slice
	slice = append(slice, "Frog")
	fmt.Println("After Append:", slice)

	// Slice capacity and length
	fmt.Printf("Slice Length: %d, Capacity: %d\n", len(slice), cap(slice))

	// Creating a slice from an array
	subSlice := array[1:3]
	fmt.Println("Sub-slice from array:", subSlice)

	// Iterating over a slice
	fmt.Println("Iterating over slice:")
	for index, value := range slice {
		fmt.Printf("Index %d: %s\n", index, value)
	}

	// Using make to create a slice
	madeSlice := make([]int, 5, 10) // length 5, capacity 10
	for i := 0; i < len(madeSlice); i++ {
		madeSlice[i] = i * 2
	}
	fmt.Println("Made Slice:", madeSlice)
	fmt.Printf("Made Slice Length: %d, Capacity: %d\n", len(madeSlice), cap(madeSlice))
}

// Output:
// Array: [Apple Banana Cherry]
// Initial Slice: [Dog Elephant]
// After Append: [Dog Elephant Frog]
// Slice Length: 3, Capacity: 6
// Sub-slice from array: [Banana Cherry]
// Iterating over slice:
// Index 0: Dog
// Index 1: Elephant
// Index 2: Frog
// Made Slice: [0 2 4 6 8]
// Made Slice Length: 5, Capacity: 10
```

### Structs and Interfaces

- Structs: Composite data types that group together variables under a single name. They are used to create complex data structures.
- Interfaces: Define a set of method signatures. Types that implement these methods satisfy the interface, enabling polymorphism and flexible code design.

```go
package main

import (
	"fmt"
)

// Struct definition
type Person struct {
	Name string
	Age  int
}

// Interface definition
type Greeter interface {
	Greet()
}

// Implementing the Greeter interface for Person
func (p Person) Greet() {
	fmt.Printf("Hello, my name is %s and I am %d years old.\n", p.Name, p.Age)
}

// Another struct implementing Greeter
type Robot struct {
	ID string
}

// Implementing the Greeter interface for Robot
func (r Robot) Greet() {
	fmt.Printf("Beep boop. I am robot #%s.\n", r.ID)
}

func main() {
	// Creating instances of structs
	p := Person{Name: "Alice", Age: 30}
	r := Robot{ID: "RX-78"}

	// Using structs directly
	p.Greet()
	r.Greet()

	// Using interface to hold different types
	var g Greeter

	g = p
	g.Greet()

	g = r
	g.Greet()

	// Slice of Greeters
	greeters := []Greeter{p, r}
	fmt.Println("Iterating over Greeters:")
	for _, greeter := range greeters {
		greeter.Greet()
	}
}
```