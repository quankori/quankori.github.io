---
title: Golang Module Cheatsheet
---

- Create go module

```go
go mod init module_name
```

- Add package

```go
go get module_name
```

- Update version

```go
go get -u
go get -u module_name
```

- Update version and remove old package not use **(requirements)**

```go
go mod tidy
```

- Build module package

```go
go build
```
