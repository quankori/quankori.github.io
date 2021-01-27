# Golang Advanced

- Goroutines

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
func Goroutines() {
	go numbers()
	go alphabets()
	time.Sleep(3000 * time.Millisecond)
	fmt.Println("main terminated")
}
```

- Mutex

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
func Mutex() {
	//lặp gọi process() 3 lần
	for i := 1; i < 4; i++ {
		go process(i)
	}

	//Tạm dừng để đợi cho tất cả routine hoàn thành
	time.Sleep(25 * time.Second)
	fmt.Println("Final Count:", count)
}
```

- Channel

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
func Channel() {
	c := make(chan int)
	go send(c)
	go receive(c)
	time.Sleep(100 * time.Millisecond)
	fmt.Println("end")
}
```

- Marshal

```go
type person struct {
	First string
}

// Marshal func
func Marshal() {
	p1 := person{
		First: "A",
	}
	p2 := person{
		First: "B",
	}

	xp := []person{p1, p2}

	bs, err := json.Marshal(xp) // dịch struct thành json
	if err != nil {
		log.Panic(err)
	}
	fmt.Println(string(bs)) // [{"First":"A"},{"First":"B"}]

	xp2 := []person{}

	err = json.Unmarshal(bs, &xp2) // dịch json thành struct
	if err != nil {
		log.Panic(err)
	}
	fmt.Println(xp2) // [{A} {B}]
}
```

- Encoding

```go
type people struct {
	First string
}

// Encoding func
func Encoding() {
	http.HandleFunc("/encode", encode)
	http.HandleFunc("/decode", decode)
	http.ListenAndServe(":8080", nil)
}

func encode(w http.ResponseWriter, r *http.Request) {
	p1 := people{
		First: "Jenny",
	}

	p2 := people{
		First: "James",
	}

	people := []people{p1, p2}

	err := json.NewEncoder(w).Encode(people)
	if err != nil {
		log.Println("Bad data to encode", err)
	}
	fmt.Println(people)
}

func decode(w http.ResponseWriter, r *http.Request) {
	people := []people{}

	err := json.NewDecoder(r.Body).Decode(&people)
	if err != nil {
		log.Println("Bad data to decode", err)
	}
	fmt.Println(people)
}
```
