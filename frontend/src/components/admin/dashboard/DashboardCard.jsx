import {
  FaUsers,
  FaStore,
  FaBox,
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartLine,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const icons = {
  users: <FaUsers />,
  sellers: <FaStore />,
  products: <FaBox />,
  orders: <FaShoppingCart />,
  revenue: <FaMoneyBillWave />,
  todayRevenue: <FaChartLine />,
  pending: <FaClock />,
  delivered: <FaCheckCircle />,
};

const iconStyles = {
  users: "bg-indigo-50 text-indigo-600",
  sellers: "bg-violet-50 text-violet-600",
  products: "bg-blue-50 text-blue-600",
  orders: "bg-gray-100 text-gray-700",
  revenue: "bg-gray-900 text-white",
  todayRevenue: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-500",
  delivered: "bg-emerald-50 text-emerald-600",
};

function DashboardCard({ title, value, type = "orders", description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors duration-200">
      <div className="flex items-center justify-between gap-4">
        {/* Text */}

        <div className="min-w-0">
          <p className="text-sm text-gray-500 font-medium">{title}</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-2 truncate">
            {value}
          </h2>

          {description && (
            <p className="text-xs text-gray-400 mt-1.5">{description}</p>
          )}
        </div>

        {/* Icon */}

        <div
          className={`h-11 w-11 shrink-0 rounded-lg flex items-center justify-center text-base ${
            iconStyles[type] || "bg-gray-100 text-gray-700"
          }`}
        >
          {icons[type]}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
