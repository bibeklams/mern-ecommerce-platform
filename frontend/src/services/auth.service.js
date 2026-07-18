import api from "../api/api";

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const googleLogin = async (idToken) => {
  const response = await api.post("/auth/google-login", { idToken });
  return response.data;
};

export const verifyEmail = async (data) => {
  const response = await api.post("/auth/verified-email", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

export const verifyResetOtp = async (data) => {
  const response = await api.post("/auth/verify-reset-otp", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.patch("/auth/reset-password", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const logoutAll = async () => {
  const response = await api.post("/auth/logout-all");
  return response.data;
};
