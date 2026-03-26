import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

const CollectionsPage = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Women", "Kids", "Baby Boy", "Baby Girl"];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-dark">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Collections
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest arrivals and timeless classics.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-pink-500 text-white"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={product.productImages?.[0] || product.productImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold text-pink-500 mb-2 uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-gray-900">
                      {product.price.toLocaleString()}৳
                    </div>
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="text-sm font-medium text-pink-500 hover:text-pink-600"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CollectionsPage;
