import {
  FaCheckCircle,
  FaBan,
  FaPauseCircle,
  FaQuestionCircle,
} from "react-icons/fa";

function UserStatusBadge({ status }) {
  const statusConfig = {
    ACTIVE: {
      label: "Active",
      icon: FaCheckCircle,
      className: "bg-emerald-100 text-emerald-700",
    },

    BANNED: {
      label: "Banned",
      icon: FaBan,
      className: "bg-red-100 text-red-700",
    },

    SUSPENDED: {
      label: "Suspended",
      icon: FaPauseCircle,
      className: "bg-yellow-100 text-yellow-700",
    },

    INACTIVE: {
      label: "Inactive",
      icon: FaQuestionCircle,
      className: "bg-gray-100 text-gray-600",
    },
  };

  const config = statusConfig[status] || statusConfig.INACTIVE;

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${config.className}
      `}
    >
      <Icon size={12} />

      {config.label}
    </span>
  );
}

export default UserStatusBadge;
