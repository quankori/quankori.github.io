---
title: Go Basic
---
## Fundamentals

```go
func variable() {
	var a string = "Hello, World" // Style 1
	b := "Hello, B"               // Style 2
	b = "New"
	fmt.Println("Variable a: ", a)
	fmt.Println("Variable b: ", b)
}
```

```go
func constant() {
	const (
		a = 5
	)
	var intVar int = a
	var int32Var int32 = a
	var float64Var float64 = a
	var complex64Var complex64 = a + 7i // Số phức
	fmt.Println("Variable int: ", intVar)
	fmt.Println("Variable int32: ", int32Var)
	fmt.Println("Variable float: ", float64Var)
	fmt.Println("Variable complex64: ", complex64Var)
}
```

```go
func function(length, width float64) (float64, float64) {
	var area = length * width
	var perimeter = (length + width) * 2
	return area, perimeter
}
```

## Flow

```go
func condition() {
	fmt.Print("Check variable even or odd")
	if num := 10; num%2 == 0 {
		fmt.Println(num, "is even")
	} else {
		fmt.Println(num, "is odd")
	}
}
```

```go
func loop() {
	fmt.Print("Check variable even or odd")
	if num := 10; num%2 == 0 {
		fmt.Println(num, "is even")
	} else {
		fmt.Println(num, "is odd")
	}
}
```

## Collection

- Sự khác nhau giữa slices và array:
- Array có kích thước cố định (fixed size) và phần tử phải cùng loại dữ liệu, còn `Slices` có kích thước động.
- Array dạng tham trị (value types) khi gán biến mới sẽ tạo một array khác tốn bộ nhớ hơn, còn `Slices` dạng tham trị

```go
func array() {
	fmt.Println("Array: ")
	a := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println("array a is: ", a)
	b := [...]int{2, 3, 5, 7, 11, 13}
	fmt.Println("array a is: ", b)
}
```

```go
func slices() {
	fmt.Println("Slices: ")
	primes := [6]int{2, 3, 5, 7, 11, 13}
	var s []int = primes[1:4]
	fmt.Println("slice primes is: ", s)
	q := []int{2, 3, 5, 7, 11, 13}
	b := q[2:4]
	fmt.Println("slices cut is: ", b)
	// Append can work with nil slice.
	s = append(s, 0) // s = [0]

	// Append add one element to slice.
	s = append(s, 1) // s = [0, 1]

	// Append add multiple elements to slice.
	s = append(s, 2, 3, 4) // s = [0, 1, 2, 3, 4]
	fmt.Println("slices after append: ", s)
}

```

## Errors

```go
func errorException() {
	newNumber := 5
	checkNumber, err := getError(newNumber)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(checkNumber)
}

func getError(number int) (string, error) {
	var message string
	if number < 10 {
		err := errors.New("Error: haha")
		return message, err
	} else {
		message = "Ok"
		return message, nil
	}
}
```

## Variadic

```go
func sum(nums ...int) {
	fmt.Print(nums, " ")
	total := 0
	for _, num := range nums {
		total += num
	}
	fmt.Println("Total in variadic: ", total)
}

// Variadic func
func variadic() {

	sum(1, 2)
	sum(1, 2, 3)

	nums := []int{1, 2, 3, 4}
	sum(nums...)
}
```

## Maps

```go
func maps() {
	var personSalary map[string]int
	if personSalary == nil {
		personSalary = make(map[string]int)
		fmt.Println(personSalary) // Return map[]

		// Add value 1
		personSalary["steve"] = 12000
		personSalary["jamie"] = 15000
		personSalary["mike"] = 9000
		fmt.Println("personSalary map contents:", personSalary)

		// Add value 2
		personSalary := map[string]int{
			"steve": 12000,
			"jamie": 15000,
		}
		fmt.Println("personSalary map contents:", personSalary)

		// Loop
		for key, value := range personSalary {
			fmt.Printf("personSalary[%s] = %d\n", key, value)
		}

		// Length
		fmt.Println("length is", len(personSalary))

		// Remove
		delete(personSalary, "steve")
		fmt.Println("personSalary map contents:", personSalary)

		// Reference
		newPersonSalary := personSalary
		newPersonSalary["jamie"] = 18000
		fmt.Println("Person salary changed", personSalary)
	}
}
```

## Pointer

```go
func pointer() {
	var a = 100
	var p *int
	fmt.Println(p) // Default is null
	p = &a
	fmt.Println("a = ", a)
	fmt.Println("p = ", p)   // Index of pointer a
	fmt.Println("*p = ", *p) // Value of pointer a

	*p = 2000
	fmt.Println("a (after) = ", a) // Change by pointer
}
```

## Structs

```go

// Person Defining a struct type
type Person struct {
	FirstName string
	LastName  string
	Age       int
}

// Structures func
func structures() {
	var p Person // Declare p with struct Person
	p.LastName = "Nguyễn"
	p.FirstName = "Quân"
	fmt.Println("Person :", p)

	p1 := Person{"A", "Nuyễn Quân", 26} // Style 1
	fmt.Println("Person1: ", p1)

	p2 := Person{
		FirstName: "John",
		LastName:  "Snow",
		Age:       45,
	} // Style 2
	fmt.Println("Person2: ", p2)
}
```

## Methods

```go

type rectangle struct {
	length int
	width  int
}

type circleA struct {
	radius float64
}

func (r rectangle) area() int {
	return r.length * r.width
}

func (c circleA) area() float64 {
	return math.Pi * c.radius * c.radius
}

func (c *circleA) changeValue(newValue float64) {
	c.radius = newValue
}

// Methods func
func methods() {
	r := rectangle{
		length: 10,
		width:  5,
	}
	fmt.Printf("Area of rectangle %d\n", r.area())
	c := circleA{
		radius: 12,
	}
	fmt.Printf("Area of circle %f", c.area())
	// Con trỏ
	fmt.Printf("\n\nbefore change: %f", c.radius)
	(&c).changeValue(51)
	fmt.Printf("\nafter change: %f", c.radius)
	fmt.Println()
}
```

## Intrerfaces

```go
type shape interface {
	area() float64
}

type circle struct {
	x, y, r float64
}

func (c *circle) area() float64 {
	return math.Pi * c.r * c.r
}

func totalArea(shapes ...shape) float64 {
	var area float64
	for _, s := range shapes {
		area += s.area()
	}
	return area
}

// Interfaces func
func interfaces() {
	c := circle{0, 0, 5}
	fmt.Println(totalArea(&c))
}
```

## Defer

```go
func defers() {
	defer fmt.Println("World") // Pause print "World"
	fmt.Println("Hello")       // Print text "Hello"

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}
	// Result
	// 9 8 7 6 5 4 3 2 1 0
}
```
