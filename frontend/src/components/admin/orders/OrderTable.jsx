import OrderRow from "./OrderRow";
import OrderSkeleton from "./OrderSkeleton";

function OrderTable({ orders = [], loading, onStatusUpdate, onPaymentUpdate }) {
  if (loading) {
    return <OrderSkeleton />;
  }

  if (!orders.length) {
    return (
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        py-20
        text-center
      "
      >
        <div
          className="
          w-16
          h-16
          rounded-full
          bg-gray-100
          flex
          items-center
          justify-center
          text-2xl
          text-gray-400
          mb-4
        "
        >
          📦
        </div>

        <h3
          className="
          text-lg
          font-semibold
          text-gray-900
        "
        >
          No orders found
        </h3>

        <p
          className="
          text-sm
          text-gray-500
          mt-1
        "
        >
          Orders will appear here once customers place orders.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      overflow-x-auto
    "
    >
      <table
        className="
        w-full
        text-sm
      "
      >
        <thead>
          <tr
            className="
            border-b
            bg-gray-50
            text-gray-500
            uppercase
            text-xs
            tracking-wider
          "
          >
            <th className="px-6 py-4 text-left">Order</th>

            <th className="px-6 py-4 text-left">Customer</th>

            <th className="px-6 py-4 text-left">Products</th>

            <th className="px-6 py-4 text-left">Amount</th>

            <th className="px-6 py-4 text-left">Payment</th>

            <th className="px-6 py-4 text-left">Status</th>

            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody
          className="
          divide-y
          divide-gray-100
        "
        >
          {orders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              onStatusUpdate={onStatusUpdate}
              onPaymentUpdate={onPaymentUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
