const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secretToken");

  user.tokens.push({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

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

userSchema.pre("save", function (next) {
  const user = this;

  // if passport is hashed everytime "save" method is invoked, then if user logs in from laptop 
  // and then later logs in from his tablet, the hashed password created during the first login/register
  // will be hashed again which will fail subsequent logins.
  if (user.isModified("password")) {
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    user.password = hashedPassword;
  }

  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  // const query = this.getQuery();

  if (update.password) {
    const hashedPassword = bcrypt.hashSync(update.password, 8);
    update.password = hashedPassword;
  }

  // console.log(`User with id ${query._id} is going to be updated`);
  next();
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
