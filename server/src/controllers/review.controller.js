import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.models.js";

// 🔥 Helper: update product rating
const updateProductRating = async (productId) => {
  if (!productId) return;

  const reviews = await Review.find({ product: productId });

  const avgRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(productId, {
    ratings: avgRating,
  });
};

// ✅ CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    const { name, rating, comment, productId } = req.body;

    // 🔒 Validation
    if (!name || !rating || !comment) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Optional: check product valid
    if (productId && !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const review = await Review.create({
      name,
      rating,
      comment,
      product: productId || null,
      user: req.user?._id || null,
    });

    // 🔥 Update product rating
    await updateProductRating(productId);

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating review",
      error: error.message,
    });
  }
};

// ✅ GET ALL REVIEWS (optional product filter)
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.query;

    let filter = {};

    if (productId) {
      filter.product = productId;
    }

    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// ✅ UPDATE REVIEW
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, comment } = req.body;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // 🔒 Optional auth check (owner or admin)
    if (
      review.user &&
      req.user &&
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to update this review",
      });
    }

    // Update fields
    review.name = name || review.name;
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    // 🔥 Update product rating again
    await updateProductRating(review.product);

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating review",
      error: error.message,
    });
  }
};

// ✅ DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // 🔒 Optional auth check
    if (
      review.user &&
      req.user &&
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this review",
      });
    }

    const productId = review.product;

    await review.deleteOne();

    // 🔥 Update product rating after delete
    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting review",
      error: error.message,
    });
  }
};
