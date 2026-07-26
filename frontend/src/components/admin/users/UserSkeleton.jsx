function UserSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {Array.from({ length: 6 }).map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {Array.from({ length: 6 }).map((_, row) => (
              <tr key={row} className="border-b border-gray-100">
                {/* User */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                          w-10
                          h-10
                          rounded-full
                          bg-gray-200
                          animate-pulse
                        "
                    />

                    <div className="space-y-2">
                      <div
                        className="
                            h-3
                            w-28
                            bg-gray-200
                            rounded
                            animate-pulse
                          "
                      />

                      <div
                        className="
                            h-2
                            w-16
                            bg-gray-100
                            rounded
                            animate-pulse
                          "
                      />
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  <div
                    className="
                        h-3
                        w-36
                        bg-gray-200
                        rounded
                        animate-pulse
                      "
                  />
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <div
                    className="
                        h-6
                        w-16
                        bg-gray-200
                        rounded-full
                        animate-pulse
                      "
                  />
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div
                    className="
                        h-6
                        w-20
                        bg-gray-200
                        rounded-full
                        animate-pulse
                      "
                  />
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <div
                    className="
                        h-3
                        w-24
                        bg-gray-200
                        rounded
                        animate-pulse
                      "
                  />
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <div
                    className="
                        h-9
                        w-9
                        ml-auto
                        bg-gray-200
                        rounded-lg
                        animate-pulse
                      "
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserSkeleton;
