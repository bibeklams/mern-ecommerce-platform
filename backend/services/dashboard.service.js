import * as userRepository from "../repositories/user.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import * as orderRepository from "../repositories/order.repository.js";
import * as dashboardRepository from "../repositories/dashboard.repository.js";

export const getAdminDashboard = async () => {
  const totalUsers = await userRepository.countUsers({
    role: "USER",
    isVerified: true,
  });

  const totalSellers = await userRepository.countUsers({
    role: "SELLER",
    isVerified: true,
  });

  const pendingSellers = await userRepository.countUsers({
    sellerStatus: "PENDING",
  });

  const totalProducts = await productRepository.countProducts();

  const totalOrders = await orderRepository.countOrders();

  const totalPendingOrders = await orderRepository.countOrders({
    orderStatus: "PENDING",
  });

  const totalCancelledOrders = await orderRepository.countOrders({
    orderStatus: "CANCELLED",
  });

  const totalDeliveredOrders = await orderRepository.countOrders({
    orderStatus: "DELIVERED",
  });

  const revenueResult = await dashboardRepository.totalRevenue();

  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  const monthlyRevenue = await dashboardRepository.getMonthlyRevenue();

  const recentOrders = await orderRepository.recentOrders();

  const lowStockProducts = await productRepository.lowStockProducts();

  return {
    totalUsers,
    totalSellers,
    pendingSellers,

    totalProducts,
    lowStockProducts,

    totalOrders,
    totalPendingOrders,
    totalCancelledOrders,
    totalDeliveredOrders,

    totalRevenue,
    monthlyRevenue,

    recentOrders,
  };
};
export const getSellerDashboard = async (sellerId) => {
  const totalProducts = await productRepository.countProducts({
    seller: sellerId,
  });

  const activeProducts = await productRepository.countProducts({
    seller: sellerId,
    status: "ACTIVE",
  });

  const outOfStockProducts = await productRepository.countProducts({
    seller: sellerId,
    status: "OUT_OF_STOCK",
  });

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

  const revenueResult = await dashboardRepository.sellerRevenue(sellerId);

  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  const lowStockProducts = await productRepository.lowStockProducts({
    seller: sellerId,
    stock: { $lte: 5 },
  });

  return {
    totalProducts,
    activeProducts,
    outOfStockProducts,

    totalOrders,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,

    totalRevenue,

    lowStockProducts,
  };
};
