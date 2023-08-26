---
title: InterPlanetary File System
---

Lưu trữ URL hình ảnh bằng nhiều dịch vụ bên thứ ba như AWS S3, Cloudinary, v.v. khá dễ dàng. Tuy nhiên, với dApps, điều này hoàn toàn khác. Chúng ta không thể lưu trữ thông tin URL ở một vị trí tập trung như AWS S3, vì như đã đề cập trước đó, như nhà đầu tư, chúng ta không muốn những thứ chúng ta mua sắm được quản lý bởi một bên thứ ba và có thể bị mất bất cứ lúc nào. Do đó, IPFS ra đời để đáp ứng nhu cầu quản lý thông tin với thuật toán DAGs Merkle, tệp được chuyển đổi thành dạng RAW và Sha256, sau đó được chia thành các phần nhỏ theo thứ tự. Mỗi peer sẽ lưu trữ tối đa 256kb và chia phần còn lại cho các peer tiếp theo.

Khi tải thông tin tệp, máy chủ chỉ cần một đoạn CID để tải các phần nhỏ của tệp và kết hợp chúng lại thành một tệp thông qua một cổng thông tin công cộng:

```cmd
# https://gateway.ipfs.io/ipfs/QmTRRb3F58B1YYgt2tzew1pEopdKFyUo2EifoDBKZjcCBK
# https://ipfs.io/ipfs/QmTRRb3F58B1YYgt2tzew1pEopdKFyUo2EifoDBKZjcCBK
# https://cloudflare-ipfs.com/ipfs/QmTRRb3F58B1YYgt2tzew1pEopdKFyUo2EifoDBKZjcCBK
```

- Ưu và nhược điểm của IPFS

  - Ưu điểm:

    Phi tập trung, người dùng có thể yên tâm rằng nội dung của họ sẽ không bị xóa một cách đột ngột.

    Không phụ thuộc vào các dịch vụ bên thứ ba như AWS hoặc dung lượng lưu trữ.

  - Nhược điểm:

    Thời gian tải chậm vì cần thời gian để cổng thông tin tải xuống, đôi khi có thể hết thời gian kết nối.

    Với phương pháp OpenSea, hình ảnh phải được tải lên lại S3 và chuyển thành một hình ảnh tập trung được lưu trữ trong cơ sở dữ liệu để tránh thời gian tải lâu.

    Cần xây dựng một phiên bản IPFS để tối ưu hóa thời gian tải hình ảnh.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/7.png)
