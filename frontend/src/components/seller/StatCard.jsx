function StatCard({
  title,
  value,
  icon,
  iconBg = "bg-gray-100",
  color = "text-gray-700",
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
      {/* Icon + Title */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>

        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg} ${color}`}
        >
          {icon}
        </span>
      </div>

      {/* Value */}
      <h2 className="mt-3 text-2xl font-bold text-gray-900">
        {typeof value === "number" ? value.toLocaleString() : value}
      </h2>
    </div>
  );
}

export default StatCard;
