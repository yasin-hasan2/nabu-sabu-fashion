import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Reviews = () => {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          Happy Customers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah K.",
              text: "Absolutely loved the dress for my daughter! The fabric is so soft and the fit was perfect.",
            },
            {
              name: "Farhana R.",
              text: "Great service and timely delivery. The custom design turned out exactly how I imagined.",
            },
            {
              name: "Nusrat J.",
              text: "Very professional and friendly behavior. Highly recommended for quality outfits!",
            },
          ].map((review, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex text-brand-yellow mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
              <div className="font-bold text-gray-800">- {review.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
