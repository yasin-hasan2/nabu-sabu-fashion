import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Kids Collection",
    image:
      "https://cdn.pixabay.com/photo/2017/08/07/04/47/people-2599980_1280.jpg",
    description: "Comfortable & stylish outfits for your little ones.",
  },
  {
    id: 2,
    title: "Women's Fashion",
    image:
      "https://cdn.pixabay.com/photo/2016/11/14/05/24/asia-1822695_1280.jpg",
    description: "Trendy and elegant designs for every occasion.",
  },
  {
    id: 3,
    title: "Party Wear",
    image:
      "https://cdn.pixabay.com/photo/2016/11/23/17/30/girls-1853958_1280.jpg",
    description: "Stand out with our exclusive party collection.",
  },
  {
    id: 4,
    title: "Bridal & Special",
    image:
      "https://cdn.pixabay.com/photo/2016/06/29/08/41/wedding-dresses-1486256_1280.jpg",
    description: "Make your special day even more memorable.",
  },
];

const CollectionsShowcase = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Collections
            </h2>
            <p className="text-gray-600 max-w-xl">
              Explore our wide range of fashion categories designed with love.
            </p>
          </div>
          <Link
            to="/collections"
            className="hidden md:flex items-center gap-2 text-pink-500 font-semibold hover:text-pink-600 transition-colors"
          >
            View All <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-80 overflow-hidden rounded-2xl mb-4">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-800 mb-1">
                {collection.title}
              </h3>
              <p className="text-gray-500 text-sm">{collection.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-pink-500 font-semibold hover:text-pink-600 transition-colors"
          >
            View All Collections <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionsShowcase;
