---
title: Concurrency Model
---

## Goroutine

A goroutine is a lightweight, concurrent execution unit that allows you to run functions concurrently. Goroutines are a fundamental feature of Go's concurrency model and are a key part of its approach to building scalable and efficient software.

```go
func numbers() {
	for i := 1; i <= 5; i++ {
		time.Sleep(250 * time.Millisecond)
		fmt.Printf("%d ", i)
	}
}
func alphabets() {
	for i := 'a'; i <= 'e'; i++ {
		time.Sleep(400 * time.Millisecond)
		fmt.Printf("%c ", i)
	}
}

// Goroutines func
func goroutines() {
	go numbers()
	go alphabets()
	time.Sleep(3000 * time.Millisecond)
	fmt.Println("main terminated")
}
```

## Channel

A channel is a built-in concurrency primitive that facilitates communication and synchronization between goroutines (concurrently executing functions or threads of control). Channels are a fundamental feature of Go's concurrency model and are designed to help goroutines safely exchange data and coordinate their activities

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

## Mutex

A mutex (short for "mutual exclusion") is a synchronization primitive that is used to protect shared data from concurrent access by multiple goroutines. Mutexes are a fundamental part of Go's concurrency model and are essential for preventing data races and ensuring safe concurrent access to shared resources.

```go

var mu sync.Mutex

var count = 0

func process(n int) {
	for i := 0; i < 10; i++ {
		time.Sleep(time.Duration(rand.Int31n(2)) * time.Second)
		mu.Lock()
		temp := count
		temp++
		time.Sleep(time.Duration(rand.Int31n(2)) * time.Second)
		count = temp
		mu.Unlock()
	}
	fmt.Println("Count after i="+strconv.Itoa(n)+" Count:", strconv.Itoa(count))
}

// Mutex func
func mutex() {
	for i := 1; i < 4; i++ {
		go process(i)
	}
	time.Sleep(25 * time.Second)
	fmt.Println("Final Count:", count)
}
```

## Wait Group

`sync.WaitGroup` is a synchronization primitive in Go that is used to wait for a collection of goroutines (concurrently executing functions or threads of control) to finish their execution before proceeding with further processing. It is a way to coordinate and synchronize the activities of goroutines.

```go
package concurrency

import (
	"fmt"
	"sync"
)

func factorial(n int, wg *sync.WaitGroup) {
	defer wg.Done()
	result := 1
	for i := 2; i <= n; i++ {
		result *= i
	}
	fmt.Printf("Factorial of %d is %d\n", n, result)
}

func Sync() {
	var wg sync.WaitGroup

	// Calculate factorial concurrently for two numbers
	numbers := []int{5, 6}

	for _, n := range numbers {
		wg.Add(1)
		go factorial(n, &wg)
	}

	// Wait for all goroutines to finish
	wg.Wait()
}
```
