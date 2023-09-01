---
title: Channel
---

## Concept

Channel là một cơ chế được sử dụng để truyền dữ liệu giữa các Goroutines. Nó được sử dụng để đồng bộ hóa việc truy cập dữ liệu giữa các Goroutines. Khi bạn cần gửi dữ liệu giữa các Goroutines mà không gặp vấn đề như tắc nghẽn hoặc điều kiện đua, hoặc khi bạn muốn đồng bộ hóa các nhiệm vụ đồng thời, kênh là một công cụ rất hữu ích.

## Code

```go
func send(c chan int) {
	for i := 0; i < 5; i++ {
		fmt.Printf("send %v to channel\n", i)
		c <- i // send i to channel
	}
}

func receive(c chan int) {
	for i := 0; i < 5; i++ {
		time.Sleep(1 * time.Millisecond)
		s := <-c // receive channel
		fmt.Println(s)
	}
}

// Channel func
func channel() {
	c := make(chan int)
	go send(c)
	go receive(c)
	time.Sleep(100 * time.Millisecond)
	fmt.Println("end")
}
```
