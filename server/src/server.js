import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(
  cors({
    origin: "https://your-frontend-url.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDb();

// test route
app.get("/home", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to NabuSabu Fashion API",
  });
});

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
