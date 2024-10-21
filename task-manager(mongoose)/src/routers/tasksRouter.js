const express = require("express");
const mongoose = require("mongoose");
const { TaskModel, UserModel } = require("../models");
const isAuthenticated = require("../middleware/auth");

const router = new express.Router();

router.post("/tasks", isAuthenticated, async (req, res) => {
  try {
    const task = new TaskModel({ ...req.body, author: req.user._id });
    const newTask = await task.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/tasks/my-tasks", isAuthenticated, async (req, res) => {
  try {
    await req.user.populate("tasks");
    res.send({ tasks: req.user.tasks });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id/author", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).send({ message: "Task not found!" });
    }

    await task.populate("author");

    res.send(task.author);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    // const tasks = await req.user.
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id);
    if (!task) return res.status(404).send("Task not found!");

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", isAuthenticated, async (req, res) => {
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
    const searchedTask = await TaskModel.findOne({
      _id: "6716590fe83acb4e0d00f8a5",
    });
    console.log({ searchedTask });

    const task = await TaskModel.findOneAndUpdate(
      { _id: id, author: req.user._id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).send({ message: "Task not found!" });
    res.send(task);
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).send(error.message);
  }
});

router.delete("/tasks/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid task ID");
  }

  try {
    const task = await TaskModel.findOneAndDelete({
      _id: id,
      author: req.user._id,
    });
    if (!task) return res.status(404).send({ message: "Task not found!" });
    res.send({ message: "Task deleted successfully!", task });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
