import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/shared/Loading";
import API from "../utils/api";

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    title: "",
    description: "",
    price: "",
    sizes: [],
    stock: "",
    returnPolicy: "",
    ratings: "",
    sellingCount: "",
    colors: "",
    motive: "",
    isActive: true,
  });

  console.log("Current product data:", productData);

  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const availableSizes = ["XS", "S", "M", "L", "XL"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "sizes") {
      if (checked) {
        setProductData({
          ...productData,
          sizes: [...productData.sizes, value],
        });
      } else {
        setProductData({
          ...productData,
          sizes: productData.sizes.filter((size) => size !== value),
        });
      }
    } else if (type === "checkbox") {
      setProductData({
        ...productData,
        [name]: checked,
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);

    if (!newFiles.length) return;

    // Check total images (existing + new)
    const totalImages = imageFiles.length + newFiles.length;
    if (totalImages > 4) {
      alert(
        `You already have ${imageFiles.length} image(s). You can only upload a maximum of 4 images total.`,
      );
      e.target.value = ""; // Reset input
      return;
    }

    // Validate: Only images
    const validImages = newFiles.every((file) =>
      file.type.startsWith("image/"),
    );
    if (!validImages) {
      alert("Please select only image files");
      e.target.value = ""; // Reset input
      return;
    }

    // Add new files to existing ones
    const combinedFiles = [...imageFiles, ...newFiles];
    setImageFiles(combinedFiles);

    // Create previews for new images
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviewUrls]);

    // Clear the input so the same file can be selected again if needed
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate at least 1 image is selected
    if (imageFiles.length === 0) {
      alert("Please upload at least 1 product image");
      return;
    }

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("returnPolicy", productData.returnPolicy);
    formData.append("ratings", productData.ratings);
    formData.append("sellingCount", productData.sellingCount);
    formData.append("colors", productData.colors);
    formData.append("motive", productData.motive);
    formData.append("isActive", productData.isActive);

    productData.sizes.forEach((size) => {
      formData.append("sizes", size);
    });

    imageFiles.forEach((file) => {
      formData.append("productImages", file);
    });

    // show formdata in console properly
    console.log("Submitted Data:", productData);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setLoading(true);
      const res = await API.post("/api/products/add-product", formData, {
        withCredentials: true,
      });

      const data = await res.json();
      if (data.success) {
        setLoading(false);
        alert("Product added successfully!");
        navigate("/collections");
      }

      console.log("Server Response:", data);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
      alert("Error uploading product. Please try again.");
    }
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setImageFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleCancel = () => {
    setProductData({
      name: "",
      category: "",
      title: "",
      description: "",
      price: "",
      sizes: [],
      stock: "",
      returnPolicy: "",
      ratings: "",
      sellingCount: "",
      colors: "",
      motive: "",
      isActive: true,
    });
    setImageFiles([]);
    setPreviews([]);
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#f7f3ea] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Product
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-pink-400 text-sm"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6 items-center">
            <div>
              <label className="block mb-1 font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            <div className="  ">
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Kids">Kids</option>
                <option value="Women">Women</option>
                <option value="Baby Girl">Baby Girl</option>
                <option value="Baby Boy">Baby Boy</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              rows="4"
              value={productData.description}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {/* Colors */}
            <input
              type="text"
              name="colors"
              placeholder="Available Colors"
              value={productData.colors}
              onChange={handleChange}
              className=" w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none"
            />
            {/* Return Policy */}
            <input
              type="text"
              name="returnPolicy"
              placeholder="Return Policy"
              value={productData.returnPolicy}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none"
            />
            {/* Ratings */}
            <input
              type="number"
              name="ratings"
              placeholder="Ratings"
              value={productData.ratings}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none"
            />
            {/* Selling Count */}
            <input
              type="number"
              name="sellingCount"
              placeholder="Selling Count"
              value={productData.sellingCount}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <div>
            {/* Motive */}
            <input
              type="text"
              name="motive"
              placeholder="Motive / Design Type"
              value={productData.motive}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Product Images ({previews.length}/4)
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-xl p-6 cursor-pointer hover:bg-pink-50 transition">
              <span className="text-sm text-gray-600 mb-2">
                Click to upload images (max 4)
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Image Preview */}
            {previews.length > 0 && (
              <div className="flex gap-4 mt-4 flex-wrap">
                {previews.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="w-28 h-28 object-cover rounded-lg shadow-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transform translate-x-2 -translate-y-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sizes */}
          <div>
            <label className="block mb-2 font-medium">Available Sizes</label>
            <div className="flex gap-4">
              {availableSizes.map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    onChange={handleChange}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={productData.isActive}
              onChange={handleChange}
            />
            <label>Active Product</label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
