import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// import { Star } from "lucide-react";
import { useState } from "react";
import AddReview from "../shared/AddReview";
import { useReviews } from "../../hooks/useReviews";
import Loading from "../shared/Loading";
import { useUserProfile } from "../../hooks/useUserProfile";
import ReviewCard from "../shared/ReviewCard";

const Reviews = () => {
  // const [rating, setRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  const { user } = useUserProfile();
  const { reviews, loading, deleteReview, updateReview, fetchReviews } =
    useReviews();
  // const reviewsList = reviews?.reviews || []; // when you use on hook link just fetch data and set it to reviews state, no need to access reviews.reviews
  // console.log("reviews:", reviews);
  const reviewsList = reviews || []; // when you use on hook link just fetch data and set it to reviews state, no need to access reviews.reviews

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const ITEMS_PER_VIEW = itemsPerView; // adjust based on design (1 for mobile, 3 for desktop)

  // Group reviews into chunks for carousel
  const groupedReviews = [];
  for (let i = 0; i < reviewsList.length; i += ITEMS_PER_VIEW) {
    groupedReviews.push(reviewsList.slice(i, i + ITEMS_PER_VIEW));
  }

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    if (reviewsList.length <= ITEMS_PER_VIEW) return;

    const totalSlides = Math.ceil(reviewsList.length / ITEMS_PER_VIEW);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [reviewsList.length, ITEMS_PER_VIEW]);

  if (loading) return <Loading />;

  return (
    <section className="py-20 bg-brand-cream">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          Happy Customers
        </h2>

        <div className="">
          {reviewsList.length <= 3 ? (
            // ✅ GRID (same as yours)
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviewsList.map((review, index) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  index={index}
                  user={user}
                  deleteReview={deleteReview}
                  setSelectedReview={setSelectedReview}
                  setOpenModal={setOpenModal}
                />
              ))}
            </div>
          ) : (
            // 🔥 CAROUSEL
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {groupedReviews.map((group, index) => (
                  <div
                    key={index}
                    className="min-w-full grid md:grid-cols-3 gap-8 px-4"
                  >
                    {group.map((review, index) => (
                      <ReviewCard
                        key={review._id}
                        review={review}
                        index={index}
                        user={user}
                        deleteReview={deleteReview}
                        setSelectedReview={setSelectedReview}
                        setOpenModal={setOpenModal}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300"
          >
            Add Your Review
          </button>

          {/* Modal */}
          <AddReview
            isOpen={openModal}
            onClose={() => {
              setOpenModal(false);
              setSelectedReview(null);
            }}
            onSuccess={fetchReviews}
            selectedReview={selectedReview}
            updateReview={updateReview}
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
