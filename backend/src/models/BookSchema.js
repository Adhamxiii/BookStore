import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  discountPercent: {
    type: String,
    default: "0",
  },
  coverImage: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Book = mongoose.model("Book", BookSchema) || mongoose.models.Book;
export default Book;
