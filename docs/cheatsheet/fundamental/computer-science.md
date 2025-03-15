---
title: Computer Science
---

## Core Concepts

**Core concepts**:

- **Stack**: Manages function calls and local variables with a Last-In-First-Out (LIFO) structure, critical for process execution flow.
- **Heap**: Handles dynamic memory allocation for data that persists beyond function calls, used for flexible storage.
- **CPU**: Executes instructions via fetch-decode-execute cycles, leveraging stack and heap for process handling.
- **Process**: Represents a program in execution, moving from client to server, with states (e.g., running, waiting) and memory managed by stack and heap.

### Stack Service

```go
// src/core/stack.go (**Stack**)
package core

import (
	"fmt"
	"net/http"
)

type StackService struct{}

func (s *StackService) HandleRequest(w http.ResponseWriter, r *http.Request) {
	userID := 42 // Local variable on stack
	result := s.processData(userID)
	fmt.Fprintf(w, "Result: %d", result)
}

func (s *StackService) processData(id int) int {
	temp := id * 2 // Another stack variable
	return temp    // Returned to caller, popped off stack
}
```

**Stack Service Details**:

- **Purpose**: Simulates a server handling a client HTTP request, showing stack usage.
- **Explanation**: `HandleRequest` is a server endpoint that receives a client request, creates a local `userID` on the stack, calls `processData` (pushing another frame with `temp` onto the stack), and writes the result back to the client. Each function call adds a frame to the stack, and returns remove them (LIFO).
- **Stack Details**:
  - **Client to Server Flow**: Client sends HTTP request → server creates process → `HandleRequest` is called, pushing its frame onto the stack.
  - **CPU Processing**: Stack stores `userID`, return address, and `temp`; CPU executes instructions within these frames.
  - **Release**: Frames are popped off when functions return, automatically freeing stack memory.

### Heap Service

```go
// src/core/heap.go (**Heap**)
package core

import "fmt"

type HeapService struct{}

func (s *HeapService) FetchUserData(id int) *string {
	data := make([]string, 1) // Heap allocation
	data[0] = fmt.Sprintf("User %d", id)
	result := data[0]         // Copy to local var (stack)
	return &result            // Pointer to heap-allocated string
}
```

**Heap Service Details**:

- **Purpose**: Demonstrates dynamic heap allocation in a server process.
- **Explanation**: `FetchUserData` allocates a slice on the heap with `make`, fills it with user data, and returns a pointer to a string, which persists beyond the function call, requiring garbage collection to release.
- **Heap Details**:
  - **Client to Server Flow**: Client request triggers process → `FetchUserData` allocates memory on heap for response data.
  - **CPU Processing**: CPU manages heap pointers; data persists beyond stack frame.
  - **Release**: Heap memory is freed by the garbage collector when no references remain (e.g., `data` becomes unreachable).

### CPU Service

```go
// src/core/cpu.go (**CPU**)
package core

import "fmt"

type CPUService struct {
	stackSvc *StackService
	heapSvc  *HeapService
}

func NewCPUService(stackSvc *StackService, heapSvc *HeapService) *CPUService {
	return &CPUService{stackSvc: stackSvc, heapSvc: heapSvc}
}

func (s *CPUService) ProcessRequest(id int) string {
	stackResult := s.stackSvc.processData(id)       // Stack-based execution
	heapResult := *s.heapSvc.FetchUserData(id)      // Heap-based data fetch
	return fmt.Sprintf("Stack: %d, Heap: %s", stackResult, heapResult)
}
```

**CPU Service Details**:

- **Purpose**: Simulates CPU processing a client request using stack and heap.
- **Explanation**: `ProcessRequest` calls `processData` (stack-based) and `FetchUserData` (heap-based), combining results to mimic CPU execution across memory types, returning a formatted string as the response.
- **CPU Details**:
  - **Client to Server Flow**: Client request → process created → CPU executes `ProcessRequest`.
  - **Stack vs Heap**: Stack handles local vars (`stackResult`) and call frames; heap stores persistent data (`heapResult`).
  - **Execution**: CPU fetches instructions, decodes them (e.g., function calls), executes using stack for locals and heap for dynamic data.

