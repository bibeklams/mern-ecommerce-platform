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
      icon: <MessageSquare size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: <Star size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "5 Star",
      value: fiveStar,
      icon: <Star size={28} />,
      color: "bg-green-500",
    },
    {
      title: "4 Star",
      value: fourStar,
      icon: <Star size={28} />,
      color: "bg-emerald-500",
    },
    {
      title: "3 Star",
      value: threeStar,
      icon: <Star size={28} />,
      color: "bg-orange-500",
    },
    {
      title: "2 Star",
      value: twoStar,
      icon: <Star size={28} />,
      color: "bg-red-400",
    },
    {
      title: "1 Star",
      value: oneStar,
      icon: <Star size={28} />,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-5">
      {stats.map((item) => (
        <div key={item.title} className="bg-white rounded-xl border shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>

              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>

            <div className={`${item.color} text-white p-3 rounded-xl`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewStats;
