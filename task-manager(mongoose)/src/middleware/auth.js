const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secretToken");
    const user = await UserModel.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Please authenticate" });
  }
};

module.exports = isAuthenticated;
