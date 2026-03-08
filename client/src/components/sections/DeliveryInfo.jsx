import React from "react";
import { Truck, CheckCircle } from "lucide-react";

const DeliveryInfo = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-brand-pink/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-brand-pink/20">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Delivery & Payment Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm text-pink-500">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Delivery Charges</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    Inside Dhaka:{" "}
                    <span className="font-bold text-gray-800">100৳</span>
                  </li>
                  <li>
                    Outside Dhaka:{" "}
                    <span className="font-bold text-gray-800">150৳</span>
                  </li>
                  <li className="text-sm italic mt-2">
                    *Charge may vary based on weight
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm text-pink-500">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Payment Policy</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    Custom Designs:{" "}
                    <span className="font-bold text-gray-800">
                      Advance Payment Required
                    </span>{" "}
                    (Ingredient cost only)
                  </li>
                  <li>
                    Remaining Amount:{" "}
                    <span className="font-bold text-gray-800">
                      Cash on Delivery
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
