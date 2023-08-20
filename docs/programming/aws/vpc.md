---
title: Amazon Virtual Private Cloud
---

## Network ACL

Network Access Control List (ACL) là một tính năng của Amazon Web Services (AWS) được sử dụng để kiểm soát quyền truy cập vào một tài nguyên mạng. Nó hoạt động trên mức mạng và được áp dụng cho các tài nguyên trên Amazon Virtual Private Cloud (VPC), bao gồm các subnet và các instance.

Network ACL hoạt động tương tự như firewall trên mức mạng, cho phép bạn kiểm soát các kết nối truy cập đến và đi từ một subnet hoặc instance trên VPC. Nó cho phép bạn tạo các quy tắc để cho phép hoặc chặn các kết nối dựa trên địa chỉ IP nguồn và đích, giao thức và cổng.

Mỗi subnet trong VPC có thể được liên kết với một Network ACL. Nếu một subnet không được liên kết với bất kỳ Network ACL nào, nó sẽ được áp dụng mặc định Network ACL, cho phép tất cả các kết nối vào và ra.

Network ACL cho phép bạn kiểm soát truy cập trên mức mạng, trong khi Security Group của EC2 cho phép bạn kiểm soát truy cập trên mức instance. Tuy nhiên, điều này không đồng nghĩa với việc Network ACL và Security Group thay thế cho nhau. Thay vào đó, chúng bổ sung cho nhau để cung cấp một lớp bảo vệ toàn diện cho các tài nguyên mạng của bạn trên VPC.

## Subnet network

Subnet network là một phần của mạng lớn hơn được chia nhỏ ra thành các mạng con (subnetworks) thuộc cùng một vùng địa chỉ IP. Mục đích của việc chia mạng lớn thành các subnet là để quản lý, điều khiển và bảo mật traffic truy cập giữa các thiết bị trong mạng.

Mỗi subnet network sẽ có một phạm vi địa chỉ IP riêng, được xác định bởi một subnet mask (mặt nạ mạng). Subnet mask giúp chia các địa chỉ IP trên mạng thành các mạng con khác nhau, dựa trên số bit 0 ở cuối địa chỉ IP.

Trong Amazon Web Services (AWS), các subnet network được sử dụng trong Amazon Virtual Private Cloud (VPC), một dịch vụ cho phép người dùng tạo ra các mạng riêng ảo theo ý muốn trên nền tảng AWS. Các subnet network trong VPC có thể được sử dụng để chia mạng ra thành các khu vực có tính riêng tư khác nhau, tăng tính bảo mật và nhận diện truy cập mạng.

## CI/DR

CIDR (Classless Inter-Domain Routing) là một phương pháp định tuyến IP, cho phép chia nhỏ và quản lý các phạm vi địa chỉ IP dễ dàng hơn. CIDR được sử dụng để biểu diễn phạm vi địa chỉ IP bằng cách sử dụng một số lượng bit trong địa chỉ IP để xác định mạng con.

Các địa chỉ IP CIDR được viết dưới dạng (địa chỉ IP)/(số bit mask). Ví dụ, 192.168.0.0/24 biểu thị rằng 24 bit đầu tiên của địa chỉ IP là mạng con, còn 8 bit cuối cùng tạo thành các địa chỉ IP riêng lẻ.

Trong AWS, CIDR được sử dụng trong Amazon Virtual Private Cloud (VPC) để xác định phạm vi địa chỉ IP được sử dụng cho subnet network. Khi tạo một subnet network trong VPC, người dùng cần chỉ định một CIDR block để xác định phạm vi địa chỉ IP có thể sử dụng trong subnet network đó.

Để tính toán số lượng địa chỉ IP có sẵn trong một phạm vi CIDR, ta có thể sử dụng công thức: 2^(32-số bit mask). Ví dụ, trong phạm vi CIDR 192.168.0.0/24, có tổng cộng 256 địa chỉ IP (2^(32-24)).

## VPC Peering

VPC Peering là một tính năng trong Amazon Virtual Private Cloud (VPC) cho phép kết nối trực tiếp hai hoặc nhiều VPC khác nhau, dù chúng không cùng thuộc vào cùng một tài khoản AWS. Kết nối này giúp các VPC có thể truy cập các tài nguyên của nhau thông qua một kết nối mạng riêng tư và bảo mật.

