import {
  FaClock,
  FaCog,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaCreditCard,
} from "react-icons/fa";

function OrderStatusBadge({ status, type = "order" }) {
  const orderStatus = {
    PENDING: {
      label: "Pending",
      icon: <FaClock />,
      className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },

    PROCESSING: {
      label: "Processing",
      icon: <FaCog />,
      className: "bg-blue-50 text-blue-700 border-blue-200",
    },

    SHIPPED: {
      label: "Shipped",
      icon: <FaTruck />,
      className: "bg-purple-50 text-purple-700 border-purple-200",
    },

    DELIVERED: {
      label: "Delivered",
      icon: <FaCheckCircle />,
      className: "bg-green-50 text-green-700 border-green-200",
    },

    CANCELLED: {
      label: "Cancelled",
      icon: <FaTimesCircle />,
      className: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const paymentStatus = {
    PENDING: {
      label: "Pending",
      icon: <FaClock />,
      className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },

    PAID: {
      label: "Paid",
      icon: <FaCreditCard />,
      className: "bg-green-50 text-green-700 border-green-200",
    },

    FAILED: {
      label: "Failed",
      icon: <FaTimesCircle />,
      className: "bg-red-50 text-red-700 border-red-200",
    },

    REFUNDED: {
      label: "Refunded",
      icon: <FaCreditCard />,
      className: "bg-gray-50 text-gray-700 border-gray-200",
    },
  };

  const config =
    type === "payment" ? paymentStatus[status] : orderStatus[status];

  if (!config) {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          bg-gray-100
          text-gray-600
        "
      >
        Unknown
      </span>
    );
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        border
        ${config.className}
      `}
    >
      {config.icon}

      {config.label}
    </span>
  );
}

export default OrderStatusBadge;
