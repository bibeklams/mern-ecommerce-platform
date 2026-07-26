import { Link } from "react-router-dom";

function RecentOrders({ orders = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}

      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>

        <p className="text-xs text-gray-500 mt-0.5">Latest customer orders</p>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Order ID
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Customer
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Amount
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Payment
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Status
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Date
              </th>

              <th className="px-6 py-3 text-right font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-sm text-gray-500"
                >
                  No recent orders.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-6 py-3.5 font-medium text-gray-900">
                    #{order._id.slice(-8)}
                  </td>

                  <td className="px-6 py-3.5">
                    <p className="font-medium text-gray-900">
                      {order.user?.name || "Guest"}
                    </p>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.user?.email}
                    </p>
                  </td>

                  <td className="px-6 py-3.5 font-semibold text-gray-900">
                    ${order.totalAmount?.toLocaleString()}
                  </td>

                  <td className="px-6 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === "PAID"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="px-6 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "DELIVERED"
                          ? "bg-emerald-50 text-emerald-700"
                          : order.orderStatus === "CANCELLED"
                            ? "bg-red-50 text-red-600"
                            : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-6 py-3.5 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-3.5 text-right">
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;
