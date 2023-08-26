---
title: Blockchain Consensus
---

## Proof of Work.

Sử dụng sức mạnh máy tính để giải quyết vấn đề.

Người khai thác (miner) sẽ tìm ra nonce chính xác thông qua việc lặp đi lặp lại sao cho ký tự đầu tiên nhỏ hơn số đích (target number) trong hệ thập lục phân.

Số đích được tạo ra độc lập bởi các node trong mạng (tuân theo một số quy tắc cụ thể).

Số đích càng nhỏ, thời gian để tìm ra nó càng lâu. Ví dụ, mục tiêu 0x0001 sẽ tốn nhiều thời gian hơn 0x010000.

For example:

- On website `https://emn178.github.io/online-tools/sha256.html`
- Target is node have is 32
- Old hash of old block is `0x1dcc4`
- Data in new block is `[{a:2, b:3}]`
- When we sum it will result is:

```bash
  nonce_number:old_hash_block:new_data
  # Result will be
  0:0x1dcc4:[{a:2, b:3}]
  # 9b2265d45e26247d3db353afce35864b673e95c6d6c7194d856d57afedda0a27
```

- At that time, the first 2 characters of the string are still smaller than the hash value, so it will not work, then we add 1 to the nonce.

```bash
  nonce_number:old_hash_block:new_data
  # Sẽ ra là
  1:0x1dcc4:[{a:2, b:3}]
  # ad77af42297b05ee67d22bfd021ea7c2a249cc7797495a482aaa24d34d5d5015
```

- Add nonce to 2

```bash
  nonce_number:old_hash_block:new_data
  # Sẽ ra là
  2:0x1dcc4:[{a:2, b:3}]
  # 08fbf223a91dfb45f74b79789d564fd2244d65e96928b6d0b293d1a823dd6abb
```

- At this point, the first two characters "08" are smaller than the target "32", so the mining is successful.

Qua ví dụ cơ bản này, chúng ta có thể hiểu cơ chế của việc giải quyết các câu đố trong mạng, nhưng việc triển khai thuật toán khai thác block có thể thay đổi tùy thuộc vào mạng và các node tham gia.

## Proof of Stake

Tạo một block dựa trên số tiền có trong tài khoản

Thuật toán sẽ lấy hai ký tự đầu của block nhân với số đích, sau đó so sánh nó với số tiền của người dùng, ai có nhiều hơn sẽ thắng.

For example:

- User A has 52 tokens, User B has 15 tokens
- The node's target is set to 5
- We have a hash string, for example: 08fbf223a91dfb45f74b79789d564fd2244d65e96928b6d0b293d1a823dd6abb
- We will take the first two characters, which are 08, multiply it by the target of 5, and the result is 40.
- We can see that user B only has 15 tokens, so they cannot mine the block, but user A has 52 tokens, so they can mine the block successfully.

Qua ví dụ cơ bản này, chúng ta có thể hiểu được cơ chế của thuật toán khai thác trong mạng, nhưng việc triển khai thuật toán khai thác có thể thay đổi tùy thuộc vào mạng và các node tham gia.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/6.PNG)
