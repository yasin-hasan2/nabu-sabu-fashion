import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Facebook, Chrome } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import API from "../utils/api";

console.log("LoginPage API base URL:", API.defaults.baseURL);
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Form state for signup
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Form state for login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setMessage("");
  };

  // Handle signup input changes
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  // Handle login input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!signupData.username || !signupData.email || !signupData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post(
        `/api/auth/register`,
        {
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
        },
        {
          withCredentials: true, // to include cookies in the request
        },
      );
      console.log("Signup response:", response);
      if (response.data.success) {
        setMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          setSignupData({ username: "", email: "", password: "" });
          setIsLogin(true);
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again.",
      );
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!loginData.email || !loginData.password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post(
        `/api/auth/login`,
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          withCredentials: true, // to include cookies in the request
        },
      );
      console.log("Login response:", response);
      if (response.data.success) {
        setMessage("Login successful! Redirecting...");
        setLoginData({ email: "", password: "" });

        // Store user info and token if available
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // Redirect to home or dashboard after 1.5 seconds
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-dark flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>

          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-500 text-sm">
                {isLogin
                  ? "Sign in to access your account"
                  : "Join us to start your fashion journey"}
              </p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600">
                <Chrome size={18} className="text-blue-500" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600">
                <Facebook size={18} className="text-blue-600" /> Facebook
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
                onSubmit={isLogin ? handleLogin : handleSignup}
              >
                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {message && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                    {message}
                  </div>
                )}

                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        value={signupData.username}
                        onChange={handleSignupChange}
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={isLogin ? loginData.email : signupData.email}
                      onChange={
                        isLogin ? handleLoginChange : handleSignupChange
                      }
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    {isLogin && (
                      <a
                        href="#"
                        className="text-xs text-pink-500 hover:text-pink-600 font-medium"
                      >
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={isLogin ? loginData.password : signupData.password}
                      onChange={
                        isLogin ? handleLoginChange : handleSignupChange
                      }
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 disabled:bg-pink-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin">⏳</span>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </>
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}{" "}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            </AnimatePresence>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={toggleMode}
                  className="text-pink-500 font-bold hover:text-pink-600 transition-colors"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
