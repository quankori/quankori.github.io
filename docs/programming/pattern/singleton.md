---
title: Singleton Pattern
---

Singleton là một trong năm mẫu thiết kế (design pattern) nằm trong nhóm Mẫu Thiết Kế Tạo (Creational Design Pattern).

Singleton đảm bảo chỉ có một thể hiện (instance) được tạo và cung cấp một phương thức để truy cập thể hiện đó bất kỳ lúc nào và ở bất kỳ phần nào của chương trình.

Singleton được sử dụng khi chúng ta muốn:

- Đảm bảo chỉ có một thể hiện của một lớp tồn tại.
- Quản lý quyền truy cập tốt hơn vì chỉ có một thể hiện.
- Quản lý số lượng thể hiện của một lớp trong một giới hạn cụ thể.
- Vì một lớp sử dụng Singleton chỉ tồn tại trong một thể hiện duy nhất, nó thường được sử dụng để giải quyết các vấn đề cần truy cập vào các ứng dụng như tài nguyên chia sẻ, logger, cấu hình, caching, thread pool, vv.
- Một số mẫu thiết kế khác cũng sử dụng Singleton cho việc thực hiện, chẳng hạn như Abstract Factory, Builder, Prototype, Facade, vv.
- Nó đã được sử dụng trong một số lớp cốt lõi của Java như java.lang.Runtime, java.awt.Desktop.

Code example:

```ts
class Singleton {
  private static instance: Singleton;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public someBusinessLogic() {
    // ...
  }
}
```
