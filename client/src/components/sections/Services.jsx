import React from "react";
import { motion } from "framer-motion";
import { Scissors, ShoppingBag, Heart } from "lucide-react";

const Services = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-brand-pink/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a range of fashion services tailored to your needs.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Service 1 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors duration-300">
              <Scissors className="text-pink-500 group-hover:text-white w-8 h-8 transition-colors duration-300" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-4">
              Custom Design
            </h3>
            <p className="text-gray-600 mb-6">
              Design your favorite outfit for your child or yourself. Bring your
              ideas to life with our custom tailoring.
            </p>
            <img
              src="https://cdn.pixabay.com/photo/2021/02/02/22/51/sketch-5975762_1280.jpg"
              alt="Custom Design"
              className="w-full h-48 object-cover rounded-lg"
            />
          </motion.div>

          {/* Service 2 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors duration-300">
              <ShoppingBag className="text-pink-500 group-hover:text-white w-8 h-8 transition-colors duration-300" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-4">
              Ready-Made Collection
            </h3>
            <p className="text-gray-600 mb-6">
              Choose from our exclusive collection of ready-to-wear designs,
              crafted for style and comfort.
            </p>
            <img
              src="https://cdn.pixabay.com/photo/2016/11/19/15/40/clothes-1839935_1280.jpg"
              alt="Ready Made"
              className="w-full h-48 object-cover rounded-lg"
            />
          </motion.div>

          {/* Service 3 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors duration-300">
              <Heart className="text-pink-500 group-hover:text-white w-8 h-8 transition-colors duration-300" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-4">
              Quality & Care
            </h3>
            <p className="text-gray-600 mb-6">
              Each order is handled with extreme attention to detail and love,
              ensuring premium quality.
            </p>
            <img
              src="https://cdn.pixabay.com/photo/2014/04/05/11/46/fabric-316777_1280.jpg"
              alt="Quality"
              className="w-full h-48 object-cover rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
