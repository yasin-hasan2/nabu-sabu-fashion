import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

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
    isActive: true,
  });

  console.log("Current product data:", productData);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

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
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("isActive", productData.isActive);

    productData.sizes.forEach((size) => {
      formData.append("sizes", size);
    });

    if (imageFile) {
      formData.append("productImage", imageFile);
      console.log("Image file appended:", imageFile);
    }

    // show formdata in console properly
    console.log("Submitted Data:", productData);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/api/products/add-product",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await res.json();
      if (data.success) {
        setLoading(false);
        alert("Product added successfully!");
        navigate("/collections");
      }

      console.log("Server Response:", data);
    } catch (error) {
      console.error("Upload error:", error);
    }
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
      isActive: true,
    });
    setImageFile(null);
    setPreview(null);
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
            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
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

            <div>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
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

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Product Image
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-xl p-6 cursor-pointer hover:bg-pink-50 transition">
              <span className="text-sm text-gray-600">
                Click to upload image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-40 h-40 object-cover rounded-lg shadow"
              />
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
