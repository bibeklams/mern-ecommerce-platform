import { FaStar, FaRegStar } from "react-icons/fa";

function RatingStars({ rating = 0, size = 18 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <FaStar key={star} size={size} className="text-amber-400" />
        ) : (
          <FaRegStar key={star} size={size} className="text-gray-300" />
        ),
      )}
    </div>
  );
}

export default RatingStars;
