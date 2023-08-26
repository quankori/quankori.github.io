---
title: Big O Notation
---

## Some common complexities

O(n): Độ phức tạp tuyến tính. Xem xét hàm tính tổng của các số từ 1 đến n.

O(1): Độ phức tạp hằng số. Đây cũng là bài toán tính tổng của các số từ 1 đến n.

O(n²): Thường xuất hiện khi có hai vòng lặp lồng nhau.

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

Dựa trên các chú thích ở trên, trong trường hợp này T = O(1) + n x O(1) + O(1) = n x c + d (sử dụng (3), xem O(1) + O(1) như là d, trong đó c, d là hằng số) = n (như đã đề cập ở trên, n có thể coi như +∞, sử dụng (4) để loại bỏ c, d) = O(n).

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/5.png)
