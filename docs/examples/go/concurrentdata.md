---
title: Concurrent data processing
---

Example with Golang

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	// Create a channel for sending data
	dataChan := make(chan int)

	// Start the goroutine for processing data
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		for data := range dataChan {
			// Process the data
			fmt.Println("Processing data:", data)
		}
		wg.Done()
	}()

	// Send data to the channel
	for i := 0; i < 10; i++ {
		dataChan <- i
	}
	close(dataChan)

	// Wait for the goroutine to finish
	wg.Wait()
}`
```
