---
title: Amazon Virtual Private Cloud
---

## Network ACL

Một Network Access Control List (ACL) là một tính năng của Amazon Web Services (AWS) dùng để kiểm soát quyền truy cập vào các tài nguyên mạng. Nó hoạt động ở lớp mạng và được áp dụng cho các tài nguyên trên Amazon Virtual Private Cloud (VPC), bao gồm các subnet và instances.

Network ACL hoạt động tương tự như một tường lửa ở cấp độ mạng, cho phép bạn kiểm soát các kết nối truy cập và rời khỏi một subnet hoặc instance trên một VPC. Nó cho phép bạn tạo các quy tắc để cho phép hoặc từ chối kết nối dựa trên địa chỉ IP nguồn và đích, giao thức, và cổng.

Mỗi subnet trong một VPC có thể được liên kết với một Network ACL. Nếu một subnet không được liên kết với bất kỳ Network ACL nào, nó sẽ mặc định là Network ACL cho phép tất cả các kết nối đến và đi.

Network ACL cho phép bạn kiểm soát quyền truy cập ở lớp mạng, trong khi Security Group của EC2 cho phép bạn kiểm soát quyền truy cập ở lớp instance. Tuy nhiên, điều này không có nghĩa là Network ACL và Security Group thay thế cho nhau. Thay vào đó, chúng bổ sung cho nhau, cung cấp sự bảo vệ toàn diện cho các tài nguyên mạng của bạn trên VPC.

## Subnet network

Một subnet network là một phần của một mạng lớn hơn được chia thành các mạng con nhỏ hơn, mỗi mạng con thuộc cùng một dãy địa chỉ IP. Mục đích của việc phân chia một mạng lớn hơn thành các subnet là để quản lý, kiểm soát và bảo mật lưu lượng truy cập giữa các thiết bị trên mạng.

Mỗi subnet network có dãy địa chỉ IP của riêng nó, được xác định bởi một subnet mask. Subnet mask giúp phân biệt các địa chỉ IP trên mạng thành các mạng con khác nhau dựa trên số bit 0 ở phần cuối của địa chỉ IP.

Trong Amazon Web Services (AWS), các subnet network được sử dụng trong Amazon Virtual Private Cloud (VPC), một dịch vụ cho phép người dùng tạo các mạng riêng tư tùy chỉnh trên nền tảng AWS. Các subnet trong VPC có thể được sử dụng để phân chia mạng thành các khu vực với các mức độ riêng tư khác nhau, tăng cường an ninh và nhận diện quyền truy cập.

## CIDR

CIDR (Classless Inter-Domain Routing) là một phương pháp định tuyến IP cho phép phân đoạn dãy địa chỉ IP một cách chi tiết và dễ quản lý hơn. CIDR biểu diễn các dãy địa chỉ IP bằng cách sử dụng một số bit cụ thể từ địa chỉ IP để chỉ định subnet.

Địa chỉ IP CIDR được viết dưới dạng (địa chỉ IP)/(số bit của mask). Ví dụ, 192.168.0.0/24 cho thấy 24 bit đầu tiên của địa chỉ IP xác định subnet, trong khi 8 bit còn lại tạo thành các địa chỉ IP riêng lẻ.

Trong AWS, CIDR được sử dụng trong Amazon Virtual Private Cloud (VPC) để xác định dãy địa chỉ IP cho các subnet network. Khi tạo một subnet trong VPC, người dùng phải chỉ định một khối CIDR để xác định dãy địa chỉ IP có sẵn cho subnet đó.

Để tính toán số lượng địa chỉ IP có sẵn trong một dãy CIDR, có thể sử dụng công thức: 2^(32 - số bit của mask). Ví dụ, trong dãy CIDR 192.168.0.0/24, có tổng cộng 256 địa chỉ IP (2^(32-24)).

## VPC Peering

VPC Peering là một tính năng trong Amazon Virtual Private Cloud (VPC) cho phép kết nối trực tiếp giữa hai hoặc nhiều VPC khác nhau, ngay cả khi chúng không thuộc cùng một tài khoản AWS. Kết nối này cho phép các VPC truy cập vào tài nguyên của nhau thông qua một kết nối mạng riêng tư và an toàn.

