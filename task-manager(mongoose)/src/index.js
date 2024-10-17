const express = require("express");
const mongoose = require("mongoose");
require("./mongoose.js");

const { UserModel, TaskModel } = require("./modals");

const port = process.env.PORT || 8080;
app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.send(500).send();
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).send("User not found!");

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid user ID");
  }

  const allowedUpdates = ["name", "age", "email", "password"];
  const updatingFields = Object.keys(req.body);
  let invalidField;

  const hasInvalidField = updatingFields.some((field) => {
    if (!allowedUpdates.includes(field)) {
      invalidField = field;
      return true;
    }
  });

  if (hasInvalidField) {
    return res
      .status(400)
      .send(`Updating "${invalidField}" field is not allowed!`);
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true, // return the modified document rather than the original
        runValidators: true,
      }
    );

    if (!user) return res.status(404).send("User not found!");

    res.send(user);
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).send(error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid user ID");
  }

  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) return res.status(404).send("User not found!");
    res.send({ message: "User deleted successfully!", user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new TaskModel(req.body);
    const newTask = await task.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id);
    if (!task) return res.status(404).send("Task not found!");

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid task ID");
  }

  const allowedUpdates = ["description", "completed"];
  const updatingFields = Object.keys({ ...req.body });

  let invalidField;

  const hasInvalidField = updatingFields.some((field) => {
    if (!allowedUpdates.includes(field)) {
      invalidField = field;
      return true;
    }
  });

  if (hasInvalidField) {
    return res
      .status(400)
      .send(`Updating "${invalidField}" field is not allowed!`);
  }

  try {
    const task = await TaskModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).send("Task not found!");
    res.send(task);
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).send(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid task ID");
  }

  try {
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) return res.status(404).send("Task not found!");
    res.send({ message: "Task deleted successfully!", task });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log("Server is live on port " + port);
});
