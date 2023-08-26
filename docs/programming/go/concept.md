---
title: Go Concept
---

## Context

The Context là một cơ chế trong Golang được sử dụng để quản lý các nhiệm vụ đồng thời và kiểm soát việc thực hiện và chấm dứt của các goroutine. Nó có thể được sử dụng để truyền thông tin và kiểm soát các nhiệm vụ đồng thời, giúp quản lý tài nguyên và ngăn các nhiệm vụ chạy quá lâu.

- Có ba loại Context chính trong Golang:

  - **Background**: Context mặc định được sử dụng để khởi tạo một Context mới.
  - **TODO**: Được sử dụng để xử lý các nhiệm vụ đơn giản và tạm thời.
  - **WithCancel**:Cho phép hủy một nhiệm vụ sau khi Context của nó đã hết hạn.
  - **WithDeadline**: Cho phép đặt một hạn chót cho một nhiệm vụ. Khi hạn chót đến, Context sẽ tự động hủy bỏ nhiệm vụ.
  - **WithTimeout**: Đặt một giới hạn thời gian thực hiện cho một nhiệm vụ. Khi thời gian này kết thúc, Context sẽ tự động hủy bỏ nhiệm vụ.

Nếu không thực hiện Context đúng cách, các goroutine có thể bị chặn hoặc có thể không bị hủy bỏ đúng. Điều này có thể dẫn đến lãng phí tài nguyên, hiệu suất ứng dụng giảm đi và các vấn đề bảo mật tiềm tàng. Do đó, việc sử dụng Context là rất quan trọng khi phát triển các ứng dụng đa luồng để đảm bảo tính chính xác và an toàn của chúng.

## Goroutine

Goroutines cung cấp một cách thức để thực hiện các nhiệm vụ đồng thời, tăng cường hiệu suất của một ứng dụng. Khi bạn cần thực hiện các nhiệm vụ đồng thời mà không cần chờ đợi cho tác vụ trước đó hoàn thành, Goroutines là một lựa chọn tuyệt vời.

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

Channel là một cơ chế được sử dụng để truyền dữ liệu giữa các Goroutines. Nó được sử dụng để đồng bộ hóa việc truy cập dữ liệu giữa các Goroutines. Khi bạn cần gửi dữ liệu giữa các Goroutines mà không gặp vấn đề như tắc nghẽn hoặc điều kiện đua, hoặc khi bạn muốn đồng bộ hóa các nhiệm vụ đồng thời, kênh là một công cụ rất hữu ích.

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

Mutex (Mutual Exclusion) là một cơ chế đồng bộ đảm bảo chỉ có một Goroutine truy cập dữ liệu vào bất kỳ thời điểm nào, ngăn ngừa xung đột dữ liệu khi được truy cập cùng lúc bởi nhiều Goroutines. Khi bạn cần đồng bộ hóa việc truy cập dữ liệu giữa các Goroutines và đảm bảo dữ liệu được truy cập đúng cách, Mutex là công cụ đúng đắn.

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
