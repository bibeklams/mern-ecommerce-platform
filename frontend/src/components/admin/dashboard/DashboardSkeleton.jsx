function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-8 w-64 bg-gray-200 rounded-lg"></div>
        <div className="h-4 w-96 bg-gray-200 rounded mt-3"></div>
      </div>

      {/* Cards Skeleton */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-6
                h-32
              "
          >
            <div className="h-4 w-24 bg-gray-200 rounded"></div>

            <div
              className="
                h-8
                w-20
                bg-gray-200
                rounded
                mt-5
              "
            ></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      "
      >
        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            h-96
          "
        />

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            h-96
          "
        />
      </div>

      {/* Bottom Section */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          h-80
        "
      />
    </div>
  );
}

export default DashboardSkeleton;
