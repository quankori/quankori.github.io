---
title: Redis
---

Redis (Remote Dictionary Server) không chỉ là một key-value store đơn giản. Nó là một kho lưu trữ cấu trúc dữ liệu trong bộ nhớ (in-memory data structure store) cực kỳ nhanh chóng và linh hoạt, được sử dụng rộng rãi cho caching, quản lý session, message broker, real-time analytics.

## Tối ưu Hiệu năng Redis (Redis Performance Optimization)

Để Redis hoạt động với tốc độ cao nhất và sử dụng tài nguyên hiệu quả, hãy xem xét các điểm sau:

- maxmemory: Đặt giới hạn bộ nhớ tối đa Redis có thể sử dụng trong file cấu hình (redis.conf). Khi đạt đến giới hạn này, Redis sẽ áp dụng chính sách loại bỏ (eviction policy).

  - maxmemory-policy: Chọn chính sách loại bỏ phù hợp với use case của bạn. Các chính sách phổ biến:

    - noeviction: Không xóa key nào khi đầy bộ nhớ, trả lỗi cho các lệnh ghi mới (không nên dùng cho cache).

    - allkeys-lru: Xóa các key ít được sử dụng gần đây nhất (Least Recently Used) trong toàn bộ keyspace. Thường là lựa chọn tốt cho cache.

    - volatile-lru: Chỉ xóa các key ít được sử dụng gần đây nhất trong số các key có đặt TTL (Time-To-Live).

    - allkeys-lfu: Xóa các key ít được sử dụng thường xuyên nhất (Least Frequently Used).

    - volatile-lfu: Chỉ xóa các key ít được sử dụng thường xuyên nhất trong số các key có đặt TTL.

    - allkeys-random: Xóa key ngẫu nhiên.

    - volatile-random: Xóa key ngẫu nhiên trong số các key có TTL.

    - volatile-ttl: Xóa các key có TTL sắp hết hạn nhất.

  - Theo dõi việc sử dụng bộ nhớ (INFO memory) để điều chỉnh maxmemory hợp lý.

- Chọn Đúng Cấu trúc Dữ liệu:

  - Redis hỗ trợ nhiều cấu trúc dữ liệu (Strings, Hashes, Lists, Sets, Sorted Sets, Streams, HyperLogLogs, Bitmaps,...).

  - Sử dụng cấu trúc phù hợp giúp tiết kiệm bộ nhớ và tăng tốc độ truy cập.

- Pipelining:

  - Giảm độ trễ mạng bằng cách gửi nhiều lệnh đến Redis server trong một lượt đi (round trip) thay vì gửi từng lệnh và chờ phản hồi. Client library sẽ đợi tất cả phản hồi trả về cùng lúc.

  - Rất hiệu quả khi bạn cần thực hiện nhiều lệnh liên tiếp.

- Persistence (Lưu trữ Bền vững):

  - Redis cung cấp hai cơ chế chính:

    - RDB (Snapshotting): Lưu trạng thái database vào một file .rdb theo chu kỳ. Nhanh hơn khi khởi động lại, file nhỏ gọn hơn, nhưng có thể mất dữ liệu giữa các lần snapshot.

    - AOF (Append Only File): Ghi lại mọi lệnh ghi vào một file log. Bền hơn RDB (có thể cấu hình tần suất fsync), nhưng file lớn hơn và khởi động lại chậm hơn.

  - Trade-off: Chọn cơ chế phù hợp dựa trên yêu cầu về độ bền dữ liệu và hiệu năng.

  - Tối ưu cho Cache: Nếu chỉ dùng Redis làm cache (dữ liệu có thể tái tạo từ nguồn khác), bạn có thể tắt hoàn toàn persistence để đạt hiệu năng ghi cao nhất.

- Connection Pooling (Phía Client): Luôn sử dụng connection pool ở tầng ứng dụng để tái sử dụng các kết nối TCP đến Redis server, tránh chi phí thiết lập kết nối mới cho mỗi yêu cầu. Hầu hết các Redis client library đều hỗ trợ connection pooling.

- Mạng (Networking):

  - Đặt Redis server và client ứng dụng càng gần nhau càng tốt (cùng datacenter, cùng availability zone) để giảm độ trễ mạng.

  - Nếu client và server trên cùng một máy, cân nhắc sử dụng Unix domain sockets thay vì TCP/IP để tăng tốc độ.

- Giám sát (Monitoring):

  - Sử dụng lệnh INFO để xem trạng thái chi tiết của Redis server (memory, clients, stats, persistence,...).

  - Sử dụng các công cụ như redis-cli --stat, htop, hoặc các giải pháp monitoring chuyên dụng (Prometheus Redis Exporter, Datadog, New Relic) để theo dõi hiệu năng và phát hiện vấn đề sớm.