### Process Service

```go
// src/core/process.go (**Process**)
package core

import (
	"fmt"
	"net/http"
)

type ProcessService struct {
	cpuSvc *CPUService
}

func NewProcessService(cpuSvc *CPUService) *ProcessService {
	return &ProcessService{cpuSvc: cpuSvc}
}

func (s *ProcessService) HandleClientRequest(w http.ResponseWriter, r *http.Request) {
	id := 42 // Simulated client input
	result := s.cpuSvc.ProcessRequest(id)
	fmt.Fprintf(w, result)
}
```

**Process Service Details**:

- **Purpose**: Represents a server process handling a client request.
- **Explanation**: `HandleClientRequest` simulates a client HTTP request, assigns a static ID, calls `ProcessRequest` to process it, and writes the result back to the client, illustrating the process lifecycle.
- **Process Details**:
  - **Client to Server Flow**: Client sends request → OS creates process → `HandleClientRequest` runs → CPU processes → response sent.
  - **States**: Process transitions from "new" (creation) to "running" (execution) to "terminated" (response sent).
  - **Threads**: Single-threaded here; multi-threading possible with goroutines.

---

## Memory Management

**Memory management**:

- **Virtual memory**: Abstracts physical memory with paging.
- **Memory allocation**: Allocates static or dynamic memory.
- **Memory protection**: Isolates process memory spaces.
- **Cache memory**: Speeds up data access with levels.

### Memory Management Service

```go
// src/memory/management.go (**Memory management**)
package memory

import (
	"fmt"
	"runtime"
)

type MemoryManagementService struct{}

func (s *MemoryManagementService) AllocateMemory() {
	stackVar := 42                  // Stack allocation
	heapSlice := make([]int, 1000)  // Heap allocation
	fmt.Println("Stack var:", stackVar, "Heap size:", len(heapSlice))
	runtime.GC() // Suggest garbage collection
}
```

**Memory Management Service Details**:

- **Purpose**: Shows memory allocation and management in a process.
- **Explanation**: `AllocateMemory` allocates `stackVar` on the stack (static) and `heapSlice` on the heap (dynamic), logs their usage, and suggests garbage collection with `runtime.GC()` to manage heap memory.
- **Memory Management Details**:
  - **Virtual Memory**: OS maps `heapSlice` to virtual addresses, abstracting physical RAM.
  - **Allocation**: Stack for `stackVar` (auto-freed), heap for `heapSlice` (GC-managed).
  - **Protection**: Process memory isolated by OS (not shown but inherent).
  - **Cache**: CPU caches `stackVar` for fast access (implicit).

---

## Process Management

**Process management**:

- **Scheduling**: Allocates CPU time to processes.
- **Context switching**: Switches between processes or threads.
- **Inter-process communication**: Enables process data sharing.
- **Process synchronization**: Prevents race conditions.

### Process Management Service

```go
// src/process/management.go (**Process management**)
package process

import (
	"fmt"
	"sync"
)

type ProcessManagementService struct{}

func (s *ProcessManagementService) ScheduleProcesses() {
	var wg sync.WaitGroup
	wg.Add(2)
	go func() { // Process 1
		defer wg.Done()
		fmt.Println("Process 1 running")
	}()
	go func() { // Process 2
		defer wg.Done()
		fmt.Println("Process 2 running")
	}()
	wg.Wait()
}

func (s *ProcessManagementService) Communicate() string {
	ch := make(chan string)
	go func() {
		ch <- "Server response"
	}()
	return <-ch
}
```

**Process Management Service Details**:

