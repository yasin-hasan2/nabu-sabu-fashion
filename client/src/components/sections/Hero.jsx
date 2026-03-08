import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/22/21/57/apparel-1850804_1280.jpg"
          alt="Boutique Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Custom & Ready-Made <br />
            <span className="text-pink-500">Fashion Made With Love</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Beautiful outfits for kids and women, designed just the way you
            like. Experience the warmth of personalized fashion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.facebook.com/people/Nabu-Sabu-Fashion/61583146060514/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Inbox Us on Facebook
            </a>
            <a
              href="#services"
              className="bg-white text-pink-500 border-2 border-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              View Our Collection
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
