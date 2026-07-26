function NotificationSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
        >
          <div className="flex gap-4">
            <div className="h-11 w-11 rounded-full bg-gray-200"></div>

            <div className="flex-1 space-y-3">
              <div className="h-4 w-48 rounded bg-gray-200"></div>

              <div className="h-3 w-full rounded bg-gray-200"></div>

              <div className="h-3 w-3/4 rounded bg-gray-200"></div>

              <div className="h-3 w-24 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationSkeleton;
