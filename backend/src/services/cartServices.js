import Book from "../models/BookSchema.js";
import Cart from "../models/CartSchema.js";
import mongoose from "mongoose";

const recomputeTotals = (cart) => {
  const { items } = cart;
  let totalPrice = 0;
  let totalItems = 0;
  for (const it of items) {
    totalPrice += (it.price || 0) * (it.quantity || 0);
    totalItems += it.quantity || 0;
  }
  cart.totalPrice = totalPrice;
  cart.totalItems = totalItems;
};

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.book",
      "-__v"
    );
    if (!cart) {
      cart = await Cart.create({ user: req.user.id });
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Cart created successfully",
        data: cart,
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Cart fetching failed",
      error: error.message,
    });
  }
};

export const createCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid bookId",
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found",
      });
    }
    if ((book.stock ?? 0) <= 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Book is out of stock",
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id });
      await cart.save();
    }

    const toId = (b) => (b && b._id ? String(b._id) : String(b));
    const itemIndex = cart.items.findIndex(
      (item) => toId(item.book) === String(bookId)
    );
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ book: bookId, quantity: 1, price: book.price });
    }

    recomputeTotals(cart);
    book.stock -= 1;
    await book.save();

    await cart.save();

    // return populated cart for consistent client shape
    const populated = await Cart.findById(cart._id).populate(
      "items.book",
      "title price coverImage stock"
    );
    res.status(201).json({
      success: true,
      status: 201,
      message: "Cart created successfully",
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Cart creation failed",
      error: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const bookId = req.params.id || req.body.bookId;
    const { quantity } = req.body;
    if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid bookId",
      });
    }

    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.book",
      "title price category coverImage stock"
    );
    if (!cart) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Cart not found",
      });
    }
    const toId = (b) => (b && b._id ? String(b._id) : String(b));
    const item = cart.items.find((item) => toId(item.book) === String(bookId));
    if (!item) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Item not found",
      });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found",
      });
    }
    const nextQty = Number(quantity);
    if (!Number.isFinite(nextQty) || nextQty < 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid quantity",
      });
    }

    const diff = nextQty - item.quantity;
    if (diff > 0) {
      if (book.stock < diff) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Book stock is not enough",
        });
      }
      book.stock -= diff;
    } else if (diff < 0) {
      book.stock += Math.abs(diff);
    }
    await book.save();

    if (nextQty === 0) {
      // remove item entirely
      const toId = (b) => (b && b._id ? String(b._id) : String(b));
      cart.items = cart.items.filter((it) => toId(it.book) !== String(bookId));
    } else {
      // update quantity and ensure price reflects current book price
      item.quantity = nextQty;
      item.price = book.price;
    }

    recomputeTotals(cart);
    await cart.save();
    const populated = await Cart.findById(cart._id).populate(
      "items.book",
      "title price coverImage stock"
    );
    res.status(200).json({
      success: true,
      status: 200,
      message: "Cart updated successfully",
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Cart updating failed",
      error: error.message,
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const bookId = req.params.id || req.body.bookId;
    if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid bookId",
      });
    }
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.book",
      "title price category coverImage stock"
    );
    if (!cart) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Cart not found",
      });
    }
    const toId = (b) => (b && b._id ? String(b._id) : String(b));
    const itemIndex = cart.items.findIndex(
      (item) => toId(item.book) === String(bookId)
    );
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Item not found",
      });
    }
    const item = cart.items[itemIndex];
    const book = await Book.findById(bookId);
    if (book) {
      book.stock += item.quantity;
      await book.save();
    }
    cart.items.splice(itemIndex, 1);
    recomputeTotals(cart);
    await cart.save();
    const populated = await Cart.findById(cart._id).populate(
      "items.book",
      "title price coverImage stock"
    );
    res.status(200).json({
      success: true,
      status: 200,
      message: "Cart deleted successfully",
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Cart deleting failed",
      error: error.message,
    });
  }
};
