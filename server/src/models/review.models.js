import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔗 Optional: connect to product
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false, // make true if product-specific reviews
    },

    // 🔗 Optional: connect to user (if logged in system)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    isApproved: {
      type: Boolean,
      default: true, // or false if you want admin approval
    },
  },
  {
    timestamps: true,
  },
);

export const Review = mongoose.model("Review", reviewSchema);
