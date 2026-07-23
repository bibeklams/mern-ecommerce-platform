import { Star } from "lucide-react";

function RatingStars({ rating = 0, size = 18 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}

      <span className="ml-2 text-sm font-medium text-gray-600">({rating})</span>
    </div>
  );
}

export default RatingStars;
