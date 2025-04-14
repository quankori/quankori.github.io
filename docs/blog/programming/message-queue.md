---
title: Message Queue
---

## Kiến Trúc Cốt Lõi

#### Apache Kafka: Nền Tảng Truyền Dữ Liệu Phân Tán (Distributed Streaming Platform)

Kafka không hoàn toàn là một message queue truyền thống. Nó được thiết kế như một log cam kết phân tán (distributed commit log) hoặc một nền tảng streaming.

- Topics: Dữ liệu trong Kafka được tổ chức thành các topics. Bạn có thể hình dung topic như một danh mục hoặc một feed mà producer gửi tin nhắn vào.

- Partitions: Mỗi topic được chia thành một hoặc nhiều partitions. Partition là một log chỉ cho phép ghi nối tiếp (append-only log), có thứ tự và bất biến. Việc chia partition cho phép Kafka song song hóa việc xử lý và lưu trữ dữ liệu trên nhiều máy chủ (brokers). Thứ tự tin nhắn chỉ được đảm bảo trong phạm vi một partition.

- Offsets: Mỗi tin nhắn trong một partition có một định danh tuần tự duy nhất gọi là offset. Offset xác định vị trí của tin nhắn trong partition log.

- Brokers: Các máy chủ Kafka được gọi là brokers. Chúng chịu trách nhiệm lưu trữ dữ liệu (partitions), xử lý yêu cầu từ producer và consumer. Một cụm Kafka (Kafka cluster) bao gồm nhiều brokers.

- Producers: Các ứng dụng gửi (publish) tin nhắn đến Kafka topics. Producer có thể chọn partition cụ thể để gửi tin nhắn đến hoặc để Kafka quyết định dựa trên key của tin nhắn hoặc theo cơ chế round-robin.

- Consumers: Các ứng dụng đọc (subscribe) tin nhắn từ Kafka topics. Consumers thường thuộc về một consumer group. Mỗi partition chỉ được đọc bởi một consumer duy nhất trong một group tại một thời điểm, cho phép xử lý song song và cân bằng tải. Consumers tự quản lý offset của tin nhắn cuối cùng đã đọc, cho phép chúng đọc lại dữ liệu hoặc bắt đầu từ một điểm cụ thể.

- Retention: Kafka lưu giữ tin nhắn trong một khoảng thời gian cấu hình được (ví dụ: 7 ngày) hoặc cho đến khi đạt kích thước giới hạn, bất kể tin nhắn đã được đọc hay chưa. Điều này làm cho Kafka phù hợp với các kịch bản cần xử lý lại dữ liệu.

Điểm mạnh của Kafka: Thông lượng cực cao, khả năng mở rộng tốt, lưu trữ bền vững, phù hợp cho streaming data và event sourcing.

#### RabbitMQ: Message Broker Truyền Thống (AMQP)

RabbitMQ là một message broker trưởng thành, triển khai giao thức AMQP (Advanced Message Queuing Protocol) và hỗ trợ các giao thức khác như MQTT, STOMP.

- Exchanges: Producers không gửi tin nhắn trực tiếp đến queues. Thay vào đó, chúng gửi đến exchanges. Exchange chịu trách nhiệm định tuyến (routing) tin nhắn đến các queues dựa trên các quy tắc (routing keys, bindings, headers). Các loại exchange phổ biến:

- direct: Gửi tin nhắn đến queue có binding key khớp chính xác với routing key của tin nhắn.

