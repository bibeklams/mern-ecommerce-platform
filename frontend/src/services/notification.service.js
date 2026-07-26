import api from "../api/api";

export const getMyNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

export const countNotification = async () => {
  const response = await api.get("/notifications/count");
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await api.patch("/notifications/read-all");
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

export const clearAllNotifications = async () => {
  const response = await api.delete("/notifications");
  return response.data;
};
