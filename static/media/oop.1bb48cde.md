# Object Oriented Programming - (OOP)

- Tính đóng gói (Encapsulation)

Tính chất này không cho phép người sử dụng các đối tượng thay đổi trạng thái nội tại của một đối tượng. Chỉ có các phương thức nội tại của đối tượng cho phép thay đổi trạng thái của nó. Việc cho phép môi trường bên ngoài tác động lên các dữ liệu nội tại của một đối tượng theo cách nào là hoàn toàn tùy thuộc vào người viết mã.

- Tính kế thừa (Inheritance)

Tính kế thừa cho phép xây dựng một lớp mới dựa trên các định nghĩa của lớp đã có.

- Tính đa hình (Polymorphism)

Các phương thức dùng trả lời cho một thông điệp sẽ tùy theo đối tượng mà thông điệp đó được gửi tới sẽ có phản ứng khác nhau.

```ts
export class Sharingan {
  // Khả năng quan sát của Sharingan
  public kyNangQuanSat() {
    console.log("Có thể quan sát vật di chuyển cực nhanh");
    console.log("Đoán trước được chuyển động");
  }
  // Khả năng chiến đấu của Sharingan
  public kyNangChienDau() {
    console.log("Ảo thuật");
    console.log("Sao chép thuật");
  }
}

export class MangekyouSharingan extends Sharingan {
  // Sau khi lên Mangekyou thì Sharingan có thêm khả năng phòng thủ tuyệt đối.
  public kyNangPhongThu() {
    console.log("Phòng thủ tuyệt đối Susano");
  }
}

export class ItachiMangekyouSharingan extends MangekyouSharingan {
  // Ghi đè phương thức kyNangChienDau
  public kyNangChienDau() {
    super.kyNangChienDau();
    console.log("Amaterasu(Lửa địa ngục)");
  }
}

export class ObitoMangekyouSharingan extends MangekyouSharingan {
  // Ghi đè phương thức kyNangChienDau
  public kyNangChienDau() {
    super.kyNangChienDau();
    console.log("Kamui(đổi chiều không gian)");
  }
}
```

- Tính trừu tượng (Abstraction)

Tính trừu tượng biểu hiện qua việc một đối tượng ban đầu có một số đặc điểm chung cho nhiều đối tượng khác nhau là sự mở rộng của nó mà bản thân nó không thể thực thi

1. Abstract

Là một class cha cho tất cả các class có cùng bản chất. Bản chất ở đây được hiểu là kiểu, loại, nhiệm vụ của class. Hai class cùng hiện thực một interface có thể hoàn toàn khác nhau về bản chất.

2. Interface

Là một chức năng mà bạn có thể thêm và bất kì class nào. Từ chức năng ở đây không đồng nghĩa với phương thức (hoặc hàm). Interface có thể bao gồm nhiều hàm/phương thức và tất cả chúng cùng phục vụ cho một chức năng.
