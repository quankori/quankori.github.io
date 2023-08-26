---
title: Process and Thread
---

## Process

- Một quy trình là một đơn vị độc lập của một chương trình đang chạy với không gian bộ nhớ riêng của nó.
- Mỗi quy trình có một hoặc nhiều luồng.
- Thường thì các quy trình kết nối với nhau ít hơn. Giao tiếp giữa các quy trình thường yêu cầu các phương pháp giao tiếp giữa các quy trình (Inter-process communication - IPC) như ống, socket, v.v.
- Khởi tạo một quy trình mới thường tốn nhiều tài nguyên hơn và mất thời gian hơn so với việc khởi tạo một luồng mới.

## Thread

- Một luồng, còn được gọi là quy trình nhẹ, là đơn vị thực thi nhỏ nhất trong một quy trình.
- Tất cả các luồng trong cùng một quy trình chia sẻ không gian bộ nhớ của quy trình đó. Điều này có nghĩa là luồng có thể truy cập và thay đổi các biến chia sẻ và cấu trúc dữ liệu.
- Mỗi luồng có ngăn xếp riêng của nó, nhưng chúng chia sẻ heap (bộ nhớ động) và dữ liệu toàn cục.

## When a request is sent to a server

Tùy theo cấu hình và kiến trúc của máy chủ, một yêu cầu có thể được xử lý bởi một quy trình hoặc một luồng cụ thể. Dưới đây là một ví dụ đơn giản về cách máy chủ hoạt động dựa trên kiến trúc đa quy trình và đa luồng:

### Multi-Process Architecture:

Đối với mỗi yêu cầu mới, máy chủ có thể tạo ra một quy trình mới để xử lý yêu cầu đó. Ví dụ, máy chủ HTTP Apache, khi hoạt động ở chế độ prefork (chế độ phổ biến), hoạt động theo cách này.

### Multi-Thread Architecture:

Đối với một yêu cầu mới, thay vì tạo ra một quy trình mới, máy chủ chỉ tạo ra một luồng mới (hoặc sử dụng một luồng hiện có từ bể luồng) trong cùng một quy trình để xử lý yêu cầu. Ví dụ, dịch vụ IIS của Microsoft hoạt động theo cách này.

Các máy chủ hiện đại như Node.js sử dụng mô hình dựa trên sự kiện và vòng lặp sự kiện để xử lý nhiều yêu cầu mà không cần nhiều luồng hoặc quy trình.

Tùy theo kiến trúc và công nghệ được sử dụng, việc xử lý yêu cầu sẽ phụ thuộc vào một hoặc nhiều quy trình và luồng. Mỗi kiến trúc có ưu điểm và nhược điểm riêng, và sự lựa chọn giữa chúng thường phụ thuộc vào yêu cầu cụ thể và ngữ cảnh của hệ thống.
