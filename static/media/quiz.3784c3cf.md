# Blockchain Quiz

- Tài khoản trong Ethereum

Có 2 loại tài khoản trong Ethereum là smart contract và tài khoản thuộc sở hữu ( Externally-Owned Accounts )

- Sự khác nhau giữa transfer() , send() và call.value()

Nếu transfer() gặp vấn đề, nó sẽ đưa ra ngoại lệ, nó sẽ khiến cho giao dịch bị hủy bỏ. Điều này thường sẽ chỉ xảy ra nếu quá trình chuyển hết gas. Hủy bỏ giao dịch trong trường hợp này là tốt và an toàn vì có lẽ bạn cũng không muốn giao dịch hoàn thành với giả định sai là nó đã thực hiện chuyển ether.

send() sẽ trả về true hoặc false tùy thuộc vào việc nó chuyển ether thành công hay thất bại, nhưng nó sẽ không bao giờ hủy bỏ. Nếu smart contract không kiểm tra gía trị trả về của send() hoặc không xử lý được chính xác lỗi thì smart contract có thể rơi vào trạng thái không nhất quán và không thể khôi phục. Do đó, tôi khuyên bạn hãy sử dụng transfer() thay vì send() để chuyển tiền ra khỏi smart contract

address.call.value(amount)( ).gas() đây là một low-level function và nó sẽ trả lại false nếu xảy ra lỗi . Sự khác biệt của nó so với hai chức năng trên là bạn phải set gas thông qua .gas(gasLimit) nếu không nó sẽ gây tốn gas trong những hợp đồng phải thực hiện một logic phức tạp , đòi hỏi nhiều gas
