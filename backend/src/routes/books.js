import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../services/bookServices.js";
import multer from "multer";
import path from "path";
import { auth, cookieAuth } from "../middlewares/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || "";
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", auth("admin"), upload.single("coverImage"), createBook);
router.put("/:id", auth("admin"), upload.single("coverImage"), updateBook);
router.delete("/:id", auth("admin"), deleteBook);

export default router;
