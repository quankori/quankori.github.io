---
title: Context
---

## Concept

The Context là một cơ chế trong Golang được sử dụng để quản lý các nhiệm vụ đồng thời và kiểm soát việc thực hiện và chấm dứt của các goroutine. Nó có thể được sử dụng để truyền thông tin và kiểm soát các nhiệm vụ đồng thời, giúp quản lý tài nguyên và ngăn các nhiệm vụ chạy quá lâu.

- Có ba loại Context chính trong Golang:

  - **Background**: Context mặc định được sử dụng để khởi tạo một Context mới.
  - **TODO**: Được sử dụng để xử lý các nhiệm vụ đơn giản và tạm thời.
  - **WithCancel**:Cho phép hủy một nhiệm vụ sau khi Context của nó đã hết hạn.
  - **WithDeadline**: Cho phép đặt một hạn chót cho một nhiệm vụ. Khi hạn chót đến, Context sẽ tự động hủy bỏ nhiệm vụ.
  - **WithTimeout**: Đặt một giới hạn thời gian thực hiện cho một nhiệm vụ. Khi thời gian này kết thúc, Context sẽ tự động hủy bỏ nhiệm vụ.

Nếu không thực hiện Context đúng cách, các goroutine có thể bị chặn hoặc có thể không bị hủy bỏ đúng. Điều này có thể dẫn đến lãng phí tài nguyên, hiệu suất ứng dụng giảm đi và các vấn đề bảo mật tiềm tàng. Do đó, việc sử dụng Context là rất quan trọng khi phát triển các ứng dụng đa luồng để đảm bảo tính chính xác và an toàn của chúng.
