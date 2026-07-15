import api from "./api";

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
export const googleLogin = async (idToken) => {
  const response = await api.post("/auth/google-login", {
    idToken,
  });
  return response.data;
};
export const verifiedEmail = async (data) => {
  const response = await api.post("/auth/verified-email", data);
  return response.data;
};
export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
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
export const logoutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
export const logoutFromAllApi = async () => {
  const response = await api.post("/auth/logout-all");
  return response.data;
};
