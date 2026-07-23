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

    if (!comment.trim()) {
      return toast.error("Please write your review.");
    }

    setLoading(true);

    const result = await dispatch(
      createReview({
        productId,
        data: {
          rating,
          comment,
        },
      }),
    );

    setLoading(false);

    if (createReview.fulfilled.match(result)) {
      toast.success("Review submitted successfully");

      setRating(5);
      setComment("");

      dispatch(getProductReviews(productId));
    } else {
      toast.error(result.payload);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">
        Write a review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2.5">
            Rating
          </label>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${star} star`}
              >
                <FaStar
                  size={24}
                  className={
                    star <= (hover || rating)
                      ? "text-amber-400"
                      : "text-gray-200"
                  }
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({hover || rating}/5)
            </span>
          </div>
        </div>

        {/* Comment */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2.5">
            Comment
          </label>

          <textarea
            rows={4}
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3.5 text-sm text-gray-800 placeholder:text-gray-400 resize-none outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10 transition-colors"
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
