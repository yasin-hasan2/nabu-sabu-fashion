import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Scissors,
  CheckCircle,
  CreditCard,
  User,
  Mail,
  Phone,
  FileText,
  Info,
} from "lucide-react";

const OrderPage = () => {
  const [orderType, setOrderType] = useState("readymade"); // 'readymade' or 'custom'
  const [paymentMethod, setPaymentMethod] = useState("");
  const [provideMaterial, setProvideMaterial] = useState("no");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-dark">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Place Your Order
            </h1>
            <p className="text-xl text-gray-600">
              Choose your preferred way to order and let us handle the rest.
            </p>
          </div>

          {/* Order Type Toggle */}
          <div className="flex flex-col sm:flex-row gap-6 mb-12 justify-center">
            <button
              onClick={() => setOrderType("readymade")}
              className={`flex-1 max-w-xs p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4 ${
                orderType === "readymade"
                  ? "border-pink-500 bg-pink-50 text-pink-600 shadow-lg scale-105"
                  : "border-gray-200 bg-white text-gray-500 hover:border-pink-200"
              }`}
            >
              <ShoppingBag size={32} />
              <span className="font-heading font-bold text-xl">Ready-Made</span>
            </button>

            <button
              onClick={() => setOrderType("custom")}
              className={`flex-1 max-w-xs p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4 ${
                orderType === "custom"
                  ? "border-pink-500 bg-pink-50 text-pink-600 shadow-lg scale-105"
                  : "border-gray-200 bg-white text-gray-500 hover:border-pink-200"
              }`}
            >
              <Scissors size={32} />
              <span className="font-heading font-bold text-xl">
                Custom Made
              </span>
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {orderType === "readymade" ? (
                  <motion.div
                    key="readymade"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-10 bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <h3 className="font-bold text-blue-800 text-lg mb-4 flex items-center gap-2">
                        <Info size={20} /> How to Order Ready-Made
                      </h3>
                      <ul className="space-y-3 text-blue-700">
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                            1
                          </span>
                          <span>
                            Browse our collections and choose your favorite
                            outfit.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                            2
                          </span>
                          <span>
                            Note down the product name, size, and any specific
                            requirements.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                            3
                          </span>
                          <span>
                            Fill out the form below with your details and the
                            product information.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                            4
                          </span>
                          <span>
                            Complete the payment to confirm your order.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-gray-700 flex items-center gap-2">
                            <User size={18} className="text-pink-500" /> Full
                            Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-semibold text-gray-700 flex items-center gap-2">
                            <Mail size={18} className="text-pink-500" /> Email
                            Address
                          </label>
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-gray-700 flex items-center gap-2">
                          <Phone size={18} className="text-pink-500" /> Phone
                          Number
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-gray-700 flex items-center gap-2">
                          <FileText size={18} className="text-pink-500" /> Order
                          Details
                        </label>
                        <textarea
                          rows="4"
                          placeholder="Product Name, Size, Body Measurements, Color preference, etc."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        ></textarea>
                        <p className="text-xs text-gray-500">
                          Please provide as much detail as possible about the
                          cloth size and body measurements.
                        </p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <label className="font-semibold text-gray-700 flex items-center gap-2 text-lg">
                          <CreditCard size={20} className="text-pink-500" />{" "}
                          Payment Method
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {["Bkash", "Nagad", "Rocket"].map((method) => (
                            <label
                              key={method}
                              className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all ${paymentMethod === method ? "border-pink-500 bg-pink-50 ring-1 ring-pink-500" : "border-gray-200 hover:border-pink-200"}`}
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={method}
                                checked={paymentMethod === method}
                                onChange={handlePaymentChange}
                                className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                              />
                              <span className="font-medium text-gray-700">
                                {method}
                              </span>
                            </label>
                          ))}
                        </div>

                        {paymentMethod && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4"
                          >
                            <label className="block font-semibold text-gray-700 mb-2">
                              {paymentMethod} Transaction ID / Phone Number
                            </label>
                            <input
                              type="text"
                              placeholder={`Enter your ${paymentMethod} TrxID or Number`}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Please complete the payment to our merchant number{" "}
                              <strong>01XXXXXXXXX</strong> before submitting.
                            </p>
                          </motion.div>
                        )}
                      </div>

                      <button className="w-full bg-pink-500 text-white font-bold py-4 rounded-xl hover:bg-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-6">
                        Submit Order
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="custom"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-10 bg-purple-50 p-6 rounded-xl border border-purple-100">
                      <h3 className="font-bold text-purple-800 text-lg mb-4 flex items-center gap-2">
                        <Info size={20} /> Custom Order Process
                      </h3>
                      <p className="text-purple-700 mb-2">
                        Want something unique? We can stitch it for you!
                      </p>
                      <ul className="space-y-2 text-purple-700 text-sm">
                        <li>
                          • Provide your exact measurements and design
                          requirements.
                        </li>
                        <li>
                          • Let us know if you will provide the fabric or if you
                          want us to source it.
                        </li>
                        <li>
                          • Our team will contact you to confirm the design and
                          pricing.
                        </li>
                      </ul>
                    </div>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-semibold text-gray-700 flex items-center gap-2">
                            <User size={18} className="text-pink-500" /> Full
                            Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-semibold text-gray-700 flex items-center gap-2">
                            <Mail size={18} className="text-pink-500" /> Email
                            Address
                          </label>
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-gray-700 flex items-center gap-2">
                          <Phone size={18} className="text-pink-500" /> Phone
                          Number
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-gray-700 flex items-center gap-2">
                          <FileText size={18} className="text-pink-500" />{" "}
                          Design Requirements
                        </label>
                        <textarea
                          rows="4"
                          placeholder="Describe the design, style, measurements, and any specific details..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        ></textarea>
                      </div>

                      <div className="space-y-3 bg-gray-50 p-5 rounded-xl border border-gray-200">
                        <label className="font-semibold text-gray-700 block">
                          Will you provide the cloth material?
                        </label>
                        <div className="flex gap-4">
                          <label
                            className={`flex-1 cursor-pointer border rounded-lg p-3 flex items-center justify-center gap-2 transition-all ${provideMaterial === "yes" ? "border-pink-500 bg-pink-50 text-pink-700 font-bold" : "bg-white border-gray-300 text-gray-600"}`}
                          >
                            <input
                              type="radio"
                              name="material"
                              value="yes"
                              checked={provideMaterial === "yes"}
                              onChange={(e) =>
                                setProvideMaterial(e.target.value)
                              }
                              className="hidden"
                            />
                            <CheckCircle
                              size={18}
                              className={
                                provideMaterial === "yes"
                                  ? "opacity-100"
                                  : "opacity-0"
                              }
                            />{" "}
                            Yes, I will provide
                          </label>
                          <label
                            className={`flex-1 cursor-pointer border rounded-lg p-3 flex items-center justify-center gap-2 transition-all ${provideMaterial === "no" ? "border-pink-500 bg-pink-50 text-pink-700 font-bold" : "bg-white border-gray-300 text-gray-600"}`}
                          >
                            <input
                              type="radio"
                              name="material"
                              value="no"
                              checked={provideMaterial === "no"}
                              onChange={(e) =>
                                setProvideMaterial(e.target.value)
                              }
                              className="hidden"
                            />
                            <CheckCircle
                              size={18}
                              className={
                                provideMaterial === "no"
                                  ? "opacity-100"
                                  : "opacity-0"
                              }
                            />{" "}
                            No, you source it
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <label className="font-semibold text-gray-700 flex items-center gap-2 text-lg">
                          <CreditCard size={20} className="text-pink-500" />{" "}
                          Payment Method
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {["Bkash", "Nagad", "Rocket"].map((method) => (
                            <label
                              key={method}
                              className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all ${paymentMethod === method ? "border-pink-500 bg-pink-50 ring-1 ring-pink-500" : "border-gray-200 hover:border-pink-200"}`}
                            >
                              <input
                                type="radio"
                                name="payment_custom"
                                value={method}
                                checked={paymentMethod === method}
                                onChange={handlePaymentChange}
                                className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                              />
                              <span className="font-medium text-gray-700">
                                {method}
                              </span>
                            </label>
                          ))}
                        </div>

                        {paymentMethod && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4"
                          >
                            <label className="block font-semibold text-gray-700 mb-2">
                              {paymentMethod} Transaction ID / Phone Number
                            </label>
                            <input
                              type="text"
                              placeholder={`Enter your ${paymentMethod} TrxID or Number`}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              For custom orders, an advance payment is required.
                            </p>
                          </motion.div>
                        )}
                      </div>

                      <button className="w-full bg-pink-500 text-white font-bold py-4 rounded-xl hover:bg-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-6">
                        Submit Custom Order
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderPage;
