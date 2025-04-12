---
title: Golang
---

## Core Architecture

**Core architecture**:

- **Concurrency model**: Built-in support for concurrent execution.
  - **Goroutines**: Lightweight threads managed by Go runtime.
  - **Channels**: Communication pipes between goroutines.
  - **Select statement**: Multiplexes channel operations.
- **Runtime**: Efficient execution environment.
  - **Garbage collector**: Low-latency memory management.
  - **Scheduler**: Manages goroutines with GOMAXPROCS.
  - **Lightweight threads**: Underpins goroutines.
- **Language features**: Core syntax and design.
  - **Static typing**: Compile-time type checking.
  - **Interfaces**: Implicit implementation for flexibility.
  - **Structs & methods**: Object-like structures with behavior.
  - **Error handling**: Explicit error returns.

### Concurrency Service

```go
// src/core/concurrency.go (**Concurrency model**)
package core

import (
	"fmt"
	"time"
)

type ConcurrencyService struct{}

func (s *ConcurrencyService) RunGoroutine() {
	go func() {
		time.Sleep(1 * time.Second)
		fmt.Println("Goroutine completed")
	}()
}

func (s *ConcurrencyService) UseChannel() string {
	ch := make(chan string)
	go func() {
		time.Sleep(1 * time.Second)
		ch <- "Channel message"
	}()
	return <-ch
}

func (s *ConcurrencyService) UseSelect() string {
	ch1 := make(chan string)
	ch2 := make(chan string)
	go func() {
		time.Sleep(1 * time.Second)
		ch1 <- "Message 1"
	}()
	go func() {
		time.Sleep(2 * time.Second)
		ch2 <- "Message 2"
	}()
	select {
	case msg1 := <-ch1:
		return msg1
	case msg2 := <-ch2:
		return msg2
	case <-time.After(3 * time.Second):
		return "Timeout"
	}
}
```

**Concurrency Service Details**:

- **Purpose**: Demonstrates goroutines, channels, and select statements for concurrent execution.
- **Explanation**: `RunGoroutine` launches a lightweight thread (goroutine) that runs asynchronously, `UseChannel` sends and receives a message via a channel, and `UseSelect` multiplexes between two channels with a timeout fallback.
- **Concurrency Model Details**:
  - **Goroutines**: Lightweight threads (2KB stack initially) managed by Go runtime, not OS threads, allowing thousands to run efficiently.
  - **Channels**: Typed pipes for safe communication between goroutines, avoiding race conditions (e.g., `ch <- data` sends, `<-ch` receives).
  - **Select Statement**: Waits on multiple channels, executing the first ready case, enabling non-blocking multiplexing.

### Runtime Service

```go
// src/core/runtime.go (**Runtime**)
package core

import (
	"fmt"
	"runtime"
)

type RuntimeService struct{}

func (s *RuntimeService) TriggerGC() {
	runtime.GC()
	fmt.Println("Garbage collection triggered")
}

func (s *RuntimeService) SetSchedulerCores(cores int) {
	runtime.GOMAXPROCS(cores)
	fmt.Println("GOMAXPROCS set to:", runtime.GOMAXPROCS(0))
}
```

**Runtime Service Details**:

- **Purpose**: Manages garbage collection and scheduler settings.
- **Explanation**: `TriggerGC` explicitly triggers garbage collection, while `SetSchedulerCores` adjusts the number of OS threads used by the Go scheduler via `GOMAXPROCS`.
- **Runtime Details**:
  - **Garbage Collector**: Low-latency, concurrent mark-and-sweep; runs when heap grows beyond threshold or manually triggered.
  - **Scheduler**: Manages goroutines across OS threads; `GOMAXPROCS` sets thread count (defaults to CPU cores).
  - **Lightweight Threads**: Goroutines are multiplexed onto OS threads by the scheduler, reducing overhead.

### Language Features Service

```go
// src/core/language.go (**Language features**)
package core

import "fmt"

type User struct {
	ID   int
	Name string
}

type LanguageService struct{}

func (s *LanguageService) CreateUser(id int, name string) User {
	return User{ID: id, Name: name}
}

func (s *LanguageService) PrintUser(u User) error {
	if u.ID <= 0 {
		return fmt.Errorf("invalid ID: %d", u.ID)
	}
	fmt.Printf("User: %s (ID: %d)\n", u.Name, u.ID)
	return nil
}
```

**Language Features Service Details**:

- **Purpose**: Showcases structs, methods, and error handling.
- **Explanation**: `CreateUser` returns a `User` struct, while `PrintUser` demonstrates method attachment and explicit error handling with a condition check.
- **Language Features Details**:
  - **Static Typing**: Compile-time type checking (e.g., `int`, `string`).
  - **Interfaces**: Implicitly implemented (not shown here but common, e.g., `io.Reader`).
  - **Structs & Methods**: Structs define data; methods attach behavior (e.g., `(s *LanguageService)`).
  - **Error Handling**: Explicit via `error` return type, no exceptions.

