function OrderSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr
            className="
            border-b
            bg-gray-50
          "
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <th key={index} className="px-6 py-4">
                <div
                  className="
                    h-3
                    w-20
                    bg-gray-200
                    rounded
                    animate-pulse
                  "
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, row) => (
            <tr
              key={row}
              className="
                  border-b
                "
            >
              {Array.from({ length: 7 }).map((_, col) => (
                <td
                  key={col}
                  className="
                        px-6
                        py-5
                      "
                >
                  <div
                    className={`
                          h-4
                          rounded
                          bg-gray-200
                          animate-pulse
                          ${col === 1 ? "w-32" : col === 2 ? "w-24" : "w-16"}
                        `}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderSkeleton;
