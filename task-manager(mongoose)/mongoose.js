const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager");

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

const task = new Task({ title: "Learn Mongoose", completed: false });
task.save().then((d) => console.log(d, "task saved"));
