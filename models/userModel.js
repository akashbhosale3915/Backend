import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email address cannot be empty"],
    unique: true,
    validate: [
      validator.isEmail,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
    minLength: [
      8,
      "Password must be at least 8 characters",
    ],
    select: false,
  },
  fname: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lname: {
    type: String,
    required: [true, "Please enter last name"],
  },
  mobile: {
    type: Number,
    required: [true, "Mobile number cannot be empty"],
    minLength: [10, "Please enter a valid Mobile number"],
    maxLength: [10, "Please enter a valid Mobile number"],
  },
  resetPasswordToken: String,
  resetpasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

userSchema.methods.comparePassword = function (
  enteredPassword
) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const userModel = mongoose.model("User", userSchema);
