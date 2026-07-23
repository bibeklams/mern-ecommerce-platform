import OrderStatusBadge from "./OrderStatusBadge";
import StatusDropdown from "./StatusDropdown";

function OrderRow({ order, onView, onStatusChange }) {
  return (
    <tr className="hover:bg-gray-50/60 transition-colors">
      {/* Order ID */}
      <td className="px-6 py-3.5 font-medium text-gray-900">
        #{order._id.slice(-6).toUpperCase()}
      </td>

      {/* Customer */}
      <td className="px-6 py-3.5">
        <h3 className="font-medium text-gray-900">
          {order.shippingAddress?.fullName}
        </h3>

        <p className="text-xs text-gray-500 mt-0.5">
          {order.shippingAddress?.phone}
        </p>
      </td>

      {/* Items */}
      <td className="px-6 py-3.5 text-gray-700">
        <span className="font-medium text-gray-900">{order.items.length}</span>{" "}
        item{order.items.length > 1 ? "s" : ""}
      </td>

      {/* Payment */}
      <td className="px-6 py-3.5">
        <p className="font-medium text-gray-900">{order.paymentMethod}</p>

        <span
          className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-semibold ${
            order.paymentStatus === "PAID"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {order.paymentStatus}
        </span>
      </td>

      {/* Amount */}
      <td className="px-6 py-3.5 font-semibold text-gray-900">
        Rs. {order.totalAmount.toLocaleString()}
      </td>

      {/* Status */}
      <td className="px-6 py-3.5">
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      {/* Date */}
      <td className="px-6 py-3.5 text-gray-500">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-3.5">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onView(order)}
            className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold transition-colors"
          >
            View
          </button>

          <StatusDropdown
            currentStatus={order.orderStatus}
            onChange={(status) => onStatusChange(order._id, status)}
          />
        </div>
      </td>
    </tr>
  );
}

export default OrderRow;
