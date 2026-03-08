import express from "express";
import {
  getAllUsers,
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(protect, getUserProfile);
router.route("/all-users").get(protect, getAllUsers);

export default router;
