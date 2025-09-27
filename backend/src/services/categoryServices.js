import Category from "../models/CategorySchema.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Name is required",
      });
    }
    const category = await Category.create({ name });
    res.status(201).json({
      success: true,
      status: 201,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Category creation failed",
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      status: 200,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Categories fetching failed",
      error: error.message,
    });
  }
};
