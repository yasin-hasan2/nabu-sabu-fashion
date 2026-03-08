import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, CheckCircle, Truck } from "lucide-react";

const Ordering = () => {
  return (
    <section id="ordering" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How Ordering Works
          </h2>
          <p className="text-gray-600">
            Simple steps to get your dream outfit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: <ShoppingBag />,
              title: "Choose Design",
              desc: "Pick a design or send us a screenshot.",
            },
            {
              icon: <MessageCircle />,
              title: "Confirm Details",
              desc: "We'll discuss price and measurements.",
            },
            {
              icon: <CheckCircle />,
              title: "Advance Payment",
              desc: "Secure your order with a partial payment.",
            },
            {
              icon: <Truck />,
              title: "Delivery",
              desc: "Get it delivered right to your doorstep.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-brand-peach rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                {React.cloneElement(step.icon, { size: 32 })}
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ordering;
