import express from "express";
import {
  getAllUsers,
  addNewUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/users/new").post(addNewUser);
router
  .route("/users/:id")
  .delete(deleteUser)
  .put(updateUser);

export default router;
