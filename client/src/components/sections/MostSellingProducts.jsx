import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

const MostSellingProducts = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const scrollRef = useRef();

  const mostSellingProducts = [...products]
    .sort((a, b) => b.sellingCount - a.sellingCount)
    .slice(0, 8);

  // 🔥 Scroll functions
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-brand-cream/30">
      <div className="container mx-auto px-6 relative">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Most Selling Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our customers' favorite picks this season.
          </p>
        </div>

        {/* 🔥 Arrow Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-[55%] z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-[55%] z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight />
        </button>

        {/* 🔥 Netflix Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {mostSellingProducts.map((product, index) => (
            <motion.div
              key={product._id}
              className="min-w-[280px] max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.productImages?.[0] || product.productImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold text-gray-800 shadow-sm">
                  <Star size={14} className="text-brand-yellow fill-current" />
                  {product.ratings}
                </div>

                {/* cart button */}
                <button className="absolute bottom-4 right-4 bg-pink-500 text-white p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-600">
                  <ShoppingCart size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold text-pink-500 mb-2 uppercase tracking-wider">
                  {product.category}
                </div>

                <h3 className="font-heading text-lg font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>

                <div className="text-xl font-bold text-gray-900">
                  {product.price} Tk
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostSellingProducts;
