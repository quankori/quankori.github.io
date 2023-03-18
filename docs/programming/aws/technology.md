---
title: AWS Technology
---

## AWS Management Console

AWS Management Console là giao diện web dùng để quản lý và điều khiển các dịch vụ của Amazon Web Services (AWS). Nó được thiết kế để giúp người dùng tạo, cấu hình và quản lý các tài nguyên AWS của họ một cách dễ dàng.

AWS Management Console cung cấp các chức năng như tạo máy ảo EC2, lưu trữ đối tượng S3, cơ sở dữ liệu RDS, VPC, IAM, CloudFormation và nhiều dịch vụ khác. Người dùng có thể tìm kiếm và truy cập vào các tài nguyên của mình, xem thông tin chi tiết về các dịch vụ AWS, tạo và quản lý tài khoản của mình, và tùy chỉnh các thông số cấu hình cho các tài nguyên AWS của mình.

AWS Management Console cho phép người dùng quản lý tài nguyên của mình từ bất kỳ đâu trên thế giới, miễn là có kết nối Internet. Giao diện này được thiết kế để đơn giản hóa quá trình quản lý, giúp người dùng tiết kiệm thời gian và công sức trong việc quản lý các dịch vụ của mình trên AWS.

## AWS CloudFormation

AWS CloudFormation là một dịch vụ của Amazon Web Services (AWS) được sử dụng để triển khai và quản lý hạ tầng đám mây. Nó cho phép người dùng tự động hóa việc triển khai các nguồn tài nguyên AWS bằng cách xác định chúng trong một tệp mẫu YAML hoặc JSON, thay vì phải thực hiện từng hoạt động một cách thủ công.

CloudFormation sử dụng các tệp mẫu này để tạo ra các tài nguyên AWS như máy chủ ảo EC2, hệ thống lưu trữ S3, cơ sở dữ liệu RDS,... và thiết lập các mối quan hệ giữa chúng. Khi được triển khai, CloudFormation tự động tạo và cấu hình tất cả các tài nguyên trên một cơ sở hạ tầng AWS có tính toán, lưu trữ và mạng.

Mọi thao tác quản lý hạ tầng đám mây, bao gồm việc tạo, cập nhật và xóa các tài nguyên, đều có thể được thực hiện thông qua tệp mẫu CloudFormation. Dịch vụ này cũng cho phép kiểm tra tích hợp liên kết giữa các tài nguyên và theo dõi các tài nguyên đang được sử dụng để tăng cường khả năng quản lý.

Với AWS CloudFormation, các tổ chức có thể giảm thiểu thời gian, công sức và chi phí cần thiết để quản lý hạ tầng đám mây, đồng thời cung cấp một phương tiện tự động hóa cho việc triển khai các nguồn tài nguyên AWS.

## AWS Systems Manager

AWS Systems Manager là một dịch vụ quản lý hạ tầng đám mây của Amazon Web Services (AWS) cho phép khách hàng quản lý các máy ảo và các tài nguyên trên nền tảng AWS. Dịch vụ này cung cấp một loạt các tính năng, bao gồm giám sát hiệu suất, tự động hóa đáp ứng, quản lý cập nhật và quản lý nội dung.

Với AWS Systems Manager, người dùng có thể tổng hợp dữ liệu từ các nguồn khác nhau để kiểm tra tình trạng máy chủ và ứng dụng, xem các thông báo cảnh báo và giải quyết các sự cố. Họ cũng có thể áp dụng các cập nhật và phiên bản mới cho các máy ảo và tài nguyên AWS một cách tự động. Ngoài ra, AWS Systems Manager còn hỗ trợ việc triển khai các ứng dụng và hệ thống trên nhiều khu vực và tài khoản khác nhau.

## AWS Glue

AWS Glue là một dịch vụ ETL (Extract, Transform and Load) quản lý hạ tầng đám mây của Amazon Web Services (AWS). Dịch vụ này cung cấp các công cụ để giúp người dùng trích xuất dữ liệu từ nguồn khác nhau, chuyển đổi và chuẩn hóa dữ liệu, sau đó tải dữ liệu đã được xử lý vào kho lưu trữ của AWS như S3, Redshift và các dịch vụ khác.

