---
title: Computer Science
---

## Overview

**Computer Science Fundamentals** cover the essential building blocks of computing systems, including memory management (**Stack** and **Heap**), processor operations (**CPU**), and execution units (**Processes**). These concepts underpin operating systems, software performance, and hardware-software interactions, crucial for understanding how programs run efficiently and reliably.

**Core concepts**:

- **Stack**: Manages function calls with LIFO structure.
- **Heap**: Handles dynamic memory allocation.
- **CPU**: Executes instructions via cycles and caching.
- **Process**: Represents program execution with states and threads.

**Memory management**:

- **Virtual memory**: Abstracts physical memory with paging.
- **Memory allocation**: Allocates static or dynamic memory.
- **Memory protection**: Isolates process memory spaces.
- **Cache memory**: Speeds up data access with levels.

**Process management**:

- **Scheduling**: Allocates CPU time to processes.
- **Context switching**: Switches between processes or threads.
- **Inter-process communication**: Enables process data sharing.
- **Process synchronization**: Prevents race conditions.

**CPU architecture**:

- **Instruction execution**: Runs fetch-decode-execute cycles.
- **Multi-core processing**: Parallelizes tasks across cores.
- **Interrupts**: Handles external or internal events.
- **CPU scheduling**: Optimizes core usage.

**Performance optimization**:

- **Memory optimization**: Enhances data locality.
- **CPU optimization**: Improves instruction execution.
- **Profiling tools**: Analyzes runtime performance.
- **Concurrency optimization**: Boosts multi-threading.

**Use cases**:

- **Operating systems**: Manages hardware and processes.
- **Embedded systems**: Runs on constrained devices.
- **High-performance computing**: Scales for complex tasks.
- **Real-time systems**: Ensures timely execution.

**Source Tree** (C Example):

```
src/
├── core/
│   └── memory.c   (Stack & Heap)
│   └── cpu.c      (CPU Simulation)
├── process/
│   └── proc.c     (Process & Threads)
├── main.c
```

**Bash Scripts & Commands**:

- **Compile and Run C Program (Bash Script)**:

  ```bash
  #!/bin/bash
  gcc -o myapp src/main.c src/core/memory.c src/core/cpu.c src/process/proc.c -pthread
  ./myapp
  ```

- **Profile with Gprof (Bash Script)**:

  ```bash
  #!/bin/bash
  gcc -pg -o myapp src/main.c src/core/memory.c src/core/cpu.c src/process/proc.c -pthread
  ./myapp
  gprof myapp gmon.out > profile.txt
  ```

- **Commands**:

  ```bash
  # Check CPU usage
  top

  # Monitor memory
  free -m

  # Run with Valgrind
  valgrind --leak-check=yes ./myapp
  ```

**C Example** (Simulating Concepts):

```c
// src/core/memory.c (**Stack & Heap**)
#include <stdio.h>
#include <stdlib.h>

void stackExample(int depth) {
    if (depth > 1000) return; // Prevent **Stack overflow**
    int stackVar = depth;
    printf("Stack depth: %d\n", stackVar);
    stackExample(depth + 1); // **Function call stack**
}

void heapExample() {
    int* heapVar = (int*)malloc(sizeof(int) * 10); // **Dynamic memory allocation**
    if (heapVar) {
        heapVar[0] = 42;
        printf("Heap value: %d\n", heapVar[0]);
        free(heapVar); // **Heap management**
    }
}

// src/core/cpu.c (**CPU Simulation**)
#include <stdio.h>

void cpuSimulation() {
    int result = 0;
    for (int i = 0; i < 1000000; i++) { // Simulate **Instruction execution**
        result += i; // **Pipelining** would optimize this
    }
    printf("CPU simulation result: %d\n", result);
}

// src/process/proc.c (**Process & Threads**)
#include <pthread.h>
#include <stdio.h>

void* threadFunc(void* arg) {
    printf("Thread running: %ld\n", (long)arg);
    return NULL;
}

void processExample() {
    pthread_t thread;
    pthread_create(&thread, NULL, threadFunc, (void*)1); // **Multiprocessing & Threads**
    pthread_join(thread, NULL);
    printf("Main process continues\n");
}

// src/main.c
#include <stdio.h>
#include "core/memory.h"
#include "core/cpu.h"
#include "process/proc.h"

int main() {
    printf("=== Stack Example ===\n");
    stackExample(0); // **Stack**

    printf("=== Heap Example ===\n");
    heapExample(); // **Heap**

    printf("=== CPU Simulation ===\n");
    cpuSimulation(); // **CPU**

    printf("=== Process Example ===\n");
    processExample(); // **Process**

    return 0;
}
```

**Notes**:

- Requires a C compiler (e.g., `gcc`) and `pthread` library.
- Bash scripts assume `gcc`, `gprof`, and `valgrind` installed; adjust paths as needed.
- Example simulates basic concepts; real-world apps would use OS APIs (e.g., `fork`, `mmap`).

## Key Differences

- **Core Concepts**: Stack (static, fast), Heap (dynamic, flexible), CPU (execution), Process (runtime).
- **Memory Management**: Virtual memory and caching optimize access.
- **Process Management**: Scheduling and IPC manage execution.
- **CPU Architecture**: Multi-core and interrupts enhance processing.
- **Performance Optimization**: Locality and parallelism boost efficiency.
- **Use Cases**: Spans OS, embedded, HPC, and real-time systems.
