---
title: Closures & Anounymous Function
---

Closures và Anonymous Functions là hai khái niệm quan trọng trong lập trình Go (Golang) liên quan đến việc xử lý hàm và phạm vi biến.

**Closures trong Golang**:

Closures trong Go đề cập đến khả năng một hàm (nested function) có thể truy cập và sử dụng các biến bên ngoài phạm vi của nó. Closures cho phép bạn truyền biến cho hàm con và giữ lại trạng thái của các biến đó ngay cả sau khi hàm gốc đã thực thi xong.

```go
func main() {
    x := 10

    add := func(y int) int {
        return x + y
    }

    result := add(5) // result = 10 + 5 = 15
    fmt.Println(result)
}
```

Trong ví dụ trên, hàm add là một closure có thể truy cập biến x ở phạm vi ngoài.

**Anonymous Functions trong Golang**:

Anonymous Functions, còn gọi là lambda functions, là các hàm không có tên được định nghĩa và sử dụng trong chỗ mà chúng được tạo ra. Trong Go, bạn có thể khai báo và sử dụng anonymous functions trực tiếp.

```go
func main() {
    add := func(x, y int) int {
        return x + y
    }

    result := add(5, 3) // result = 5 + 3 = 8
    fmt.Println(result)
}
```

Trong ví dụ này, hàm add là một anonymous function được gán cho biến add và sử dụng ngay tại chỗ.

Cả closures và anonymous functions trong Go cung cấp khả năng tạo ra mã nguồn linh hoạt hơn và tối ưu hóa quy trình lập trình bằng cách sử dụng các hàm một cách hiệu quả trong các tình huống cụ thể.
