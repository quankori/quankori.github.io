---
title: Automated Market Maker
---

The Automated Market Maker (AMM) algorithm uses the formula x \* y = k.

For example:

- We have a pool with 50 BUSD tokens and 50 NEW tokens.
- According to the formula, we have 50 * 50 = 2500.
- Kori adds 5 BUSD to the pool.
- Now the pool will have 55 * 50 = 2750.
- To maintain the initial value of k, which is 2500, we must exchange a corresponding - amount of NEW tokens.
- KORI receives: 50 - (2500 / 55) = 4.54 NEW.
- Now the pool will have 55 * 45.46 = 2500, equivalent to the initial value of k.

So, the AMM algorithm uses the x * y = k formula to maintain balance within the token pool. When there is a change in the number of tokens in the pool (e.g., adding BUSD), the algorithm calculates the corresponding amount of tokens to be added or removed (in this case, NEW tokens) to keep the k value unchanged. This helps the system maintain stability and balance.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/2.PNG)
