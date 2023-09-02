---
title: Panic & Recover
---

Trong ngôn ngữ Go (Golang), panic và recover là hai cơ chế được sử dụng để xử lý các tình huống không mong muốn và phục hồi từ lỗi trong mã nguồn.

**Panic**:

panic là một hàm được sử dụng để kích hoạt một tình huống không thể xử lý được trong chương trình. Khi một panic được kích hoạt, thực thi chương trình sẽ bị ngừng lại và thông báo lỗi sẽ được in ra. Việc sử dụng panic thường được coi là không nên và nên chỉ được sử dụng trong các tình huống không thể khắc phục được, ví dụ như khi gặp một lỗi nghiêm trọng mà chương trình không thể tiếp tục hoạt động.

**Recover**:

recover là một hàm được sử dụng để phục hồi khỏi tình huống panic và tiếp tục thực thi chương trình. Hàm recover thường được sử dụng trong một khối defer và chỉ có thể hoạt động trong một hàm goroutine. Khi recover được gọi trong khối defer và có một panic xảy ra trong hàm đó hoặc trong một hàm gọi cha của nó, recover sẽ trả về giá trị panic và chương trình sẽ tiếp tục thực thi từ vị trí recover được gọi.

```go
func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r)
        }
    }()

    fmt.Println("Start")
    panic("Something went wrong")
    fmt.Println("End") // Không được thực thi do panic đã xảy ra
}
```

Trong ví dụ trên, sau khi xảy ra panic, khối defer sử dụng recover để phục hồi từ tình huống panic và in ra thông báo "Recovered: Something went wrong". Câu lệnh sau panic (fmt.Println("End")) sẽ không được thực thi vì chương trình đã bị ngừng lại khi panic xảy ra.

Tóm lại, panic và recover là cơ chế cho phép bạn xử lý các tình huống không mong muốn và có thể phục hồi từ các tình huống panic trong mã nguồn Go. Tuy nhiên, việc sử dụng chúng cần được thực hiện cẩn thận và chỉ khi thực sự cần thiết.
