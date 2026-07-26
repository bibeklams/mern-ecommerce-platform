function OrderSkeleton() {
  return (
    <div className="space-y-5">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-100 mt-2" />
            </div>

            <div className="h-7 w-24 rounded-full bg-gray-200" />
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <div>
              <div className="h-3 w-16 rounded bg-gray-200 mb-2" />
              <div className="h-6 w-24 rounded bg-gray-100" />
            </div>

            <div>
              <div className="h-3 w-16 rounded bg-gray-200 mb-2" />
              <div className="h-5 w-12 rounded bg-gray-100" />
            </div>

            <div>
              <div className="h-3 w-16 rounded bg-gray-200 mb-2" />
              <div className="h-6 w-28 rounded bg-gray-100" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <div className="h-10 w-32 rounded-lg bg-gray-200" />
            <div className="h-10 w-36 rounded-lg bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderSkeleton;
