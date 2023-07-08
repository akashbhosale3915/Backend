import { userModel } from "../models/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncErrorHandler } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncErrorHandler(
  async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorHandler("Please login to continue", 401)
      );
    }
    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = await userModel.findById(decodedData.id);
    next();
  }
);
