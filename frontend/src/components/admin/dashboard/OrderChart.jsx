import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const STATUS_COLORS = {
  Pending: "#F59E0B",
  Processing: "#6366F1",
  Shipped: "#8B5CF6",
  Delivered: "#10B981",
  Cancelled: "#EF4444",
};

function OrderChart({ data }) {
  const chartData = [
    {
      status: "Pending",
      orders: data?.pending || 0,
    },
    {
      status: "Processing",
      orders: data?.processing || 0,
    },
    {
      status: "Shipped",
      orders: data?.shipped || 0,
    },
    {
      status: "Delivered",
      orders: data?.delivered || 0,
    },
    {
      status: "Cancelled",
      orders: data?.cancelled || 0,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-900">Order Analytics</h2>

        <p className="text-xs text-gray-500 mt-0.5">Order status overview</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ left: -12, right: 12 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F1F5F9"
            vertical={false}
          />

          <XAxis
            dataKey="status"
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            allowDecimals={false}
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{ fill: "#F9FAFB" }}
            contentStyle={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: 10,
              fontSize: 13,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
            labelStyle={{ color: "#111827", fontWeight: 600 }}
          />

          <Bar dataKey="orders" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {chartData.map((entry) => (
              <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderChart;