AWS Glue sử dụng các bản vá dữ liệu tự động để phát hiện và chỉnh sửa lỗi trong dữ liệu. Nó cũng cung cấp khả năng tạo schema tự động cho dữ liệu đầu vào và liên kết các tệp dữ liệu khác nhau với nhau. AWS Glue có khả năng tự động mở rộng và điều phối các tác vụ xử lý dữ liệu của bạn, cho phép bạn xử lý hàng triệu bản ghi dữ liệu một cách hiệu quả.

Ngoài ra, AWS Glue còn hỗ trợ tính năng "Development Endpoints" cho phép các nhà phát triển viết mã Python để thực hiện các tác vụ ETL phức tạp và kiểm tra các luồng dữ liệu trước khi triển khai chúng.

Tóm lại, AWS Glue là một dịch vụ ETL quản lý hạ tầng đám mây của AWS cung cấp các công cụ để trích xuất, chuyển đổi và tải dữ liệu. Nó cũng cung cấp khả năng tự động mở rộng và hỗ trợ tính năng "Development Endpoints" để giúp các nhà phát triển xử lý các tác vụ ETL phức tạp.

## AWS Database Migration Service

AWS Database Migration Service (AWS DMS) là một dịch vụ của Amazon Web Services (AWS) cho phép di chuyển dữ liệu từ một nơi đến nơi khác, giữa các cơ sở dữ liệu khác nhau. AWS DMS giúp người dùng sao chép cơ sở dữ liệu đến hoặc từ AWS Cloud, và giữ nguyên tính toàn vẹn và khả năng truy cập của dữ liệu trong quá trình di chuyển.

AWS DMS hỗ trợ nhiều loại cơ sở dữ liệu, bao gồm MySQL, PostgreSQL, Oracle, SQL Server và MongoDB. Nó cung cấp các công cụ để tối ưu hóa và can thiệp vào quá trình di chuyển dữ liệu, như lọc và biến đổi dữ liệu.

Các tính năng chính của AWS DMS bao gồm:

- Khả năng di chuyển dữ liệu giữa các cơ sở dữ liệu khác nhau.
- Hỗ trợ cho nhiều loại cơ sở dữ liệu.
- Tùy chọn lọc và biến đổi dữ liệu trong quá trình di chuyển.
- Cải thiện hiệu suất và tối ưu hóa quá trình di chuyển dữ liệu.
- Đảm bảo tính toàn vẹn và khả năng truy cập của dữ liệu trong quá trình di chuyển.

Với AWS DMS, người dùng có thể dễ dàng di chuyển cơ sở dữ liệu của họ giữa các nền tảng khác nhau mà không cần phải lo lắng về việc mất dữ liệu hoặc gián đoạn kết nối. AWS DMS giúp tăng tính linh hoạt của kiến trúc cơ sở dữ liệu và giảm chi phí và thời gian cho quá trình di chuyển.

## AWS Snowmobile

AWS Snowmobile là một dịch vụ di chuyển dữ liệu lớn của Amazon Web Services (AWS). Dịch vụ này cung cấp cho khách hàng một phương tiện di chuyển dữ liệu vật lý, được thiết kế để di chuyển tới nơi khách hàng đang lưu trữ dữ liệu của họ, để chuyển dữ liệu từ các trung tâm dữ liệu của khách hàng vào AWS Cloud.

Snowmobile có thể chứa lên tới 100 petabyte (PB) dữ liệu và được vận chuyển bằng một xe tải chuyên dụng có kích thước lớn. Khi Snowmobile đến nơi, khách hàng có thể sử dụng kết nối trực tiếp với AWS Direct Connect để nhanh chóng truyền dữ liệu vào AWS Cloud. Vì Snowmobile được thiết kế để chuyển dữ liệu lớn, việc truyền dữ liệu qua Snowmobile có thể giảm thời gian và chi phí so với việc truyền dữ liệu qua Internet.

Các tính năng chính của Snowmobile bao gồm:

- Khả năng chứa lên tới 100 PB dữ liệu trong một xe tải.
- Công nghệ bảo mật cao để bảo vệ dữ liệu trong quá trình di chuyển.
- Cung cấp kết nối trực tiếp tới AWS Direct Connect.
- Phù hợp cho việc chuyển dữ liệu lớn đến AWS Cloud.

Tóm lại, AWS Snowmobile là một dịch vụ di chuyển dữ liệu lớn của AWS, được thiết kế để chuyển dữ liệu từ khách hàng vào AWS Cloud thông qua một xe tải chuyên dụng có kích thước lớn. Việc sử dụng Snowmobile có thể giảm thời gian và chi phí so với việc truyền dữ liệu qua Internet.

