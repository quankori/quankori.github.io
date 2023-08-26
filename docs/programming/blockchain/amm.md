---
title: Automated Market Maker
---

Thuật toán AMM (Automated Market Maker) có công thức x \*\*\* y = k.

Ví dụ:

- Chúng ta có một hồ chứa 50 token BUSD và 50 token NEW.
- Theo công thức, chúng ta có 50 \* 50 = 2500.
- Kori thêm 5 BUSD vào hồ.
- Bây giờ hồ sẽ có 55 \* 50 = 2750.
- Để đạt được giá trị ban đầu của k là 2500, chúng ta phải trả một lượng tương ứng của NEW.
- KORI nhận được: 50 - (2500 / 55) = 4.54 NEW.
- Bây giờ hồ sẽ có 55 \* 45.46 = 2500, tương đương với giá trị k ban đầu.

Như vậy, thuật toán AMM sử dụng công thức x \* y = k để duy trì sự cân bằng trong hồ token. Khi có sự thay đổi về số lượng token trong hồ (ví dụ: thêm BUSD), thuật toán sẽ tính toán số lượng token tương ứng cần phải được thêm hoặc rút ra (trong trường hợp này là token NEW) để giữ cho giá trị k không đổi. Điều này giúp hệ thống duy trì sự ổn định và cân bằng.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/2.PNG)
