import express from "express";
import { createCategory, getCategories } from "../services/categoryServices.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);

export default router;
