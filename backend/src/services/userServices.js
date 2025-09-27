import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Name is required",
    });
  }

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Email and password are required",
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    role: "user",
  });

  const token = jwt.sign(
    { email, id: user._id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    status: 201,
    message: "User created successfully",
    data: user,
    token,
    role: "user",
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "User not found",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid password",
    });
  }

  const role = (user.role || "user").trim();
  const token = jwt.sign(
    { email, id: user._id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  const redirectPath = role === "admin" ? "/admin" : "/";

  res.status(200).json({
    success: true,
    status: 200,
    message: "User logged in successfully",
    data: user,
    token,
    role,
    redirect: redirectPath,
  });
};

export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "User verified successfully, Token is valid",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "User not found",
    });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    status: 200,
    message: "User fetched successfully",
    data: user,
  });
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
  res.status(200).json({
    success: true,
    status: 200,
    message: "User logged out successfully",
  });
};