## AWS Snowcone

AWS Snowcone là một dịch vụ lưu trữ di động của Amazon Web Services (AWS) được thiết kế để lưu trữ, chuyển và xử lý dữ liệu trong các môi trường độc lập và khó tiếp cận. Nó là một thiết bị nhỏ gọn, bền và có khả năng hoạt động ở những môi trường khắc nghiệt nhất.

Snowcone có kích thước nhỏ hơn rất nhiều so với Snowmobile. Thiết bị này có kích thước tương tự với một quả bóng bàn, có khả năng chứa lên tới 8 terabyte (TB) dữ liệu. Snowcone có thể được sử dụng để sao lưu và phục hồi dữ liệu, chuyển dữ liệu giữa các vị trí khác nhau, và cho phép xử lý dữ liệu tại chỗ.

Để phân biệt AWS Snowmobile và AWS Snowcone, bạn có thể xem xét các yếu tố sau:

- Kích thước: Snowmobile có kích thước rất lớn, trong khi Snowcone có kích thước rất nhỏ.
- Khả năng chứa dữ liệu: Snowmobile có khả năng chứa lên tới 100 PB dữ liệu, trong khi Snowcone chỉ có thể chứa tối đa 8 TB.
- Mục đích sử dụng: Snowmobile được sử dụng để chuyển dữ liệu lớn từ khách hàng vào AWS Cloud, trong khi Snowcone được sử dụng để lưu trữ, chuyển và xử lý dữ liệu trong các môi trường khó tiếp cận.

Tóm lại, AWS Snowcone là một dịch vụ lưu trữ di động nhỏ gọn của AWS cho phép lưu trữ, chuyển và xử lý dữ liệu trong các môi trường khó tiếp cận, trong khi AWS Snowmobile là một dịch vụ di chuyển dữ liệu lớn của AWS được thiết kế để chuyển dữ liệu từ khách hàng vào AWS Cloud.

## AWS Snowball Edge

AWS Snowball Edge là một thiết bị lưu trữ có khả năng tính toán và kết nối mạng, được thiết kế để giúp người dùng di chuyển dữ liệu từ các vùng không có kết nối internet đến AWS (Amazon Web Services) một cách nhanh chóng và an toàn.

Snowball Edge được xây dựng trên nền tảng phần cứng của Amazon và có dung lượng lưu trữ từ 80TB đến 100TB. Nó cho phép người dùng lưu trữ dữ liệu cục bộ và sau đó gửi dữ liệu đó đến AWS thông qua một kết nối mạng an toàn. Tính năng này rất hữu ích cho các tổ chức hoặc doanh nghiệp muốn di chuyển lượng lớn dữ liệu từ các vùng không có kết nối internet đến AWS.

Ngoài việc lưu trữ và di chuyển dữ liệu, Snowball Edge cũng có thể sử dụng như một node tính toán trong mạng, cho phép người dùng thực hiện các công việc xử lý dữ liệu trên máy chủ riêng của họ. Snowball Edge hỗ trợ các tác vụ xử lý dữ liệu như phân tích dữ liệu, học máy, xử lý video và phát triển ứng dụng.

Tóm lại, AWS Snowball Edge là một thiết bị lưu trữ tính toán và kết nối mạng được thiết kế để giúp người dùng di chuyển lượng lớn dữ liệu từ các vùng không có kết nối Internet đến AWS một cách an toàn và nhanh chóng. Nó cũng được sử dụng để thực hiện các tác vụ tính toán trên máy chủ riêng của người dùng.

| Tính năng                       | AWS Snowmobile   | AWS Snowball Edge | AWS Snowcone                                   |
| ------------------------------- | ---------------- | ----------------- | ---------------------------------------------- |
| Dung lượng lưu trữ tối đa       | 100 PB - 1 EB    | 80 TB - 100 TB    | 8 TB                                           |
| Kết nối mạng tích hợp           | Có               | Có                | Không                                          |
| Khả năng tính toán tích hợp     | Không            | Có                | Không                                          |
| Loại dữ liệu hỗ trợ             | Mọi loại         | Mọi loại          | Tập tin, ảnh, video                            |
| Kích thước                      | Container xe tải | Hộp nhỏ gọn       | Hộp siêu nhỏ gọn                               |
| Thời gian chuyển dữ liệu tối đa | 2 tuần           | 1-2 ngày          | Tùy thuộc vào kích thước và tốc độ của dữ liệu |
| Điều khiển từ xa                | Không            | Có                | Có                                             |
| Chi phí cho mỗi lần sử dụng     | Cao              | Trung bình        | Thấp                                           |

