function ProductStatusBadge({ status }) {
  const statusConfig = {
    ACTIVE: {
      label: "Active",
      className: "bg-green-100 text-green-700",
    },

    INACTIVE: {
      label: "Inactive",
      className: "bg-gray-100 text-gray-700",
    },

    OUT_OF_STOCK: {
      label: "Out of Stock",
      className: "bg-red-100 text-red-700",
    },
  };

  const current = statusConfig[status] || statusConfig.INACTIVE;

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${current.className}
      `}
    >
      {current.label}
    </span>
  );
}

export default ProductStatusBadge;
