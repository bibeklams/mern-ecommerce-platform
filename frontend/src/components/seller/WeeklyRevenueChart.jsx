import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function WeeklyRevenueChart({ weeklyRevenue = [] }) {
  const data =
    weeklyRevenue?.map((item) => ({
      day: item.day,
      revenue: item.totalRevenue,
    })) || [];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Weekly Revenue</h2>

        <p className="text-sm text-gray-500 mt-0.5">Last 7 days</p>
      </div>

      {/* Chart */}

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: -12, right: 12 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F1F5F9"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                fontSize: 13,
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              }}
              labelStyle={{
                color: "#111827",
                fontWeight: 600,
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#111827"
              strokeWidth={2.5}
              dot={{
                r: 3,
                fill: "#111827",
              }}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyRevenueChart;
