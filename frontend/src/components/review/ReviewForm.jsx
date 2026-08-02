import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  createReview,
  getProductReviews,
} from "../../redux/thunks/reviewThunk";

function ReviewForm({ productId }) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!rating) {
      return toast.error("Please select a rating.");
    }

    if (!comment.trim()) {
      return toast.error("Please write your review.");
    }

    setLoading(true);

    try {
      const result = await dispatch(
        createReview({
          productId,
          data: {
            rating,
            comment: comment.trim(),
          },
        }),
      );

      if (createReview.fulfilled.match(result)) {
        toast.success("Review submitted successfully.");

        setRating(5);
        setHover(0);
        setComment("");

        dispatch(getProductReviews(productId));
      } else {
        toast.error(result.payload || "Failed to submit review.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">
        Write a Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110"
              >
                <FaStar
                  size={24}
                  className={
                    star <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}

            <span className="ml-2 text-sm text-gray-500">
              {hover || rating}/5
            </span>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment
          </label>

          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              p-3
              text-sm
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-gray-900
            "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !comment.trim()}
          className="
            bg-gray-900
            hover:bg-gray-800
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            px-6
            py-2.5
            rounded-lg
            text-sm
            font-medium
            transition
          "
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