## AWS CloudSearch

Amazon CloudSearch là một dịch vụ tìm kiếm toàn diện do Amazon Web Services (AWS) cung cấp. Nó cho phép người dùng tạo và triển khai các giải pháp tìm kiếm trên các ứng dụng web và di động một cách dễ dàng và nhanh chóng.

CloudSearch được thiết kế để cung cấp các tính năng tìm kiếm cao cấp, bao gồm tìm kiếm đầy đủ văn bản, tìm kiếm theo tiêu chí và sắp xếp theo thứ tự ưu tiên. Nó cũng hỗ trợ tính năng gợi ý từ khóa và phân tích ngôn ngữ tự động. Ngoài ra, CloudSearch còn có khả năng mở rộng linh hoạt để xử lý các tập dữ liệu khổng lồ và tốc độ truy vấn cao.

Các tính năng chính của CloudSearch bao gồm:

- Tìm kiếm đầy đủ văn bản và tìm kiếm theo tiêu chí.
- Hỗ trợ phân tích ngôn ngữ tự động và gợi ý từ khóa.
- Thiết kế để mở rộng dễ dàng để xử lý dữ liệu lớn và tốc độ truy vấn cao.
- Cung cấp API để tích hợp với các ứng dụng web và di động.

Với Amazon CloudSearch, người dùng có thể dễ dàng tạo các giải pháp tìm kiếm trên các ứng dụng web và di động của họ và cung cấp các tính năng tìm kiếm cao cấp để người dùng có thể tìm kiếm nhanh chóng và hiệu quả thông tin trong các ứng dụng của họ.

## AWS AI

- AWS SageMaker: là một dịch vụ máy học được quản lý hoàn toàn, giúp người dùng xây dựng, huấn luyện và triển khai các mô hình máy học nhanh chóng và dễ dàng. Nó cung cấp các công cụ và khối xây dựng để xử lý dữ liệu, tạo mô hình, kiểm tra mô hình và triển khai dịch vụ.

- AWS Macie: là một dịch vụ bảo mật, giúp phát hiện và bảo vệ các thông tin quan trọng của khách hàng, bao gồm thông tin riêng tư và thông tin nhạy cảm. Nó sử dụng trí tuệ nhân tạo để phát hiện các dữ liệu quan trọng, xác định rủi ro và đề xuất các biện pháp cần thiết để bảo vệ thông tin.

- AWS Rekognition: là một dịch vụ trí tuệ nhân tạo, cung cấp khả năng nhận diện khuôn mặt và phân tích hình ảnh. Nó có thể xác định các đối tượng và khuôn mặt trong hình ảnh, phát hiện các độ tuổi và giới tính, xác minh danh tính và theo dõi vật thể trong thời gian thực.

Tóm lại, AWS SageMaker là dịch vụ xây dựng và triển khai các mô hình máy học nhanh chóng, trong khi AWS Macie là dịch vụ bảo mật dữ liệu và AWS Rekognition là dịch vụ trí tuệ nhân tạo cho phép xử lý hình ảnh và nhận diện khuôn mặt.

## AWS Storage Gateway

Amazon Storage Gateway – File Gateway là một dịch vụ lưu trữ đám mây được cung cấp bởi Amazon Web Services (AWS), cho phép người dùng kết nối các tệp dựa trên đám mây từ các ứng dụng và máy chủ của họ thông qua giao diện file server.

Nó cho phép người dùng sử dụng giao diện file server (SMB hoặc NFS) để kết nối đến tệp dựa trên đám mây, giúp tiết kiệm chi phí và thời gian vận hành. Với File Gateway, người dùng có thể lưu trữ các tệp dữ liệu của mình trong Amazon S3 (Simple Storage Service) và quản lý chúng như các tệp dữ liệu trên local storage.

Một số tính năng chính của Amazon Storage Gateway - File Gateway bao gồm:

