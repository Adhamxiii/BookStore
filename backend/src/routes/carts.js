import express from "express";
import {
  createCart,
  getCart,
  updateCart,
  deleteCart,
} from "../services/cartServices.js";
import { cookieAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/",cookieAuth, createCart);
router.get("/", cookieAuth, getCart);
router.put("/:id",cookieAuth, updateCart);
router.delete("/:id",cookieAuth, deleteCart);

export default router;