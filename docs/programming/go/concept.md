---
title: Go Concept
---

## Context

- Context là một cơ chế trong Golang để quản lý các tác vụ đồng thời và phục vụ cho việc điều khiển việc chạy và kết thúc các goroutines. Bạn có thể trình bày về cách sử dụng Context trong việc truyền thông tin và điều khiển các tác vụ đồng thời, giúp quản lý tài nguyên và ngăn chặn các tác vụ chạy quá lâu

- Có ba loại Context chính trong Golang:

  - Background: là Context mặc định được sử dụng để khởi tạo một Context.
  - TODO: được sử dụng để thực hiện các công việc đơn giản và tạm thời.
  - WithCancel: cho phép hủy bỏ một tác vụ bất kỳ khi Context đó đã hết hạn.
  - WithDeadline: cho phép đặt thời hạn cho một tác vụ, khi đến thời gian hết hạn, Context sẽ tự động hủy bỏ tác vụ.
  - WithTimeout: cho phép đặt thời gian giới hạn thực thi của tác vụ, khi hết thời gian đó, Context sẽ tự động hủy bỏ tác vụ.

- Nếu không áp dụng Context chính xác, các goroutine có thể bị block, hoặc có thể không được hủy bỏ đúng cách. Điều này có thể dẫn đến lãng phí tài nguyên, giảm hiệu suất ứng dụng và gây ra các vấn đề bảo mật. Do đó, việc sử dụng Context là rất quan trọng trong việc phát triển các ứng dụng có khả năng xử lý đa luồng, để đảm bảo tính đúng đắn và an toàn của ứng dụng.

## Goroutine

Goroutine là một cách để thực thi các tác vụ đồng thời, tăng hiệu suất của ứng dụng. Khi bạn cần thực hiện các tác vụ đồng thời mà không muốn phải chờ đợi cho đến khi tác vụ trước đó hoàn thành, Goroutine là một lựa chọn tốt.

## Channel

Channel là một cơ chế để truyền dữ liệu giữa các Goroutine, nó được sử dụng để đồng bộ hóa truy cập vào dữ liệu giữa các Goroutine. Khi bạn cần truyền dữ liệu giữa các Goroutine mà không muốn gặp phải các vấn đề như deadlock, race condition, hay muốn đồng bộ hóa các tác vụ đồng thời, channel là một công cụ rất hữu ích.

## Mutex

Mutex (Mutual Exclusion) là một cơ chế đồng bộ hóa để đảm bảo chỉ có một Goroutine truy cập vào dữ liệu tại một thời điểm, tránh xung đột dữ liệu khi truy cập đồng thời từ nhiều Goroutine. Khi bạn cần đồng bộ hóa truy cập vào dữ liệu giữa các Goroutine và đảm bảo dữ liệu được truy cập đúng cách, Mutex là công cụ phù hợp.