- **Purpose**: Simulates scheduling and IPC in a server context.
- **Explanation**: `ScheduleProcesses` launches two goroutines (simulating processes), uses a `WaitGroup` for synchronization, and `Communicate` sends a message via a channel, mimicking client-server IPC.
- **Process Management Details**:
  - **Scheduling**: Go runtime schedules goroutines (processes) on CPU cores.
  - **Context Switching**: Implicit when switching between goroutines.
  - **IPC**: Channels simulate client-server data exchange.
  - **Synchronization**: `WaitGroup` ensures process completion.

---

## CPU Architecture

**CPU architecture**:

- **Instruction execution**: Runs fetch-decode-execute cycles.
- **Multi-core processing**: Parallelizes tasks across cores.
- **Interrupts**: Handles external or internal events.
- **CPU scheduling**: Optimizes core usage.

### CPU Architecture Service

```go
// src/cpu/architecture.go (**CPU architecture**)
package cpu

import (
	"fmt"
	"runtime"
)

type CPUArchitectureService struct{}

func (s *CPUArchitectureService) ExecuteInstructions(cycles int) int {
	sum := 0
	for i := 0; i < cycles; i++ {
		sum += i
	}
	fmt.Println("Instructions executed, result:", sum)
	return sum
}

func (s *CPUArchitectureService) MultiCoreProcess() {
	runtime.GOMAXPROCS(2) // Use 2 cores
	go func() {
		fmt.Println("Core 1 processing")
	}()
	go func() {
		fmt.Println("Core 2 processing")
	}()
}
```

**CPU Architecture Service Details**:

- **Purpose**: Simulates CPU execution and multi-core processing.
- **Explanation**: `ExecuteInstructions` runs a loop to mimic fetch-decode-execute cycles, while `MultiCoreProcess` sets `GOMAXPROCS` to 2 and launches goroutines to simulate multi-core parallelism.
- **CPU Architecture Details**:
  - **Client to Server**: Request triggers process → CPU executes `ExecuteInstructions`.
  - **Stack vs Heap**: Stack for `sum` (local), heap not used here.
  - **Multi-core**: Goroutines run on separate cores if available.

---

## Performance Optimization

**Performance optimization**:

- **Memory optimization**: Enhances data locality.
- **CPU optimization**: Improves instruction execution.
- **Profiling tools**: Analyzes runtime performance.
- **Concurrency optimization**: Boosts multi-threading.

### Performance Optimization Service

```go
// src/perf/optimization.go (**Performance optimization**)
package perf

import (
	"fmt"
	"runtime/pprof"
	"os"
)

type PerformanceOptimizationService struct{}

func (s *PerformanceOptimizationService) OptimizeMemory() {
	data := make([]int, 1000)
	for i := 0; i < len(data); i++ {
		data[i] = i
	}
	fmt.Println("Memory optimized, size:", len(data))
}

func (s *PerformanceOptimizationService) ProfileCPU() {
	f, _ := os.Create("cpu.pprof")
	pprof.StartCPUProfile(f)
	defer pprof.StopCPUProfile()
	s.OptimizeMemory()
	fmt.Println("CPU profile written to cpu.pprof")
}
```

**Performance Optimization Service Details**:

- **Purpose**: Demonstrates memory locality and CPU profiling.
- **Explanation**: `OptimizeMemory` allocates a slice with sequential access to optimize cache usage, `ProfileCPU` uses `pprof` to profile the CPU during this operation, writing results to a file.
- **Performance Optimization Details**:
  - **Client to Server**: Request triggers `OptimizeMemory` → CPU optimizes via locality.
  - **Stack vs Heap**: Stack for loop vars, heap for `data` (released by GC when unreachable).
  - **Profiling**: `pprof` analyzes performance for tuning.

---

## Key Insights

- **Process Flow**: Client request → OS creates process → CPU executes using stack (locals) and heap (dynamic data) → response sent → stack pops, heap GC’d.
- **CPU Processing**: Stack manages call flow (fast, fixed-size); heap handles persistent data (slower, flexible).
- **Memory Release**: Stack auto-frees on return; heap relies on GC when references are gone.
