const express = require("express");
const mongoose = require("mongoose");
const { TaskModel } = require("../models");

const router = new express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const task = new TaskModel(req.body);
    const newTask = await task.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
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

router.patch("/tasks/:id", async (req, res) => {
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

router.delete("/tasks/:id", async (req, res) => {
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

module.exports = router;
