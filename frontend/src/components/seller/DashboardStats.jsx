import {
  Package,
  CheckCircle,
  AlertTriangle,
  Boxes,
  ShoppingCart,
  Clock3,
  Truck,
  XCircle,
} from "lucide-react";

import StatCard from "./StatCard";

function DashboardStats({ dashboard }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Total Products"
        value={dashboard?.totalProducts || 0}
        icon={<Package size={18} />}
        iconBg="bg-indigo-50"
        color="text-indigo-600"
      />

      <StatCard
        title="Active Products"
        value={dashboard?.activeProducts || 0}
        icon={<CheckCircle size={18} />}
        iconBg="bg-emerald-50"
        color="text-emerald-600"
      />

      <StatCard
        title="Out of Stock"
        value={dashboard?.outOfStockProducts || 0}
        icon={<Boxes size={18} />}
        iconBg="bg-red-50"
        color="text-red-500"
      />

      <StatCard
        title="Low Stock"
        value={dashboard?.lowStockProducts?.length || 0}
        icon={<AlertTriangle size={18} />}
        iconBg="bg-amber-50"
        color="text-amber-500"
      />

      <StatCard
        title="Total Orders"
        value={dashboard?.totalOrders || 0}
        icon={<ShoppingCart size={18} />}
        iconBg="bg-gray-100"
        color="text-gray-700"
      />

      <StatCard
        title="Pending"
        value={dashboard?.pendingOrders || 0}
        icon={<Clock3 size={18} />}
        iconBg="bg-amber-50"
        color="text-amber-500"
      />

      <StatCard
        title="Delivered"
        value={dashboard?.deliveredOrders || 0}
        icon={<Truck size={18} />}
        iconBg="bg-emerald-50"
        color="text-emerald-600"
      />

      <StatCard
        title="Cancelled"
        value={dashboard?.cancelledOrders || 0}
        icon={<XCircle size={18} />}
        iconBg="bg-red-50"
        color="text-red-500"
      />
    </div>
  );
}

export default DashboardStats;
