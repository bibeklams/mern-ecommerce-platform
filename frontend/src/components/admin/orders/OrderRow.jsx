import OrderActionMenu from "./OrderActionMenu";
import OrderStatusBadge from "./OrderStatusBadge";
import { FaBox } from "react-icons/fa";

function OrderRow({ order, onStatusUpdate, onPaymentUpdate }) {
  return (
    <tr
      className="
        hover:bg-gray-50
        transition
      "
    >
      {/* Order ID */}

      <td className="px-6 py-4">
        <div>
          <p
            className="
            font-semibold
            text-gray-900
          "
          >
            #{order._id.slice(-8)}
          </p>

          <p
            className="
            text-xs
            text-gray-500
            mt-1
          "
          >
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </td>

      {/* Customer */}

      <td className="px-6 py-4">
        <p
          className="
          font-medium
          text-gray-900
        "
        >
          {order.user?.name || "Guest"}
        </p>

        <p
          className="
          text-xs
          text-gray-500
        "
        >
          {order.user?.email}
        </p>
      </td>

      {/* Products */}

      <td className="px-6 py-4">
        <div
          className="
          flex
          items-center
          gap-2
        "
        >
          <div
            className="
            flex
            -space-x-3
          "
          >
            {order.items?.slice(0, 3).map((item, index) => (
              <img
                key={index}
                src={item.image?.secure_url}
                alt={item.name}
                className="
                    w-9
                    h-9
                    rounded-full
                    object-cover
                    border-2
                    border-white
                  "
              />
            ))}
          </div>

          <div>
            <p
              className="
              flex
              items-center
              gap-1
              text-sm
              font-medium
            "
            >
              <FaBox className="text-gray-400" />

              {order.items?.length}
            </p>

            <p
              className="
              text-xs
              text-gray-500
            "
            >
              items
            </p>
          </div>
        </div>
      </td>

      {/* Amount */}

      <td className="px-6 py-4">
        <p
          className="
          font-semibold
          text-gray-900
        "
        >
          ${order.totalAmount?.toLocaleString()}
        </p>

        <p
          className="
          text-xs
          text-gray-500
        "
        >
          {order.paymentMethod}
        </p>
      </td>

      {/* Payment */}

      <td className="px-6 py-4">
        <OrderStatusBadge type="payment" status={order.paymentStatus} />
      </td>

      {/* Order Status */}

      <td className="px-6 py-4">
        <OrderStatusBadge type="order" status={order.orderStatus} />
      </td>

      {/* Action */}

      <td
        className="
        px-6
        py-4
        text-right
      "
      >
        <OrderActionMenu
          order={order}
          onStatusUpdate={onStatusUpdate}
          onPaymentUpdate={onPaymentUpdate}
        />
      </td>
    </tr>
  );
}

export default OrderRow;
