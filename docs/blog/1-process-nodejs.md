---
title: Process và Thread trong Node.js
---

Sau khi trải qua n lần phỏng vấn cho vị trí Node.js Developer, tôi đã gặp nhiều câu hỏi xoay quanh các vấn đề như Event Loop, Scope, Non Blocking I/O, Asynchronous,... Đây là những câu hỏi phổ biến khi phỏng vấn cho vị trí Node.js Developer. Tuy nhiên, ngoài những câu hỏi đó, còn có một số câu hỏi khiến tôi tò mò về cách quản lý và mở rộng **thread**, **process** trong Node.js. Tôi từng nghe và tìm hieu63 về các khái niệm **Cluster**, **Child Process** và **Worker Threads** trong các bài blog, nhưng thực tế thì tôi ít khi được áp dụng và hiểu về cơ chế đặc biệt này của Node.js. 😂

Tuy nhiên, để hiểu rõ sức mạnh của Node.js trong việc này, chúng ta cần bắt đầu từ những khái niệm căn bản: **Process** và **Thread** trong lập trình. Cả hai đều là nền tảng cơ bản cho bất kỳ hệ thống xử lý đa tác vụ nào, và hiểu biết vững chắc về chúng sẽ giúp ta khám phá sâu hơn về cách Node.js sử dụng chúng để tối ưu hiệu suất và không chỉ giới hạn ở Node.js còn nhiều ngôn ngữ lập trình khác cũng xoay quanh về này.

### Khái niệm về Process và Thread

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/8.PNG)

Như trên hình, Process bao gồm các phần Thread và Memory. Process đại diện cho 1 tiến trình diễn ra, tiến trình ở đây có thể hình dung khi bạn mở 1 trình duyệt hoặc chạy một chương trình thì lúc này tạo ra một tiến trình.

Các thành phần của 1 tiến trình (Process) khi chạy được hệ điều hành cấp:

- Mã định danh tiến trình gọi là PID.
- Ít nhất một main thread cho process, main thread tắt thì process cũng tắt theo.
- Vùng nhớ cho Process, như trong hình là phần màu trắng. Với bộ nhớ chung là Heap (phần màu xanh dương)

Thread là một luồng trong tiến trình, như trong hình thì trong các thread sẽ có hai thành phần chính là:

- **Registers** có thể hiểu là nơi lưu trữ biến tạm thời khi thực thi thread
- **Stack** là vùng nhớ trong thread được cấp khoảng 1-2 MB

Và ngoài ra các thread sẽ xài chung vùng bộ nhớ chung là Heap (vùng xanh dương). Tuy nhiên, khi quản lý multi thread chúng ta sẽ gặp một số thuật vấn đề sau:

1. Khi process tạo quá nhiều thread sẽ bị lỗi **stack overflow**
2. Khi thread sử dụng chung bộ nhớ Heap bị xung đột dữ liệu sẽ xảy ra lỗi **race condition**
3. Số lương thread chạy song song một thời điểm sẽ bằng số lượng CPU mà chúng ta đang có => nhiều thread không giúp nhanh hơn. Thường sẽ là số thread chạy song song = số core CPU \* 2 🧐

### Worker Threads là gì

(Tác giả để trống...)

### Child Process

(Tác giả để trống...)

### Cluster trong Node.js

(Tác giả để trống...)

### Nguồn

- Một cuốn sách khá hay nói về việc quản lý thread và process là
  [Go Advanced - ZaloPay](https://zalopay-oss.github.io/go-advanced/ch1-basic/ch1-05-concurrency-parallelism.html), đây là cuốn sách về Golang do team ZaloPay public, dù không dính về Node.js nhưng về Process và Thread thì rất đầy đủ
