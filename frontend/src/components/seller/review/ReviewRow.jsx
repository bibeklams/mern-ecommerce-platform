import RatingStars from "./RatingStars";

function ReviewRow({ review, onView }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      {/* Product */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={review.product?.images?.[0]?.secure_url}
            alt={review.product?.name}
            className="w-16 h-16 rounded-lg object-cover border"
          />

          <div>
            <h3 className="font-medium text-gray-800">
              {review.product?.name}
            </h3>

            <p className="text-sm text-gray-500">{review.product?.brand}</p>
          </div>
        </div>
      </td>

      {/* Customer */}
      <td className="px-6 py-4">
        <div>
          <h3 className="font-medium">{review.user?.name}</h3>

          <p className="text-sm text-gray-500">{review.user?.email}</p>
        </div>
      </td>

      {/* Rating */}
      <td className="px-6 py-4">
        <RatingStars rating={review.rating} />
      </td>

      {/* Comment */}
      <td className="px-6 py-4 max-w-sm">
        <p className="text-gray-700 line-clamp-2">{review.comment}</p>
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-gray-500">
        {new Date(review.createdAt).toLocaleDateString()}
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => onView(review)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          View
        </button>
      </td>
    </tr>
  );
}

export default ReviewRow;
