---
title: Channel
---

## Concept

Channel là một cơ chế được sử dụng để truyền dữ liệu giữa các Goroutines. Nó được sử dụng để đồng bộ hóa việc truy cập dữ liệu giữa các Goroutines. Khi bạn cần gửi dữ liệu giữa các Goroutines mà không gặp vấn đề như tắc nghẽn hoặc điều kiện đua, hoặc khi bạn muốn đồng bộ hóa các nhiệm vụ đồng thời, kênh là một công cụ rất hữu ích.

## Code

```go
package main

import (
	"fmt"
	"time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
	for job := range jobs {
		fmt.Printf("Worker %d started job %d\n", id, job)
		time.Sleep(time.Second) // Simulate job processing
		fmt.Printf("Worker %d finished job %d\n", id, job)
		results <- job * 2
	}
}

func main() {
	numJobs := 5
	numWorkers := 3

	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	for i := 1; i <= numWorkers; i++ {
		go worker(i, jobs, results)
	}

	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}

	close(jobs)

	for a := 1; a <= numJobs; a++ {
		result := <-results
		fmt.Printf("Received result: %d\n", result)
	}
}
```
