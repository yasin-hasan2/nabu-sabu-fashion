import { useEffect, useState } from "react";
import { Star } from "lucide-react";
// import axios from "axios";
import { useToast } from "../../ToastContext";
import API from "../../utils/api";

const AddReview = ({
  isOpen,
  onClose,
  onSuccess,
  selectedReview,
  updateReview,
}) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showToast, updateToast } = useToast();
  const MAX_LENGTH = 90; // max characters for review comment

  useEffect(() => {
    if (selectedReview) {
      setName(selectedReview.name);
      setRating(selectedReview.rating);
      setComment(selectedReview.comment);
    }
  }, [selectedReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !comment || rating === 0) {
      showToast({
        message: "Please fill all fields ⭐",
        type: "error",
      });
      return;
    }

    const toastId = showToast({
      message: selectedReview ? "Updating review..." : "Submitting review...",
      type: "loading",
    });

    try {
      setLoading(true);

      if (selectedReview) {
        // ✏️ EDIT MODE
        await updateReview(selectedReview._id, {
          name,
          comment,
          rating,
        });

        updateToast(toastId, {
          message: "Review updated ✨",
          type: "success",
        });
      } else {
        // ➕ ADD MODE
        await API.post(
          `/api/reviews/add-review`,
          { name, rating, comment },
          { withCredentials: true },
        );

        updateToast(toastId, {
          message: "Review added 🎉",
          type: "success",
        });
      }

      // reset
      setName("");
      setRating(0);
      setComment("");

      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      updateToast(toastId, {
        message: err.response?.data?.message || "Something went wrong ❌",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold mb-2">
          {selectedReview ? "Edit Your Review" : "Add Your Experience"}
        </h3>
        <p className="text-gray-500 mb-6 text-sm">
          Share your Love for our products ✨
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Name */}
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          />

          {/* Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Review */}
          <textarea
            rows="4"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => {
              if (e.target.value.length <= MAX_LENGTH) {
                setComment(e.target.value);
              }
            }}
            className="w-full px-4 py-3 rounded-xl border resize-none"
          />

          <p
            className={`text-sm mt-1 ${
              comment.length === MAX_LENGTH ? "text-red-500" : "text-gray-500"
            }`}
          >
            {comment.length}/{MAX_LENGTH} characters
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-100 rounded-full"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-pink-500 text-white rounded-full"
            >
              {loading
                ? selectedReview
                  ? "Updating..."
                  : "Submitting..."
                : selectedReview
                  ? "Update Review"
                  : "Add Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
