import api from "../api/api";

// ==============================
// Public / User
// ==============================

// Profile
export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

// Single User
export const getSingleUser = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

// Apply For Seller
export const applyForSeller = async () => {
  const response = await api.post("/user/apply-seller");
  return response.data;
};

// ==============================
// Admin
// ==============================

// All Users
export const getAllUsers = async () => {
  const response = await api.get("/user");
  return response.data;
};

// All Sellers
export const getAllSellers = async () => {
  const response = await api.get("/user/sellers");
  return response.data;
};

// Ban User
export const banUser = async (id) => {
  const response = await api.patch(`/user/${id}/ban`);
  return response.data;
};

// Unban User
export const unbanUser = async (id) => {
  const response = await api.patch(`/user/${id}/unban`);
  return response.data;
};

// Suspend User
export const suspendUser = async (id) => {
  const response = await api.patch(`/user/${id}/suspend`);
  return response.data;
};

// Unsuspend User
export const unsuspendUser = async (id) => {
  const response = await api.patch(`/user/${id}/unsuspend`);
  return response.data;
};

// Approve Seller
export const approveSeller = async (id) => {
  const response = await api.patch(`/user/${id}/approve-seller`);
  return response.data;
};

// Reject Seller
export const rejectSeller = async (id) => {
  const response = await api.patch(`/user/${id}/reject-seller`);
  return response.data;
};
