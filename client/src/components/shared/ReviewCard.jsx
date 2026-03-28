import { motion } from "framer-motion";
import { Star } from "lucide-react";
const ReviewCard = ({
  review,
  index,
  user,
  deleteReview,
  setSelectedReview,
  setOpenModal,
}) => {
  //   console.log("review in ReviewCard:", review);
  return (
    <motion.div
      className="bg-white p-8 h-60 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* ⭐ rating */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={
              star <= review.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      <p className="text-gray-600 mb-6 italic">"{review.comment}"</p>

      <div className="font-bold text-gray-800">- {review.name}</div>

      {user?.role === "admin" && (
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => deleteReview(review._id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>

          <button
            onClick={() => {
              setSelectedReview(review);
              setOpenModal(true);
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewCard;