Khi bạn thiết lập VPC Peering, các subnet trong các VPC khác nhau được kết nối với nhau qua một kết nối mạng ảo do AWS quản lý. Điều này cho phép các instances trong các VPC khác nhau trao đổi traffic trực tiếp thông qua một mạng riêng tư, nâng cao tính linh hoạt và hiệu quả của các ứng dụng của bạn.

Một số ưu điểm của VPC Peering bao gồm:

- **Security**: Các kết nối VPC Peering được mã hóa và truyền qua một mạng riêng tư, đảm bảo dữ liệu được truyền là an toàn.
- **Flexibility**: VPC Peering cho phép kết nối các VPC khác nhau nằm ở các khu vực khác nhau, các tài khoản khác nhau, hoặc sử dụng các CIDR block khác nhau.
- **Cost Savings**: VPC Peering cho phép trao đổi traffic giữa các VPC thông qua một mạng riêng tư, giảm nhu cầu sử dụng các cổng ra vào công cộng hoặc các kết nối VPN, do đó tiết kiệm chi phí cho doanh nghiệp.

## NAT Gateway

NAT Gateway là một dịch vụ do Amazon Web Services (AWS) cung cấp, cho phép các instance trong một Amazon Virtual Private Cloud (VPC) truy cập Internet thông qua một địa chỉ IP duy nhất, tăng cường bảo mật và quản lý lưu lượng mạng.

Khi một instance trong VPC cần kết nối đến Internet để tải cập nhật, cài đặt phần mềm, hoặc thực hiện các tác vụ mạng khác, NAT Gateway sẽ chuyển tiếp lưu lượng mạng từ instance này đến Internet. NAT Gateway được đặt trong một public subnet, và các instance muốn truy cập Internet nên được đặt trong các private subnets và được liên kết với NAT Gateway.

Một số lợi ích của NAT Gateway bao gồm:

- **Security**: NAT Gateway giúp che giấu địa chỉ IP thực sự của các instance trong VPC, tăng cường bảo mật hệ thống.
- **Flexibility**: NAT Gateway có thể xử lý lưu lượng mạng đến và đi từ Internet cho nhiều private subnets trong VPC.
- **Reliability**: NAT Gateway được triển khai qua nhiều Zones trong một khu vực AWS, tăng cường độ tin cậy và khả năng sẵn sàng của hệ thống.
- **Automation**: Được quản lý bởi AWS, NAT Gateway giảm bớt các tác vụ quản lý và bảo dưỡng cho người dùng.

Tuy nhiên, NAT Gateway là một dịch vụ trả phí, và người dùng cần phải trả phí hàng tháng tương ứng với lưu lượng mạng được chuyển tiếp thông qua NAT Gateway.

## Route Table

Bảng định tuyến (route table) là một thành phần quan trọng trong Amazon Virtual Private Cloud (VPC) của Amazon Web Services (AWS), được sử dụng để xác định cách lưu lượng mạng được định tuyến giữa các subnet hoặc một internet gateway trong VPC.

Mỗi subnet trong VPC đều có một bảng định tuyến, và bảng định tuyến này chứa các bản ghi định tuyến (route entries) chỉ định cách lưu lượng mạng nên được hướng dẫn. Các bản ghi định tuyến này định nghĩa các điểm đến có thể truy cập từ subnet đó và bước tiếp theo (next hop) nơi lưu lượng mạng sẽ được chuyển tiếp.

Các bản ghi định tuyến có thể được thiết lập để hướng lưu lượng mạng đến các subnet khác trong VPC, định tuyến lưu lượng mạng đến Internet thông qua một Internet gateway hoặc NAT Gateway, hoặc định tuyến lưu lượng mạng đến các thiết bị mạng khác bên ngoài VPC.

Bảng định tuyến cũng cho phép người dùng tùy chỉnh các bản ghi định tuyến để định tuyến lưu lượng mạng theo ý muốn của họ, mang lại sự linh hoạt và hiệu quả cho hệ thống mạng trong VPC.

Tóm lại, Route Table là một thành phần quan trọng trong Amazon Virtual Private Cloud (VPC) giúp định tuyến lưu lượng mạng giữa các subnet hoặc một Internet gateway trong VPC và cho phép người dùng tùy chỉnh các bản ghi định tuyến để định tuyến lưu lượng mạng theo ý muốn của họ.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/aws/1.png)
