---
title: Checklist Requirement
---

## Phần 1: Làm Rõ Yêu Cầu Với BA (Understanding the "What" and "Why")

#### Mục tiêu: Đảm bảo mọi người hiểu rõ feature từ góc độ nghiệp vụ và người dùng.

- Mục tiêu Nghiệp vụ (Business Goal):

  - Tại sao cần feature này? Giải quyết vấn đề gì? Mang lại giá trị gì?

  - Kết quả mong đợi (KPIs, metrics) là gì?

- Người dùng Mục tiêu (Target Users):

  - Ai sẽ sử dụng? (End-user, admin, system?)

  - Có các nhóm người dùng (personas) khác nhau không?

- Luồng Người dùng & Use Cases (User Flow & Use Cases):

  - Mô tả chi tiết từng bước tương tác (step-by-step).

  - Happy Path: Luồng chính khi mọi thứ bình thường.

  - Alternative Paths / Edge Cases: Các kịch bản khác, trường hợp đặc biệt (dữ liệu trống, giá trị biên...).

  - Error Handling: Xử lý khi có lỗi? Thông báo lỗi cho người dùng?

  - Điều kiện Chấp nhận (Acceptance Criteria - AC): Tiêu chí cụ thể, kiểm chứng được (ví dụ: GIVEN-WHEN-THEN). Rất quan trọng!

- Yêu cầu Dữ liệu (Data Requirements):

  - Dữ liệu đầu vào cần là gì? Từ đâu?

  - Dữ liệu cần tạo/lưu trữ là gì?

  - Định dạng dữ liệu (types, formats)?

  - Quy tắc kiểm tra dữ liệu (validation rules)?

  - Yêu cầu về quyền riêng tư, mã hóa?

- Yêu cầu Giao diện (UI/UX Requirements):

  - Đã có mockups/wireframes/prototype chưa?

  - Các thành phần UI chính? Tương tác?

  - Yêu cầu về responsive/accessibility?

  - Nội dung text, hình ảnh, labels?

- Phụ thuộc Bên ngoài (External Dependencies):

  - Phụ thuộc vào team khác?

  - Phụ thuộc vào API bên thứ ba? (Tài liệu, rate limit, xử lý lỗi?)

  - Phụ thuộc vào hệ thống bên ngoài khác?

- Phạm vi (Scope):

  - Cái gì chắc chắn TRONG phạm vi?

  - Cái gì chắc chắn NGOÀI phạm vi? (Làm rõ để tránh "scope creep").

- Mức độ Ưu tiên (Priority):

  - Mức độ ưu tiên so với các feature khác?

## Phần 2: Đánh Giá Kỹ Thuật (Technical Assessment - The "How")

#### Mục tiêu: Đánh giá các khía cạnh kỹ thuật liên quan đến việc triển khai sau khi đã hiểu rõ yêu cầu.

- Tác động đến Hệ thống Hiện tại (Impact on Existing System):

  - Ảnh hưởng đến module/service/component nào?

  - Cần thay đổi DB schema? Kế hoạch migration?

  - Cần refactor code cũ?

  - Ảnh hưởng performance đến phần hiện có?

- Lựa chọn Công nghệ/Kiến trúc (Technology/Architecture Choices):

  - Tái sử dụng được gì? (Giải pháp, thư viện, component?)

  - Cần công nghệ/thư viện/mẫu kiến trúc mới không? (Cân nhắc kỹ).

  - Có phù hợp với kiến trúc tổng thể hiện tại? Cần điều chỉnh kiến trúc? (Tách service mới?).

- Phụ thuộc Kỹ thuật Nội bộ (Internal Technical Dependencies):

  - Phụ thuộc vào công việc đang làm của người khác trong team?

  - Phụ thuộc vào platform/core service nội bộ?

- Rủi ro Kỹ thuật (Technical Risks):

  - Điểm nào chưa rõ về kỹ thuật?

  - Phần nào phức tạp? (Thuật toán, logic nhiều nhánh?).

  - Nguy cơ về performance, security?

  - Thách thức tích hợp?

- Khả năng Kiểm thử (Testability):

  - Kiểm thử như thế nào? (Unit, Integration, E2E?).

  - Cần dữ liệu test đặc biệt?

  - Mức độ tự động hóa kiểm thử?

  - Cần môi trường test riêng?

- Triển khai (Deployment):

  - Kế hoạch triển khai? (Deploy chung/riêng?).

  - Yêu cầu downtime?

  - Cần feature flag?

  - Kế hoạch rollback?

- Giám sát & Vận hành (Monitoring & Operations):

  - Cần theo dõi metrics nào?

  - Cần cảnh báo (alerting) cho trường hợp nào?

  - Yêu cầu logging?

## Phần 3: Hỗ Trợ Ước Tính (Estimation - Planning Poker)

#### Mục tiêu: Cung cấp cơ sở để đưa ra ước tính effort đáng tin cậy hơn.

- Độ phức tạp (Complexity): Dựa trên số lượng thành phần bị ảnh hưởng, logic mới, tích hợp, số kịch bản cần xử lý...

- Nỗ lực (Effort): Khối lượng công việc ước tính (coding, testing, docs, deploy, meetings...).

- Sự không chắc chắn/Rủi ro (Uncertainty/Risk): Các yếu tố chưa rõ hoặc có rủi ro cao sẽ làm tăng điểm estimate. Checklist giúp giảm sự không chắc chắn này.

## Phần 4: Hỗ Trợ Thiết Kế Hệ Thống (System Design)

#### Mục tiêu: Cung cấp đầu vào quan trọng cho việc thiết kế giải pháp kỹ thuật.

- Xác định Components: Giúp nhận diện các thành phần mới cần tạo hoặc cũ cần sửa đổi.

- Lựa chọn Mẫu Thiết Kế: NFRs, đặc điểm feature, bối cảnh hệ thống định hướng việc chọn kiến trúc, mẫu giao tiếp, mẫu dữ liệu, mẫu phục hồi phù hợp.

- Thiết kế API/Interface: Luồng người dùng và yêu cầu dữ liệu định hình API endpoints, request/response formats.

- Thiết kế Dữ liệu: Yêu cầu dữ liệu và validation rules là cơ sở cho thiết kế DB schema, chọn loại DB.

- Xử lý Lỗi & NFRs: Đảm bảo các yêu cầu phi chức năng và kịch bản lỗi được xem xét trong thiết kế.
