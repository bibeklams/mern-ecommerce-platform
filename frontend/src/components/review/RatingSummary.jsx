import RatingStars from "./RatingStars";

function RatingSummary({ reviews = [] }) {
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  let totalRating = 0;

  reviews.forEach((review) => {
    const rating = Number(review.rating);

    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    totalRating += rating;
  });

  const totalReviews = reviews.length;

  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0">
          <h2 className="text-4xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </h2>

          <div className="mt-2.5">
            <RatingStars rating={averageRating} size={18} />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Right */}
        <div className="space-y-2.5 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star];

            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-3">
                <span className="w-10 text-sm font-medium text-gray-600">
                  {star} ★
                </span>

                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-1.5 bg-amber-400 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <span className="w-6 text-xs text-right text-gray-500">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RatingSummary;
