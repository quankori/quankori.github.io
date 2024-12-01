---
title: RxJS CheatSheet
---

### Observables

#### Create observables

```ts
import { Observable } from "rxjs";

// Tạo một Observable đơn giản
const observable = new Observable((subscriber) => {
  subscriber.next("Hello");
  subscriber.next("World");
  subscriber.complete();
});
```

#### Register observables

```ts
observable.subscribe({
  next(x) {
    console.log("Received:", x);
  },
  error(err) {
    console.error("Error:", err);
  },
  complete() {
    console.log("Completed");
  },
});
```

#### Cold (not share)

```ts
import { Observable } from "rxjs";

// Tạo một Cold Observable
const coldObservable = new Observable<number>((subscriber) => {
  console.log("Observable bắt đầu phát dữ liệu");
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

// Đăng ký subscriber đầu tiên
coldObservable.subscribe({
  next: (value) => console.log(`Subscriber 1 nhận: ${value}`),
  complete: () => console.log("Subscriber 1 hoàn thành"),
});

// Đăng ký subscriber thứ hai
coldObservable.subscribe({
  next: (value) => console.log(`Subscriber 2 nhận: ${value}`),
  complete: () => console.log("Subscriber 2 hoàn thành"),
});
```

#### Hot (share)

```ts
import { Subject } from "rxjs";

// Tạo một Subject, đây là một Hot Observable
const hotObservable = new Subject<number>();

// Đăng ký subscriber đầu tiên
hotObservable.subscribe({
  next: (value) => console.log(`Subscriber 1 nhận: ${value}`),
});

// Phát dữ liệu
hotObservable.next(1);
hotObservable.next(2);

// Đăng ký subscriber thứ hai
hotObservable.subscribe({
  next: (value) => console.log(`Subscriber 2 nhận: ${value}`),
});

// Phát dữ liệu tiếp tục
hotObservable.next(3);
hotObservable.next(4);

// Hoàn thành Observable
hotObservable.complete();
```

### Creation Operators

#### of

```ts
import { of } from "rxjs";

of(1, 2, 3).subscribe(console.log);
// Output: 1, 2, 3
```

#### from

```ts
import { from } from "rxjs";

from([10, 20, 30]).subscribe(console.log);
// Output: 10, 20, 30
```

#### interval

```ts
import { interval } from "rxjs";

const source = interval(1000); // 1 giây
source.subscribe((val) => console.log(val));
// Output: 0, 1, 2, 3, ...
```

#### timer

```ts
import { timer } from "rxjs";

const source = timer(2000, 1000); // Bắt đầu sau 2 giây, phát mỗi 1 giây
source.subscribe((val) => console.log(val));
// Output sau 2 giây: 0, sau mỗi giây: 1, 2, 3, ...
```

### Transformation Operators

#### map

```ts
import { of } from "rxjs";
import { map } from "rxjs/operators";

of(1, 2, 3)
  .pipe(map((x) => x * 10))
  .subscribe(console.log);
// Output: 10, 20, 30
```

#### pluck

```ts
import { of } from "rxjs";
import { pluck } from "rxjs/operators";

of({ name: "Alice" }, { name: "Bob" })
  .pipe(pluck("name"))
  .subscribe(console.log);
// Output: 'Alice', 'Bob'
```

#### scan

```ts
import { of } from "rxjs";
import { scan } from "rxjs/operators";

of(1, 2, 3, 4)
  .pipe(scan((acc, curr) => acc + curr, 0))
  .subscribe(console.log);
// Output: 1, 3, 6, 10
```

### Filtering Operators

#### filter

```ts
import { of } from "rxjs";
import { filter } from "rxjs/operators";

of(1, 2, 3, 4, 5)
  .pipe(filter((x) => x % 2 === 0))
  .subscribe(console.log);
// Output: 2, 4
```

#### take

```ts
import { interval } from "rxjs";
import { take } from "rxjs/operators";

interval(1000).pipe(take(3)).subscribe(console.log);
// Output: 0, 1, 2
```

#### debounceTime

```ts
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(debounceTime(1000));
result.subscribe((x) => console.log("Clicked!"));
```

### Subjects

#### Create subjects

```ts
import { Subject } from "rxjs";

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`Observer A: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`Observer B: ${v}`),
});

subject.next(1);
// Output:
// Observer A: 1
// Observer B: 1

subject.next(2);
// Output:
// Observer A: 2
// Observer B: 2
```

#### BehaviorSubject

```ts
import { BehaviorSubject } from "rxjs";

const behaviorSubject = new BehaviorSubject<number>(0);

behaviorSubject.subscribe((val) => console.log(`Subscriber 1: ${val}`));

behaviorSubject.next(1);
behaviorSubject.next(2);

behaviorSubject.subscribe((val) => console.log(`Subscriber 2: ${val}`));

behaviorSubject.next(3);
// Output:
// Subscriber 1: 0
// Subscriber 1: 1
// Subscriber 1: 2
// Subscriber 2: 2
// Subscriber 1: 3
// Subscriber 2: 3
```

#### ReplaySubject

```ts
const replaySubject = new ReplaySubject<number>(2); // Lưu lại 2 giá trị gần nhất

replaySubject.next(1);
replaySubject.next(2);
replaySubject.next(3);

replaySubject.subscribe((val) => console.log(`Subscriber: ${val}`));
// Output:
// Subscriber: 2
// Subscriber: 3
```
