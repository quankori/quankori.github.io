---
title: AWS Security
---

## AWS WAF

AWS WAF (Web Application Firewall) là một dịch vụ bảo mật trên đám mây (cloud security service) của Amazon Web Services (AWS) được thiết kế để bảo vệ các ứng dụng web khỏi các cuộc tấn công mạng. Nó hoạt động bằng cách kiểm tra lưu lượng truy cập đến ứng dụng web và chặn các truy cập có chứa các mẫu đáng ngờ hoặc các yêu cầu độc hại.

AWS WAF sử dụng các bộ lọc quy tắc (rule filters) để phát hiện và chặn các cuộc tấn công web thông qua việc kiểm tra dữ liệu HTTP/HTTPS truyền qua các ứng dụng web. Bộ lọc quy tắc được cấu hình để chặn các yêu cầu không hợp lệ, chẳng hạn như các yêu cầu SQL Injection hoặc Cross-Site Scripting (XSS), giúp bảo vệ ứng dụng web khỏi các cuộc tấn công và lỗ hổng bảo mật.

AWS WAF cung cấp các công cụ quản lý và giám sát để quản lý các quy tắc bảo mật và cung cấp thông tin chi tiết về các cuộc tấn công. Nó cũng tích hợp với các dịch vụ khác trong hệ sinh thái AWS để cung cấp bảo mật toàn diện cho các ứng dụng web trên đám mây.

## AWS Shield

AWS Shield là một dịch vụ bảo vệ trên đám mây của Amazon Web Services (AWS), được thiết kế để bảo vệ các khách hàng AWS khỏi các cuộc tấn công mạng. AWS Shield bao gồm hai loại dịch vụ: AWS Shield Standard và AWS Shield Advanced.

AWS Shield Standard là một dịch vụ miễn phí được cung cấp cho tất cả khách hàng AWS, bao gồm bảo vệ chống lại các cuộc tấn công DDoS (Distributed Denial of Service) cơ bản. Nó cung cấp bảo vệ tự động cho các tài nguyên trên AWS như Elastic Load Balancing, Amazon CloudFront và Amazon Route 53. AWS Shield Standard sử dụng các công nghệ phát hiện và chặn tấn công để giữ cho các ứng dụng và dịch vụ của bạn luôn có sẵn.

AWS Shield Advanced là một dịch vụ bảo vệ DDoS nâng cao, có phí, được cung cấp cho các khách hàng AWS có nhu cầu bảo vệ tối đa. Nó cung cấp các tính năng bảo vệ chống lại các cuộc tấn công DDoS lớn và phức tạp, cung cấp các tính năng bổ sung như báo cáo và đối phó với các cuộc tấn công, và cung cấp hỗ trợ kỹ thuật 24/7.

AWS Shield Advanced cũng cung cấp tính năng bảo vệ của AWS WAF, cho phép bạn chặn các yêu cầu độc hại đến các ứng dụng web của bạn. Tất cả các tính năng của AWS Shield Standard cũng được bao gồm trong AWS Shield Advanced.

## AWS Artifact

AWS Artifact là một dịch vụ trên đám mây của Amazon Web Services (AWS) cung cấp các tài liệu chứng nhận và báo cáo liên quan đến tuân thủ bảo mật và quản lý rủi ro. Các tài liệu này bao gồm các bản kiểm tra và xác minh liên quan đến các chính sách bảo mật, phê duyệt an ninh, đánh giá rủi ro, hỗ trợ khách hàng và các bản tuyên bố pháp lý khác.

AWS Artifact giúp khách hàng AWS dễ dàng tìm kiếm và tải về các tài liệu này, đồng thời cung cấp một phương tiện để chứng minh cho các đối tác và khách hàng rằng các dịch vụ của họ đáp ứng được các tiêu chuẩn và quy định liên quan đến bảo mật và quản lý rủi ro.

