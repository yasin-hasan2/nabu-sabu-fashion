import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Here you would typically check if the user already exists and hash the password
    // For demonstration, we'll just return a success response
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  // Login logic to be implemented
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid User" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    // Generate token and return user data (without the password hash)
    const safeUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    generateToken(res, user._id, safeUser, "Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
  // Logout logic to be implemented
  try {
    res
      .clearCookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        expires: new Date(0),
        secure: true, // set to true in production (requires HTTPS)
        sameSite: "none", // allow cross-site cookies (required for secure cookies)
      })
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("-password");
    res.status(200).json({ success: true, users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // req.user is already fetched by the protect middleware
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