Khi bạn thiết lập VPC Peering, các subnet network trong các VPC khác nhau được kết nối lại với nhau thông qua một kết nối mạng ảo được quản lý bởi AWS. Điều này cho phép các instance trong các VPC khác nhau trao đổi traffic trực tiếp qua mạng riêng tư, giúp tăng tính linh hoạt và hiệu quả cho các ứng dụng của bạn.

Một số ưu điểm của VPC Peering bao gồm:

- Tính bảo mật: Các kết nối VPC Peering được mã hóa và truyền qua mạng riêng tư, đảm bảo rằng các dữ liệu truyền qua kết nối này được bảo mật.
- Tính linh hoạt: VPC Peering cho phép kết nối các VPC khác nhau nằm ở các vùng khác nhau, tài khoản khác nhau, hoặc đang sử dụng các CIDR block khác nhau.
- Tính tiết kiệm chi phí: VPC Peering cho phép trao đổi traffic giữa các VPC thông qua mạng riêng tư, từ đó giảm thiểu việc sử dụng các gateway công cộng hoặc VPN connections, giúp tiết kiệm chi phí cho doanh nghiệp.

Tuy nhiên, cần lưu ý rằng VPC Peering chỉ cho phép truy cập các tài nguyên trong VPC khác, không phải các tài nguyên nằm ngoài AWS.

## NAT Gateway

NAT Gateway là một dịch vụ của Amazon Web Services (AWS) cho phép các instance trong một Amazon Virtual Private Cloud (VPC) có thể truy cập Internet thông qua một địa chỉ IP đơn duy nhất, giúp tăng tính bảo mật và quản lý traffic mạng.

Khi một instance trong VPC cần kết nối Internet để tải xuống các gói cập nhật, cài đặt phần mềm, hoặc thực hiện các tác vụ mạng khác, NAT Gateway sẽ chuyển tiếp traffic từ instance đó qua Internet. NAT Gateway được đặt tại một subnet public, và các instance muốn truy cập Internet cần phải được đặt trong các subnet private và được liên kết với NAT Gateway.

Một số ưu điểm của NAT Gateway bao gồm:

- Tính bảo mật: NAT Gateway giúp che giấu địa chỉ IP thực của các instance trong VPC, giúp tăng tính bảo mật cho hệ thống.
- Tính linh hoạt: NAT Gateway có thể xử lý traffic đến và từ Internet cho nhiều subnet private trong VPC.
- Tính tin cậy: NAT Gateway được triển khai trên nhiều Zone khác nhau trong một khu vực AWS, giúp tăng tính tin cậy và độ sẵn sàng của hệ thống.
- Tính tự động hóa: NAT Gateway được quản lý bởi AWS, giúp giảm thiểu công việc quản lý và bảo trì cho người dùng.

Tuy nhiên, NAT Gateway là một dịch vụ có tính phí, người dùng cần thanh toán phí hàng tháng tương ứng với lượng traffic được chuyển tiếp qua NAT Gateway.

## Route table

Route table là một thành phần quan trọng trong Amazon Virtual Private Cloud (VPC) của Amazon Web Services (AWS), được sử dụng để xác định cách thức điều hướng traffic giữa các subnet network hoặc internet gateway trong VPC.

Mỗi subnet network trong VPC đều có một route table, và route table này chứa các bản ghi route, cho biết traffic nên được điều hướng như thế nào. Các bản ghi route này xác định các destination (đích đến) có thể được truy cập từ subnet network đó, và next hop (điểm tiếp theo) mà traffic sẽ được chuyển đến.

Các bản ghi route có thể được thiết lập để điều hướng traffic đến các subnet network khác trong VPC, điều hướng traffic đến Internet thông qua Internet gateway hoặc NAT Gateway, hoặc điều hướng traffic đến các thiết bị mạng khác ngoài VPC.

Các route table cũng cho phép người dùng tùy chỉnh các bản ghi route để điều hướng traffic theo ý muốn của mình, nhằm tăng tính linh hoạt và hiệu quả cho hệ thống mạng trong VPC.

Tổng kết lại, Route Table là một thành phần quan trọng trong Amazon Virtual Private Cloud (VPC) giúp điều hướng traffic giữa các subnet network hoặc Internet gateway trong VPC và cho phép người dùng tùy chỉnh các bản ghi route để điều hướng traffic theo ý muốn của mình.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/aws/1.png)
