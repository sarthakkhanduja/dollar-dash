require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 20,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
