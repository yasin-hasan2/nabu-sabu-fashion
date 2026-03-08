import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/profile`, {
          withCredentials: true, // Send cookies with request
        });

        if (response.data.success && response.data.user) {
          setUser(response.data.user);
          // Also store in localStorage as backup
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (err) {
        // User not authenticated or profile not found
        setError(err.response?.data?.message || "Failed to fetch profile");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if not already in localStorage (optimization)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setLoading(false);
        // Still fetch fresh data in background
        fetchUserProfile();
      } catch {
        fetchUserProfile();
      }
    } else {
      fetchUserProfile();
    }
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/logout`, {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return { user, loading, error, logout };
};
