import OrderRow from "./OrderRow";

function OrderTable({ orders = [], loading, onView, onStatusChange }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
        <p className="text-sm text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-14 text-center">
        <h2 className="text-base font-semibold text-gray-900">
          No orders found
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Orders will appear here after customers purchase your products.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left">
              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Order ID
              </th>
              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Customer
              </th>
              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Items
              </th>
              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Payment
              </th>
              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Amount
              </th>
              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Date
              </th>
              <th className="px-6 py-3 text-center font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                onView={onView}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