## Các Caching Pattern Phổ biến với Redis

#### Cache-Aside (Lazy Loading):

- Luồng hoạt động:

  - Ứng dụng kiểm tra xem dữ liệu có trong Redis cache không (GET key).

  - Cache Hit: Nếu có, trả về dữ liệu từ cache.

  - Cache Miss: Nếu không có:
    - a. Ứng dụng truy vấn dữ liệu từ database chính (nguồn sự thật - source of truth).
    - b. Ứng dụng lưu dữ liệu vừa lấy được vào Redis cache (SET key value EX ttl).
    - c. Ứng dụng trả về dữ liệu cho client.

- Ưu điểm: Chỉ cache những dữ liệu thực sự được yêu cầu. Dễ triển khai. Redis không cần biết về database.

- Nhược điểm: Cache Miss Penalty: Lần đầu tiên truy cập dữ liệu sẽ chậm hơn vì phải đọc từ DB và ghi vào cache.

- Stale Data (Dữ liệu cũ): Dữ liệu trong cache có thể trở nên cũ nếu dữ liệu trong DB thay đổi trước khi cache hết hạn (TTL). Cần có chiến lược làm mới cache (ví dụ: xóa key trong cache khi cập nhật DB, hoặc chấp nhận dữ liệu cũ trong khoảng TTL).

#### Read-Through:

- Luồng hoạt động: Ứng dụng luôn gọi đến cache để lấy dữ liệu. Cache provider (có thể là một thư viện hoặc proxy) sẽ tự kiểm tra cache. Nếu miss, cache provider sẽ tự động lấy dữ liệu từ DB, lưu vào cache và trả về cho ứng dụng.

- Với Redis: Pattern này ít phổ biến hơn vì Redis tự nó không trực tiếp tương tác với DB. Thường cần một lớp thư viện/framework hỗ trợ để triển khai logic này.

#### Write-Through:

- Luồng hoạt động:

  - Ứng dụng thực hiện thao tác ghi.

  - Ghi dữ liệu vào Redis cache (SET key value).

  - Đồng thời hoặc ngay sau đó, ghi dữ liệu vào database chính. Cả hai thao tác phải thành công (hoặc có cơ chế xử lý lỗi/retry).

- Ưu điểm: Dữ liệu trong cache và DB luôn (hoặc gần như luôn) nhất quán. Giảm khả năng đọc phải dữ liệu cũ sau khi ghi.

- Nhược điểm: Tăng độ trễ cho thao tác ghi vì phải ghi vào cả hai nơi. Nếu Redis không sẵn sàng, thao tác ghi có thể thất bại (trừ khi có xử lý phù hợp).

#### Write-Behind (Write-Back):

- Luồng hoạt động:

  - Ứng dụng thực hiện thao tác ghi.

  - Ghi dữ liệu vào Redis cache (SET key value). Thao tác này thường rất nhanh.

  - Ứng dụng trả về thành công cho client ngay lập tức.

  - Sau một khoảng thời gian trễ hoặc theo một batch, dữ liệu từ cache sẽ được ghi vào database chính một cách bất đồng bộ.

- Ưu điểm: Thao tác ghi cực kỳ nhanh vì chỉ cần ghi vào Redis. Giảm tải cho database chính.

- Nhược điểm:

  - Rủi ro mất dữ liệu: Nếu Redis gặp sự cố trước khi dữ liệu kịp ghi vào DB, dữ liệu đó sẽ bị mất.

  - Phức tạp: Cần triển khai cơ chế đáng tin cậy để ghi dữ liệu từ cache vào DB.

  - Dữ liệu trong DB có thể không nhất quán với cache trong một khoảng thời gian.

#### Cache Eviction và TTL:

- Luôn đặt TTL (Time-To-Live) hợp lý cho các cache key bằng lệnh EXPIRE hoặc các tùy chọn EX/PX trong lệnh SET. TTL giúp tự động xóa dữ liệu cũ, giải phóng bộ nhớ và giảm nguy cơ stale data.

- Chọn maxmemory-policy phù hợp (thường là allkeys-lru hoặc volatile-lru cho cache) để Redis biết cách xử lý khi bộ nhớ đầy.

## Những điều cần quan tâm khi SET/GET trong Redis

Khi làm việc với các lệnh cơ bản như SET và GET, hãy lưu ý:

#### Quy ước Đặt tên Key (Key Naming Conventions):

Sử dụng tên key rõ ràng, có cấu trúc và nhất quán.

Dùng dấu hai chấm (:) để phân cấp, ví dụ: `object-type:id:field` -> `user:123:profile`, `product:abc:stock`.

