---
title: Copy in JavaScript
---

## Shallow copy

Một bản sao nông (shallow copy) của một đối tượng hoặc mảng là một bản sao trong đó các phần tử ở cấp trên cùng được nhân bản, nhưng các đối tượng hoặc mảng lồng bên trong thì không. Thay vào đó, các tham chiếu đến các đối tượng hoặc mảng lồng này được sao chép. Kết quả là, nếu bạn thay đổi một đối tượng hoặc mảng lồng trong đối tượng sao chép, đối tượng gốc cũng sẽ phản ánh những thay đổi đó.

```js
let original = {
  name: "John",
  address: {
    city: "New York",
    zip: "10001",
  },
};

let shallowCopy = Object.assign({}, original);
shallowCopy.address.city = "Los Angeles";

console.log(original.address.city); // Outputs: 'Los Angeles'
```

Trong ví dụ ở trên, đối tượng địa chỉ lồng bên trong được chia sẻ giữa đối tượng gốc và bản sao nông. Khi chúng ta thay đổi một thuộc tính trong địa chỉ của shallowCopy, nó cũng thay đổi trong đối tượng gốc.

## Deep copying

Một bản sao sâu (deep copy) nhân bản một đối tượng hoặc mảng, bao gồm tất cả cấu trúc lồng của nó. Những thay đổi được thực hiện trong cấu trúc lồng trong đối tượng sao chép sẽ không ảnh hưởng đến đối tượng gốc (và ngược lại).

Trong JavaScript, không có phương thức tích hợp để tạo bản sao sâu của đối tượng, nhưng bạn có thể sử dụng nhiều kỹ thuật khác nhau, chẳng hạn như chuyển đối tượng thành chuỗi và sau đó phân tích cú pháp sử dụng các phương thức JSON:

```js
let deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "San Francisco";

console.log(original.address.city); // Outputs: 'Los Angeles'
console.log(deepCopy.address.city); // Outputs: 'San Francisco'
```

Tuy nhiên, phương pháp JSON này có nhược điểm: nó chỉ hoạt động với các đối tượng an toàn với JSON (do đó, các hàm, undefined, Symbol và một số loại khác không thể được sao chép theo cách này).

## Object.assign()

Phương thức Object.assign() được sử dụng để sao chép các giá trị của tất cả các thuộc tính sở hữu có thể liệt kê từ một hoặc nhiều đối tượng nguồn vào một đối tượng đích. Nó sẽ trả về đối tượng đích. Phương pháp này thực hiện việc sao chép nông, như đã minh họa trong ví dụ trước.

```js
let obj1 = { a: 1, b: 2 };
let obj2 = { b: 3, c: 4 };

let combined = Object.assign({}, obj1, obj2);
console.log(combined); // Outputs: { a: 1, b: 3, c: 4 }
```

Trong ví dụ, obj2 ghi đè lên thuộc tính b từ obj1 trong đối tượng kết hợp.

Khi làm việc với đối tượng và mảng, hiểu sự khác biệt giữa sao chép sâu và nông là cần thiết để ngăn hiệu ứng phụ không mong muốn.