---

## Performance Optimization

**Performance optimization**:

- **Memory management**: Optimizes resource usage.
  - **Stack vs heap allocation**: Determines memory location.
  - **Escape analysis**: Optimizes allocation decisions.
  - **Pprof profiling**: Analyzes performance metrics.
- **Concurrency patterns**: Leverages goroutines.
  - **Worker pools**: Distributes tasks across workers.
  - **Fan-out/fan-in**: Parallelizes and aggregates tasks.
  - **Pipeline**: Chains data processing stages.
- **Benchmarking**: Measures performance.
  - **Go testing framework**: Built-in benchmarking tools.
  - **Pprof & trace**: Detailed profiling and tracing.
- **Compilation**: Produces efficient binaries.
  - **Single binary output**: Simplifies deployment.
  - **Cross-compilation**: Builds for multiple platforms.
  - **Optimized machine code**: High-performance execution.

### Memory Service

```go
// src/perf/memory.go (**Memory management**)
package perf

import (
	"fmt"
	"runtime/pprof"
	"os"
)

type MemoryService struct{}

func (s *MemoryService) AllocateOnStack() int {
	x := 42
	return x
}

func (s *MemoryService) AllocateOnHeap() *int {
	x := 42
	return &x
}

func (s *MemoryService) ProfileMemory() {
	f, _ := os.Create("mem.pprof")
	pprof.WriteHeapProfile(f)
	f.Close()
	fmt.Println("Memory profile written to mem.pprof")
}
```

**Memory Service Details**:

- **Purpose**: Demonstrates stack vs heap allocation and pprof profiling.
- **Explanation**: `AllocateOnStack` keeps `x` on the stack (local, short-lived), `AllocateOnHeap` forces `x` to the heap via pointer return (escape analysis), and `ProfileMemory` writes a heap profile to a file for analysis.
- **Memory Management Details**:
  - **Stack vs Heap**: Stack for local vars (fast, auto-cleaned); heap for pointers/shared data (GC-managed).
  - **Escape Analysis**: Compiler decides allocation; if a variable escapes (e.g., returned), it goes to heap.
  - **Pprof Profiling**: Captures heap usage (e.g., `go tool pprof mem.pprof`).

### Concurrency Patterns Service

```go
// src/perf/concurrency.go (**Concurrency patterns**)
package perf

import (
	"fmt"
	"sync"
)

type ConcurrencyPatternsService struct{}

func (s *ConcurrencyPatternsService) WorkerPool(tasks []int) {
	var wg sync.WaitGroup
	for _, task := range tasks {
		wg.Add(1)
		go func(t int) {
			defer wg.Done()
			fmt.Println("Worker processed:", t)
		}(task)
	}
	wg.Wait()
}

func (s *ConcurrencyPatternsService) FanOutFanIn(tasks []int) int {
	var wg sync.WaitGroup
	results := make(chan int, len(tasks))

	for _, task := range tasks {
		wg.Add(1)
		go func(t int) {
			defer wg.Done()
			results <- t * 2
		}(task)
	}

	go func() {
		wg.Wait()
		close(results)
	}()

	sum := 0
	for result := range results {
		sum += result
	}
	return sum
}
```

**Concurrency Patterns Service Details**:

- **Purpose**: Implements worker pools and fan-out/fan-in patterns.
- **Explanation**: `WorkerPool` uses a WaitGroup to distribute tasks across goroutines, while `FanOutFanIn` parallelizes tasks (fan-out) and aggregates results via a channel (fan-in).
- **Concurrency Patterns Details**:
  - **Worker Pools**: Limits concurrency by pooling goroutines.
  - **Fan-out/Fan-in**: Fans out tasks to workers, fans in results.
  - **Pipeline**: Not shown but chains stages (e.g., `chan -> chan -> chan`).

### Benchmarking Service

```go
// src/perf/benchmark.go (**Benchmarking**)
package perf

import "fmt"

type BenchmarkService struct{}

func (s *BenchmarkService) Compute(n int) int {
	sum := 0
	for i := 0; i < n; i++ {
		sum += i
	}
	fmt.Println("Computed sum:", sum)
	return sum
}

// Benchmark example (run with `go test -bench=.`):
// func BenchmarkCompute(b *testing.B) {
//     s := BenchmarkService{}
//     for i := 0; i < b.N; i++ {
//         s.Compute(1000)
//     }
// }
```

**Benchmarking Service Details**:

- **Purpose**: Provides a method for benchmarking computation.
- **Explanation**: `Compute` sums numbers up to `n`, with a conceptual benchmark shown below (not executed here but runnable with `go test`).
- **Benchmarking Details**:
  - **Go Testing Framework**: Built-in `testing` package for benchmarks (e.g., `go test -bench=.`).
  - **Pprof & Trace**: Profiles CPU/memory (e.g., `go tool pprof`) and traces execution.
