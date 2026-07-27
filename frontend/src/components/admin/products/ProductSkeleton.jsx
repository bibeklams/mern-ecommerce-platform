function ProductSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="animate-pulse">
        {/* Header */}
        <div className="grid grid-cols-9 gap-4 px-6 py-4 border-b bg-gray-50">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded" />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
              grid
              grid-cols-9
              gap-4
              items-center
              px-6
              py-5
              border-b
            "
          >
            {/* Product */}
            <div className="flex items-center gap-3 col-span-1">
              <div className="w-14 h-14 rounded-lg bg-gray-200"></div>

              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-200 rounded"></div>

                <div className="w-20 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Seller */}
            <div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>

              <div className="w-20 h-3 bg-gray-200 rounded mt-2"></div>
            </div>

            {/* Category */}
            <div>
              <div className="w-20 h-7 bg-gray-200 rounded-full"></div>
            </div>

            {/* Price */}
            <div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>

              <div className="w-12 h-3 bg-gray-200 rounded mt-2"></div>
            </div>

            {/* Stock */}
            <div>
              <div className="w-10 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Status */}
            <div>
              <div className="w-20 h-7 bg-gray-200 rounded-full"></div>
            </div>

            {/* Featured */}
            <div>
              <div className="w-24 h-7 bg-gray-200 rounded-full"></div>
            </div>

            {/* Created */}
            <div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Action */}
            <div className="flex justify-end">
              <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSkeleton;
