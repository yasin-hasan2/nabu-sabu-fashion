import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-pink-100 to-peach-100 text-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Let’s create something beautiful together ✨
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Ready to see your dream outfit come to life? Send us your design or
            choose from our collection today.
          </p>
          <a
            href="https://www.facebook.com/people/Nabu-Sabu-Fashion/61583146060514/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-pink-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-pink-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Send size={24} />
            Send Your Design Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
