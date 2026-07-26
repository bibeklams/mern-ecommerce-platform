import { FaBox, FaCreditCard, FaStore, FaBell, FaTrash } from "react-icons/fa";

function NotificationCard({ notification, onRead, onDelete }) {
  const getIcon = () => {
    switch (notification.type) {
      case "ORDER":
        return <FaBox className="text-indigo-500" />;

      case "PAYMENT":
        return <FaCreditCard className="text-emerald-500" />;

      case "SELLER":
        return <FaStore className="text-amber-500" />;

      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  const getIconBg = () => {
    switch (notification.type) {
      case "ORDER":
        return "bg-indigo-50";
      case "PAYMENT":
        return "bg-emerald-50";
      case "SELLER":
        return "bg-amber-50";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div
      className={`group relative rounded-xl border p-4 sm:p-5 pl-5 transition-all duration-200 ${
        notification.isRead
          ? "bg-white border-gray-200 hover:border-gray-300"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
      }`}
    >
      {/* Unread accent bar */}
      {!notification.isRead && (
        <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-indigo-500" />
      )}

      <div className="flex justify-between gap-4">
        {/* Left */}
        <div className="flex gap-3.5 flex-1 min-w-0">
          <div className="relative shrink-0">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${getIconBg()}`}
            >
              {getIcon()}
            </div>

            {!notification.isRead && (
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-2 ring-white" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className={`text-sm truncate ${
                  notification.isRead
                    ? "font-medium text-gray-700"
                    : "font-semibold text-gray-900"
                }`}
              >
                {notification.title}
              </h3>
            </div>

            <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">
              {notification.message}
            </p>

            <p className="text-xs text-gray-400 mt-2.5">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-1.5 items-end shrink-0">
          {!notification.isRead && (
            <button
              onClick={() => onRead(notification._id)}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline whitespace-nowrap"
            >
              Mark read
            </button>
          )}

          <button
            onClick={() => onDelete(notification._id)}
            aria-label="Delete notification"
            className="flex items-center justify-center h-7 w-7 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
          >
            <FaTrash size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
