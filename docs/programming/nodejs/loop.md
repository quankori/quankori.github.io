---
title: Loop
---

Trong JavaScript, có nhiều cách để duyệt qua mảng, nhưng hiệu năng có thể khác nhau tùy thuộc vào trình duyệt và phiên bản JavaScript. Dưới đây là một số phương pháp thường được sử dụng:

**For Loop Cổ Điển**: Thường là nhanh nhất nhưng có cú pháp khá đầy đủ.

```js
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

**For-Of Loop**: Cú pháp sáng sủa hơn, nhưng có thể chậm hơn một chút đối với mảng lớn.

```js
for (const item of arr) {
  console.log(item);
}
```

**forEach Method**: Rõ ràng và thuận tiện, nhưng không thể dừng loop bằng break.

```js
arr.forEach(function (item) {
  console.log(item);
});
```

**Map Method**: Tạo mảng mới bằng cách áp dụng một hàm lên từng phần tử của mảng gốc.

```js
const newArr = arr.map((item) => item * 2);
```

**Filter Method**: Tạo mảng mới với các phần tử thỏa mãn điều kiện nào đó.

```js
const filtered = arr.filter((item) => item > 2);
```

**Reduce Method**: Tính toán giá trị tổng hợp từ mảng.

```js
const sum = arr.reduce((acc, item) => acc + item, 0);
```

Về Hiệu Năng:

- for loop cổ điển thường là lựa chọn nhanh nhất, nhất là khi bạn cần sử dụng chỉ số của các phần tử trong mảng.
- for-of và .forEach() có thể chậm hơn một chút và nên được sử dụng cho đọc mã dễ dàng hơn hoặc khi không cần chỉ số.

Nếu hiệu năng là ưu tiên hàng đầu và mảng của bạn rất lớn, sử dụng for loop cổ điển có lẽ là lựa chọn tốt nhất. Tuy nhiên, trong nhiều trường hợp, sự khác biệt về hiệu năng giữa các phương pháp này không đáng kể, và việc chọn lựa thường dựa trên sự rõ ràng và tính đọc được của mã.

Tuy nhiên, sự khác biệt về hiệu năng giữa các phương pháp này thường không đáng kể trong hầu hết các ứng dụng thông thường. Thực tế, trong một số trường hợp, máy ảo JavaScript có thể tối ưu hóa đoạn mã sử dụng map, reduce, hoặc filter đến mức chúng chạy nhanh ngang với vòng lặp for cổ điển.
