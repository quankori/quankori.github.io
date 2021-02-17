# Golang MongoDB

- Connect Database

```go
import (
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

// Connect func
func Connect(uri, database string) {
	clientOptions := options.Client().ApplyURI(uri)
	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	// Ping right after connected
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	cli = client
	db = client.Database(database)
}

// GetDB func
func GetDB() *mongo.Database {
	return db
}

// Disconnect func
func Disconnect() {
	// Disconnect from MongoDB
	err := cli.Disconnect(context.TODO())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connection to MongoDB closed!")
}
```

- Find

```go
collection := mongodb.GetDB().Collection("users")
var data []UserSchema

result, _ := collection.Find(context.TODO(), bson.M{"status": true})
err := result.All(context.TODO(), &data)
if err != nil {
    return data, echo.NewHTTPError(http.StatusBadRequest)
}
return data, nil
```

- Insert Many

```go
collection := mongodb.GetDB().Collection("users")
var dataInsertMany []interface{}
for _, user := range users {
    dataInsertMany = append(dataInsertMany, mission)
}
_, err := collection.InsertMany(context.TODO(), dataInsertMany)
if err != nil {
    return echo.NewHTTPError(http.StatusBadRequest, err.Error())
}
return nil
```

- Insert One

```go
collection := mongodb.GetDB().Collection("users")
user.CreatedDate = time.Now()
result, err := collection.InsertOne(context.TODO(), user)
if err != nil {
    return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
}
return result.InsertedID, nil
```

- Update

```go
collection := mongodb.GetDB().Collection("users")
	filter := bson.M{"_id": poaylaod.ID}
	update := bson.M{"$set": bson.M{
		"first_name":       payload.FirstName,
		"updated_date":     time.Now(),
	}}
	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
```

- Remove

```go
collection := mongodb.GetDB().Collection("users")
var user userSchema
_, err := collection.DeleteOne(context.TODO(), bson.M{"username": username})
if err != nil {
    return user, echo.NewHTTPError(http.StatusNotFound, err.Error())
}
return user, nil
```

- Aggregate

```go
collection := mongodb.GetDB().Collection("users")
var data []userSchema
const (
    layout = "02/01/2006"
)
now := time.Now()

t1 := time.Date(year, time.Month(month), 1, 0, 0, 0, 0, now.Location())
t2 := time.Date(year, time.Month(month)+1, 1, 0, 0, 0, -1, now.Location())
matchStage := bson.D{
    {"$match", bson.M{
        "created_date": bson.M{
            "$gte": t1,
            "$lte": t2,
        },
    }},
}

result, err := collection.Aggregate(context.TODO(), mongo.Pipeline{
    matchStage, groupStage,
})
if err != nil {
    return data
}
err = result.All(context.TODO(), &data)
if err != nil {
    return data
}
return data
```

- String to ObjectID

```go
objectID, err := primitive.ObjectIDFromHex(stringID)
if err != nil {
    return echo.NewHTTPError(http.StatusBadRequest, err.Error())
}
```
