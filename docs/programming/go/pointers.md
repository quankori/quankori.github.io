---
title: Pointers
---

## Pointers

Pointers (con trỏ) trong Go là một khái niệm quan trọng cho phép bạn tham chiếu và làm việc trực tiếp với vùng nhớ của biến. Thay vì truyền giá trị của biến, bạn truyền địa chỉ của biến để tham chiếu đến nơi lưu trữ dữ liệu thực sự. Điều này cho phép bạn thay đổi giá trị của biến gốc thông qua địa chỉ mà con trỏ đang trỏ tới.

Dưới đây là ví dụ dễ hiểu về cách sử dụng con trỏ trong Go

```go
package main

import "fmt"

func main() {
    // Khai báo một biến kiểu int
    num := 42
    fmt.Println("Value of num:", num)

    // Khai báo một con trỏ trỏ tới biến num
    var ptr *int
    ptr = &num

    fmt.Printf("Address of num: %p\n", &num)
    fmt.Printf("Value stored in ptr: %p\n", ptr)

    // Sử dụng con trỏ để thay đổi giá trị của biến num
    *ptr = 99

    fmt.Println("Value of num after using pointer:", num)
}

```

Trong ví dụ này:

1. Chúng ta khai báo biến num có giá trị ban đầu là 42.
2. Chúng ta khai báo một con trỏ `ptr` kiểu `*int` để trỏ tới biến `num`.
3. Chúng ta in ra địa chỉ của biến `num` bằng cách sử dụng `%p` trong hàm `Printf`.
4. Chúng ta in ra giá trị lưu trữ trong con trỏ `ptr`, cũng bằng cách sử dụng `%p` trong `Printf`.
5. Bằng cách sử dụng con trỏ, chúng ta thay đổi giá trị của biến `num` thành 99 thông qua toán tử `*`.

```
Value of num: 42
Address of num: 0xc000090000
Value stored in ptr: 0xc000090000
Value of num after using pointer: 99
```

Trong ví dụ này, chúng ta thấy cách con trỏ ptr trỏ tới biến num, và cách nó cho phép chúng ta thay đổi giá trị của num thông qua con trỏ. Điều này minh họa cách con trỏ cho phép truy cập và thay đổi giá trị của biến gốc thông qua địa chỉ của nó.

## Pass variables

Trong Go, khi bạn truyền biến vào một hàm, bạn sẽ gặp hai khái niệm quan trọng: pass by value (truyền giá trị) và pass by reference (truyền tham chiếu). Tuy nhiên, Go chỉ hỗ trợ truyền biến bằng giá trị, không hỗ trợ truyền tham chiếu trực tiếp như một số ngôn ngữ khác như C++ hoặc Java.

**Pass By Value (Truyền Giá Trị)**

Khi bạn truyền biến vào một hàm trong Go, thực chất là bạn tạo ra một bản sao của giá trị của biến đó và truyền bản sao này vào hàm. Bất kể bạn thay đổi giá trị của biến trong hàm hay không, biến gốc ở ngoài hàm không bị ảnh hưởng.

```go
package main

import "fmt"

func modifyValue(x int) {
    x = 20
    fmt.Println("Inside function:", x)
}

func main() {
    num := 10
    modifyValue(num)
    fmt.Println("Outside function:", num)
}

// Inside function: 20
// Outside function: 10
```

**Pass By Reference (Truyền Tham Chiếu)**

```go
package main

import "fmt"

func modifyValueByReference(x *int) {
    *x = 20
    fmt.Println("Inside function:", *x)
}

func main() {
    num := 10
    modifyValueByReference(&num)
    fmt.Println("Outside function:", num)
}

// Inside function: 20
// Outside function: 20
```

Trong ví dụ trên, chúng ta truyền con trỏ tới biến num vào hàm, cho phép hàm thay đổi giá trị của biến gốc bằng cách tham chiếu đến địa chỉ của biến đó.

**Specials case**

Trong Go, mặc dù chúng ta truyền biến bằng giá trị (pass by value), nhưng trong một số trường hợp đặc biệt, chúng ta vẫn có thể thay đổi giá trị của biến gốc thông qua truyền giá trị. Điều này xảy ra khi chúng ta truyền một biến có kiểu dữ liệu có khả năng thay đổi.

Một trong những ví dụ điển hình về trường hợp này là truyền slice vào một hàm. Dù slice được truyền bằng giá trị, nhưng một thay đổi giá trị của phần tử trong slice bên trong hàm sẽ ảnh hưởng đến slice gốc.

```go
package main

import "fmt"

func modifySlice(s []int) {
    s[0] = 100
    fmt.Println("Inside function:", s)
}

func main() {
    numbers := []int{1, 2, 3}
    modifySlice(numbers)
    fmt.Println("Outside function:", numbers)
}

// Inside function: [100 2 3]
// Outside function: [100 2 3]
```

Trong ví dụ này, mặc dù chúng ta truyền slice numbers vào hàm modifySlice bằng giá trị, nhưng thay đổi giá trị của phần tử trong slice bên trong hàm đã ảnh hưởng đến slice gốc.

Các kiểu dữ liệu khác như **maps**, **channels**, và **pointers** cũng có thể tạo ra hiệu ứng tương tự, khi chúng ta truyền chúng bằng giá trị nhưng vẫn có thể thay đổi dữ liệu trong biến gốc thông qua truyền giá trị. Tuy nhiên, điều này không phải là trường hợp thông thường và phụ thuộc vào cách kiểu dữ liệu được cài đặt bên trong Go.
