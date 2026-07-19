import api from "../api/api";

// ==============================
// User
// ==============================

// Create Order
export const createOrder = async (data) => {
  const response = await api.post("/order", data);
  return response.data;
};

// My Orders
export const getMyOrders = async () => {
  const response = await api.get("/order/my-orders");
  return response.data;
};

// Single Order
export const getSingleOrder = async (orderId) => {
  const response = await api.get(`/order/${orderId}`);
  return response.data;
};

// Cancel Order
export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/order/${orderId}/cancel`);
  return response.data;
};

// ==============================
// Seller
// ==============================

// Seller Orders
export const getSellerOrders = async () => {
  const response = await api.get("/order/seller/orders");
  return response.data;
};

// Update Order Status
export const sellerUpdateOrderStatus = async ({ orderId, orderStatus }) => {
  const response = await api.patch(`/order/seller/orders/${orderId}/status`, {
    orderStatus,
  });

  return response.data;
};

// ==============================
// Admin
// ==============================

// Get All Orders
export const getAllOrders = async () => {
  const response = await api.get("/order");
  return response.data;
};

// Update Order Status
export const adminUpdateOrderStatus = async ({ orderId, orderStatus }) => {
  const response = await api.patch(`/order/${orderId}/status`, {
    orderStatus,
  });

  return response.data;
};

// Update Payment Status
export const updatePaymentStatus = async ({ orderId, paymentStatus }) => {
  const response = await api.patch(`/order/${orderId}/payment-status`, {
    paymentStatus,
  });

  return response.data;
};
