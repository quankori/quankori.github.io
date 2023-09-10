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

A goroutine is a lightweight, concurrent execution unit that allows you to run functions concurrently. Goroutines are a fundamental feature of Go's concurrency model and are a key part of its approach to building scalable and efficient software.

## Code

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
