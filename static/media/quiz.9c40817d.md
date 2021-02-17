# Golang Quiz

- What is Golang?

Go is an opened programming language, which helps us easily in developing simple, reliable and efficient applications.
Applications are builed from packages that have attributes allows managing dependencies effectively.

- Workspace in Golang?

A workspace is a hierarchical folder system with three roots folders.

1. `src` which contains root GO files is organized to packges.
2. `pkg` contains package objects.
3. `bin` contains executed commands.

- How you can do testing in Golang?

There is a framework to do testing. it includes Go test and testing packages.

To write a test, you need to create a file that has name ended by \_testing. It contains functions named TESTXXX with function signature ( t \* tests. T) . Framework testing run one by one feature.

- What are the advantages of Golang?

1. Go compiles very fast.
2. Go supports concurrency in level language.
3. Functions are first objects in Go.
4. Go has garbage collection
5. String maps are integrated."

- How arrays in GO works differently then C?

1. Array are value, which are assigned
2. If array is transfered to function, It will received the clone of array, not a pointer.
3. The size of an array is a part of its type. Type [10] int and [20] are different.
