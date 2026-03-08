import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { motion } from "framer-motion";
import Loading from "./Loading";
// import BrandName from "./BrandName";

function ProductDetails() {
  const { productId } = useParams();
  const { products } = useProducts();
  console.log("All Products:", products);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/get-product/${productId}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setProduct(data.product);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <Loading />;

  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

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
          {/* Image */}

          <div className="flex items-center justify-center">
            <img
              src={product.productImage}
              alt={product.name}
              className="rounded-xl object-cover w-full max-h-[450px]"
            />
          </div>

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
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-7 py-2 rounded-lg transition">
                Order Now
              </button>

              <button className="border border-pink-500 text-pink-500 hover:bg-pink-50 px-7 py-2 rounded-lg transition">
                Wishlist
              </button>
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
                      src={product.productImage}
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
    </div>
  );
}

export default ProductDetails;
