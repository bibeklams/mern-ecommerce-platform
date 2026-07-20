import api from "../api/api";

// Admin Dashboard
export const getAdminDashboard = async () => {
  const response = await api.get("/dashboard/admin");
  return response.data;
};

// Seller Dashboard
export const getSellerDashboard = async () => {
  const response = await api.get("/dashboard/seller");
  return response.data;
};
