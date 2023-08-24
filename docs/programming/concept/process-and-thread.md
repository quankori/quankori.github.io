---
title: Process and Thread
---

## Process

- A process is an independent unit of a running program with its own memory space.
- Each process has one or more threads.
- Processes are often less interconnected. Communication between processes typically requires IPC (Inter-process communication) methods such as pipes, sockets, etc.
- Initializing a new process is generally more resource-intensive and time-consuming than initializing a new thread.

## Thread

- A thread, also called a lightweight process, is the smallest unit of execution within a process.
- All threads within the same process share the memory space of that process. This means threads can access and modify shared variables and data structures.
- Each thread has its own stack, but they share the heap (dynamic memory) and global data.

## When a request is sent to a server

Depending on the server's configuration and architecture, a request can be handled by a specific process or thread. Below is a simple example of how a server operates based on multi-process and multi-thread architectures:

### Multi-Process Architecture:

- For each new request, the server may spawn a new process to handle that request. The Apache HTTP Server, when running in prefork mode (a popular mode), operates this way.

### Multi-Thread Architecture:

- For a new request, rather than spawning a new process, the server just spawns a new thread (or uses an existing one from a thread pool) within the same process to handle the request. Microsoft's IIS operates this way.

Modern servers like Node.js utilize an event-driven model and event loop to handle multiple requests without the need for multiple threads or processes.

Depending on the architecture and technology in use, request handling will rely on one or several processes and threads. Each architecture has its pros and cons, and the choice between them often depends on the specific requirements and context of the system.
