import { createAsyncThunk } from "@reduxjs/toolkit";
import * as notificationService from "../../services/notification.service";

export const getMyNotifications = createAsyncThunk(
  "notification/getMyNotifications",
  async (_, { rejectWithValue }) => {
    try {
      return await notificationService.getMyNotifications();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notifications",
      );
    }
  },
);

export const countNotification = createAsyncThunk(
  "notification/countNotification",
  async (_, { rejectWithValue }) => {
    try {
      return await notificationService.countNotification();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notification count",
      );
    }
  },
);

export const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (id, { rejectWithValue }) => {
    try {
      return await notificationService.markAsRead(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark notification as read",
      );
    }
  },
);

export const markAllAsRead = createAsyncThunk(
  "notification/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      return await notificationService.markAllAsRead();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to mark all notifications as read",
      );
    }
  },
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (id, { rejectWithValue }) => {
    try {
      return await notificationService.deleteNotification(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete notification",
      );
    }
  },
);

export const clearAllNotifications = createAsyncThunk(
  "notification/clearAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      return await notificationService.clearAllNotifications();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear notifications",
      );
    }
  },
);
