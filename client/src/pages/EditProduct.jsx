import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:5000/api/products";

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  console.log("Editing product with ID:", productId);

  const availableSizes = ["S", "M", "L", "XL"];

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    title: "",
    description: "",
    price: "",
    stock: "",
    colors: "",
    returnPolicy: "",
    ratings: "",
    sellingCount: "",
    motive: "",
    sizes: [],
    isActive: true,
  });

  const [previews, setPreviews] = useState([]);
  const [images, setImages] = useState([]);

  // ✅ Fetch product
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${apiUrl}/get-product/${productId}`, {
          withCredentials: true,
        });

        const product = res.data.product;

        setProductData({
          ...product,
          colors: product.colors?.join(", ") || "",
          sizes: product.sizes || [],
        });

        setPreviews(product.images || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "sizes") {
      if (checked) {
        setProductData({
          ...productData,
          sizes: [...productData.sizes, value],
        });
      } else {
        setProductData({
          ...productData,
          sizes: productData.sizes.filter((s) => s !== value),
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

  // ✅ Image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + previews.length > 4) {
      alert("Max 4 images allowed");
      return;
    }

    setImages([...images, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  // ✅ Remove image
  const handleRemoveImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(productData).forEach((key) => {
        if (key === "colors") {
          productData.colors
            .split(",")
            .forEach((c) => formData.append("colors", c.trim()));
        } else if (key === "sizes") {
          productData.sizes.forEach((s) => formData.append("sizes", s));
        } else {
          formData.append(key, productData[key]);
        }
      });

      images.forEach((img) => {
        formData.append("productImages", img);
      });

      await axios.put(`${apiUrl}/edit-product/${productId}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully");
      navigate(`/product/${productId}`);
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="min-h-screen bg-[#f7f3ea] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Product</h2>

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

            <div>
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
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Extra fields */}
          <div className="grid grid-cols-4 gap-6">
            <input
              type="text"
              name="colors"
              value={productData.colors}
              onChange={handleChange}
              placeholder="Colors"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="returnPolicy"
              value={productData.returnPolicy}
              onChange={handleChange}
              placeholder="Return Policy"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="ratings"
              value={productData.ratings}
              onChange={handleChange}
              placeholder="Ratings"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="sellingCount"
              value={productData.sellingCount}
              onChange={handleChange}
              placeholder="Selling Count"
              className="border p-2 rounded"
            />
          </div>

          {/* Motive */}
          <input
            type="text"
            name="motive"
            value={productData.motive}
            onChange={handleChange}
            placeholder="Motive"
            className="border p-2 rounded w-full"
          />

          {/* Images */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Images ({previews.length}/4)
            </label>

            <input type="file" multiple onChange={handleImageUpload} />

            <div className="flex gap-4 mt-4 flex-wrap">
              {previews.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="w-28 h-28 object-cover rounded" />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-2"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block mb-2 font-medium">Sizes</label>
            <div className="flex gap-4">
              {availableSizes.map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    value={size}
                    name="sizes"
                    checked={productData.sizes.includes(size)}
                    onChange={handleChange}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Active */}
          <div className="flex gap-2">
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
              className="px-6 py-2 rounded-full bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-pink-500 text-white"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
