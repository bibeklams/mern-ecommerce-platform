import RatingStars from "./RatingStars";

function ReviewDetailsModal({ isOpen, review, onClose }) {
  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-5">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Review Details</h2>

            <p className="text-gray-500 mt-1">
              Review ID #{review._id.slice(-6).toUpperCase()}
            </p>
          </div>

          <button onClick={onClose} className="text-red-500 font-semibold">
            Close
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Product */}

          <div>
            <h3 className="text-xl font-semibold mb-4">Product</h3>

            <div className="flex gap-5">
              <img
                src={review.product?.images?.[0]?.secure_url}
                alt={review.product?.name}
                className="w-32 h-32 rounded-xl object-cover border"
              />

              <div>
                <h2 className="text-xl font-bold">{review.product?.name}</h2>

                <p className="text-gray-500 mt-2">
                  Brand : {review.product?.brand}
                </p>

                <p className="text-gray-500">
                  Price : Rs. {review.product?.finalPrice?.toLocaleString()}
                </p>

                <p className="text-gray-500">Stock : {review.product?.stock}</p>
              </div>
            </div>
          </div>

          {/* Customer */}

          <div>
            <h3 className="text-xl font-semibold mb-4">Customer</h3>

            <div className="bg-gray-100 rounded-xl p-5">
              <p>
                <strong>Name:</strong> {review.user?.name}
              </p>

              <p>
                <strong>Email:</strong> {review.user?.email}
              </p>
            </div>
          </div>

          {/* Rating */}

          <div>
            <h3 className="text-xl font-semibold mb-4">Rating</h3>

            <RatingStars rating={review.rating} size={24} />
          </div>

          {/* Comment */}

          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Review</h3>

            <div className="bg-gray-100 rounded-xl p-5">
              <p className="leading-8 text-gray-700">{review.comment}</p>
            </div>
          </div>

          {/* Footer */}

          <div className="border-t pt-5 flex justify-between">
            <div>
              <p className="text-gray-500">Review Date</p>

              <h4 className="font-semibold">
                {new Date(review.createdAt).toLocaleString()}
              </h4>
            </div>

            <button
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetailsModal;
import { FaTimes } from "react-icons/fa";

import RatingStars from "./RatingStars";

function ReviewDetailsModal({ isOpen, review, onClose }) {
  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-[2px] flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-gray-100 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Review Details
            </h2>

            <p className="text-sm text-gray-500 mt-0.5">
              Review #{review._id.slice(-6).toUpperCase()}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={15} />
          </button>
        </div>

        <div className="p-6 space-y-7">
          {/* Product */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Product
            </h3>

            <div className="flex gap-4">
              <div className="h-24 w-24 shrink-0 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={review.product?.images?.[0]?.secure_url}
                  alt={review.product?.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {review.product?.name}
                </h2>

                <div className="text-sm text-gray-500 mt-1.5 space-y-1">
                  <p>Brand: {review.product?.brand}</p>
                  <p>
                    Price: Rs.{" "}
                    {review.product?.finalPrice?.toLocaleString()}
                  </p>
                  <p>Stock: {review.product?.stock}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Customer
            </h3>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm space-y-1.5">
              <p className="text-gray-600">
                Name:{" "}
                <span className="font-medium text-gray-900">
                  {review.user?.name}
                </span>
              </p>
              <p className="text-gray-600">
                Email:{" "}
                <span className="font-medium text-gray-900">
                  {review.user?.email}
                </span>
              </p>
            </div>
          </div>

          {/* Rating */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Rating
            </h3>

            <RatingStars rating={review.rating} size={20} />
          </div>

          {/* Comment */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Customer Review
            </h3>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm leading-relaxed text-gray-700">
                {review.comment}
              </p>
            </div>
          </div>

          {/* Footer */}

          <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Review Date</p>

              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={onClose}
              className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetailsModal;