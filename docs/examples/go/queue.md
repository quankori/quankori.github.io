---
title: Job Queue
---

Build Job Queue system with Golang

```go
package main

import (
	"fmt"
	"sync"
)

func worker(jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
	for j := range jobs {
		fmt.Println("Processing job", j)
		results <- j * 2
	}
	wg.Done()
}

func main() {
	// Create channels for sending jobs and receiving results
	jobs := make(chan int, 100)
	results := make(chan int, 100)

	// Start the worker goroutines
	var wg sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go worker(jobs, results, &wg)
	}

	// Send jobs to the channel
	for i := 0; i < 10; i++ {
		jobs <- i
	}
	close(jobs)

	// Collect the results
	for i := 0; i < 10; i++ {
		fmt.Println("Result:", <-results)
	}

	wg.Wait()
}
```
