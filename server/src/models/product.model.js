import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
  sizes: [{ type: String }],
  stock: { type: Number, required: true },
  returnPolicy: { type: String, default: "30-day return policy" },
  ratings: { type: Number, default: 0 },
  colors: [{ type: String }],
  motive: { type: String },
  isActive: { type: Boolean, default: true },
});

export const Product = mongoose.model("Product", userSchema);
