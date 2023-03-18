---
title: Big O Notation
---

## Some common complexities

O(n): Linear complexity. Consider the function that calculates the sum of numbers from 1 to n

O(1): Constant complexity. It's also the problem of calculating the sum of numbers from 1 to n.

O(n²): Commonly occurs when there are two nested loops.

## The steps to calculate the complexity of an algorithm are

```c
int sum(int n)
{
    int s = 0; // --->O(1)
    for(int i = 1; i <= n; i++) // n lần
        s += i; // --->O(1)
    return s;   // --->O(1)
}
```

Based on the above annotations, in this case T = O(1) + n x O(1) + O(1) = n x c + d (using (3), consider O(1) + O(1) as d, where c, d are constants) = n (as mentioned above, n can be considered as +∞, using (4) to remove c, d). = O(n).

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/5.png)
