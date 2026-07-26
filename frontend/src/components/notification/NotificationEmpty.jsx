import { FaBellSlash } from "react-icons/fa";

function NotificationEmpty() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
          <FaBellSlash className="text-2xl text-gray-400" />
        </div>
      </div>

      <h2 className="mt-5 text-lg font-semibold text-gray-900">
        No Notifications
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        You're all caught up. New notifications will appear here.
      </p>
    </div>
  );
}

export default NotificationEmpty;
