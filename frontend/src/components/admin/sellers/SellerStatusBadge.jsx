function SellerStatusBadge({ status }) {
  const statusConfig = {
    ACTIVE: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-700",
    },

    SUSPENDED: {
      label: "Suspended",
      className: "bg-amber-50 text-amber-700",
    },

    BANNED: {
      label: "Banned",
      className: "bg-red-50 text-red-600",
    },
  };

  const current = statusConfig[status] || {
    label: status || "Unknown",
    className: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold ${current.className}`}
    >
      {current.label}
    </span>
  );
}

export default SellerStatusBadge;
