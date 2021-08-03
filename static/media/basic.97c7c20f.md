# Golang Basic

- Variable

```go
func Variable() {
    var a string = "Hello, World" // Style 1
    b := "Hello, B"               // Style 2
    b = "New"
    fmt.Println(a)
    fmt.Println(b)
}
```

- Constant

```go
func Constant() {
    const (
        a = 5
    )
    var intVar int = a
    var int32Var int32 = a
    var float64Var float64 = a
    var complex64Var complex64 = a
    fmt.Println(intVar)
    fmt.Println(int32Var)
    fmt.Println(float64Var)
    fmt.Println(complex64Var)
}
```

- Function

```go
// Pass to float64 response function 2 float64
func rectProps(length, width float64) (float64, float64) {
	var area = length * width
	var perimeter = (length + width) * 2
	return area, perimeter
}

func Function() {
	area, _ := rectProps(10.8, 5.6)
	fmt.Printf("Area %f ", area)
}
```

- Condition

```go
func Condition() {
	if num := 10; num%2 == 0 {
		fmt.Println(num, "is even")
	} else {
		fmt.Println(num, "is odd")
	}
}
```

- Loop

```go
func Loop() {
	array := [3]int{12, 78, 50}
	for i := 1; i <= 10; i++ {
		fmt.Printf(" %d", i)
	}

	for i, s := range array {
		fmt.Println(i, s)
	}
}
```

- Switch

```go
func Switch() {
	switch time.Now().Weekday() {
	case time.Saturday:
		fmt.Println("Today is Saturday.")
	case time.Sunday:
		fmt.Println("Today is Sunday.")
	default:
		fmt.Println("Today is a weekday.")
	}
}
```

- Array

```go
func Array() {
	var a [3]int //int array with length 3
	fmt.Println(a)
	a[0] = 12 // array index starts at 0
	a[1] = 78
	a[2] = 50
	b := [3]int{12, 78, 50}
	c := [3]int{12}           // 12 0 0
	d := [...]int{12, 78, 50} // Infinity
	fmt.Println(b)
	fmt.Println(c)
	fmt.Println(d)
}
```

- Slices

```go
func Slices() {
	a := [5]int{76, 77, 78, 79, 80}
	var b []int = a[1:4] //creates a slice from a[1] to a[3]
	fmt.Println(b)

	c := []int{6, 7, 8} //creates and array and returns a slice reference
	fmt.Println(c)

	i := make([]int, 5, 5)
	fmt.Println(i) // 0 0 0 0 0

	// Length and cap
	s := []int{2, 3, 5, 7, 11, 13}
	s = s[0:0] // s = [], len(s) = 0, cap(s) = 6
	s = s[0:4] // s = [2, 3, 5, 7], len(s) = 4, cap(s) = 6
	s = s[2:4] // s = [5, 7], len(s) = 2, cap(s) = 4, cap start 2
	s = s[2:]  // s = [5, 7, 11, 13], len(s) = 4, cap(s) = 4

	// Append slices
	// Append can work with nil slice.
	s = append(s, 0) // s = [0]

	// Append add one element to slice.
	s = append(s, 1) // s = [0, 1]

	// Append add multiple elements to slice.
	s = append(s, 2, 3, 4) // s = [0, 1, 2, 3, 4]
}
```

- Error

```go
func getError(number int) (string, error) {
	var message string
	if number < 10 {
		err := errors.New("Error haha")
		return message, err
	} else {
		message = "Ok"
		return message, nil
	}
}

// Error func
func Error() {
	newNumber := 5
	checkNumber, err := getError(newNumber)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(checkNumber)
}
```

- Variadic

```go
func sum(nums ...int) {
	fmt.Print(nums, " ")
	total := 0
	for _, num := range nums {
		total += num
	}
	fmt.Println(total)
}

// Variadic func
func Variadic() {

	sum(1, 2)
	sum(1, 2, 3)

	nums := []int{1, 2, 3, 4}
	sum(nums...)
}
```

- Maps

```go
// Maps func
func Maps() {
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

- Pointer

```go
func Pointer() {
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

- Structs

```go
// Person Defining a struct type
type Person struct {
	FirstName string
	LastName  string
	Age       int
}

// Structures func
func Structures() {
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

- Methods

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
func Methods() {
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
}
```

- Interfaces

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
func Interfaces() {
	c := circle{0, 0, 5}
	fmt.Println(totalArea(&c))
}
```

- Defer

```go
func Defer() {
	defer fmt.Println("World") // Pause print "World"
	fmt.Println("Hello")       // Print text "Hello"

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}
	// Result
	// 9 8 7 6 5 4 3 2 1 0
}
```
