import express from "express";
import users from "./routes/userRoute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/", users);

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

app.listen(port, () =>
  console.log(`server listening on ${port}`)
);
