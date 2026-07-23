import ReviewRow from "./ReviewRow";

function ReviewTable({ reviews = [], loading, onView }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
        <p className="text-sm text-gray-500">Loading reviews...</p>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-14 text-center">
        <h2 className="text-base font-semibold text-gray-900">
          No reviews found
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Reviews from customers will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left">
              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Product
              </th>

              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Customer
              </th>

              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Rating
              </th>

              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Review
              </th>

              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Date
              </th>

              <th className="px-6 py-3 text-center font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {reviews.map((review) => (
              <ReviewRow key={review._id} review={review} onView={onView} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewTable;
