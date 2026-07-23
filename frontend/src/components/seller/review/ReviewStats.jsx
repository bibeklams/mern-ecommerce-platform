import { Star, MessageSquare } from "lucide-react";

function ReviewStats({ reviews = [] }) {
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  const fiveStar = reviews.filter((r) => r.rating === 5).length;
  const fourStar = reviews.filter((r) => r.rating === 4).length;
  const threeStar = reviews.filter((r) => r.rating === 3).length;
  const twoStar = reviews.filter((r) => r.rating === 2).length;
  const oneStar = reviews.filter((r) => r.rating === 1).length;

  const stats = [
    {
      title: "Total Reviews",
      value: totalReviews,
      icon: <MessageSquare size={16} />,
      iconBg: "bg-indigo-50",
      color: "text-indigo-600",
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: <Star size={16} />,
      iconBg: "bg-amber-50",
      color: "text-amber-500",
    },
    {
      title: "5 Star",
      value: fiveStar,
      icon: <Star size={16} />,
      iconBg: "bg-emerald-50",
      color: "text-emerald-600",
    },
    {
      title: "4 Star",
      value: fourStar,
      icon: <Star size={16} />,
      iconBg: "bg-emerald-50",
      color: "text-emerald-500",
    },
    {
      title: "3 Star",
      value: threeStar,
      icon: <Star size={16} />,
      iconBg: "bg-amber-50",
      color: "text-amber-500",
    },
    {
      title: "2 Star",
      value: twoStar,
      icon: <Star size={16} />,
      iconBg: "bg-red-50",
      color: "text-red-400",
    },
    {
      title: "1 Star",
      value: oneStar,
      icon: <Star size={16} />,
      iconBg: "bg-red-50",
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">{item.title}</p>

            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.iconBg} ${item.color}`}
            >
              {item.icon}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-2.5">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ReviewStats;