- topic: Gửi tin nhắn đến queue có binding pattern khớp với routing key (hỗ trợ wildcard \* và #).

- fanout: Gửi tin nhắn đến tất cả các queues được binding với nó, bỏ qua routing key.

- headers: Định tuyến dựa trên header attributes của tin nhắn thay vì routing key.

- Queues: Nơi lưu trữ tin nhắn chờ được xử lý bởi consumers.

- Bindings: Quy tắc liên kết giữa exchange và queue. Binding định nghĩa cách tin nhắn từ một exchange được chuyển đến một queue cụ thể.

- Producers: Gửi tin nhắn đến một exchange với một routing key cụ thể.

- Consumers: Đọc tin nhắn từ một queue cụ thể. RabbitMQ thường sử dụng mô hình push, broker chủ động đẩy tin nhắn đến consumer đã đăng ký. Consumer gửi lại xác nhận (acknowledgement - ack) sau khi xử lý xong tin nhắn. Nếu không nhận được ack, RabbitMQ sẽ giữ lại tin nhắn (hoặc gửi lại cho consumer khác).

- Message Lifecycle: Tin nhắn thường bị xóa khỏi queue sau khi được consumer xử lý thành công và gửi ack.

Điểm mạnh của RabbitMQ: Định tuyến linh hoạt, hỗ trợ nhiều giao thức, đảm bảo gửi tin nhắn (delivery guarantees), mô hình request/response dễ triển khai, phù hợp cho task queues và decoupling services.

## So Sánh Chi Tiết

| Tính Năng        | Kafka                                      | RabbitMQ                                        |
| ---------------- | ------------------------------------------ | ----------------------------------------------- |
| Kiến trúc        | Log phân tán (Distributed Log)             | Message Broker (AMQP)                           |
| Mô hình Consumer | Pull (Consumer kéo dữ liệu)                | Push (Broker đẩy dữ liệu)                       |
| Thứ tự tin nhắn  | Đảm bảo trong phạm vi 1 partition          | Đảm bảo trong phạm vi 1 queue (với 1 consumer)  |
| Lưu trữ tin nhắn | Dựa trên thời gian/kích thước (Bền vững)   | Dựa trên acknowledgement (Thường là tạm thời)   |
| Thông lượng      | Rất cao (Triệu msg/s)                      | Cao (Chục đến trăm nghìn msg/s)                 |
| Độ trễ           | Cao hơn một chút (do batching)             | Thấp hơn (cho các tác vụ đơn giản)              |
| Định tuyến       | Đơn giản (Topic -> Partition)              | Rất linh hoạt (Exchanges, Bindings)             |
| Giao thức        | Binary qua TCP                             | AMQP, MQTT, STOMP                               |
| Đảm bảo gửi      | At-least-once, Exactly-once (khó hơn)      | At-most-once, At-least-once, (Exactly-once khó) |
| Trường hợp dùng  | Streaming, Log Aggregation, Event Sourcing | Task Queues, RPC, Decoupling Services           |

## Xử Lý Tải Cao (Hàng Ngàn Request/giây)

Cả hai hệ thống đều có thể xử lý tải cao, nhưng cách tiếp cận và điểm nghẽn tiềm ẩn khác nhau.

#### Kafka

**Khả năng mở rộng**: Kafka được thiết kế để mở rộng theo chiều ngang. Bạn có thể tăng thông lượng bằng cách:

- Thêm Brokers: Phân tán tải lưu trữ và xử lý trên nhiều máy chủ hơn.

- Tăng số Partitions: Cho phép nhiều consumer trong một group đọc song song từ cùng một topic. Số lượng partition là giới hạn trên cho mức độ song song của một consumer group.

**Ảnh hưởng**: Với hàng ngàn request/giây, Kafka thường hoạt động tốt nếu:

- Partitioning Strategy: Key của tin nhắn được chọn tốt để phân phối đều dữ liệu trên các partitions, tránh "hot partitions".

- Consumer Parallelism: Số lượng consumer instances trong một group đủ lớn (lý tưởng là bằng số partitions) để xử lý kịp tốc độ producer.

- Tài nguyên: Brokers có đủ CPU, RAM (đặc biệt cho page cache), và Disk I/O.

**Bottlenecks**: Disk I/O trên brokers, network bandwidth, CPU của consumer nếu xử lý quá phức tạp, ZooKeeper (trong các phiên bản cũ hơn, KRaft thay thế ZooKeeper trong các phiên bản mới).

#### RabbitMQ

**Khả năng mở rộng**:

- Competing Consumers: Thêm nhiều instances của cùng một consumer đọc từ một queue duy nhất. RabbitMQ sẽ phân phối tin nhắn (round-robin) cho các consumer sẵn sàng.

- Clustering: Kết nối nhiều node RabbitMQ thành một cụm logic. Tuy nhiên, một queue cụ thể vẫn thường chỉ tồn tại trên một node (trừ khi dùng Quorum Queues hoặc Mirrored Queues - có ảnh hưởng hiệu năng).

- Shovel/Federation: Plugin cho phép chuyển tin nhắn giữa các broker/cluster khác nhau, hữu ích cho các kịch bản phân tán địa lý hoặc cần tách biệt tải.

**Ảnh hưởng**: Với hàng ngàn request/giây:

- Single Queue Bottleneck: Nếu tất cả tin nhắn đổ vào một queue duy nhất và xử lý tốn thời gian, queue đó có thể trở thành điểm nghẽn ngay cả khi có nhiều consumer. Tốc độ bị giới hạn bởi tốc độ xử lý của consumer nhanh nhất và khả năng phân phối của queue.

- outing Complexity: Các mô hình routing phức tạp có thể tiêu tốn CPU trên broker.

- Acknowledgements: Việc chờ ack có thể làm chậm quá trình nếu consumer xử lý lâu.

**Bottlenecks**: CPU/RAM trên node chứa queue bị quá tải, network giữa các node trong cluster, tốc độ xử lý và ack của consumer.

## Hình Dung Cấu Trúc và Khả Năng Mở Rộng (Visualization)

### Kafka Visualization

Kafka phân tán dữ liệu của một topic qua nhiều partition, và các partition này được lưu trữ trên các broker khác nhau. Consumer group cho phép xử lý song song.

```
+----------+      +----------+      +----------+
| Producer | ---->| Broker 1 |<---->| Broker 2 |
+----------+      |----------|      |----------|
                  | Topic A: |      | Topic A: |
                  |   P0     |      |   P1     |  <-- Partitions (P)
                  |   P2     |      |   P3     |
                  +----------+      +----------+
                       ^                 ^
                       |                 |
+----------------------+----------------------+
| Consumer Group G1                           |
| +------------+        +------------+        |
| | Consumer 1 |<------ | P0, P2     |        |  <-- Each consumer handles specific partitions
| +------------+        +------------+        |
| +------------+        +------------+        |
| | Consumer 2 |<------ | P1, P3     |        |
| +------------+        +------------+        |
+---------------------------------------------+
```

#### Khi Scale Out (Thêm Broker và Consumer):

Chúng ta thêm Broker 3, tăng số partition cho Topic A (ví dụ: P4, P5), và thêm Consumer 3 vào Group G1. Kafka sẽ tự động rebalance để phân phối lại các partition cho các consumer.

```
+----------+      +----------+      +----------+      +----------+
| Producer | ---->| Broker 1 |<---->| Broker 2 |<---->| Broker 3 |
+----------+      |----------|      |----------|      |----------|
                  | Topic A: |      | Topic A: |      | Topic A: |
                  |   P0     |      |   P1     |      |   P4     | <-- New Partitions
                  |   P2     |      |   P3     |      |   P5     |
                  +----------+      +----------+      +----------+
                       ^                 ^                 ^
                       |                 |                 |
+----------------------+-----------------+-----------------+--+
| Consumer Group G1 (Rebalanced)                          |
| +------------+        +------------+                    |
| | Consumer 1 |<------ | P0, P2     |                    | <-- Consumers now handle potentially different partitions
| +------------+        +------------+                    |
| +------------+        +------------+                    |
| | Consumer 2 |<------ | P1, P4     |                    |
| +------------+        +------------+                    |
| +------------+        +------------+                    |
| | Consumer 3 |<------ | P3, P5     |                    | <-- New Consumer
| +------------+        +------------+                    |
+---------------------------------------------------------+
```

### RabbitMQ Visualization

RabbitMQ tập trung vào định tuyến linh hoạt qua exchanges và xử lý song song trên cùng một queue bằng competing consumers.

#### Cấu trúc cơ bản (Direct Exchange):

Producer gửi tin nhắn đến exchange, exchange định tuyến đến queue dựa trên routing key.

```
+----------+       +---------------------+       +-----------------+
| Producer | ----> | Exchange (Direct)   | ----> | Queue A         | <-- Binding Key = "keyA"
+----------+       | Routing Key: "keyA" |       | (Msg for keyA)  |
                   +---------------------+       +-----------------+
                                                       |
                                                       V
                                                 +------------+
                                                 | Consumer 1 |
                                                 +------------+

```

#### Cấu trúc cơ bản (Fanout Exchange):

Cách phổ biến nhất để scale RabbitMQ là thêm nhiều consumer instance cùng đọc từ một queue. RabbitMQ sẽ phân phối tin nhắn cho các consumer rảnh rỗi (round-robin hoặc dựa trên prefetch).

```
+----------+       +---------------------+       +-----------------+
| Producer | ----> | Exchange (Direct)   | ----> | Queue D         |
+----------+       | Routing Key: "task" |       | (Task Queue)    |
                   +---------------------+       +-----------------+
                                                       |
                                     -------------------
                                     |        |        |
                                     V        V        V
                               +------------++------------++------------+
                               | Consumer 1 || Consumer 2 || Consumer 3 | <-- Multiple consumers processing tasks from Queue D
                               +------------++------------++------------+
```

## Kỹ Thuật Tối Ưu Hóa

### Kafka

#### Producers:

- batch.size & linger.ms: Tăng kích thước batch và thời gian chờ để gửi nhiều tin nhắn hơn trong một request, giảm overhead mạng.

- compression.type: Sử dụng nén (snappy, gzip, lz4, zstd) để giảm kích thước tin nhắn, tiết kiệm băng thông và dung lượng lưu trữ.

- acks: Cấu hình mức độ đảm bảo (acks=0, acks=1, acks=all). acks=1 là cân bằng tốt giữa độ bền và hiệu năng.

#### Brokers:

- Tuning JVM heap size.

- Đảm bảo đủ RAM cho page cache của OS (Kafka tận dụng mạnh mẽ page cache).

- Sử dụng ổ cứng nhanh (SSD).

- Tăng số network/IO threads nếu cần.

#### Consumers:

- fetch.min.bytes & fetch.max.wait.ms: Điều chỉnh lượng dữ liệu tối thiểu consumer muốn nhận hoặc thời gian chờ tối đa, tương tự batching ở producer.

- Xử lý song song trong consumer instance (nếu logic cho phép).

- Quản lý offset cẩn thận (commit định kỳ, tránh commit quá thường xuyên).

### RabbitMQ

#### Consumers:

- Prefetch Count (QoS): Xác định số lượng tin nhắn tối đa mà broker có thể gửi cho consumer mà chưa nhận được ack. Giá trị quá cao có thể làm consumer bị quá tải, giá trị quá thấp làm giảm thông lượng. Cần tuning cẩn thận.

- Sử dụng manual acknowledgements một cách hiệu quả.

#### Queues:

- Persistent vs. Transient Messages/Queues: Tin nhắn/queue bền vững (persistent) được ghi xuống đĩa, đảm bảo không mất khi broker khởi động lại nhưng chậm hơn. Transient nhanh hơn nhưng dữ liệu mất khi restart. Chọn tùy theo yêu cầu độ bền.

- Lazy Queues: Giữ tin nhắn trên đĩa nhiều hơn, giảm sử dụng RAM, hữu ích cho các queue rất dài nhưng có thể tăng độ trễ.

- Quorum Queues: Cung cấp độ bền và tính sẵn sàng cao hơn so với mirrored queues cổ điển, là lựa chọn khuyến nghị cho các phiên bản RabbitMQ mới.

#### Producers:

- Sử dụng persistent messages nếu cần độ bền.

- Connection/Channel Pooling: Tái sử dụng kết nối và channel để giảm overhead thiết lập.

#### Broker:

- Tuning Erlang VM (số lượng scheduler threads).

- Giám sát memory/disk alarms.

- Sử dụng HiPE (không còn được khuyến nghị nhiều như trước).

## Use Cases Điển Hình

#### Chọn Kafka khi:

- Cần thông lượng cực cao (log aggregation, IoT data streams, metrics).

- Cần lưu trữ dữ liệu lâu dài và có khả năng đọc lại (event sourcing, stream processing).

- Thứ tự tin nhắn trong một ngữ cảnh (partition) là quan trọng.

- Xây dựng các pipeline dữ liệu real-time.

#### Chọn RabbitMQ khi:

- Cần các mô hình định tuyến phức tạp.

- Cần tích hợp với các hệ thống cũ hoặc nhiều giao thức (AMQP, MQTT, STOMP).

- Ưu tiên độ trễ thấp cho các tác vụ nhỏ.

- Cần triển khai mô hình task queue (worker queues).

- Cần mô hình request/response đơn giản.

- Đảm bảo gửi tin nhắn ở mức độ per-message là quan trọng.

## Mô Hình Request/Response trong RabbitMQ

RabbitMQ hỗ trợ tốt mô hình RPC (Remote Procedure Call) hay Request/Response. Cơ chế hoạt động như sau:

1. Client (Requester):

- Tạo một exclusive callback queue (queue tạm thời, chỉ client này đọc được và tự động xóa khi client disconnect).

- Gửi tin nhắn request đến một RPC queue cố định mà Server đang lắng nghe.

- Trong tin nhắn request, đặt hai thuộc tính quan trọng trong properties:

  - reply_to: Tên của callback queue vừa tạo.

  - correlation_id: Một giá trị duy nhất để định danh request này (ví dụ: UUID).

- Bắt đầu lắng nghe trên callback queue của mình.

2. Server (Replier):

- Lắng nghe tin nhắn trên RPC queue cố định.

- Khi nhận được tin nhắn request:

  - Xử lý request.

  - Lấy reply_to và correlation_id từ properties của tin nhắn request.

  - Gửi tin nhắn response chứa kết quả xử lý đến exchange mặc định ("") với routing_key chính là giá trị của reply_to (tên callback queue của client).

  - Đặt correlation_id trong tin nhắn response giống hệt correlation_id của tin nhắn request.

3. Client (Requester):

- Nhận được tin nhắn response trên callback queue.

- Kiểm tra correlation_id của response để khớp với request tương ứng đã gửi.

- Xử lý kết quả response.

Cơ chế này cho phép client gửi nhiều request mà không cần đợi response tuần tự, vì correlation_id giúp khớp đúng response với request.