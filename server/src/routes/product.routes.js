import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";
import upload from "../utils/multer.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
// Placeholder for product routes

router
  .route("/add-product")
  .post(protect, upload.array("productImages", 4), addProduct);
router.route("/get-products").get(getAllProducts);
router.route("/get-product/:id").get(getProductById);
router
  .route("/edit-product/:id")
  .put(protect, upload.array("productImages", 4), editProduct);
router.route("/delete-product/:id").delete(protect, deleteProduct);

export default router;
