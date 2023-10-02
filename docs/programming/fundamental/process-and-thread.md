---
title: Process and Thread
---



## Process

A process can be understood simply as a program running on a computer. When we open a web browser to read an Advanced Go book, for example, this is considered a process. When we write a computer program using programming languages like C, Java, or Go, after compiling and running the program, the operating system assigns a certain amount of memory space, a PID (process ID), and so on to the program. Each process has at least one main thread to execute the program, which acts as the backbone of the program. When this main thread stops working, it corresponds to the program being closed.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/2.png)

## Thread

A thread, also known as a sub-process, is a thread within a running process. Threads run in parallel within each process and can access memory areas provided by the process and operating system resources.

Threads within a process are allocated separate stack memory to store their own variables. A fixed amount of stack memory, typically around 1MB-2MB, is allocated for each thread. In addition, threads share the heap memory space of the process. When a process creates too many threads, it can lead to a stack overflow condition. When threads share memory space, it can easily lead to a race condition. In the following sections, we will explore how Golang handles this to avoid race condition errors.

In the previous sections, we discussed concurrent and parallel processing models, where tasks are performed by different threads. Therefore, concurrency here means handling tasks concurrently or in parallel, which implies that multiple threads are running concurrently or in parallel (multi-threading). The number of threads running simultaneously at any given time will be equal to the number of CPU cores our computer has. Therefore, when programming, creating too many threads does not necessarily make our program run faster; it can actually lead to errors and slow down the program. Based on programming experience, we should only create a number of threads equal to the number of CPU cores multiplied by 2.