---
title: Ethereum Virtual Machine
---

## Concept

Đây là một hệ thống thực hiện các hợp đồng được lập trình trước mà không cần đến trung gian, tuy nhiên, vẫn đòi hỏi phí (gas fees) để thực hiện giao dịch cũng như phần thưởng cho các miner.

Các tương tác với hợp đồng được thực hiện thông qua giao dịch.

Blockchain chỉ lưu trữ một dấu vết lịch sử và không lưu trữ dữ liệu.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/3.PNG)

## Structure

Hash, previous hash, data, nonce

Previous hash + data + nonce + block id + hash algorithm = hash được gửi đến node

Genesis block (block đầu tiên), previous hash sẽ là 00000000

Nonce là số lượng giao dịch thành công được thực hiện bởi người dùng, miner sẽ tìm kiếm nonce cho đến khi nó khớp với mã hash được tạo ra bởi hệ thống

Trong blockchain, SHA256 hash dữ liệu và đây là một loại mã hóa một chiều.

Mã hash sẽ được biên dịch thành một số thập phân (từ hệ thập lục phân sang thập phân).

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/5.PNG)

## Characteristics

Hiệu ứng tán loạn (avalanche effect): khi có một thay đổi nhỏ được thực hiện, hash sẽ tạo ra một cái hoàn toàn khác từ hash gốc.

Phải chịu đựng được va chạm. Byzantine Fault Tolerance

- Sổ cái không thể thay đổi (Immutable ledger).
- Ưu điểm so với chứng thực truyền thống.
- Mạng ngang hàng phân tán (Distributed P2P network).
- Khi một block được thêm vào mạng, nó sẽ được cập nhật trong toàn bộ mạng (Consensus Protocol).

Nó có thể bị hack nếu có 51% được chiếm hữu, nhưng nó sẽ rất tốn kém.

Nếu một node trong mạng bị hack, tất cả các node khác sẽ khôi phục node đó về giá trị gốc của nó.

Khi một miner thành công thêm một block vào chuỗi, các node còn lại trong mạng sẽ cập nhật tương ứng.

Tuy nhiên, một trong những nhược điểm của thời gian khai thác block ngắn là sẽ có nhiều miner tìm thấy một block trong khoảng thời gian rất gần nhau, nhưng chỉ block được tìm thấy sớm nhất mới được thêm vào nhánh chính và các block chậm hơn sẽ bị loại bỏ, được gọi là orphaned blocks.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/4.PNG)
