import api from "../api/api";

export const getMyNotifications = async () => {
  const response = await api.get("/notification");
  return response.data;
};

export const countNotification = async () => {
  const response = await api.get("/notification/count");
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await api.patch(`/notification/${id}/read`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await api.patch("/notification/read-all");
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notification/${id}`);
  return response.data;
};

export const clearAllNotifications = async () => {
  const response = await api.delete("/notification");
  return response.data;
};
