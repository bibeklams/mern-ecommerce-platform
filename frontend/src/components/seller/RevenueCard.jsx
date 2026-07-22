import { DollarSign } from "lucide-react";

function RevenueCard({
  title,
  amount,
  bgColor = "bg-white",
  textColor = "text-gray-900",
}) {
  const isDark = bgColor.includes("gray-900") || bgColor.includes("zinc-900");

  return (
    <div
      className={`${bgColor} ${
        isDark ? "" : "border border-gray-200"
      } rounded-xl p-6`}
    >
      {/* Header */}

      <div
        className={`flex items-center gap-2 text-sm ${
          isDark ? "text-gray-300" : "text-gray-500"
        }`}
      >
        <DollarSign size={16} />
        <h3 className="font-medium">{title}</h3>
      </div>

      {/* Amount */}

      <h1 className={`mt-4 text-3xl font-bold ${textColor}`}>
        Rs. {Number(amount || 0).toLocaleString()}
      </h1>
    </div>
  );
}

export default RevenueCard;
