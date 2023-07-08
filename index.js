import express from "express";
import users from "./routes/userRoute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware } from "./middlewares/error.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/", users);

app.use(errorHandlerMiddleware);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection established to database");
  })
  .catch(() => {
    console.error("Could not connect to database");
    process.exit();
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`server listening on ${port}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Closing server due to unhandled rejection");
  server.close(() => process.exit(1));
});
