import * as userRepository from "../repositories/user.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import * as orderRepository from "../repositories/order.repository.js";

// =======================
// Admin Dashboard
// =======================
export const getAdminDashboard = async () => {
  // =======================
  // Users
  // =======================

  const totalUsers = await userRepository.countUsers({
    role: "USER",
    isVerified: true,
  });

  // =======================
  // Sellers
  // =======================

  const totalSellers = await userRepository.countUsers({
    role: "SELLER",
    isVerified: true,
  });

  const pendingSellers = await userRepository.countUsers({
    sellerStatus: "PENDING",
  });

  // =======================
  // Products
  // =======================

  const totalProducts = await productRepository.countProducts();

  const lowStockProducts = await productRepository.lowStockProducts();

  // =======================
  // Orders
  // =======================

  const totalOrders = await orderRepository.countOrders();

  const totalPendingOrders = await orderRepository.countOrders({
    orderStatus: "PENDING",
  });

  const totalProcessingOrders = await orderRepository.countOrders({
    orderStatus: "PROCESSING",
  });

  const totalShippedOrders = await orderRepository.countOrders({
    orderStatus: "SHIPPED",
  });

  const totalDeliveredOrders = await orderRepository.countOrders({
    orderStatus: "DELIVERED",
  });

  const totalCancelledOrders = await orderRepository.countOrders({
    orderStatus: "CANCELLED",
  });

  // =======================
  // Revenue
  // =======================

  // Total Revenue

  const revenueResult = await orderRepository.totalRevenue();

  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  // Today's Revenue

  const dailyRevenueResult = await orderRepository.getDailyRevenue();

  const dailyRevenue = dailyRevenueResult[0]?.totalRevenue || 0;

  // Current Month Revenue

  const monthlyRevenueResult = await orderRepository.getMonthlyRevenue();

  const monthlyRevenue = monthlyRevenueResult[0]?.totalRevenue || 0;

  // =======================
  // Weekly Revenue Chart
  // =======================

  const weeklyRevenueResult = await orderRepository.getWeeklyRevenue();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyRevenue = days.map((day, index) => {
    const found = weeklyRevenueResult.find((item) => item.date === index + 1);

    return {
      day,
      revenue: found?.revenue || 0,
    };
  });

  // =======================
  // Recent Orders
  // =======================

  const recentOrders = await orderRepository.recentOrders();

  // =======================
  // Final Response
  // =======================

  return {
    // Users

    totalUsers,
    totalSellers,
    pendingSellers,

    // Products

    totalProducts,
    lowStockProducts,

    // Orders

    totalOrders,
    totalPendingOrders,
    totalProcessingOrders,
    totalShippedOrders,
    totalDeliveredOrders,
    totalCancelledOrders,

    // Revenue

    totalRevenue,
    dailyRevenue,
    monthlyRevenue,
    weeklyRevenue,

    // Recent Orders

    recentOrders,
  };
};
// =======================
// Seller Dashboard
// =======================

export const getSellerDashboard = async (sellerId) => {
  const cacheKey = `seller-dashboard:${sellerId}`;
  const cache = await redis.get(cacheKey);
  if (cache) {
    return JSON.parse(cache);
  }
  const totalProducts = await productRepository.countProducts({
    seller: sellerId,
  });

  const activeProducts = await productRepository.countProducts({
    seller: sellerId,
    status: "ACTIVE",
  });

  const outOfStockProducts = await productRepository.countProducts({
    seller: sellerId,
    stock: 0,
  });

  const lowStockProducts = await productRepository.lowStockProducts({
    seller: sellerId,
    stock: { $lte: 5 },
  });

  // Orders

  const totalOrders = await orderRepository.countOrders({
    "items.seller": sellerId,
  });

  const pendingOrders = await orderRepository.countOrders({
    "items.seller": sellerId,
    orderStatus: "PENDING",
  });

  const deliveredOrders = await orderRepository.countOrders({
    "items.seller": sellerId,
    orderStatus: "DELIVERED",
  });

  const cancelledOrders = await orderRepository.countOrders({
    "items.seller": sellerId,
    orderStatus: "CANCELLED",
  });

  // Revenue

  const revenueResult = await orderRepository.sellerRevenue(sellerId);

  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  const dailyRevenueResult =
    await orderRepository.getSellerDailyRevenue(sellerId);

  const dailyRevenue = dailyRevenueResult[0]?.totalRevenue || 0;

  // Weekly Revenue

  const weeklyRevenueResult =
    await orderRepository.getSellerWeeklyRevenue(sellerId);
  console.log("Weekly Revenue Result:", weeklyRevenueResult);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyRevenue = days.map((day, index) => {
    const found = weeklyRevenueResult.find((item) => item._id === index + 1);

    return {
      day,
      revenue: found?.revenue || 0,
    };
  });

  const result = {
    totalProducts,
    activeProducts,
    outOfStockProducts,
    lowStockProducts,

    totalOrders,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,

    totalRevenue,
    dailyRevenue,
    weeklyRevenue,
  };
  await redis.set(cacheKey, JSON.stringify(result), "EX", 600);
  return result;
};
