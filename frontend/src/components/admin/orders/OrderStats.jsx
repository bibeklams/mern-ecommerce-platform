import {
  FaBox,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
} from "react-icons/fa";

function OrderStats({ orders = [] }) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "PENDING",
  ).length;

  const processingOrders = orders.filter(
    (order) => order.orderStatus === "PROCESSING",
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.orderStatus === "SHIPPED",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "DELIVERED",
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "CANCELLED",
  ).length;

  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "PAID")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <FaBox />,
      color: "bg-blue-50 text-blue-600",
    },

    {
      title: "Pending",
      value: pendingOrders,
      icon: <FaClock />,
      color: "bg-yellow-50 text-yellow-600",
    },

    {
      title: "Processing",
      value: processingOrders,
      icon: <FaTruck />,
      color: "bg-purple-50 text-purple-600",
    },

    {
      title: "Delivered",
      value: deliveredOrders,
      icon: <FaCheckCircle />,
      color: "bg-green-50 text-green-600",
    },

    {
      title: "Cancelled",
      value: cancelledOrders,
      icon: <FaTimesCircle />,
      color: "bg-red-50 text-red-600",
    },

    {
      title: "Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <FaDollarSign />,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-6
      gap-4
      mb-8
    "
    >
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
              bg-white
              border
              border-gray-200
              rounded-2xl
              p-5
              shadow-sm
              hover:shadow-md
              transition
            "
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="
                  text-sm
                  text-gray-500
                  font-medium
                "
              >
                {stat.title}
              </p>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-gray-900
                  mt-2
                "
              >
                {stat.value}
              </h3>
            </div>

            <div
              className={`
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-lg
                  ${stat.color}
                `}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderStats;
