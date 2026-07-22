import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardStats from "../../components/seller/DashboardStats";
import RevenueCard from "../../components/seller/RevenueCard";
import WeeklyRevenueChart from "../../components/seller/WeeklyRevenueChart";
import LowStockProducts from "../../components/seller/LowStockProducts";

import { getSellerDashboard } from "../../redux/thunks/dashboardThunk";

function Dashboard() {
  const dispatch = useDispatch();

  const { sellerDashboard, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getSellerDashboard());
  }, [dispatch]);

  const handleEditProduct = (product) => {
    console.log(product);
    // Later navigate to Edit Product page
    // navigate(`/seller/products/edit/${product._id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin" />
        <p className="text-sm text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your store performance
        </p>
      </div>

      <DashboardStats dashboard={sellerDashboard} />

      <div className="grid lg:grid-cols-2 gap-4">
        <RevenueCard
          title="Total Revenue"
          amount={sellerDashboard?.totalRevenue}
          bgColor="bg-white"
          textColor="text-black"
        />

        <RevenueCard
          title="Today's Revenue"
          amount={sellerDashboard?.dailyRevenue}
        />
      </div>

      <WeeklyRevenueChart weeklyRevenue={sellerDashboard?.weeklyRevenue} />

      <LowStockProducts
        products={sellerDashboard?.lowStockProducts}
        onEdit={handleEditProduct}
      />
    </main>
  );
}

export default Dashboard;
