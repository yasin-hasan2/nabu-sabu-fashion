import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../ToastContext";
// import { useNavigate } from "react-router-dom";
// adjust path

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();

  const { showToast, updateToast } = useToast();

  const API =
    import.meta.env.VITE_API_URL || "https://nabu-sabu-fashion.onrender.com";

  // ✅ GET ALL REVIEWS
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/get-reviews`, {
        withCredentials: true,
      });
      setReviews(data.reviews); // adjust based on your API response structure
    } catch (err) {
      console.error(err);
      showToast({
        message: "Failed to load reviews ❌",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE REVIEW
  const deleteReview = async (id) => {
    const toastId = showToast({
      message: "Deleting review...",
      type: "loading",
    });

    try {
      await axios.delete(`${API}/delete-review/${id}`, {
        withCredentials: true,
      });

      // update UI instantly
      setReviews((prev) => prev.filter((r) => r._id !== id));

      updateToast(toastId, {
        message: "Review deleted 🗑️",
        type: "success",
      });
      //   navigate("/reviews"); // optional: redirect after deletion
    } catch (err) {
      console.error(err);
      updateToast(toastId, {
        message: "Delete failed ❌",
        type: "error",
      });
    }
  };

  // ✅ UPDATE REVIEW
  const updateReview = async (id, updatedData) => {
    const toastId = showToast({
      message: "Updating review...",
      type: "loading",
    });

    try {
      const { data } = await axios.put(
        `${API}/api/reviews/update-review/${id}`,
        updatedData,
        { withCredentials: true },
      );

      // update UI instantly
      setReviews((prev) => prev.map((r) => (r._id === id ? data : r)));

      updateToast(toastId, {
        message: "Review updated ✨",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      updateToast(toastId, {
        message: "Update failed ❌",
        type: "error",
      });
    }
  };

  // auto load
  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    fetchReviews,
    deleteReview,
    updateReview,
  };
};
