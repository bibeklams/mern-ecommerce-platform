import * as notificationReposotory from "../repositories/notification.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import { throwError } from "../utils/errorHandler.js";

export const createNotification = async (data) => {
  const { user, title, message, type } = data;

  if (!user) {
    throwError("User is required.", 400);
  }

  if (!title) {
    throwError("Title is required.", 400);
  }

  if (!message) {
    throwError("Message is required.", 400);
  }

  return await notificationRepository.createNotification({
    user,
    title,
    message,
    type,
  });
};
export const myNotifications = async (userId) => {
  const notifications = await notificationReposotory.findNotifications({
    user: userId,
  });

  return {
    notifications,
  };
};
export const markAsRead = async (userId, notificationId) => {
  const notification =
    await notificationRepository.findNotificationById(notificationId);

  if (!notification) {
    throwError("Notification not found.", 404);
  }

  if (notification.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  if (notification.isRead) {
    return {
      notification,
    };
  }

  const updatedNotification = await notificationRepository.updateNotification(
    notificationId,
    {
      isRead: true,
    },
  );

  return {
    notification: updatedNotification,
  };
};
export const markAllAsRead = async (userId) => {
  const notifications = await notificationRepository.findNotifications({
    user: userId,
    isRead: false,
  });

  if (!notifications.length) {
    throwError("No unread notifications found.", 404);
  }

  await notificationRepository.updateManyNotifications(
    {
      user: userId,
      isRead: false,
    },
    {
      isRead: true,
    },
  );

  return {
    message: "All notifications marked as read.",
  };
};
export const deleteNotification = async (userId, notificationId) => {
  const notification =
    await notificationRepository.findNotificationById(notificationId);

  if (!notification) {
    throwError("Notification not found.", 404);
  }

  if (notification.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  await notificationRepository.deleteNotification(notificationId);

  return {
    message: "Notification deleted successfully.",
  };
};
export const clearAllNotifications = async (userId) => {
  await notificationRepository.clearAllNotification({
    user: userId,
  });

  return {
    message: "All notifications cleared successfully.",
  };
};

export const countNotification = async (userId) => {
  const count = await notificationRepository.countNotification({
    user: userId,
    isRead: false,
  });

  return {
    count,
  };
};
