const mongoose = require("mongoose");
const { trim } = require("validator");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager");

// create schema(blueprint)
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// initialize new collection
const Task = mongoose.model("Task", taskSchema);

// create new document
// const task = new Task({ description: "Learn Mongoose", completed: false });
// task.save().then((result) => console.log(result, "task saved"));

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate() {
      if (value < 0) {
        throw new Error("Age must be a positive number!");
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid!")
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password must not contain word 'password'!")
      }
    } 
  }
})

const User = mongoose.model("User", userSchema);
