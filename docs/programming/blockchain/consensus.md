---
title: Blockchain Consensus
---

## Proof of Work.

Use computer power to solve the problem.

The miner will find the exact nonce by looping so that the first character is smaller than the target number in hexadecimal.

The target number is generated independently by the node in the network (following certain rules).

The smaller the target number, the more time it will take. For example, target 0x0001 will take more time than 0x010000.

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

Through this basic example, we can understand the mechanism of solving puzzles in the network, but the implementation of the block mining algorithm may vary depending on the network and the participating nodes.

## Proof of Stake

Create a block based on the amount of money in the account

The algorithm will take the first two characters of the block multiplied by the target, then compare it with the user's money, whoever has more will win.

For example:

- User A has 52 tokens, User B has 15 tokens
- The node's target is set to 5
- We have a hash string, for example: 08fbf223a91dfb45f74b79789d564fd2244d65e96928b6d0b293d1a823dd6abb
- We will take the first two characters, which are 08, multiply it by the target of 5, and the result is 40.
- We can see that user B only has 15 tokens, so they cannot mine the block, but user A has 52 tokens, so they can mine the block successfully.

Through this basic example, we can understand the mechanism of the network's mining algorithm, but the implementation of the mining algorithm may vary depending on the network and the participating nodes.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/main/src/images/blockchain/6.PNG)
