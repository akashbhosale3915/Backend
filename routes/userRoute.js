import express from "express";
import {
  getAllUsers,
  addNewUser,
  deleteUser,
  updateUser,
  login,
  logout,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/logout").get(logout);
router.route("/users/new").post(addNewUser);
router
  .route("/users/:id")
  .delete(deleteUser)
  .put(updateUser);

export default router;
