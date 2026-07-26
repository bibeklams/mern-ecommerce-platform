import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import NotificationList from "../../components/notification/NotificationList";
import NotificationSkeleton from "../../components/notification/NotificationSkeleton";

import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../../redux/thunks/notificationThunk";

function Notifications() {
  const dispatch = useDispatch();

  const { notifications, loading } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getMyNotifications());
  }, [dispatch]);

  // ======================
  // Mark Read
  // ======================

  const handleRead = async (notificationId) => {
    const result = await dispatch(markAsRead(notificationId));

    if (markAsRead.fulfilled.match(result)) {
      toast.success("Notification marked as read.");
    } else {
      toast.error(result.payload);
    }
  };

  // ======================
  // Delete
  // ======================

  const handleDelete = async (notificationId) => {
    const result = await dispatch(deleteNotification(notificationId));

    if (deleteNotification.fulfilled.match(result)) {
      toast.success("Notification deleted.");
    } else {
      toast.error(result.payload);
    }
  };

  // ======================
  // Mark All
  // ======================

  const handleMarkAll = async () => {
    const result = await dispatch(markAllAsRead());

    if (markAllAsRead.fulfilled.match(result)) {
      toast.success("All notifications marked as read.");
    } else {
      toast.error(result.payload);
    }
  };

  // ======================
  // Clear All
  // ======================

  const handleClearAll = async () => {
    const result = await dispatch(clearAllNotifications());

    if (clearAllNotifications.fulfilled.match(result)) {
      toast.success("All notifications cleared.");
    } else {
      toast.error(result.payload);
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>

          <p className="text-sm text-gray-500 mt-1">
            Stay updated with your latest activity.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={handleMarkAll}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50"
            >
              Mark All Read
            </button>

            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Content */}

      {loading ? (
        <NotificationSkeleton />
      ) : (
        <NotificationList
          notifications={notifications}
          onRead={handleRead}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}

export default Notifications;
