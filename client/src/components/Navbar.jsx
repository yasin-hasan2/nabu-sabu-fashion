import React, { useState, useEffect } from "react";
import { Facebook, Menu, X, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUserProfile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  const scrollToSection = (id) => {
    if (!isHome) return; // Only scroll if on home page
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading font-bold text-pink-500">
          Nabu Sabu
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium text-gray-600 items-center">
          {isHome ? (
            <>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-pink-500 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="hover:text-pink-500 transition-colors"
              >
                Services
              </button>
              <Link
                to="/collections"
                className="hover:text-pink-500 transition-colors"
              >
                Collections
              </Link>
              <Link
                to="/order"
                className="hover:text-pink-500 transition-colors"
              >
                Order Now
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-pink-500 transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => navigate("/add-product")}
                className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition-colors shadow-md flex items-center gap-2 text-sm font-medium"
                style={{
                  display:
                    user && user.role === "admin" ? "inline-flex" : "none",
                }}
              >
                Add Product
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-pink-500 transition-colors">
                Home
              </Link>
              <Link
                to="/collections"
                className={`transition-colors ${location.pathname === "/collections" ? "text-pink-500" : "hover:text-pink-500"}`}
              >
                Collections
              </Link>
              <Link
                to="/order"
                className={`transition-colors ${location.pathname === "/order" ? "text-pink-500" : "hover:text-pink-500"}`}
              >
                Order Now
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            // User is logged in - show avatar and profile menu
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  )}
                </div>
                <span className="text-gray-700 font-medium">
                  {user.username}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // User not logged in - show login button
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-pink-500 font-medium transition-colors flex items-center gap-1"
              >
                <User size={18} /> Login
              </Link>
              <a
                href="https://www.facebook.com/people/Nabu-Sabu-Fashion/61583146060514/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition-colors shadow-md flex items-center gap-2 text-sm font-medium"
              >
                <Facebook size={18} />
                <span>Visit Page</span>
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 px-6 flex flex-col gap-4">
          {isHome ? (
            <>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left py-2 border-b border-gray-100"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left py-2 border-b border-gray-100"
              >
                Services
              </button>
              <Link
                to="/collections"
                className="text-left py-2 border-b border-gray-100"
              >
                Collections
              </Link>
              <Link
                to="/order"
                className="text-left py-2 border-b border-gray-100"
              >
                Order Now
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left py-2 border-b border-gray-100"
              >
                Contact
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-left py-2 border-b border-gray-100">
                Home
              </Link>
              <Link
                to="/collections"
                className={`text-left py-2 border-b border-gray-100 ${location.pathname === "/collections" ? "text-pink-500" : ""}`}
              >
                Collections
              </Link>
              <Link
                to="/order"
                className={`text-left py-2 border-b border-gray-100 ${location.pathname === "/order" ? "text-pink-500" : ""}`}
              >
                Order Now
              </Link>
            </>
          )}

          {user ? (
            // Logged in user - show profile and logout
            <>
              <div className="py-3 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.username
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left py-2 border-b border-gray-100"
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left py-2 border-b border-gray-100"
              >
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="text-left py-2 text-red-600 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            // Not logged in - show login button
            <>
              <Link
                to="/login"
                className="text-left py-2 border-b border-gray-100 flex items-center gap-2"
              >
                <User size={18} /> Login / Sign Up
              </Link>
              <a
                href="https://www.facebook.com/people/Nabu-Sabu-Fashion/61583146060514/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 text-white px-5 py-3 rounded-full hover:bg-pink-600 transition-colors shadow-md flex items-center justify-center gap-2 text-sm font-medium mt-2"
              >
                <Facebook size={18} />
                <span>Visit Page</span>
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
