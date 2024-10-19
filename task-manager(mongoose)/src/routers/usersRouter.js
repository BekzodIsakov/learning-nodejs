const express = require("express");
const mongoose = require("mongoose");
const { UserModel } = require("../models");
const isAuthenticated = require("../middleware/auth");

const router = new express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", isAuthenticated, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).send("User not found!");

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const newUser = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: newUser, token });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ message: "Email already exists!" });
    }

    res.status(400).send(error.message);
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

router.post("/users/logout", isAuthenticated, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logoutAll", isAuthenticated, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
