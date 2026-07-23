import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle, FaRegCommentDots } from "react-icons/fa";

import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

import { getProductReviews } from "../../redux/thunks/reviewThunk";

function ProductReviews({ productId }) {
  const dispatch = useDispatch();

  const { reviews, canReview, loading } = useSelector((state) => state.review);

  useEffect(() => {
    if (productId) {
      dispatch(getProductReviews(productId));
    }
  }, [dispatch, productId]);

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          Customer Reviews
        </h2>

        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <div className="mx-auto h-6 w-6 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin mb-3" />
          <p className="text-sm text-gray-500">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-12 space-y-6">
      {/* Heading */}

      <div>
        <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>

        <p className="text-sm text-gray-500 mt-1">
          Read what customers think about this product.
        </p>
      </div>

      {/* Rating Summary */}

      <RatingSummary reviews={reviews} />

      {/* Review Form */}

      {canReview ? (
        <ReviewForm productId={productId} />
      ) : (
        <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
          <FaInfoCircle className="text-gray-400 mt-0.5 shrink-0" size={15} />
          <p className="text-sm text-gray-600">
            Only customers who have purchased and received this product can
            leave a review.
          </p>
        </div>
      )}

      {/* Review List */}

      <div className="space-y-4">
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-3">
              <FaRegCommentDots size={17} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">
              No reviews yet
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Be the first customer to review this product.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductReviews;
