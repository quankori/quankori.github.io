---
title: Go Concept
---

## Context

- The Context is a mechanism in Golang used to manage concurrent tasks and to control the execution and termination of goroutines. It can be utilized to transmit information and control concurrent tasks, helping manage resources and prevent tasks from running for too long.

- There are three primary Context types in Golang:

  - **Background**: The default Context used to initiate a new Context.
  - **TODO**: Used to handle simple and temporary tasks.
  - **WithCancel**: Allows a task to be cancelled once its Context has expired.
  - **WithDeadline**: Allows setting a deadline for a task. Once the deadline is reached, the Context will automatically cancel the task.
  - **WithTimeout**: Sets an execution time limit for a task. Once this time is up, the Context will automatically cancel the task.

- Without correctly implementing Context, goroutines might get blocked or might not be properly cancelled. This can lead to resource wastage, decreased application performance, and potential security issues. Therefore, using Context is crucial when developing multi-threaded applications to ensure their correctness and safety.

## Goroutine

Goroutines provide a means to execute tasks concurrently, enhancing the efficiency of an application. When you need to perform tasks concurrently without waiting for a previous task to finish, Goroutines are an excellent choice.

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

A Channel is a mechanism used to transfer data between Goroutines. It is used to synchronize access to data among Goroutines. When you need to send data between Goroutines without facing problems like deadlocks or race conditions, or when you wish to synchronize concurrent tasks, a channel is a highly useful tool.

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

## Mutex

Mutex (Mutual Exclusion) is a synchronization mechanism ensuring that only one Goroutine accesses data at any given time, preventing data conflicts when accessed simultaneously by multiple Goroutines. When you need to synchronize data access among Goroutines and ensure data is accessed correctly, Mutex is the right tool.

```go

// Khai báo một instance mutex
var mu sync.Mutex

//Khai báo biến count được truy cập bởi tất cả các routine
var count = 0

// Sao chép count vào temp, thực hiện một vài xử lý (tăng dần) và lưu lại vào count
// tạm dừng một khoảng ngẫu nhiên được thêm vào giữa lúc đọc và ghi count
func process(n int) {
	//Vòng lặp tăng count 10 lần
	for i := 0; i < 10; i++ {
		time.Sleep(time.Duration(rand.Int31n(2)) * time.Second)
		//Bắt đầu khoá ở đây
		mu.Lock()
		temp := count
		temp++
		time.Sleep(time.Duration(rand.Int31n(2)) * time.Second)
		count = temp
		// Mở khoá
		mu.Unlock()
	}
	fmt.Println("Count after i="+strconv.Itoa(n)+" Count:", strconv.Itoa(count))
}

// Mutex func
func mutex() {
	//lặp gọi process() 3 lần
	for i := 1; i < 4; i++ {
		go process(i)
	}

	//Tạm dừng để đợi cho tất cả routine hoàn thành
	time.Sleep(25 * time.Second)
	fmt.Println("Final Count:", count)
}
```
