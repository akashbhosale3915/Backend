import { ErrorHandler } from "../utils/errorHandler.js";

export const errorHandlerMiddleware = (
  err,
  re,
  res,
  next
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid path ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
