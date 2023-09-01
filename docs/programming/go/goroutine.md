---
title: Goroutine
---

## Concept

Goroutines cung cấp một cách thức để thực hiện các nhiệm vụ đồng thời, tăng cường hiệu suất của một ứng dụng. Khi bạn cần thực hiện các nhiệm vụ đồng thời mà không cần chờ đợi cho tác vụ trước đó hoàn thành, Goroutines là một lựa chọn tuyệt vời.

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
