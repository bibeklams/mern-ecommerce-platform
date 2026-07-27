import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAdminDashboard } from "../../redux/thunks/dashboardThunk";

import DashboardCard from "../../components/admin/dashboard/DashboardCard";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import OrderChart from "../../components/admin/dashboard/OrderChart";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";
import LowStockProducts from "../../components/admin/dashboard/LowStockProducts";
import DashboardSkeleton from "../../components/admin/dashboard/DashboardSkeleton";

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

function Dashboard() {
  const dispatch = useDispatch();

  const { adminDashboard, loading, error } = useSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
        p-6
        text-red-500
      "
      >
        {error}
      </div>
    );
  }

  if (!adminDashboard) {
    return null;
  }

  const {
    totalUsers,
    totalSellers,

    totalProducts,

    totalOrders,

    totalRevenue,
    dailyRevenue,
    weeklyRevenue,
    monthlyRevenue,

    totalPendingOrders,
    totalDeliveredOrders,
    totalCancelledOrders,

    totalProcessingOrders,
    totalShippedOrders,

    recentOrders,
    lowStockProducts,
  } = adminDashboard;
  console.log("weeklyRevenue:", weeklyRevenue);
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Dashboard Header */}

      <div
        className="
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-4
    "
      >
        <div>
          <h1
            className="
          text-3xl
          font-bold
          text-gray-900
        "
          >
            Admin Dashboard
          </h1>

          <p
            className="
          text-sm
          text-gray-500
          mt-1
        "
          >
            Track your ShopVerse growth and performance.
          </p>
        </div>

        <button
          onClick={() => dispatch(getAdminDashboard())}
          className="
          px-4
          py-2
          rounded-lg
          bg-gray-900
          text-white
          text-sm
          font-medium
          hover:bg-gray-800
        "
        >
          Refresh
        </button>
      </div>

      {/* Overview Section */}

      <section>
        <h2
          className="
        text-lg
        font-semibold
        mb-4
        text-gray-900
      "
        >
          Overview
        </h2>

        <div
          className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5
      "
        >
          <DashboardCard
            title="Users"
            value={totalUsers}
            type="users"
            description="Total customers"
          />

          <DashboardCard
            title="Sellers"
            value={totalSellers}
            type="sellers"
            description="Active sellers"
          />

          <DashboardCard
            title="Products"
            value={totalProducts}
            type="products"
            description="Listed products"
          />

          <DashboardCard
            title="Orders"
            value={totalOrders}
            type="orders"
            description="Total orders"
          />
        </div>
      </section>

      {/* Revenue Section */}

      <section>
        <h2
          className="
        text-lg
        font-semibold
        mb-4
        text-gray-900
      "
        >
          Revenue Analytics
        </h2>

        <div
          className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        mb-6
      "
        >
          <DashboardCard
            title="Today Revenue"
            value={`$ ${dailyRevenue}`}
            type="revenue"
          />

          <DashboardCard
            title="Monthly Revenue"
            value={`$ ${monthlyRevenue}`}
            type="revenue"
          />

          <DashboardCard
            title="Total Revenue"
            value={`$ ${totalRevenue}`}
            type="revenue"
          />
        </div>

        <RevenueChart data={weeklyRevenue} />
      </section>

      {/* Order Analytics */}

      <section>
        <h2
          className="
        text-lg
        font-semibold
        mb-4
      "
        >
          Order Analytics
        </h2>

        <div
          className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-5
      "
        >
          <div className="xl:col-span-2">
            <OrderChart
              data={{
                pending: totalPendingOrders,
                processing: totalProcessingOrders,
                shipped: totalShippedOrders,
                delivered: totalDeliveredOrders,
                cancelled: totalCancelledOrders,
              }}
            />
          </div>

          <div
            className="
          bg-white
          rounded-xl
          border
          border-gray-200
          p-5
          space-y-4
        "
          >
            <h3
              className="
            font-semibold
            text-gray-900
          "
            >
              Order Status
            </h3>

            <DashboardCard
              title="Pending"
              value={totalPendingOrders}
              type="pending"
            />

            <DashboardCard
              title="Delivered"
              value={totalDeliveredOrders}
              type="delivered"
            />

            <DashboardCard
              title="Cancelled"
              value={totalCancelledOrders}
              type="orders"
            />
          </div>
        </div>
      </section>

      {/* Management Section */}

      <section>
        <h2
          className="
        text-lg
        font-semibold
        mb-4
      "
        >
          Store Management
        </h2>

        <div
          className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      "
        >
          <RecentOrders orders={recentOrders} />

          <LowStockProducts products={lowStockProducts} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
