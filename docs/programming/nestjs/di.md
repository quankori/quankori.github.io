---
title: Dependency Injection (DI)
---

Dependency Injection (DI) là một mẫu thiết kế trong đó một đối tượng nhận các phụ thuộc của nó từ bên ngoài thay vì tạo chúng bên trong. Nó thúc đẩy nguyên tắc đảo ngược của việc kiểm soát, trong đó việc tạo ra và quản lý các phụ thuộc được chuyển ra bên ngoài lớp. Điều này làm cho hệ thống modul hơn, dễ kiểm tra hơn và thường là gọn gàng hơn về việc tách biệt các vấn đề liên quan.

NestJS, một framework Node.js tiến bộ để xây dựng các ứng dụng phía máy chủ có khả năng mở rộng, sử dụng Dependency Injection mạnh mẽ như một trong những tính năng cốt lõi của nó, được truyền cảm hứng từ hệ thống DI của Angular.

Dưới đây là cách Dependency Injection hoạt động trong NestJS:

**Providers**: Trong NestJS, một provider là một cái gì đó có thể được tiêm vào các hàm khởi tạo của các lớp khác. Providers có thể là các giá trị đơn giản, các lớp, các hàm nhà máy và nhiều hơn nữa.

**Modules**:  Mỗi mô-đun trong NestJS có thể khai báo các thành phần (controllers, providers, vv) thuộc về nó. Khi một mô-đun cần một provider, nó sẽ tìm kiếm trong mô-đun của nó và trong các mô-đun đã được nhập để tìm thấy nó.

**Injectors**:  NestJS có một container DI tích hợp sẵn để xử lý việc tạo ra và vòng đời của các đối tượng (hoặc "providers").

**Decorators**: NestJS sử dụng các decorators như @Inject() để xác định thủ công một mã thông báo cung cấp tùy chỉnh cho một provider.

Hãy xem xét chúng ta có một UserService đơn giản truy vấn dữ liệu người dùng:

```ts
@Injectable()
export class UserService {
  getUsers() {
    // ... fetch user data
  }
}
```

Dịch vụ này được đánh dấu bằng decorator @Injectable(), biến nó thành một provider có thể được quản lý bởi hệ thống DI của NestJS.

Bây giờ, nếu bạn muốn sử dụng dịch vụ này trong một controller, thay vì tạo một phiên bản UserService thủ công, bạn sẽ làm như sau:

```ts
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getUsers();
  }
}
```

Ở đây, UserController yêu cầu dịch vụ UserService được tiêm vào. Bộ tiêm DI của NestJS chịu trách nhiệm tạo ra một phiên bản của UserService và cung cấp nó cho UserController.

Lợi ích trong NestJS:

**Testability**: Với DI, dễ dàng thay thế dịch vụ thực tế bằng phiên bản giả mạo để kiểm tra.

**Modularity**: DI thúc đẩy thiết kế module hơn bằng cách thúc đẩy việc tách biệt các vấn đề.

**Reusability**:  Providers (như các dịch vụ) có thể tái sử dụng dễ dàng trong các phần khác nhau của ứng dụng.

**Lifecycles**: NestJS có thể quản lý vòng đời của các providers, tạo chúng theo cách lười biếng hoặc là các singleton, phụ thuộc vào nhu cầu của bạn.

Tóm lại, Dependency Injection là một khái niệm cốt lõi trong NestJS, giúp tạo ra các ứng dụng có khả năng mở rộng, dễ bảo trì và dễ kiểm tra.
