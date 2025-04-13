---
title: Database
---

## Core concepts (Các khái niệm Cốt lõi)

### Consistency và Eventual Consistency

Đây là một trong những điểm khác biệt cơ bản nhất giữa các hệ thống cơ sở dữ liệu truyền thống (như RDBMS) và nhiều hệ thống NoSQL phân tán.

#### Strong Consistency (Tính nhất quán Mạnh mẽ):

Khái niệm: Đảm bảo rằng mọi thao tác đọc (read) sau khi một thao tác ghi (write) hoàn thành sẽ trả về giá trị đã được ghi đó. Trong một hệ thống phân tán, điều này có nghĩa là tất cả các bản sao (replicas) phải đồng bộ ngay lập tức trước khi thao tác ghi được coi là thành công và dữ liệu mới được phép đọc.

Ví dụ (PostgreSQL): Giả sử bạn thực hiện một giao dịch chuyển tiền từ tài khoản A sang tài khoản B trong PostgreSQL.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';
UPDATE accounts SET balance = balance + 100 WHERE account_id = 'B';
COMMIT;
-- Ngay sau khi COMMIT thành công:
SELECT balance FROM accounts WHERE account_id = 'A'; -- Sẽ luôn thấy số dư đã trừ 100
SELECT balance FROM accounts WHERE account_id = 'B'; -- Sẽ luôn thấy số dư đã cộng 100
```

Bất kỳ ai truy vấn số dư của A hoặc B ngay sau khi giao dịch commit thành công đều sẽ thấy trạng thái mới nhất. Nếu có read replicas, PostgreSQL đảm bảo (thông qua cơ chế replication) rằng dữ liệu đọc từ replica (với cấu hình phù hợp) cũng phản ánh trạng thái nhất quán này (có thể có độ trễ nhỏ, nhưng một khi dữ liệu đến replica, nó là nhất quán tại thời điểm đó).

Ưu điểm: Đơn giản hóa logic ứng dụng vì lập trình viên luôn có thể tin tưởng vào dữ liệu đọc được là mới nhất. Quan trọng cho các hệ thống yêu cầu độ chính xác cao (tài chính, ngân hàng).

Nhược điểm: Có thể làm giảm tính sẵn sàng (Availability) và tăng độ trễ (latency) trong các hệ thống phân tán, vì hệ thống phải chờ tất cả các node liên quan đồng bộ trước khi xác nhận thao tác ghi.

#### Eventual Consistency (Tính nhất quán Cuối cùng):

Khái niệm: Đảm bảo rằng, nếu không có thêm cập nhật nào cho một mục dữ liệu cụ thể, thì cuối cùng tất cả các lượt truy cập (đọc) đến mục dữ liệu đó sẽ trả về giá trị được ghi cuối cùng. Tuy nhiên, trong một khoảng thời gian ngắn sau khi ghi, các lượt đọc khác nhau có thể trả về giá trị cũ hoặc giá trị mới.

Ví dụ (MongoDB - Replica Set với Read Preference secondary): Một MongoDB replica set bao gồm một node Primary (nhận ghi) và nhiều node Secondary (sao chép dữ liệu từ Primary).

1. Client thực hiện thao tác ghi vào node Primary: `db.users.updateOne({\_id: 1}, {$set: {email: "new@example.com"}})` (với Write Concern mặc định là w:1 - chỉ cần Primary xác nhận).

2. Primary xác nhận ghi thành công cho client ngay lập tức.

3. Dữ liệu được sao chép bất đồng bộ (asynchronously) đến các node Secondary.

4. Ngay sau bước 2, trước khi bước 3 hoàn thành trên một Secondary cụ thể: Nếu một client khác đọc từ Secondary đó (sử dụng Read Preference secondary), họ có thể vẫn thấy địa chỉ email cũ.

5. Sau một khoảng thời gian (thường rất ngắn): Dữ liệu được sao chép xong, và mọi lượt đọc từ Secondary đó sẽ thấy địa chỉ email mới (new@example.com).

- Ưu điểm: Tăng tính sẵn sàng (Availability) và giảm độ trễ ghi, vì hệ thống không cần chờ tất cả các replica đồng bộ ngay lập tức. Thích hợp cho các hệ thống ưu tiên tốc độ và khả năng chịu lỗi phân vùng (ví dụ: mạng xã hội, catalog sản phẩm).

- Nhược điểm: Phức tạp hóa logic ứng dụng vì phải xử lý khả năng đọc dữ liệu cũ (stale data). Không phù hợp cho các nghiệp vụ yêu cầu tính nhất quán tức thì.

Cách khắc phục/giảm thiểu nhược điểm:

- Read Your Writes: Đảm bảo rằng một client luôn đọc được dữ liệu mà chính nó vừa ghi (ví dụ: đọc từ Primary sau khi ghi).

- Monotonic Reads: Đảm bảo rằng nếu một client đọc thấy một trạng thái dữ liệu, các lần đọc tiếp theo của client đó sẽ không bao giờ thấy trạng thái cũ hơn.

- Điều chỉnh Read/Write Concerns (MongoDB): Sử dụng các mức độ đảm bảo cao hơn. Ví dụ:

  - Write Concern: {w: "majority"}: Yêu cầu ghi phải được xác nhận bởi đa số các node trong replica set trước khi trả về thành công cho client.

  - Read Concern: "majority": Đảm bảo dữ liệu đọc ra đã được xác nhận bởi đa số node, tránh đọc dữ liệu có thể bị rollback.

  - Read Concern: "linearizable" (chỉ đọc từ Primary): Đảm bảo tính nhất quán mạnh nhất, nhưng ảnh hưởng hiệu năng.

  - Read Preference: "primary": Luôn đọc từ node Primary để có dữ liệu mới nhất (nhưng tăng tải cho Primary).

### Scaling (Khả năng Mở rộng)

Cả PostgreSQL và MongoDB đều cung cấp các cơ chế để mở rộng, nhưng cách tiếp cận khác nhau.

#### PostgreSQL Scaling:

Vertical Scaling (Scale Up): Tăng CPU, RAM, Disk cho server PostgreSQL. Đơn giản nhưng có giới hạn vật lý và chi phí.

Read Replicas (Streaming Replication): Tạo các bản sao chỉ đọc của database chính. Các truy vấn đọc có thể được chuyển hướng đến replicas, giảm tải cho server chính. Đây là cách phổ biến nhất để scale read cho PostgreSQL. Dữ liệu được sao chép gần như real-time.

Logical Replication: Cho phép sao chép dữ liệu ở mức độ logic (theo từng bảng hoặc thay đổi) đến các server khác, có thể dùng cho nhiều mục đích hơn streaming replication (ví dụ: nâng cấp phiên bản, sao chép một phần dữ liệu).

Sharding (Phân mảnh): Chia dữ liệu của một bảng lớn thành nhiều phần nhỏ (shards) và lưu trữ trên nhiều server PostgreSQL độc lập. Đây là cách scale cả read và write, nhưng phức tạp hơn đáng kể so với replication.

Thách thức: Việc chia dữ liệu (sharding key), định tuyến truy vấn (query routing), quản lý transaction qua nhiều shard, join dữ liệu giữa các shard rất phức tạp.

Giải pháp: Có thể tự triển khai logic sharding ở tầng ứng dụng hoặc sử dụng các extension/giải pháp như:

- Citus Data: Extension mã nguồn mở (nay thuộc Microsoft) biến PostgreSQL thành một database phân tán, tự động hóa việc sharding và định tuyến truy vấn.

- pg_partman: Extension giúp quản lý partitioning (phân vùng bảng - một dạng sharding cục bộ trên một server).

- Các giải pháp middleware sharding khác.

#### MongoDB Scaling:

Vertical Scaling (Scale Up): Tương tự PostgreSQL, tăng tài nguyên cho server MongoDB.

Replica Sets (High Availability & Read Scaling): Đây là nền tảng của MongoDB. Một replica set gồm 1 Primary và nhiều Secondary.

- High Availability: Nếu Primary gặp sự cố, các Secondary sẽ bầu chọn ra một Primary mới một cách tự động (automatic failover), đảm bảo hệ thống vẫn hoạt động.

- Read Scaling: Client có thể cấu hình để đọc từ các node Secondary (Read Preferences), phân tán tải đọc.

Sharding (Horizontal Scaling): MongoDB được thiết kế với sharding là tính năng cốt lõi để scale cả read và write cho các tập dữ liệu cực lớn.

Kiến trúc: Một sharded cluster bao gồm:

- Shards: Mỗi shard là một replica set riêng, lưu trữ một phần dữ liệu.

- Mongos (Query Routers): Các tiến trình định tuyến truy vấn từ client đến đúng shard(s). Client kết nối đến Mongos thay vì shard trực tiếp.

- Config Servers: Lưu trữ metadata về cluster, bao gồm thông tin về shard nào chứa dữ liệu nào (mapping dựa trên shard key).

Shard Key: Việc chọn shard key là cực kỳ quan trọng, ảnh hưởng đến việc phân phối dữ liệu đồng đều và hiệu năng truy vấn.

Ưu điểm: Khả năng mở rộng gần như tuyến tính cho cả read và write, được tích hợp sẵn và quản lý bởi MongoDB.

### Performance Optimization (Tối ưu Hiệu năng)

Tối ưu hóa hiệu năng là quá trình liên tục cho cả SQL và NoSQL.

#### PostgreSQL (SQL) Optimization:

- Indexing: Tạo index trên các cột thường được sử dụng trong mệnh đề WHERE, JOIN, ORDER BY.

Ví dụ: `CREATE INDEX idx_users_email ON users (email);`

Sử dụng `EXPLAIN ANALYZE <câu lệnh SQL>` để xem kế hoạch thực thi và xác định xem index có được sử dụng hay không, cũng như các điểm chậm khác.

Các loại index khác nhau: B-tree (mặc định, tốt cho =, >, <, BETWEEN, IN, LIKE prefix), Hash (chỉ tốt cho =), GiST, GIN (tốt cho full-text search, array, jsonb), BRIN (tốt cho dữ liệu lớn, có tương quan vật lý).

- Query Optimization:

Viết truy vấn hiệu quả: Tránh SELECT \*, chỉ chọn các cột cần thiết.

Sử dụng JOIN hiệu quả, đảm bảo có index trên các cột join.

Hạn chế sử dụng subquery hoặc CTE (Common Table Expressions) nếu có thể viết lại bằng JOIN.

Sử dụng LIMIT và OFFSET cẩn thận (offset lớn có thể chậm, cân nhắc keyset pagination).

- Connection Pooling: Sử dụng connection pool (như PgBouncer hoặc pool tích hợp trong framework) để tái sử dụng kết nối database, tránh chi phí tạo kết nối mới liên tục.

- Database Tuning: Điều chỉnh các tham số cấu hình của PostgreSQL (trong postgresql.conf) như shared_buffers, work_mem, effective_cache_size dựa trên tài nguyên hệ thống.

- Vacuuming & Analyzing: Chạy VACUUM (để thu hồi không gian từ các hàng đã xóa/cập nhật) và ANALYZE (để cập nhật thống kê cho query planner) thường xuyên. Autovacuum thường được bật mặc định.

- Partitioning: Chia các bảng lớn thành các partition nhỏ hơn dựa trên một key (ví dụ: theo ngày, theo vùng) để cải thiện hiệu năng quản lý và truy vấn.

#### MongoDB (NoSQL) Optimization:

- Data Modeling: Đây là yếu tố quan trọng nhất. Thiết kế schema dựa trên cách ứng dụng truy cập dữ liệu (access patterns).

  - Embedding (Nhúng): Nhúng các dữ liệu liên quan vào cùng một document nếu chúng thường xuyên được truy cập cùng nhau và mối quan hệ là "one-to-few". Giảm thiểu số lượng truy vấn.

    ```json
    // Ví dụ: Nhúng địa chỉ vào user document
    {
      "_id": 1,
      "name": "Alice",
      "addresses": [
        { "street": "123 Main St", "city": "Anytown" },
        { "street": "456 Oak Ave", "city": "Otherville" }
      ]
    }
    ```

  - Referencing (Tham chiếu): Sử dụng ID để tham chiếu đến document khác nếu mối quan hệ là "one-to-many" hoặc "many-to-many", hoặc nếu dữ liệu được truy cập độc lập. Yêu cầu truy vấn $lookup (tương tự JOIN) hoặc nhiều truy vấn từ ứng dụng.

    ```json
    // Ví dụ: Tham chiếu đến orders từ user document
    // User document:
    { "_id": 1, "name": "Bob" }
    // Order documents:
    { "_id": 101, "userId": 1, "item": "Laptop" }
    { "_id": 102, "userId": 1, "item": "Mouse" }
    ```

- Indexing: Tương tự SQL, tạo index trên các trường dùng để truy vấn, sắp xếp.

  Ví dụ: `db.users.createIndex({ email: 1 }) (1: ascending, -1: descending)`

  - Compound Indexes: Tạo index trên nhiều trường: db.users.createIndex({ city: 1, signup_date: -1 }) (thứ tự trường quan trọng).

  - Sử dụng explain() để phân tích hiệu năng truy vấn: `db.users.find({ email: "test@example.com" }).explain("executionStats")`.

  - Đảm bảo index "cover" được truy vấn (covered query) nếu có thể - tức là index chứa đủ thông tin để trả lời truy vấn mà không cần đọc document thực tế.

- Sharding Strategy: Nếu sử dụng sharding, chọn shard key phù hợp để phân phối dữ liệu đều và tránh "hot shards" (shard bị quá tải).

- Write Concerns & Read Preferences: Cân bằng giữa consistency và performance. Mức concern cao hơn đảm bảo an toàn dữ liệu hơn nhưng có thể chậm hơn. Đọc từ secondary giảm tải cho primary nhưng có thể đọc dữ liệu cũ.

- Projection: Chỉ lấy các trường cần thiết trong truy vấn: db.users.find({ city: "Anytown" }, { name: 1, email: 1, \_id: 0 }).

## ACID và BASE

Đây là hai mô hình mô tả các thuộc tính giao dịch (transaction properties) của cơ sở dữ liệu.

### ACID (Atomicity, Consistency, Isolation, Durability):

Mô hình truyền thống, thường gắn liền với RDBMS như PostgreSQL.

**A - Atomicity (Tính nguyên tử)**: Một giao dịch (transaction) là một đơn vị công việc không thể chia cắt. Hoặc tất cả các thao tác trong giao dịch đều thành công (COMMIT), hoặc nếu có bất kỳ lỗi nào, tất cả các thay đổi sẽ bị hủy bỏ (ROLLBACK), đưa hệ thống về trạng thái trước khi giao dịch bắt đầu.

Ví dụ: Giao dịch chuyển tiền: Hoặc cả việc trừ tiền ở tài khoản A và cộng tiền ở tài khoản B đều xảy ra, hoặc không có gì xảy ra cả.

**C - Consistency (Tính nhất quán)**: Đảm bảo rằng một giao dịch chỉ chuyển database từ một trạng thái hợp lệ này sang một trạng thái hợp lệ khác. Mọi ràng buộc dữ liệu (constraints) phải được thỏa mãn sau khi giao dịch kết thúc. Lưu ý: Chữ C này khác với C trong CAP Theorem, nó nói về tính nhất quán của dữ liệu theo các quy tắc nghiệp vụ/ràng buộc đã định nghĩa.

Ví dụ: Số dư tài khoản không thể âm (nếu có ràng buộc CHECK), tổng số tiền trong hệ thống không đổi sau giao dịch chuyển tiền.

**I - Isolation (Tính cô lập)**: Đảm bảo rằng các giao dịch đồng thời không can thiệp lẫn nhau. Kết quả của việc thực thi nhiều giao dịch đồng thời phải giống như khi chúng được thực thi tuần tự theo một thứ tự nào đó. Các mức độ cô lập (Isolation Levels) khác nhau (Read Uncommitted, Read Committed, Repeatable Read, Serializable) cung cấp các mức độ bảo vệ khác nhau chống lại các hiện tượng như Dirty Read, Non-Repeatable Read, Phantom Read.

Ví dụ: Khi giao dịch chuyển tiền đang diễn ra, một giao dịch khác tính tổng số dư toàn bộ hệ thống sẽ không thấy trạng thái "nửa vời" (tiền đã trừ ở A nhưng chưa cộng vào B).

**D - Durability (Tính bền vững)**: Một khi giao dịch đã được COMMIT thành công, các thay đổi của nó phải được lưu trữ vĩnh viễn và không bị mất ngay cả khi hệ thống gặp sự cố (mất điện, crash). Thường đạt được bằng cách ghi vào các bản ghi transaction log (Write-Ahead Logging - WAL) trước khi ghi vào file dữ liệu chính.

Ví dụ: Sau khi bạn nhận thông báo chuyển tiền thành công, số tiền đó phải ở trong tài khoản của bạn ngay cả khi server ngân hàng khởi động lại.

### BASE (Basically Available, Soft state, Eventually consistent):

Mô hình thường thấy trong các hệ thống NoSQL phân tán, ưu tiên tính sẵn sàng hơn tính nhất quán mạnh mẽ.

**BA - Basically Available (Cơ bản là Sẵn sàng)**: Hệ thống đảm bảo tính sẵn sàng (Availability theo nghĩa của CAP Theorem). Nó sẽ phản hồi mọi yêu cầu (dù có thể trả về dữ liệu cũ hoặc lỗi không nhất quán).

Ví dụ: Dù một node trong cụm Cassandra bị lỗi, các node khác vẫn cố gắng phục vụ yêu cầu đọc/ghi.

**S - Soft state (Trạng thái Mềm)**: Trạng thái của hệ thống có thể thay đổi theo thời gian, ngay cả khi không có input mới, do tính nhất quán cuối cùng. Dữ liệu có thể "tự" cập nhật khi các bản sao đồng bộ với nhau.

Ví dụ: Bạn vừa cập nhật avatar, trạng thái avatar trên các server khác nhau đang trong quá trình "mềm" để tiến tới trạng thái mới nhất.

**E - Eventually consistent (Nhất quán Cuối cùng)**: Như đã giải thích ở phần trước, hệ thống sẽ đạt đến trạng thái nhất quán sau một khoảng thời gian nếu không có thêm cập nhật nào.

Ví dụ: Sau vài giây/phút, avatar mới của bạn sẽ hiển thị đồng nhất trên tất cả các thiết bị và cho tất cả bạn bè.
