---
title: Memory Managements
---

Trong Go (Golang), quản lý bộ nhớ được thực hiện tự động bởi bộ thu gom rác (garbage collector) của Go. Bộ thu gom rác trong Go giúp dọn dẹp bộ nhớ bất cứ khi nào một đối tượng không còn được tham chiếu và sử dụng.

Dưới đây là một số điểm cơ bản liên quan đến quản lý bộ nhớ trong Go:

1. Bộ Thu Gom Rác (Garbage Collector - GC): Go sử dụng một bộ thu gom rác để theo dõi và thu dọn các đối tượng không còn được sử dụng. Bộ GC tự động quét và giải phóng bộ nhớ chứa các đối tượng đã không còn tham chiếu.

2. Quản Lý Bộ Nhớ Tự Động: Trong Go, bạn không cần phải thủ công cấp phát và giải phóng bộ nhớ như trong một số ngôn ngữ khác. Go sẽ tự động cấp phát và giải phóng bộ nhớ dựa trên việc tham chiếu của đối tượng.

3. Bộ Nhớ Heap và Stack: Go sử dụng hai vùng bộ nhớ chính là heap và stack. Các biến cục bộ và tham số của hàm được lưu trữ trên stack. Các đối tượng cấp phát động được lưu trữ trên heap.

4. Kiểm Soát Cấp Phát: Trong Go, bạn không cần phải quan tâm đến việc giải phóng bộ nhớ thủ công, nhưng bạn cần tránh tạo ra các chu kỳ tham chiếu không mong muốn. Điều này có thể xảy ra khi một đối tượng tham chiếu đến một đối tượng khác, tạo ra một vòng lặp tham chiếu.

5. Sync.Pool: Sync.Pool là một cơ chế được cung cấp bởi Go để quản lý tạm thời các đối tượng như buffer hoặc pool của các đối tượng để tái sử dụng. Điều này giúp giảm áp lực lên bộ nhớ và tạo ra hiệu năng tốt hơn.

Tóm lại, Go giúp bạn tránh các vấn đề phức tạp liên quan đến quản lý bộ nhớ bằng cách sử dụng bộ thu gom rác và quy tắc tự động. Điều này giúp đơn giản hóa việc phát triển ứng dụng và giảm thiểu rủi ro liên quan đến lỗi quản lý bộ nhớ.