Các tài liệu được cung cấp bởi AWS Artifact bao gồm các bản kiểm tra bảo mật, báo cáo kiểm tra độc lập bên thứ ba, các hợp đồng pháp lý như thỏa thuận bảo mật, chính sách bảo mật và các chứng chỉ tuân thủ khác. AWS Artifact có thể được truy cập thông qua AWS Management Console hoặc thông qua các API AWS Artifact, cho phép khách hàng tự động hóa việc tải xuống các tài liệu bảo mật quan trọng và các bản tuyên bố pháp lý.

## AWS GuardDuty

Amazon GuardDuty là một dịch vụ phát hiện và phân tích các mối đe dọa an ninh trên đám mây của Amazon Web Services (AWS). Nó sử dụng các kỹ thuật trí tuệ nhân tạo (AI) và học máy để phát hiện các hoạt động bất thường trong tài khoản AWS của bạn.

GuardDuty giúp giảm thiểu rủi ro bảo mật bằng cách giám sát hoạt động của tài khoản AWS của bạn để phát hiện các hoạt động đáng ngờ và các mối đe dọa an ninh. Nó sử dụng các kỹ thuật phát hiện bất thường để tìm kiếm các hoạt động không phù hợp với các chính sách bảo mật, bao gồm các đánh cắp thông tin đăng nhập, các cuộc tấn công mạng và các hoạt động tấn công từ các địa điểm không xác định hoặc đáng ngờ.

GuardDuty có thể tích hợp với các dịch vụ AWS khác, bao gồm AWS CloudTrail, Amazon CloudWatch và AWS Security Hub. Nó cũng cung cấp báo cáo chi tiết về các mối đe dọa được phát hiện và hướng dẫn về cách khắc phục chúng.

Với Amazon GuardDuty, bạn có thể cải thiện bảo mật của tài khoản AWS của mình một cách đáng kể bằng cách phát hiện và giảm thiểu các mối đe dọa an ninh.

## AWS CloudTrail

AWS CloudTrail là một dịch vụ của Amazon Web Services (AWS) giúp bạn giám sát và ghi lại các hoạt động trên tài khoản AWS của bạn. Nó cho phép bạn theo dõi, phân tích và lưu trữ các sự kiện liên quan đến các hoạt động quản lý tài nguyên trên tài khoản AWS của bạn, bao gồm các tác vụ như tạo, sửa đổi, xóa hoặc di chuyển tài nguyên.

CloudTrail cung cấp một ghi chép chi tiết về các hoạt động quản lý tài nguyên trên tài khoản AWS của bạn, bao gồm ai đã thực hiện các hoạt động đó, khi nào chúng đã được thực hiện và từ đâu chúng đã được thực hiện. Điều này giúp bạn xác định và phân tích các hoạt động không được phép hoặc bất thường, đồng thời hỗ trợ việc phân tích nhật ký, phân tích bảo mật và giám sát chính sách tuân thủ.

Ngoài ra, CloudTrail còn cho phép bạn tích hợp với các dịch vụ khác của AWS, bao gồm Amazon S3, Amazon CloudWatch và AWS Lambda. Nó cũng hỗ trợ tính năng tìm kiếm và truy vấn trong các nhật ký, cho phép bạn nhanh chóng tìm kiếm các hoạt động cụ thể trên tài khoản AWS của bạn.

Với CloudTrail, bạn có thể giám sát và kiểm soát các hoạt động trên tài khoản AWS của mình một cách chặt chẽ hơn, giúp tăng cường bảo mật và đáp ứng các yêu cầu tuân thủ quy định liên quan đến việc bảo vệ thông tin khách hàng và dữ liệu nhạy cảm.

## AWS Shared Responsibility Model

