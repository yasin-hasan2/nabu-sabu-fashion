import express from "express";
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/add-review").post(createReview); // or protect
router.route("/get-reviews").get(getReviews);
// router.route("/get-reviews/:productId").get(getReviews); // for product-specific reviews
router.route("/update-review/:id").put(protect, updateReview);
router.route("/delete-review/:id").delete(protect, deleteReview);

export default router;
