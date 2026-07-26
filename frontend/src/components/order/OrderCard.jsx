import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

function OrderCard({ order, onCancel }) {
  const canCancel =
    order.orderStatus === "PENDING" || order.orderStatus === "PROCESSING";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold">
            Order #{order._id.slice(-6).toUpperCase()}
          </h2>

          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <OrderStatusBadge status={order.orderStatus} />
      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500">Payment</p>

          <PaymentStatusBadge status={order.paymentStatus} />
        </div>

        <div>
          <p className="text-xs text-gray-500">Items</p>

          <p>{order.items.length}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Total</p>

          <p className="font-bold">Rs. {order.totalAmount.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          to={`/orders/${order._id}`}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm"
        >
          View Details
        </Link>

        {canCancel && (
          <button
            onClick={() => onCancel(order)}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
