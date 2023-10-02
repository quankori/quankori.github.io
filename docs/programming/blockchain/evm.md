---
title: Ethereum Virtual Machine
---

## Concept

This is a system that executes pre-programmed contracts without the need for intermediaries; however, it still requires fees (gas fees) to perform transactions as well as rewards for miners.

Interactions with contracts are carried out through transactions.

Blockchain only stores a historical ledger and does not store data.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/3.PNG)

## Structure

Hash, previous hash, data, nonce:

**Hash**: A cryptographic hash function applied to data to produce a fixed-size string of characters, which is typically a hexadecimal number. It represents a unique fingerprint of the data.

**Previous hash**: The hash of the previous block in the blockchain. It links blocks together in chronological order, forming the blockchain.

**Data**: Information or transaction data that is stored in the block.

**Nonce**: A number used in mining to find a suitable hash value. Miners change the nonce to search for a hash that meets certain criteria.
The formula you mentioned, which includes the previous hash, data, nonce, block id, and hash algorithm, is used to calculate the hash of a block.

The "Genesis block" is the first block in a blockchain, and its previous hash is typically set to a predefined value, often "00000000."

The nonce is indeed a value that miners adjust to find a valid hash that meets specific criteria.

In blockchain, the SHA-256 algorithm is commonly used to hash data, and it is a one-way cryptographic hash function.

The resulting hash is often converted into a decimal number, typically from hexadecimal to decimal, for various purposes in blockchain and cryptocurrency systems.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/5.PNG)

## Characteristics

Avalanche effect: When a small change is made, the hash will generate a completely different output from the original hash.

Must withstand collisions. Byzantine Fault Tolerance.

- Immutable ledger.
- Advantages over traditional authentication.
- Distributed P2P network.
- When a block is added to the network, it will be updated across the entire network (Consensus Protocol).

It can be hacked if 51% is controlled, but it will be very costly.

If a node in the network is hacked, all other nodes will restore that node to its original value.

When a miner successfully adds a block to the chain, the remaining nodes in the network will update accordingly.

However, one of the drawbacks of short block mining times is that many miners may find a block in very close time intervals, but only the earliest found block will be added to the main branch, and the slower blocks will be discarded, known as orphaned blocks.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/4.PNG)
