const mongoose = require("mongoose");

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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// initialize new collection
const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
