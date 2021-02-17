# Golang RESTful

- Package

```go
import (
	"github.com/gorilla/mux"
	"net/http"
	"encoding/json"
)
```

- Model

```go
type People struct {
	Name string
}
```

- Router

```go
func router() {
	router := mux.NewRouter()
	router.HandleFunc("/people", get).Methods("GET")
	router.HandleFunc("/people", create).Methods("POST")
	router.HandleFunc("/people/{id}", update).Methods("PUT")
	router.HandleFunc("/people/{id}", remove).Methods("DELETE")
	http.ListenAndServe(":8000", router)
}
```

- GET

```go
func get(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
 	json.NewEncoder(w).Encode(users) // Return
}
```

- POST

```go
func create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var people People
	_ = json.NewDecoder(r.Body).Decode(people)
	people.ID = strconv.Itoa(rand.Intn(1000000))
	users = append(users, people) // Create add to array
	json.NewEncoder(w).Encode(&people) // Return
}
```

- PUT

```go
func create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range users {
		if item.ID == params["id"] {
		users = append(users[:index], users[index+1:]...)
		var people People
		_ = json.NewDecoder(r.Body).Decode(people)
		people.ID = params["id"]
		users = append(users, people)
		json.NewEncoder(w).Encode(&people)
		return
		}
	}
	json.NewEncoder(w).Encode(users)
}
```

- DELETE

```go
func remove(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range users {
		if item.ID == params["id"] {
			users = append(users[:index], users[index+1]...)
			break
		}
	}
	json.NewEncoder(w).Encode(users)
}
```
