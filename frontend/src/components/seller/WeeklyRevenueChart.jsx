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
  const data = weeklyRevenue;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Weekly Revenue</h2>

        <p className="text-sm text-gray-500 mt-0.5">Revenue by day of week</p>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="h-72 flex items-center justify-center text-gray-500">
          No revenue data available.
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F5F9"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="#9CA3AF"
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="#9CA3AF"
                allowDecimals={false}
                domain={[0, "dataMax"]}
              />

              <Tooltip
                formatter={(value) => [
                  `Rs. ${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#111827"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#111827",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default WeeklyRevenueChart;
