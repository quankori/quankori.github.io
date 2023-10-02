---
title: Context
---

## Concept

"The Context" is a mechanism in Golang used to manage concurrent tasks and control the execution and termination of goroutines. It can be used to communicate information and control concurrent tasks, helping manage resources and preventing tasks from running for too long.

There are three main types of Context in Golang:

**Background**: The default Context used to initialize a new Context.
**TODO**: Used for handling simple and temporary tasks.
**WithCancel**: Allows canceling a task after its Context has expired.
**WithDeadline**: Allows setting a deadline for a task. When the deadline is reached, the Context will automatically cancel the task.
**WithTimeout**: Sets a time limit for task execution. When this time expires, the Context will automatically cancel the task.

If Context is not implemented correctly, goroutines can be blocked or may not be canceled properly. This can lead to resource wastage, reduced application performance, and potential security issues. Therefore, using Context is crucial when developing multithreaded applications to ensure their accuracy and safety.

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func doTask(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println("Task canceled.")
			return
		default:
			fmt.Println("Task is still running.")
			time.Sleep(1 * time.Second)
		}
	}
}

func main() {
	// Create a context with cancellation capability
	ctx, cancel := context.WithCancel(context.Background())

	// Start a goroutine to perform the task
	go doTask(ctx)

	// Allow the task to run for 5 seconds
	time.Sleep(5 * time.Second)

	// Cancel the task using the cancel function
	cancel()

	// Give some time for the cancellation to take effect
	time.Sleep(1 * time.Second)

	fmt.Println("Main function exiting.")
}

```