| Responsibility                                                                                | AWS | User |
| --------------------------------------------------------------------------------------------- | --- | ---- |
| Physical security of data centers                                                             | ✓   |      |
| Network and infrastructure security                                                           | ✓   |      |
| Hypervisor and virtual instance security                                                      | ✓   |      |
| Patching and updating of host operating system, application stacks, and AWS-provided services | ✓   |      |
| Configuration of firewall and access control lists (ACLs)                                     | ✓   |      |
| Encryption of data in transit and at rest                                                     | ✓   |      |
| Managing access to resources and data                                                         |     | ✓    |
| Security configuration of applications and operating systems                                  |     | ✓    |
| Data classification and protection                                                            |     | ✓    |
| Incident response planning and execution                                                      |     | ✓    |

## AWS Single Sign-On

AWS Single Sign-On (SSO) là một dịch vụ quản lý danh tính dựa trên đám mây cho phép người dùng truy cập vào tài nguyên AWS và các ứng dụng doanh nghiệp khác chỉ với một lần đăng nhập. Với AWS SSO, công cụ giúp quản lý tài khoản và quyền truy cập của người dùng được thực hiện ở một nơi duy nhất.

Khi sử dụng AWS SSO, người dùng có thể đăng nhập vào các tài khoản và ứng dụng khác nhau mà không cần phải đăng nhập lại từng lần, giúp tiết kiệm thời gian và tăng tính bảo mật. Ngoài ra, AWS SSO còn cung cấp khả năng quản lý quyền truy cập để giúp điều khiển tài nguyên và dữ liệu trong môi trường đám mây.

Với AWS SSO, người quản trị có thể quản lý tài khoản người dùng, quyền truy cập và thực hiện các chính sách an ninh từ một nơi duy nhất. Việc này giúp tiết kiệm thời gian và giảm thiểu các lỗ hổng an ninh do việc quản lý tài khoản và quyền truy cập bằng tay.

## AWS Cognito

Amazon Cognito là một dịch vụ đám mây giúp phát triển ứng dụng di động hoặc web có tính năng xác thực, ủy quyền và quản lý người dùng. Trong Amazon Cognito, có hai thành phần chính để quản lý người dùng là Identity Pool và User Pool.

- Amazon Cognito Identity Pool (ID Pool) cho phép ủy quyền truy cập đến tài nguyên AWS của ứng dụng từ các nhà cung cấp danh tính bên ngoài như Facebook, Google, hoặc các hệ thống xác thực khác. Khi người dùng đăng nhập vào ứng dụng, ID Pool sẽ trả về một AWS Temporary Security Credential cho phép truy cập vào tài nguyên AWS mà không yêu cầu người dùng cung cấp thông tin xác thực riêng biệt.

- Amazon Cognito User Pool là một giải pháp để quản lý người dùng và xác thực trong các ứng dụng di động hoặc web. Nó cung cấp cho các ứng dụng một giải pháp đơn giản để đăng ký, đăng nhập và xác thực người dùng. Với User Pool, người dùng có thể đăng ký và đăng nhập bằng cách sử dụng tên người dùng và mật khẩu hoặc các nhà cung cấp danh tính bên ngoài như Facebook, Google hoặc Amazon.

Tổng quan, Identity Pool và User Pool đều là các dịch vụ quản lý người dùng trong Amazon Cognito, nhưng chúng có tính năng và phạm vi sử dụng khác nhau. Identity Pool được sử dụng để phân quyền truy cập tài nguyên AWS, trong khi User Pool được sử dụng để quản lý và xác thực người dùng trong ứng dụng mói động hoặc web.

## AWS IAM

IAM User là một thực thể đại diện cho một người dùng hoặc ứng dụng được xác thực và ủy quyền truy cập vào tài nguyên trong AWS. Mỗi IAM User có một tên đăng nhập và chứng chỉ xác thực riêng biệt.

IAM Group là một tập hợp các IAM User. Nhóm được sử dụng để quản lý quyền truy cập của nhiều người dùng cùng một lúc, thay vì phải quản lý từng người dùng một cách riêng lẻ. Khi một IAM User được thêm vào một nhóm, người dùng sẽ thừa hưởng tất cả các quyền truy cập được gán cho nhóm.

