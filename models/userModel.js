import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  fname: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lname: {
    type: String,
    required: [true, "Please enter last name"],
  },
});

export const userModel = mongoose.model("User", userSchema);
