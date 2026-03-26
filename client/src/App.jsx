import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CollectionsPage from "./pages/CollectionsPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./components/shared/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:productId" element={<EditProduct />} />
    </Routes>
  );
}

export default App;
