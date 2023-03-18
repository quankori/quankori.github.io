---
title: Distributed Cache system with Golang
---

Build Distributed cache system with Go

```go
package main

import (
	"fmt"
	"sync"
)

type cache struct {
	data map[string]interface{}
	mu   sync.RWMutex
}

func (c *cache) Set(key string, value interface{}) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.data[key] = value
}

func (c *cache) Get(key string) (interface{}, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	value, ok := c.data[key]
	return value, ok
}

func main() {
	// Create a cache
	c := cache{data: make(map[string]interface{})}

	// Set a value in the cache
	c.Set("key1", "value1")

	// Get a value from the cache
	value, ok := c.Get("key1")
	if ok {
		fmt.Println("Value:", value)
	} else {
		fmt.Println("Key not found")
	}
}
```
