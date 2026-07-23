import RatingStars from "./RatingStars";

function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      {/* Header */}

      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={
              review.user?.imageUrl || "https://ui-avatars.com/api/?name=User"
            }
            alt={review.user?.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-100"
          />

          <div>
            <h3 className="font-semibold text-sm text-gray-900">
              {review.user?.name}
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <RatingStars rating={review.rating} size={15} />
      </div>

      {/* Comment */}

      <p className="mt-4 text-sm text-gray-600 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
}

export default ReviewCard;
