import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RevenueChart({ data = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-900">Weekly Revenue</h2>

        <p className="text-xs text-gray-500 mt-0.5">
          Revenue performance for last 7 days
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ left: -12, right: 12 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F1F5F9"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tickFormatter={(day) => day.slice(0, 3)}
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
            tickFormatter={(value) =>
              value >= 1000 ? `$${value / 1000}k` : `$${value}`
            }
          />

          <Tooltip
            formatter={(value) => [`$ ${value.toLocaleString()}`, "Revenue"]}
            cursor={{
              fill: "#F9FAFB",
            }}
            contentStyle={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: 10,
              fontSize: 13,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
            labelStyle={{
              color: "#111827",
              fontWeight: 600,
            }}
          />

          <Bar
            dataKey="revenue"
            radius={[6, 6, 0, 0]}
            fill="#111827"
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
