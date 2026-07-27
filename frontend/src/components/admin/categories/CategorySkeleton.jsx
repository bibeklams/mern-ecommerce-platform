function CategorySkeleton() {
  return (
    <div
      className="
        bg-white
        border
        rounded-xl
        overflow-hidden
        animate-pulse
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                {/* Image */}
                <td className="px-6 py-4">
                  <div
                    className="
                        w-12
                        h-12
                        rounded-lg
                        bg-gray-200
                      "
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-4">
                  <div
                    className="
                        h-4
                        w-32
                        bg-gray-200
                        rounded
                      "
                  />
                </td>

                {/* Description */}
                <td className="px-6 py-4">
                  <div
                    className="
                        h-4
                        w-56
                        bg-gray-200
                        rounded
                      "
                  />
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <div
                    className="
                        h-4
                        w-24
                        bg-gray-200
                        rounded
                      "
                  />
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <div
                      className="
                          h-9
                          w-9
                          bg-gray-200
                          rounded-lg
                        "
                    />

                    <div
                      className="
                          h-9
                          w-9
                          bg-gray-200
                          rounded-lg
                        "
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategorySkeleton;
