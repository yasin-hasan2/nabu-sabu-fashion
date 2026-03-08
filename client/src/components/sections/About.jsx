import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://cdn.pixabay.com/photo/2017/08/06/22/52/blouse-2597205_1280.jpg"
                alt="About Nabu Sabu"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nabu Sabu Fashion was born from a simple desire: to create
              clothing that feels as special as the person wearing it. We
              believe that every outfit tells a story, whether it's a
              custom-designed dress for your little one or a ready-made piece
              that fits just right.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We focus on care, quality, and limited custom orders to ensure
              that every stitch is perfect. We're not just a brand; we're a
              friendly boutique that treats every customer like family.
            </p>
            <div className="flex items-center gap-4 text-pink-500 font-semibold">
              <Heart className="fill-current" />
              <span>Made with love & care</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
