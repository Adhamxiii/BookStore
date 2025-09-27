import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Category =
  mongoose.model("Category", CategorySchema) || mongoose.models.Category;
export default Category;
