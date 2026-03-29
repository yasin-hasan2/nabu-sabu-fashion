import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { useUserProfile } from "../../hooks/useUserProfile";
// import BrandName from "./BrandName";

const API =
  import.meta.env.VITE_API_URL || "https://nabu-sabu-fashion.onrender.com";
const apiUrl = `${API}/api/products`;

function ProductDetails() {
  const { productId } = useParams();
  const { products } = useProducts();
  // console.log("All Products:", products);
  const navigate = useNavigate();
  const { user } = useUserProfile();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Check if product has multiple images
  const hasMultipleImages = product?.productImages?.length > 1;

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${apiUrl}/get-product/${productId}`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setProduct(data.product);
        setMainImage(data.product.productImage); // set default image
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const res = await fetch(
        `${API}/api/products/delete-product/${productId}`,
        {
          method: "DELETE",
          credentials: "include", // 🔥 REQUIRED FOR COOKIES
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setShowConfirm(false);
      navigate("/collections");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#faf6f2] min-h-screen py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        {/* <div>
          <BrandName />
        </div> */}
        {/* <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium"
        >
          
        </button> */}
        <button
          onClick={() => navigate("/collections")}
          className="mb-6 flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium"
        >
          ← Back to Collections
        </button>

        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-12">
          {/* Image Section - Conditional Rendering */}

          {hasMultipleImages ? (
            // Multiple Images Style
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="w-full bg-[#fdf8f5] p-4 rounded-2xl">
                <img
                  src={mainImage || product?.productImages?.[0]}
                  alt={product.name}
                  className="w-full h-[420px] object-cover rounded-xl transition duration-500 hover:scale-[1.03]"
                />
              </div>

              {/* Thumbnails */}
              {product?.productImages?.length > 1 && (
                <div className="flex gap-3">
                  {product.productImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      onClick={() => setMainImage(img)}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition border-2
            ${
              mainImage === img
                ? "border-pink-500"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Single Image Style - Centered and Larger
            <div className="flex items-center justify-center">
              <div className="w-full overflow-hidden rounded-2xl border-4 border-pink-100 shadow-lg">
                <img
                  src={mainImage || product?.productImages?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                />
              </div>
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="text-xs text-pink-500 font-semibold uppercase mb-2">
              {product.category}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            <p className="text-gray-500 mb-5">{product.title}</p>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-6 mb-6">
              <span className="text-3xl font-bold text-pink-500">
                ${product.price}
              </span>

              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                Stock: {product.stock}
              </span>
            </div>
            <div className="flex items-center gap-6 mb-6">
              {/* Colors */}
              <div className="flex items-center gap-2">
                {" "}
                {product.colors &&
                  product.colors.length > 0 &&
                  product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="inline-block w-6 h-6 rounded-full border border-gray-300 "
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}{" "}
              </div>
              {/* rating */}
              <div className="flex items-center gap-2">
                {product.ratings && (
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-400 font-semibold">
                      {product.ratings} ⭐
                    </span>

                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-2">Available Sizes</p>
                <div className="flex gap-3">
                  {product.sizes.map((size, i) => (
                    <span
                      key={i}
                      className="px-4 py-1 border rounded-lg text-sm hover:border-pink-400 cursor-pointer transition"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              {user && user.role === "admin" ? (
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-7 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setShowConfirm(true)}
                    className="border border-red-500 text-red-500 hover:bg-red-50 px-7 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-7 py-2 rounded-lg transition">
                    Order Now
                  </button>

                  <button className="border border-pink-500 text-pink-500 hover:bg-pink-50 px-7 py-2 rounded-lg transition">
                    Wishlist
                  </button>
                </div>
              )}
            </div>

            <p className="text-pink-500 mt-6 text-sm flex items-center gap-2">
              ❤️ Made with love & care
            </p>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Related Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter((p) => p._id !== productId)
              .slice(0, 4)
              .map((product, index) => (
                <motion.div
                  key={product._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.productImages?.[0] || product.productImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs font-semibold text-pink-500 mb-1 uppercase">
                      {product.category}
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>

                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">
                        {product.price.toLocaleString()}৳
                      </span>

                      <span className="text-sm text-pink-500">View</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Product?
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. Are you sure you want to delete this
              product?
            </p>

            <div className="flex justify-end gap-3">
              {/* Cancel */}
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* Confirm Delete */}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
