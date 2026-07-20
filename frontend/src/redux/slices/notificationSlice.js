import { createSlice } from "@reduxjs/toolkit";
import {
  getMyNotifications,
  countNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../thunks/notificationThunk";

const initialState = {
  notifications: [],
  count: 0,
  loading: false,
  error: null,
  success: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },

    clearNotificationSuccess: (state) => {
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Get Notifications
      .addCase(getMyNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
      })
      .addCase(getMyNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Count
      .addCase(countNotification.fulfilled, (state, action) => {
        state.count = action.payload.count;
      })

      // Mark One Read
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((notification) =>
          notification._id === action.payload.notification._id
            ? action.payload.notification
            : notification,
        );

        state.count = Math.max(0, state.count - 1);
      })

      // Mark All Read
      .addCase(markAllAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((notification) => ({
          ...notification,
          isRead: true,
        }));

        state.count = 0;
        state.success = action.payload.message;
      })

      // Delete One
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (notification) => notification._id !== action.meta.arg,
        );

        state.success = action.payload.message;
      })

      // Clear All
      .addCase(clearAllNotifications.fulfilled, (state, action) => {
        state.notifications = [];
        state.count = 0;
        state.success = action.payload.message;
      });
  },
});

export const { clearNotificationError, clearNotificationSuccess } =
  notificationSlice.actions;

export default notificationSlice.reducer;
