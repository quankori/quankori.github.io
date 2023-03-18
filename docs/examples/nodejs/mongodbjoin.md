---
title: Relationship Query Mongodb
---

Example about relationship one to many in mongodb with Node.js

```js
const mongoose = require("mongoose");

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: String,
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

// Define the class schema
const classSchema = new mongoose.Schema({
  name: String,
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

// Create the models
const Student = mongoose.model("Student", studentSchema);
const Class = mongoose.model("Class", classSchema);

// Create a new class
const mathClass = new Class({ name: "Math 101" });

// Create a new student and associate it with the class
const john = new Student({ name: "John", class: mathClass });

// Save the class and student to the database
mathClass
  .save()
  .then(() => john.save())
  .then(() => console.log("Student and class saved to the database"))
  .catch((error) => console.log(error));

Student.findOne({ name: "John" })
  .populate("class")
  .exec(function (err, student) {
    if (err) return handleError(err);
    console.log("The class is %s", student.class.name);
  });

Class.findOne({ name: "Math 101" })
  .populate("students")
  .exec(function (err, mathClass) {
    if (err) return handleError(err);
    console.log("The students in the class are:");
    mathClass.students.forEach((student) => {
      console.log(student.name);
    });
  });

// Aggregate
Class.aggregate([
  {
    $match: { name: "Math 101" },
  },
  {
    $lookup: {
      from: "students",
      localField: "_id",
      foreignField: "class",
      as: "students",
    },
  },
]).then((mathClass) => {
  console.log("The students in the class are:");
  mathClass[0].students.forEach((student) => {
    console.log(student.name);
  });
});
```
