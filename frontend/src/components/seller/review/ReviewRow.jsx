import RatingStars from "./RatingStars";

function ReviewRow({ review, onView }) {
  return (
    <tr className="hover:bg-gray-50/60 transition-colors">
      {/* Product */}
      <td className="px-6 py-3.5">
        <div className="flex items-center gap-3.5">
          <div className="h-14 w-14 shrink-0 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
            <img
              src={review.product?.images?.[0]?.secure_url}
              alt={review.product?.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div>
            <h3 className="font-medium text-gray-900">
              {review.product?.name}
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              {review.product?.brand}
            </p>
          </div>
        </div>
      </td>

      {/* Customer */}
      <td className="px-6 py-3.5">
        <h3 className="font-medium text-gray-900">{review.user?.name}</h3>

        <p className="text-xs text-gray-500 mt-0.5">{review.user?.email}</p>
      </td>

      {/* Rating */}
      <td className="px-6 py-3.5">
        <RatingStars rating={review.rating} />
      </td>

      {/* Comment */}
      <td className="px-6 py-3.5 max-w-sm">
        <p className="text-gray-600 text-sm line-clamp-2">{review.comment}</p>
      </td>

      {/* Date */}
      <td className="px-6 py-3.5 text-gray-500">
        {new Date(review.createdAt).toLocaleDateString()}
      </td>

      {/* Action */}
      <td className="px-6 py-3.5 text-center">
        <button
          onClick={() => onView(review)}
          className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold transition-colors"
        >
          View
        </button>
      </td>
    </tr>
  );
}

export default ReviewRow;
