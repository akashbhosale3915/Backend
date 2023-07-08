import { asyncErrorHandler } from "../middlewares/catchAsyncErrors.js";
import { userModel } from "../models/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendJWTToken } from "../utils/sendJWT.js";

export const getAllUsers = asyncErrorHandler(
  async (req, res) => {
    const allUsers = await userModel.find();
    res.status(200).json({
      success: true,
      users: allUsers,
    });
  }
);

export const addNewUser = asyncErrorHandler(
  async (req, res) => {
    const user = await userModel.create(req.body);
    sendJWTToken(user, 201, res);
  }
);

export const deleteUser = asyncErrorHandler(
  async (req, res, next) => {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  }
);

export const updateUser = asyncErrorHandler(
  async (req, res, next) => {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
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
  }
);

export const login = asyncErrorHandler(
  async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return new ErrorHandler(
        "Please enter email and password",
        400
      );
    }

    const user = await userModel
      .findOne({ email })
      .select("+password");

    if (!user) {
      return next(
        new ErrorHandler("Invalid email or password", 401)
      );
    }

    const passwordMatched = await user.comparePassword(
      password
    );

    if (!passwordMatched) {
      return next(
        new ErrorHandler("Invalid email or password", 401)
      );
    }
    sendJWTToken(user, 200, res);
  }
);

export const logout = asyncErrorHandler(
  async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  }
);
