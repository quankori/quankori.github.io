---
title: Programming Design Pattern
---

Design Patterns là các giải pháp đã được kiểm chứng, tái sử dụng được cho các vấn đề phổ biến trong thiết kế phần mềm. Bộ sưu tập kinh điển nhất là của "Gang of Four" (GoF), chia thành 3 nhóm chính:

## Creational Patterns (Nhóm Khởi tạo)

Liên quan đến cơ chế khởi tạo đối tượng, cố gắng tạo đối tượng theo cách phù hợp với tình huống.

Cung cấp sự linh hoạt và khả năng tái sử dụng code hiện có, ẩn đi logic tạo đối tượng phức tạp.

**Singleton**: Đảm bảo một lớp chỉ có một thể hiện (instance) duy nhất và cung cấp một điểm truy cập toàn cục đến nó.

**Factory Method**: Định nghĩa một interface để tạo đối tượng, nhưng để các lớp con quyết định lớp nào sẽ được tạo.

**Abstract Factory**: Cung cấp một interface để tạo các họ đối tượng liên quan hoặc phụ thuộc lẫn nhau mà không cần chỉ định lớp cụ thể của chúng.

**Builder**: Tách rời việc xây dựng một đối tượng phức tạp khỏi biểu diễn của nó, cho phép cùng một quy trình xây dựng có thể tạo ra các biểu diễn khác nhau.

**Prototype**: Chỉ định các loại đối tượng cần tạo bằng cách sử dụng một thể hiện mẫu (prototype) và tạo các đối tượng mới bằng cách sao chép prototype này.

## Structural Patterns (Nhóm Cấu trúc)

Liên quan đến cách các lớp và đối tượng được kết hợp để tạo thành các cấu trúc lớn hơn, linh hoạt và hiệu quả hơn.

Mục đích để đơn giản hóa cấu trúc bằng cách xác định các mối quan hệ đơn giản giữa các thực thể.

**Adapter**: Cho phép các interface không tương thích hoạt động cùng nhau.

**Bridge**: Tách một abstraction khỏi implementation của nó để cả hai có thể thay đổi độc lập.

**Composite**: Cho phép bạn cấu trúc các đối tượng thành cây và làm việc với các cấu trúc cây này như thể chúng là các đối tượng riêng lẻ.

**Decorator**: Gắn thêm các trách nhiệm mới cho một đối tượng một cách động.

**Facade**: Cung cấp một interface thống nhất cho một tập hợp các interface trong một hệ thống con (subsystem).

**Flyweight**: Giảm chi phí tạo và quản lý số lượng lớn các đối tượng nhỏ bằng cách chia sẻ trạng thái chung giữa chúng.

**Proxy**: Cung cấp một đối tượng thay thế hoặc placeholder cho một đối tượng khác để kiểm soát quyền truy cập vào nó.

## Behavioral Patterns (Nhóm Hành vi)

Liên quan đến thuật toán và việc gán trách nhiệm giữa các đối tượng, mô tả cách các đối tượng tương tác và phân chia trách nhiệm.

Tập trung vào giao tiếp hiệu quả và sự phân công trách nhiệm giữa các đối tượng.

**Chain of Responsibility**: Tránh việc gắn kết người gửi yêu cầu với người nhận của nó bằng cách cho nhiều đối tượng có cơ hội xử lý yêu cầu. Chuyển yêu cầu dọc theo một chuỗi các bộ xử lý.

**Command**: Đóng gói một yêu cầu như một đối tượng, qua đó cho phép bạn tham số hóa client với các yêu cầu khác nhau, xếp hàng hoặc ghi log yêu cầu, và hỗ trợ các hoạt động có thể hoàn tác.

**Interpreter**: Định nghĩa một biểu diễn ngữ pháp cho một ngôn ngữ và cung cấp một trình thông dịch để xử lý ngữ pháp này.

**Iterator**: Cung cấp một cách để truy cập tuần tự các phần tử của một đối tượng tập hợp mà không cần expose cấu trúc bên trong của nó.

**Mediator**: Định nghĩa một đối tượng đóng gói cách một tập hợp các đối tượng tương tác. Thúc đẩy low coupling bằng cách giữ các đối tượng không tham chiếu trực tiếp lẫn nhau.

**Memento**: Lưu trữ và khôi phục trạng thái bên trong của một đối tượng mà không vi phạm đóng gói.

**Observer**: Định nghĩa một sự phụ thuộc một-nhiều giữa các đối tượng sao cho khi một đối tượng thay đổi trạng thái, tất cả các đối tượng phụ thuộc vào nó sẽ được thông báo và cập nhật tự động.

**State**: Cho phép một đối tượng thay đổi hành vi của nó khi trạng thái bên trong của nó thay đổi. Đối tượng sẽ xuất hiện như thể nó thay đổi lớp của mình.

**Strategy**: Định nghĩa một họ các thuật toán, đóng gói từng thuật toán và làm cho chúng có thể hoán đổi cho nhau. Cho phép thuật toán thay đổi độc lập với client sử dụng nó.

**Template Method**: Định nghĩa bộ khung của một thuật toán trong một phương thức, trì hoãn một số bước cho các lớp con. Cho phép các lớp con định nghĩa lại một số bước nhất định của thuật toán mà không thay đổi cấu trúc của nó.

**Visitor**: Cho phép bạn định nghĩa một hoạt động mới để thực hiện trên các phần tử của một cấu trúc đối tượng mà không cần thay đổi các lớp của các phần tử đó.
