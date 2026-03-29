import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 text-center">
        <div className="text-2xl font-heading font-bold text-pink-400 mb-4">
          Nabu Sabu Fashion
        </div>
        <p className="text-gray-400 mb-8">
          Custom & Ready-Made Fashion Made With Love
        </p>
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Nabu Sabu Fashion. All rights
          reserved.
        </div>
        <div className="text-center text-sm text-gray-500 py-4">
          <span>
            {/* © {new Date().getFullYear()} */}• Developed by{" "}
            <a
              href="https://www.linkedin.com/in/yasin-al-hasan-05a16425a"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-black transition"
            >
              Yasin Al Hasan
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
