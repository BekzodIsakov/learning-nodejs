const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number!");
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password must not contain word 'password'!");
      }
    },
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (user.password) {
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    user.password = hashedPassword;
  }
  console.log(user);
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  const query = this.getQuery();

  console.log({ update, query });

  if (update.password) {
    const hashedPassword = bcrypt.hashSync(update.password, 8);
    update.password = hashedPassword;
  }

  console.log(`User with id ${query._id} is going to be updated`);
  next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User with current email not found!");
  }

  console.log({ email, password });

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect password!");
  }

  return user;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
