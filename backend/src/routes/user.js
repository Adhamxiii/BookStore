import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  verifyUser,
  logoutUser,
} from "../services/userServices.js";
import { cookieAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", cookieAuth, verifyUser);
router.post("/logout", logoutUser);
router.get("/:id", getUser);

export default router;
