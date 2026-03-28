import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    // console.log("headers cookie:", req.headers.cookie);
    // console.log("parsed cookies:", req.cookies);
    // console.log("token from cookie:", token);

    // Support Authorization header (Bearer token) as a fallback for cross-origin requests
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!token && authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token and get user ID

    // 🔥 Fetch full user from DB
    const user = await User.findById(decoded.userId).select("-password");
    // console.log("user from auth middleware:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ attach full user
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};