IAM Policy là một bộ quy tắc xác định quyền truy cập vào tài nguyên trong AWS. Chính sách được gán cho IAM User hoặc IAM Group để kiểm soát quyền truy cập vào các tài nguyên cụ thể như EC2 instances, RDS databases, hay S3 buckets. IAM Policy sử dụng các quy tắc về nguyên tắc (principles), hành động (actions) và tài nguyên (resources) để kiểm soát việc truy cập vào các tài nguyên AWS.

IAM Role là một khái niệm liên quan đến quyền truy cập tạm thời trong AWS. Nó cho phép một IAM User hoặc một dịch vụ AWS khác được ủy quyền truy cập vào các tài nguyên cụ thể trong AWS. IAM Role thường được sử dụng khi một dịch vụ AWS yêu cầu truy cập vào một tài nguyên khác trong AWS. Trong trường hợp này, IAM Role được gán cho dịch vụ AWS đó để có thể truy cập vào tài nguyên được chỉ định. Khác với IAM User hoặc IAM Group, IAM Role không liên kết trực tiếp với một người dùng hoặc nhóm. Thay vào đó, nó được gán cho một danh sách nguyên tắc, cho phép mọi người dùng hoặc dịch vụ AWS được ủy quyền truy cập vào tài nguyên được chỉ định.

## Tiêu chuẩn bảo mật thông tin

SOC 2 (System and Organization Controls 2): Là một tiêu chuẩn kiểm tra và đánh giá việc thực hiện các điều khiển bảo mật, nhằm đảm bảo tính toàn vẹn, sẵn sàng và bảo mật của dịch vụ, sản phẩm và cơ sở hạ tầng của một tổ chức. SOC 2 được thiết kế để đáp ứng các yêu cầu đối với các công ty và tổ chức xử lý thông tin khách hàng.

SOC 1 (System and Organization Controls 1): Là một tiêu chuẩn kiểm tra và đánh giá để đảm bảo tính toàn vẹn và an toàn của các báo cáo tài chính được tạo ra bởi các tổ chức. Nó còn được gọi là Statement on Standards for Attestation Engagements 18 (SSAE 18).

PCI DSS (Payment Card Industry Data Security Standard): Là một tiêu chuẩn bảo mật dành cho các tổ chức xử lý thông tin thanh toán, đảm bảo rằng các thông tin thanh toán của khách hàng được bảo vệ tốt nhất có thể. Nó đảm bảo rằng các doanh nghiệp tuân thủ các quy định về bảo mật, quản lý và bảo vệ thông tin thanh toán.

HIPAA (Health Insurance Portability and Accountability Act): Là một quy định bảo mật thông tin y tế tại Mỹ, đặc biệt là để bảo vệ thông tin cá nhân y tế của người tiêu dùng và đảm bảo rằng những thông tin này được bảo vệ an toàn và riêng tư. HIPAA áp dụng cho tất cả các tổ chức và cá nhân liên quan đến việc lưu trữ, xử lý và chia sẻ thông tin y tế.

## AWS KMS

KMS là viết tắt của Key Management Service, đây là một dịch vụ quản lý khóa trong hạ tầng điện toán đám mây của Amazon Web Services (AWS). KMS cho phép người dùng tạo và quản lý các khóa mã hóa, sử dụng để bảo vệ dữ liệu của họ trong các dịch vụ AWS như S3, EBS, RDS, DynamoDB và Redshift. KMS cung cấp các tính năng quan trọng như quản lý khóa tự động, quản lý chu kỳ khóa, ghi nhật ký và kiểm soát truy cập cho các khóa. Dịch vụ này giúp người dùng tiết kiệm thời gian và có được tính bảo mật cao trong việc quản lý khóa mã hóa của họ trên nền tảng cloud.
