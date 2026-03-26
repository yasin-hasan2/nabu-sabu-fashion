import { Product } from "../models/product.model.js";
import { uploadImage } from "../utils/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      title,
      description,
      price,
      sizes,
      stock,
      returnPolicy,
      ratings,
      sellingCount,
      colors,
      motive,
    } = req.body;

    if (!name || !category || !title || !description || !price || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadImage(file.path);
        console.log("Cloudinary Result:", result);
        imageUrls.push(result.secure_url);
        console.log("Uploaded Image URL:", result.secure_url);
      }
    }

    const newProduct = new Product({
      name,
      category,
      title,
      description,
      price,
      sizes,
      stock,
      returnPolicy,
      ratings,
      sellingCount,
      colors,
      motive,
      productImages: imageUrls,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};

export const editProduct = async (req, res) => {
  // Placeholder for editing a product
  try {
    const { id } = req.params;
    const {
      name,
      category,
      title,
      description,
      price,
      sizes,
      stock,
      returnPolicy,
      ratings,
      sellingCount,
      colors,
      motive,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      product.name = name || product.name;
      product.category = category || product.category;
      product.title = title || product.title;
      product.description = description || product.description;
      product.price = price || product.price;
      product.sizes = sizes || product.sizes;
      product.stock = stock || product.stock;
      product.returnPolicy = returnPolicy || product.returnPolicy;
      product.ratings = ratings || product.ratings;
      product.sellingCount = sellingCount || product.sellingCount;
      product.colors = colors || product.colors;
      product.motive = motive || product.motive;
    }
    if (req.files && req.files.length > 0) {
      const imageUrls = [];
      for (const file of req.files) {
        const result = await uploadImage(file.path);
        imageUrls.push(result.secure_url);
      }
      product.productImages = imageUrls;
    }
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error editing product",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  // Placeholder for fetching a single product by ID
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user; // Get user info from auth middleware
    console.log("User from auth middleware:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Check admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete product",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};
