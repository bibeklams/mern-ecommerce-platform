function SellerSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {Array.from({ length: 6 }).map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {Array.from({ length: 8 }).map((_, row) => (
              <tr key={row} className="border-b border-gray-100">
                {/* Seller */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />

                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                      <div className="h-3 w-16 bg-gray-100 rounded" />
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  <div className="h-4 w-44 bg-gray-200 rounded" />
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div className="h-7 w-24 bg-gray-200 rounded-full" />
                </td>

                {/* Products */}

                {/* Joined */}
                <td className="px-6 py-4">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <div className="ml-auto h-9 w-9 rounded-lg bg-gray-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerSkeleton;
