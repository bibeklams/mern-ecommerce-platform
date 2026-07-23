import ReviewRow from "./ReviewRow";

function ReviewTable({ reviews = [], loading, onView }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border shadow p-10 text-center">
        <p className="text-gray-500">Loading reviews...</p>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="bg-white rounded-xl border shadow p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Reviews Found
        </h2>

        <p className="text-gray-500 mt-2">
          Reviews from customers will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="px-6 py-4">Product</th>

              <th className="px-6 py-4">Customer</th>

              <th className="px-6 py-4">Rating</th>

              <th className="px-6 py-4">Review</th>

              <th className="px-6 py-4">Date</th>

              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
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
