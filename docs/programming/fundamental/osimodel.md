---
title: Open Systems Interconnection Reference Model
---

Mô hình OSI bao gồm 7 lớp, và khi nhận một yêu cầu, nó sẽ di chuyển từ lớp 7 đến lớp 1, và phản hồi trả về sẽ di chuyển từ lớp 1 đến lớp 7.

## Application layer

Lớp này là giao diện chính cho người dùng tương tác với chương trình ứng dụng và thông qua nó, tương tác với mạng.

## Presentation layer

Trên máy tính, lớp này thực hiện nhiệm vụ chuyển đổi dữ liệu được gửi từ lớp ứng dụng sang một định dạng chung. Trên máy tính nhận, lớp này sau đó chuyển đổi từ định dạng chung sang định dạng của lớp ứng dụng.

## Session layer

Nhiệm vụ của lớp này là thiết lập, duy trì và chấm dứt giao tiếp với các thiết bị nhận.

## Transport layer

Lớp này duy trì quản lý dòng dữ liệu và thực hiện kiểm tra lỗi và khôi phục dữ liệu giữa các thiết bị.

## Network layer

Lớp này cung cấp các địa chỉ logic mà các router sẽ sử dụng để xác định đường đi đến điểm đích.

## Data link layer

Lớp này đảm bảo việc chuyển đổi dữ liệu bit nhận được từ lớp thấp hơn (lớp vật lý) thành các khung dữ liệu.

## Physical layer

Thiết lập hoặc ngắt kết nối điện với phương tiện truyền tải.

Tham gia vào quá trình mà tài nguyên giao tiếp được chia sẻ một cách hiệu quả giữa nhiều người sử dụng. Ví dụ, giải quyết xung đột tài nguyên và kiểm soát lưu lượng.

Biến đổi hoặc chuyển đổi giữa biểu diễn dữ liệu số hóa của các thiết bị người dùng và các tín hiệu tương ứng được truyền qua kênh truyền thông.

## Request

**Application layer**: Người dùng nhập thông tin mà họ muốn gửi vào máy tính. Thông tin này thường ở dạng hình ảnh, văn bản, v.v. Sau đó, dữ liệu này được chuyển xuống lớp trình diễn (lớp 6).

**Presentation layer**: Lớp này sẽ chuyển đổi dữ liệu thành một định dạng chung để mã hóa và nén dữ liệu. Dữ liệu sau đó được chuyển xuống lớp phiên (lớp 5).

**Session layer**: Lớp này tương tự như các nhân viên ngân hàng xác minh và thêm thông tin giao dịch khi bạn chuyển tiền tại ngân hàng. Sau khi lớp phiên hoàn thành nhiệm vụ, nó sẽ tiếp tục chuyển dữ liệu này xuống lớp vận chuyển (lớp 4).

**Transport layer**: Tại lớp này, dữ liệu được chia thành nhiều đoạn và thông tin bổ sung về phương pháp vận chuyển dữ liệu được thêm vào để đảm bảo an toàn và đáng tin cậy khi truyền trong mô hình mạng. Sau đó, dữ liệu được chuyển xuống lớp mạng (lớp 3).

**Network layer**: Tại lớp này, các đoạn được chia thành các gói tin Package khác nhau và thông tin định tuyến được thêm vào. Chức năng chính của lớp mạng là định tuyến đường dẫn cho các gói tin chứa dữ liệu. Dữ liệu tiếp tục được chuyển xuống lớp liên kết dữ liệu (lớp 2).

**Datalink layer**: Tại lớp này, mỗi gói tin Package được băm thành nhiều khung Frames và thông tin bổ sung được thêm vào để kiểm tra gói tin dữ liệu ở đầu thu.

**Physical layer**: Cuối cùng, khi những khung Frames này được chuyển xuống lớp vật lý (lớp 1), chúng được chuyển đổi thành một chuỗi các bit nhị phân (0 1....) và được truyền và tín hiệu bị đứt trên phương tiện truyền tải (cáp đồng, cáp quang, ...) để truyền dữ liệu đến người nhận.

## Resposne

**The Physical layer** (Layer 1) ở bên nhận sẽ kiểm tra quá trình đồng bộ hóa và đưa các chuỗi bit nhị phân nhận được vào bộ đệm. Sau đó, nó gửi thông báo đến lớp liên kết dữ liệu (Lớp 2) rằng dữ liệu đã được nhận.

**The Datalink layer** dữ liệu sẽ kiểm tra lỗi trong khung được tạo ra bởi máy gửi bằng cách kiểm tra FCS trong gói tin đính kèm vào máy nhận.

**The Network layer** sẽ kiểm tra xem địa chỉ trong gói tin này có phải là địa chỉ của máy nhận hay không.

**Transport layer** việc khôi phục lỗi và xử lý lỗi được hỗ trợ bằng cách gửi các gói tin ACK và NAK (gói tin được sử dụng để phản hồi liệu các gói tin chứa dữ liệu đã được gửi đến máy nhận hay chưa).

**The Session layer** chịu trách nhiệm đảm bảo tính toàn vẹn của dữ liệu trong gói tin nhận được. Sau đó, nó loại bỏ phần tiêu đề của lớp phiên và tiếp tục gửi nó lên lớp trình diễn.

**The Presentation layer** xử lý gói tin bằng cách chuyển đổi định dạng dữ liệu sang định dạng phù hợp. Khi hoàn thành, nó sẽ tiếp tục gửi lên lớp ứng dụng.

**Application layer** xử lý và loại bỏ phần tiêu đề cuối cùng. Tại thời điểm này, máy nhận sẽ nhận dữ liệu của gói tin đã truyền.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/1.jpeg)
