---
title: Sliding Window Cheatsheet
---

### Max Profit

```ts
function maxProfit(prices: number[]): number {
  if (prices.length < 2) return 0;

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    // Update minPrice if current price is lower
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      console.log(`Day ${i}: New minimum price found: $${minPrice}`);
    } else {
      // Calculate potential profit
      const profit = prices[i] - minPrice;
      if (profit > maxProfit) {
        maxProfit = profit;
        console.log(
          `Day ${i}: Selling at $${prices[i]} with buy at $${minPrice} yields new max profit: $${maxProfit}`
        );
      }
    }
  }

  return maxProfit;
}
```
