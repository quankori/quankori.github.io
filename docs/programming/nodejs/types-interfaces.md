---
title: Types and Interfaces Typescript
---

Trong TypeScript, cả kiểu dữ liệu (type) và giao diện (interface) đều là cách mạnh mẽ để xác định hình dạng của một đối tượng hoặc cấu trúc của một dữ liệu. Tuy nhiên, có sự khác biệt về khả năng, cách sử dụng và khi nào bạn nên chọn một trong hai.

```ts
type User = {
  id: string;
  name: string;
} | null;
```

```ts
interface User {
  id: string;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}
```

Comparison and Use Cases:

**For object shapes**: Cả `type` và `interface` đều có thể được sử dụng, nhưng nếu bạn mong đợi người tiêu dùng mã của bạn (như các nhà phát triển khác) mở rộng, sửa đổi hoặc thực hiện hình dạng đối tượng, `interface` thường được ưa chuộng hơn do tính mở rộng của nó.

**Extending**: `interface` hỗ trợ kế thừa từ các `interface` khác bằng từ khóa extends. Trong khi bạn có thể đạt được hiệu ứng tương tự bằng cách sử dụng intersection types với `type`, `interface`n cung cấp một cách tiếp cận mô hình hướng đối tượng (OOP) hợp lý hơn.

**Union Types**: Nếu bạn cần `types` (ví dụ: string | number), `type` là lựa chọn duy nhất.

**Declaration Merging**: Chỉ có `interface` hỗ trợ gộp khai báo (declaration merging). Điều này hữu ích khi bạn muốn từng phần hoặc từ từ thêm vào hình dạng của một đối tượng qua nhiều tệp hoặc vị trí trong mã nguồn.

**Implementing in Classes**: Nếu bạn đang xác định một cấu trúc mà một lớp sẽ tuân theo, hãy sử dụng `interface`. Điều này cho phép bạn sử dụng từ khóa implements với các lớp.

**Performance**: Trong quá trình biên dịch, `interface` nhanh hơn một chút vì nó không đòi hỏi nhiều công sức tính toán như `type`. Tuy nhiên, sự khác biệt này thường không đáng kể đối với hầu hết các dự án.

Tóm lại, mặc dù có sự chồng chéo trong nhiều khả năng của chúng, việc lựa chọn giữa `type` và `interface` phụ thuộc vào trường hợp sử dụng cụ thể. Như một nguyên tắc chung, đối với hình dạng đối tượng, đặc biệt là những hình dạng có thể được mở rộng hoặc thực hiện, `interface` thường được ưa chuộng. Đối với các định nghĩa type definitions, unions, intersections, or mapped types, `type` là lựa chọn hàng đầu.
