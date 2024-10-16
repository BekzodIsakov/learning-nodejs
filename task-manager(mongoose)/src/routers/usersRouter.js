const express = require("express");
const mongoose = require("mongoose");
const {UserModel} = require("../models");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).send("User not found!");

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/users/:id", async (req, res) => {
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

router.delete("/users/:id", async (req, res) => {
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

module.exports = router;
