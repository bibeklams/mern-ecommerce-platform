import { Star } from "lucide-react";

function RatingStars({ rating = 0, size = 18 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
          }
        />
      ))}

      <span className="ml-1.5 text-sm font-medium text-gray-500">
        ({rating})
      </span>
    </div>
  );
}

export default RatingStars;
