import Book from "../models/BookSchema.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("category", "name");
    if (!books) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No books found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Books fetching failed",
      error: error.message,
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate("category", "name");
    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Book fetching failed",
      error: error.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      price,
      stock,
      isFeatured,
      coverImage,
      discountPercent,
      isOnSale,
      category,
    } = req.body;

    const toNumber = (value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string" && value.trim() !== "") return Number(value);
      return NaN;
    };
    const toBoolean = (value) => {
      if (typeof value === "boolean") return value;
      if (typeof value === "string") {
        const v = value.toLowerCase();
        return v === "true" || v === "1" || v === "yes" || v === "on";
      }
      return false;
    };

    const normalizedPrice = toNumber(price);
    const normalizedStock = Number.isNaN(toNumber(stock)) ? 0 : toNumber(stock);
    const normalizedDiscount = Number.isNaN(toNumber(discountPercent))
      ? 0
      : toNumber(discountPercent);
    const normalizedIsFeatured = toBoolean(isFeatured);
    const normalizedIsOnSale = toBoolean(isOnSale);

    if (!title || !author || !description || Number.isNaN(normalizedPrice) || Number.isNaN(toNumber(stock)) || !category) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Missing required fields: title, author, description, price, stock, category",
      });
    }

    const uploadedFilename = req.file?.filename;
    const finalCoverImage = uploadedFilename || coverImage;
    if (!finalCoverImage) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Cover image is required (file upload or URL)",
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      price: normalizedPrice,
      stock: normalizedStock,
      isFeatured: normalizedIsFeatured,
      coverImage: finalCoverImage,
      discountPercent: normalizedDiscount,
      isOnSale: normalizedIsOnSale,
      category,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Book creation failed",
      error: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      description,
      price,
      stock,
      isFeatured,
      coverImage,
      discountPercent,
      isOnSale,
      category,
    } = req.body;

    const toNumber = (value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string" && value.trim() !== "") return Number(value);
      return NaN;
    };
    const toBoolean = (value) => {
      if (typeof value === "boolean") return value;
      if (typeof value === "string") {
        const v = value.toLowerCase();
        return v === "true" || v === "1" || v === "yes" || v === "on";
      }
      return false;
    };

    const normalizedPrice = toNumber(price);
    const normalizedStock = Number.isNaN(toNumber(stock)) ? 0 : toNumber(stock);
    const normalizedDiscount = Number.isNaN(toNumber(discountPercent))
      ? 0
      : toNumber(discountPercent);
    const normalizedIsFeatured = toBoolean(isFeatured);
    const normalizedIsOnSale = toBoolean(isOnSale);

    if (!title || !author || !description || Number.isNaN(normalizedPrice) || Number.isNaN(toNumber(stock)) || !category) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Missing required fields: title, author, description, price, stock, category",
      });
    }

    const uploadedFilename = req.file?.filename;
    const finalCoverImage = uploadedFilename || coverImage;
    if (!finalCoverImage) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Cover image is required (file upload or URL)",
      });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        description,
        price: normalizedPrice,
        stock: normalizedStock,
        isFeatured: normalizedIsFeatured,
        coverImage: finalCoverImage,
        discountPercent: normalizedDiscount,
        isOnSale: normalizedIsOnSale,
        category,
      },
      { new: true }
    ).populate("category", "name");
    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Book updating failed",
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Book deleting failed",
      error: error.message,
    });
  }
};