- Hỗ trợ giao diện file server (SMB hoặc NFS).
- Kết nối đến Amazon S3 như một backend storage.
- Hỗ trợ mã hóa dữ liệu đầu cuối để bảo vệ dữ liệu khi truyền từ máy khách đến AWS.
- Tự động sao lưu dữ liệu trong suốt quá trình hoạt động của gateway.
- Tích hợp với các dịch vụ khác của AWS như Amazon CloudWatch để theo dõi và quản lý dịch vụ.

Với Amazon Storage Gateway - File Gateway, người dùng có thể tận dụng lợi ích của việc lưu trữ đám mây, trong khi vẫn duy trì giao diện file server truyền thống để quản lý các tệp dữ liệu của họ.

## AWS EMR

Amazon EMR là một dịch vụ xử lý lớn của Amazon Web Services (AWS), cung cấp một môi trường phân tích dữ liệu và xử lý lô lớn trong đám mây. EMR cho phép người dùng dễ dàng phát triển, triển khai và quản lý các ứng dụng Hadoop và các framework phân tán khác như Apache Spark, Apache Hive, Apache HBase và Presto.

EMR cung cấp một số tính năng và lợi ích chính sau:

- Tự động triển khai cụm Hadoop và các framework phân tán khác trên AWS.
- Tự động mở rộng cụm theo nhu cầu của người dùng để đảm bảo hiệu suất tốt nhất.
- Có thể sử dụng các công cụ phổ biến như Jupyter Notebook để phân tích dữ liệu.
- Dễ dàng kết hợp với các dịch vụ khác của AWS như S3, EC2 và CloudWatch để lưu trữ và quản lý dữ liệu.
- Cung cấp các tính năng bảo mật như mã hóa SSL và IAM để bảo vệ dữ liệu của người dùng.
- Hỗ trợ nhiều loại phiên bản Hadoop và framework phân tán khác.

EMR giúp người dùng tiết kiệm chi phí và thời gian khi triển khai và quản lý các ứng dụng lô lớn, đồng thời cung cấp khả năng mở rộng linh hoạt để đáp ứng nhu cầu của doanh nghiệp. Nó được sử dụng rộng rãi trong các ngành như tài chính, y tế, giáo dục và quản lý khối lượng lớn dữ liệu để phân tích dữ liệu và đưa ra quyết định thông minh.

## AWS Lightsail

Amazon Lightsail là một dịch vụ cloud hosting của Amazon Web Services (AWS), được thiết kế để cung cấp các máy chủ ảo (virtual private servers) và các tài nguyên khác cho các nhà phát triển web, doanh nghiệp mới bắt đầu hoặc các công ty nhỏ.

Với Lightsail, người dùng có thể dễ dàng triển khai và quản lý các ứng dụng web, website hoặc blog trên AWS mà không cần kiến thức chuyên sâu về quản trị hệ thống. Nó cung cấp một giao diện đơn giản để người dùng có thể tạo, sửa đổi và quản lý các máy chủ ảo, thông qua các mẫu, bản sao back-ups, thư viện ứng dụng và các tính năng khác.

Một số tính năng của Amazon Lightsail bao gồm:

- Triển khai các máy chủ ảo (VPS) với CPU, RAM, lưu trữ và băng thông.
- Hỗ trợ cho nhiều hệ điều hành, bao gồm Linux và Windows.
- Cung cấp tường lửa và bảo mật mạng để bảo vệ các ứng dụng của người dùng.
- Tích hợp với nhiều dịch vụ AWS khác như S3, RDS và Route 53.
- Có tính năng back-up và khôi phục dữ liệu tự động để đảm bảo an toàn cho các ứng dụng của người dùng.

Lightsail cung cấp một giải pháp đơn giản và hiệu quả cho người dùng muốn triển khai các ứng dụng web và website của họ trên đám mây của AWS mà không cần phải lo lắng về các chi tiết kỹ thuật phức tạp.

## AWS Control Tower

AWS Control Tower là một dịch vụ quản lý cơ sở hạ tầng đám mây của Amazon Web Services (AWS), được thiết kế để giúp khách hàng tự động hóa và kiểm soát việc triển khai và quản lý các tài nguyên AWS.

