import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/get-products`, {
          withCredentials: true, // Send cookies with request
        });

        if (response.data.success && response.data.products) {
          setProducts(response.data.products);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
