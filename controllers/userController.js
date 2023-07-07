import { userModel } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const allUsers = await userModel.find();
  res.status(200).json({
    success: true,
    users: allUsers,
  });
};

export const addNewUser = async (req, res) => {
  const user = await userModel.create(req.body);
  res.status(201).json({
    success: true,
    user,
  });
};

export const deleteUser = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
};

export const updateUser = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  user = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    user,
  });
};
