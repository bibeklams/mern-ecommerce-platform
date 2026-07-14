import Notification from "../models/Notification.js";

export const createNotification = (filter) => {
  return Notification.create(filter);
};
export const findNotificationById = (id) => {
  return Notification.findById(id);
};
export const findNotifications = (filter = {}) => {
  return Notification.find(filter).sort({ createdAt: -1 });
};
export const updateNotification = (id, data) => {
  return Notification.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
export const countNotification = (filter = {}) => {
  return Notification.countDocuments(filter);
};
export const deleteNotification = (id) => {
  return Notification.findByIdAndDelete(id);
};

export const clearAllNotification = (filter = {}) => {
  return Notification.deleteMany(filter);
};
export const updateManyNotifications = (filter, data) => {
  return Notification.updateMany(filter, data, {
    runValidators: true,
  });
};
