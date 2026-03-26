import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

// const products = [
//   {
//     id: 1,
//     name: "Summer Floral Dress",
//     price: "1,250৳",
//     rating: 4.8,
//     image:
//       "https://cdn.pixabay.com/photo/2016/11/16/04/04/girl-1828112_1280.jpg",
//     category: "Women",
//   },
//   {
//     id: 2,
//     name: "Elegant Evening Gown",
//     price: "3,500৳",
//     rating: 4.9,
//     image:
//       "https://cdn.pixabay.com/photo/2016/10/03/19/30/freedom-1712590_1280.jpg",
//     category: "Women",
//   },
//   {
//     id: 3,
//     name: "Kids Party Frock",
//     price: "950৳",
//     rating: 4.7,
//     image:
//       "https://cdn.pixabay.com/photo/2020/12/10/00/00/little-girl-5819025_1280.jpg",
//     category: "Kids",
//   },
//   {
//     id: 4,
//     name: "Traditional Silk Wear",
//     price: "2,800৳",
//     rating: 5.0,
//     image:
//       "https://cdn.pixabay.com/photo/2016/11/14/03/44/girls-1822521_1280.jpg",
//     category: "Women",
//   },
// ];

const MostSellingProducts = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  return (
    <section className="py-20 bg-brand-cream/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Most Selling Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our customers' favorite picks this season.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold text-gray-800 shadow-sm">
                  <Star size={14} className="text-brand-yellow fill-current" />
                  {product.rating}
                </div>
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
                  {product.price}
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