Dịch vụ này giúp phân chia công việc, quản lý quy trình tuân thủ chuẩn mực bảo mật hàng đầu, đồng bộ hóa việc triển khai dịch vụ mới và nhanh chóng xử lý các vấn đề phát sinh. Control Tower cho phép người dùng tạo và quản lý các tài khoản AWS độc lập, nhưng vẫn tuân thủ cùng một quy trình và tiêu chuẩn bảo mật.

Control Tower bao gồm các tính năng quản lý như kiểm soát phiên bản, quản lý quyền truy cập, phân tích an ninh và giám sát thông qua Amazon CloudWatch. Nó cũng tích hợp với AWS Service Catalog và AWS Config để cung cấp quản lý tài nguyên được tự động hóa.

Control Tower hỗ trợ nhiều quy định và chuẩn mực bảo mật quốc tế, bao gồm CIS AWS Foundations Benchmark, GDPR và HIPAA. Nó cũng có thể được tùy chỉnh để tuân thủ nội quy và quy trình bảo mật của tổ chức.

Tóm lại, AWS Control Tower là một dịch vụ quản lý cơ sở hạ tầng đám mây của AWS, giúp tự động hóa và kiểm soát việc triển khai và quản lý các tài nguyên AWS. Nó cung cấp các tính năng quản lý, hỗ trợ nhiều chuẩn mực bảo mật quốc tế và có thể được tùy chỉnh để tuân thủ nội quy và quy trình bảo mật của tổ chức.

## AWS Fargate

AWS Fargate là một dịch vụ quản lý máy chủ đám mây của Amazon Web Services (AWS). Nó cho phép khách hàng triển khai các ứng dụng trên AWS mà không cần phải quản lý các máy chủ ảo EC2.

Với AWS Fargate, khách hàng có thể tạo ra các bộ điều khiển ứng dụng mà không cần phải cấu hình hay quản lý các máy chủ. Dịch vụ này sẽ tự động quản lý tài nguyên và tính toán để đáp ứng yêu cầu của ứng dụng.

Fargate là một dịch vụ linh hoạt và có khả năng mở rộng, hỗ trợ cho việc triển khai các ứng dụng đa dạng như container và microservices. Nó cũng cung cấp các tính năng bảo mật, như mã hóa dữ liệu, xác thực API, chính sách quản lý truy cập và bảo vệ mạng.

Ngoài ra, Fargate còn tích hợp chặt chẽ với các dịch vụ khác của AWS như Amazon Elastic Container Service (ECS) và Kubernetes. Điều này giúp khách hàng quản lý và triển khai các ứng dụng một cách hiệu quả trong môi trường đám mây của AWS.

Tóm lại, AWS Fargate là một dịch vụ quản lý máy chủ đám mây của AWS được thiết kế để giúp khách hàng triển khai và quản lý các ứng dụng một cách linh hoạt, dễ dàng và bảo mật trên các máy chủ ảo của AWS mà không cần phải quản lý chúng.

## AWS Quick Start

AWS Quick Starts là một bộ công cụ của Amazon Web Services (AWS) giúp khách hàng nhanh chóng triển khai các giải pháp đám mây được thiết kế trước và đã được kiểm tra sẵn.

Các Quick Starts là các bản thiết kế chuẩn được tạo ra để giúp khách hàng dễ dàng triển khai các ứng dụng trong môi trường đám mây của AWS. Các giải pháp đó có thể bao gồm các ứng dụng web, cơ sở dữ liệu, hệ thống lưu trữ, bảo mật, nhận dạng và quản lý.

Mỗi Quick Start đi kèm với một tài liệu hướng dẫn chi tiết để giúp người dùng triển khai các giải pháp này một cách nhanh chóng và hiệu quả. Ngoài ra, các Quick Starts còn hỗ trợ cho phép người dùng tùy chỉnh và thích nghi giải pháp cho nhu cầu của riêng họ.

Sử dụng Quick Starts giúp giảm thời gian triển khai, giảm độ phức tạp và tăng tính nhất quán. Đồng thời, Quick Starts cũng giúp khách hàng tiết kiệm chi phí, vì không cần phải tự xây dựng toàn bộ giải pháp từ đầu.

Tóm lại, AWS Quick Starts là một bộ công cụ của AWS giúp khách hàng triển khai các giải pháp đám mây được thiết kế trước và kiểm tra sẵn một cách nhanh chóng và dễ dàng. Các Quick Starts giúp giảm thời gian, chi phí và độ phức tạp của việc triển khai ứng dụng trong môi trường đám mây của AWS.
