import React from "react";
import { Facebook, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-brand-peach/20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Get in Touch
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Message us anytime, we’re happy to help 💬
        </p>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://www.facebook.com/people/Nabu-Sabu-Fashion/61583146060514/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] text-white px-8 py-3 rounded-full flex items-center gap-3 hover:opacity-90 transition-opacity shadow-lg"
          >
            <Facebook size={24} />
            <span className="font-semibold">Facebook Page</span>
          </a>
          {/* Optional WhatsApp/Messenger placeholders */}
          <button
            className="bg-green-500 text-white px-8 py-3 rounded-full flex items-center gap-3 hover:opacity-90 transition-opacity shadow-lg cursor-not-allowed opacity-70"
            disabled
          >
            <Phone size={24} />
            <span className="font-semibold">WhatsApp (Soon)</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