Giữ tên key hợp lý, không quá dài (tốn bộ nhớ) nhưng đủ mô tả.

#### Serialization (Tuần tự hóa):

Redis lưu trữ dữ liệu dưới dạng byte sequences. Khi lưu các cấu trúc dữ liệu phức tạp (object, array), bạn cần tuần tự hóa chúng thành một định dạng như JSON, MessagePack, BSON,... trước khi SET, và giải tuần tự hóa sau khi GET.

JSON là phổ biến nhất, dễ đọc, nhưng có thể tốn dung lượng hơn MessagePack. Chọn định dạng phù hợp với nhu cầu về hiệu năng và dung lượng.

#### Atomicity (Tính Nguyên tử):

Mỗi lệnh Redis đơn lẻ (như SET, GET, INCR) là nguyên tử.

Nếu cần thực hiện nhiều thao tác một cách nguyên tử (ví dụ: đọc một giá trị và ghi lại giá trị mới dựa trên nó), hãy sử dụng:

- Transactions (MULTI/EXEC): Nhóm nhiều lệnh lại, chúng sẽ được thực thi tuần tự mà không bị lệnh từ client khác xen vào. Tuy nhiên, nó không có cơ chế rollback nếu một lệnh giữa chừng thất bại logic (ví dụ: kiểu dữ liệu sai).

- Lua Scripts (EVAL, EVALSHA): Cách mạnh mẽ hơn để đảm bảo tính nguyên tử cho các logic phức tạp. Script Lua chạy trên server Redis, giảm thiểu network round trips và đảm bảo không bị gián đoạn.

#### Xử lý Lỗi (Error Handling):

Luôn kiểm tra lỗi kết nối, timeout khi tương tác với Redis.

Lệnh GET trả về nil (hoặc null tùy client library) nếu key không tồn tại. Cần xử lý trường hợp này (thường là cache miss).

#### Kích thước Dữ liệu (Data Size):

Tránh lưu trữ các giá trị (value) quá lớn (hàng MB) trong một key duy nhất. Điều này có thể làm chậm Redis, tăng độ trễ mạng và tốn bộ nhớ.

Nếu cần lưu dữ liệu lớn, cân nhắc chia nhỏ hoặc lưu trữ ở nơi khác (như S3) và chỉ lưu key/metadata trong Redis.

## Các Kiểu SET/GET và Use Case Hợp lý

Redis cung cấp nhiều biến thể của lệnh SET và GET cho các tình huống khác nhau:

- SET key value: Ghi đè giá trị của key nếu nó đã tồn tại. Dùng khi bạn muốn cập nhật giá trị một cách vô điều kiện.

- GET key: Lấy giá trị của key. Trả về nil nếu key không tồn tại. Dùng để đọc dữ liệu.

- SETNX key value (SET if Not eXists): Chỉ đặt giá trị nếu key chưa tồn tại. Trả về 1 nếu thành công, 0 nếu key đã tồn tại.

  - Use Case: Triển khai distributed lock cơ bản (cần kết hợp với TTL), đảm bảo một tác vụ chỉ được thực hiện bởi một tiến trình tại một thời điểm.

- SETEX key seconds value / PSETEX key milliseconds value: Đặt giá trị và tự động gán TTL (tính bằng giây hoặc mili giây).

  - Use Case: Caching là trường hợp sử dụng chính. Đảm bảo cache tự động hết hạn.

- SET key value [EX seconds | PX milliseconds] [NX | XX]: Lệnh SET hiện đại, kết hợp nhiều chức năng:

  - EX seconds / PX milliseconds: Tương tự SETEX/PSETEX.

  - NX: Tương tự SETNX.

  - XX: Chỉ đặt giá trị nếu key đã tồn tại. Dùng khi bạn chỉ muốn cập nhật key hiện có, không tạo key mới.

  - Khuyến nghị: Nên sử dụng lệnh SET với các tùy chọn này thay vì các lệnh cũ như SETNX, SETEX vì nó nguyên tử hơn (ví dụ: SET key value NX EX ttl đảm bảo cả việc kiểm tra tồn tại và đặt TTL xảy ra trong một bước).

- MSET key value [key value ...]: Đặt giá trị cho nhiều key cùng lúc một cách nguyên tử.

  - Use Case: Cập nhật nhiều thông tin liên quan cùng lúc, hiệu quả hơn nhiều lệnh SET riêng lẻ.

- MGET key [key ...]: Lấy giá trị của nhiều key cùng lúc.

  - Use Case: Lấy nhiều mục cache hoặc thông tin liên quan trong một lượt truy vấn, giảm network round trips.
