import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/books.js";
import cartRoutes from "./routes/carts.js";
import categoryRoutes from "./routes/category.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/images", express.static("images"));
app.use("/api/carts", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
