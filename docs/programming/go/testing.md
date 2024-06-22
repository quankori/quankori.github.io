---
title: Testing
---

## Testing in Golang

Testing is a crucial part of software development, ensuring that code behaves as expected and is free of defects. Golang has built-in support for testing through the `testing` package. Here’s an overview of how testing is done in Go, suitable for an interview setting.

## Key Concepts in Go Testing

1. **Test Files**
2. **Test Functions**
3. **Test Coverage**
4. **Table-Driven Tests**
5. **Benchmark Tests**
6. **Mocking and Stubbing**
7. **Example Tests**
8. **Subtests and Setup/Teardown**

### 1. Test Files

Test files in Go are placed in the same package as the code they test, and their filenames must end with `_test.go`.

**Example**:

- `math.go` (production code)
- `math_test.go` (test code)

### 2. Test Functions

Test functions are defined using the `func TestXxx(t *testing.T)` signature, where `Xxx` is any descriptive name.

**Example**:

```go
// math.go
package math

func Add(a, b int) int {
    return a + b
}
```

```go
// math_test.go
package math

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    expected := 5
    if result != expected {
        t.Errorf("expected %d, got %d", expected, result)
    }
}
```

### 3. Test Coverage

Go provides built-in tools to measure test coverage, which indicates how much of the code is exercised by tests.

**Example**:

```bash
go test -cover
```

For detailed coverage reports:

```bash
go test -coverprofile=coverage.out
go tool cover -html=coverage.out
```

### 4. Table-Driven Tests

Table-driven tests allow testing multiple cases using a single function, improving code organization and reducing redundancy.

**Example**:

```go
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"2 + 3", 2, 3, 5},
        {"0 + 0", 0, 0, 0},
        {"-1 + 1", -1, 1, 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("expected %d, got %d", tt.expected, result)
            }
        })
    }
}
```

### 5. Benchmark Tests

Benchmark tests measure the performance of code and are defined using the `func BenchmarkXxx(b *testing.B)` signature.

**Example**:

```go
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(2, 3)
    }
}
```

Run benchmarks with:

```bash
go test -bench=.
```

### 6. Mocking and Stubbing

Mocking and stubbing are techniques to simulate parts of the system that are impractical to use in tests (e.g., external services).

Use libraries like `gomock` or `testify` for advanced mocking.

**Example using testify**:

```go
import (
    "github.com/stretchr/testify/mock"
    "testing"
)

type MockService struct {
    mock.Mock
}

func (m *MockService) DoSomething() error {
    args := m.Called()
    return args.Error(0)
}

func TestDoSomething(t *testing.T) {
    mockService := new(MockService)
    mockService.On("DoSomething").Return(nil)

    err := mockService.DoSomething()
    if err != nil {
        t.Errorf("expected no error, got %v", err)
    }

    mockService.AssertExpectations(t)
}
```

### 7. Example Tests

Example tests are used for documentation and can be run as tests. They use the `func ExampleXxx()` signature.

**Example**:

```go
func ExampleAdd() {
    fmt.Println(Add(2, 3))
    // Output: 5
}
```

Run example tests with:

```bash
go test
```

### 8. Subtests and Setup/Teardown

Subtests allow structuring tests into hierarchies and sharing setup/teardown logic.

**Example**:

```go
func TestAdd(t *testing.T) {
    setup := func(t *testing.T) func(t *testing.T) {
        t.Log("Setup")
        return func(t *testing.T) {
            t.Log("Teardown")
        }
    }

    t.Run("group", func(t *testing.T) {
        teardown := setup(t)
        defer teardown(t)

        t.Run("2+3", func(t *testing.T) {
            result := Add(2, 3)
            if result != 5 {
                t.Errorf("expected 5, got %d", result)
            }
        })

        t.Run("0+0", func(t *testing.T) {
            result := Add(0, 0)
            if result != 0 {
                t.Errorf("expected 0, got %d", result)
            }
        })
    })
}
```

## Summary

- **Test Files**: Named with `_test.go` suffix.
- **Test Functions**: Use `func TestXxx(t *testing.T)`.
- **Test Coverage**: Measure using `go test -cover`.
- **Table-Driven Tests**: Test multiple cases with one function.
- **Benchmark Tests**: Measure performance using `func BenchmarkXxx(b *testing.B)`.
- **Mocking**: Simulate external services using libraries like `testify`.
- **Example Tests**: Used for documentation, executed as tests.
- **Subtests**: Structure tests into hierarchies with shared setup/teardown logic.
