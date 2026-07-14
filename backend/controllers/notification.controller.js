import * as notificationService from "../services/notification.service.js";

export const myNotifications = async (req, res, next) => {
  try {
    const result = await notificationService.myNotifications(req.user.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const countNotification = async (req, res, next) => {
  try {
    const result = await notificationService.countNotification(req.user.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const result = await notificationService.markAsRead(
      req.user.id,
      req.params.notificationId,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req, res, next) => {
  try {
    const result = await notificationService.markAllAsRead(req.user.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const result = await notificationService.deleteNotification(
      req.user.id,
      req.params.notificationId,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const clearAllNotifications = async (req, res, next) => {
  try {
    const result = await notificationService.clearAllNotifications(req.user.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
