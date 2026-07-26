import NotificationCard from "./NotificationCard";
import NotificationEmpty from "./NotificationEmpty";

function NotificationList({ notifications, onRead, onDelete }) {
  if (!notifications.length) {
    return <NotificationEmpty />;
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          onRead={onRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default NotificationList;
