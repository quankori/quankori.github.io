---
title: Testing
---

## Concept

### Unit Testing

Kiểm tra từng phần riêng lẻ của mã nguồn mà không cần liên quan đến các thành phần bên ngoài (ví dụ: cơ sở dữ liệu, mạng, API). Trong unit testing, bạn tập trung vào việc kiểm tra hàm, lớp, hoặc thành phần nhỏ khác của mã nguồn.

Unit testing tập trung vào viết tests cho các phần nhỏ nhất (phần lớn là các functions được định nghĩa trong classes). MethodA ở classA có thể gọi được MethodB ở classB, ttuy nhiên, unit test của MethodA chỉ tập trung vào logic của MethodA, không phải MethodB

### E2E Testing

Kiểm tra hoạt động của toàn bộ ứng dụng từ đầu đến cuối, bao gồm tương tác giữa các thành phần và phần khác nhau của hệ thống như cơ sở dữ liệu, API, và giao diện người dùng.

## Test Dobles

Một test double là một object hay system mà bạn dùng trong test để thay thế cho một cái gì đó.

### Fakes

Một object với khả năng giới hạn(cho mục đích testing), VD: fake web service. Fake có hoạt động kinh doanh. Bạn có thể khiến Fake hoạt động theo những cách khác nhau bằng cách cung cấp cho nó những data khác nhau. Fakes có thể được sử dụng khi bạn không thể dùng triển khai thực tế trong test của mình.

### Stub

Một object cung cấp các câu trả lời được xác định để method gọi. Stub không có logic và chỉ trả về những gì bạn yêu cầu trả về

### Spy

Spy là một loại Stub đặc biệt, nơi bạn có thể theo dõi và kiểm tra cách mà phương thức đã được gọi và với các đối số nào. Spy cho phép bạn ghi lại thông tin về việc gọi phương thức để kiểm tra xem chúng có được gọi như mong đợi hay không.

## Code

```ts
class PaymentGateway {
  processPayment(amount: number): Promise<boolean> {
    // Gửi yêu cầu thanh toán và trả về kết quả
  }
}

describe("OrderService", () => {
  it("should place order successfully with valid payment", async () => {
    const paymentGatewayFake = {
      processPayment: async (amount: number) => true,
    };

    const paymentGatewayStub = {
      processPayment: jest.fn().mockResolvedValue(true),
    };

    const paymentGatewaySpy = {
      processPayment: jest.spyOn(paymentGatewayStub, "processPayment"),
    };

    const orderServiceFake = new OrderService(paymentGatewayFake as any);
    const orderServiceStub = new OrderService(paymentGatewayStub as any);
    const orderServiceSpy = new OrderService(paymentGatewaySpy as any);

    const resultFake = await orderServiceFake.placeOrder(100);
    const resultStub = await orderServiceStub.placeOrder(100);
    const resultSpy = await orderServiceSpy.placeOrder(100);

    expect(resultFake).toBe("Order placed successfully");
    expect(resultStub).toBe("Order placed successfully");
    expect(resultSpy).toBe("Order placed successfully");

    expect(paymentGatewaySpy.processPayment).toHaveBeenCalledWith(100);
  });
});
```
